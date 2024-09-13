<template>
	<div v-if="isLoading">Loading...</div>
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
							:class="{ 'bg-cyan-900/80 text-white': isActiveSort('first_name') }"
							class="p-2 border border-gray-300 rounded shadow-sm"
							@click="toggleSort('first_name')"
						>
							First Name
							<FontAwesomeIcon class="mx-2" :icon="sortOrderIcon('first_name')" />
						</button>
						<button
							:class="{ 'bg-cyan-900/80 text-white': isActiveSort('last_name') }"
							class="p-2 border border-gray-300 rounded shadow-sm"
							@click="toggleSort('last_name')"
						>
							Last Name
							<FontAwesomeIcon class="mx-2" :icon="sortOrderIcon('last_name')" />
						</button>
						<button
							:class="{ 'bg-cyan-900/80 text-white': isActiveSort('company') }"
							class="p-2 border border-gray-300 rounded shadow-sm"
							@click="toggleSort('company')"
						>
							Company
							<FontAwesomeIcon class="mx-2" :icon="sortOrderIcon('company')" />
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="flex justify-between mb-3 w-[93%]">
			<p v-if="filteredContacts" class="text-xl py-6">
				Showing {{ filteredContacts.length }} of {{ totalContactCount }} contacts
			</p>
			<button
				class="p-2 my-4 bg-cyan-600/90 text-white rounded w-48"
				@click="openCreateModal"
			>
				Create New Contact
			</button>
		</div>
		<div class="md:flex md:flex-row md:gap-4 md:max-w-full flex-wrap">
			<div v-for="contact in filteredContacts" :key="contact.id">
				<ContactDetails :contact="contact" @edit="openEditModal(contact)" />
			</div>
		</div>
		<FormModal
			:is-visible="isFormModalVisible"
			:contact="selectedContact"
			:is-edit-mode="isEditMode"
			@close="closeFormModal"
			@save="saveContact"
		/>
	</div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia'
import { useContactStore } from '@/stores/ContactStore'
import ContactDetails from '../components/ContactDetails.vue'
import FormModal from '../components/FormModal.vue'
import { computed, defineComponent, ref } from 'vue'
import { Contact } from '@/types'

export default defineComponent({
	components: { ContactDetails, FormModal },
	setup() {
		const contactStore = useContactStore()
		const isFormModalVisible = ref(false)
		const selectedContact = ref<Contact | null>(null)
		const isEditMode = ref(false)

		const fetchContacts = async (): Promise<void> => {
			await contactStore.getContacts()
		}

		fetchContacts()

		const { contacts, isLoading, totalContactCount, filter, sortCriteria, sortOrder } =
			storeToRefs(contactStore)
		const filteredContacts = computed(() => contactStore.filteredContacts)

		const updateFilter = (event: Event): void => {
			const target = event.target as HTMLSelectElement
			contactStore.setFilter(target.value)
		}

		const toggleSort = (criteria: string): void => {
			if (sortCriteria.value === criteria) {
				contactStore.setSortOrder(sortOrder.value === 'asc' ? 'desc' : 'asc')
			} else {
				contactStore.setSortCriteria(criteria)
				contactStore.setSortOrder('asc')
			}
		}

		const isActiveSort = (criteria: string): boolean => {
			return sortCriteria.value === criteria
		}

		const sortOrderIcon = (criteria: string): any => {
			if (sortCriteria.value === criteria) {
				return sortOrder.value === 'asc' ? 'caret-up' : 'caret-down'
			}
			return 'sort'
		}

		const openEditModal = (contact: Contact) => {
			selectedContact.value = { ...contact }
			isEditMode.value = true
			isFormModalVisible.value = true
		}

		const openCreateModal = () => {
			selectedContact.value = { first_name: '', last_name: '', company: '' } as Contact
			isEditMode.value = false
			isFormModalVisible.value = true
		}

		const closeFormModal = () => {
			isFormModalVisible.value = false
		}

		const saveContact = (contact: Contact) => {
			if (isEditMode.value) {
				contactStore.updateContact(contact)
			} else {
				contactStore.addContact(contact)
			}
			closeFormModal()
		}

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
			isFormModalVisible,
			selectedContact,
			isEditMode,
			openEditModal,
			openCreateModal,
			closeFormModal,
			saveContact
		}
	}
})
</script>
