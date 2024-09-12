<template>
  <div v-if="isLoading">
    Loading...
  </div>

  <div v-else class="px-12 flex flex-col container">
    <p v-if="contacts" class="text-2xl py-4">
      Contacts (Total: {{ totalContactCount }})
    </p>
    <div class="md:flex md:flex-row md:gap-3 md:max-w-full flex-wrap">
      <div v-for="contact in contacts">
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
import { defineComponent } from 'vue';

export default defineComponent({
  components: { ContactDetails },
  setup() {
    const contactStore = useContactStore();

    const fetchContacts = async (): Promise<void> => {
      await contactStore.getContacts();
    };

    fetchContacts();

    const { contacts, isLoading, totalContactCount } = storeToRefs(contactStore);

    return {
      contactStore,
      contacts,
      isLoading,
      totalContactCount,
    };
  }
};
</script>
