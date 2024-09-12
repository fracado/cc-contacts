<template>
  <div v-if="isLoading">
    Loading...
  </div>

  <div v-else class="px-12 flex flex-col container">
    <h1 class="text-3xl font-bold text-gray-800 mt-8 mb-4">Contacts</h1>
    <div class="p-4 border border-gray-300 rounded shadow-sm mb-4 w-[93%]">
      <div class="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h2 class="font-bold text-gray-800 mb-2">Filter by</h2>
          <select
            v-model="filter"
            class="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-900/80 w-80"
            @change="updateFilter"
          >
            <option value="">All</option>
            <option value="customer">Customer</option>
            <option value="prospect">Prospect</option>
          </select>
        </div>
        <div>
          <h2 class="font-bold text-gray-800 mb-2">Sort by</h2>
          <div class="flex gap-2 leading-5">
            <button
              :class="{'bg-cyan-900/80 text-white': isActiveSort('first_name')}"
              class="p-2 border border-gray-300 rounded shadow-sm"
              @click="toggleSort('first_name')"
            >
              First Name <FontAwesomeIcon class="mx-2" :icon="sortOrderIcon('first_name')" />
            </button>
            <button
              :class="{'bg-cyan-900/80 text-white': isActiveSort('last_name')}"
              class="p-2 border border-gray-300 rounded shadow-sm"
              @click="toggleSort('last_name')"
            >
              Last Name <FontAwesomeIcon class="mx-2" :icon="sortOrderIcon('last_name')" />
            </button>
            <button
              :class="{'bg-cyan-900/80 text-white': isActiveSort('company')}"
              class="p-2 border border-gray-300 rounded shadow-sm"
              @click="toggleSort('company')"
            >
              Company <FontAwesomeIcon class="mx-2" :icon="sortOrderIcon('company')" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <p v-if="filteredContacts" class="text-2xl py-4">
      Contacts (Total: {{ filteredContacts.length }})
    </p>
    <div class="md:flex md:flex-row md:gap-3 md:max-w-full flex-wrap">
      <div v-for="contact in filteredContacts" :key="contact.id">
        <ContactDetails
          :contact="contact"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from "pinia";
import { useContactStore } from '@/stores/ContactStore';
import ContactDetails from "../components/ContactDetails.vue";
import { computed, defineComponent } from 'vue';

export default defineComponent({
  components: { ContactDetails },
  setup() {
    const contactStore = useContactStore();

    const fetchContacts = async (): Promise<void> => {
      await contactStore.getContacts();
    };

    fetchContacts();

    const { contacts, isLoading, totalContactCount, filter, sortCriteria, sortOrder } = storeToRefs(contactStore);
    const filteredContacts = computed(() => contactStore.filteredContacts);

    const updateFilter = (event: Event): void => {
      const target = event.target as HTMLSelectElement;
      contactStore.setFilter(target.value);
    };

    const toggleSort = (criteria: string): void => {
      if (sortCriteria.value === criteria) {
        contactStore.setSortOrder(sortOrder.value === 'asc' ? 'desc' : 'asc');
      } else {
        contactStore.setSortCriteria(criteria);
        contactStore.setSortOrder('asc');
      }
    };

    const isActiveSort = (criteria: string): boolean => {
      return sortCriteria.value === criteria;
    };

    const sortOrderIcon = (criteria: string): any => {
      if (sortCriteria.value === criteria) {
        return sortOrder.value === 'asc' ? 'caret-up' : 'caret-down';
      }
      return 'sort';
    };

    return {
      contactStore,
      contacts,
      isLoading,
      totalContactCount,
      filter,
      filteredContacts,
      updateFilter,
      toggleSort,
      isActiveSort,
      sortOrderIcon,
    };
  }
});
</script>
