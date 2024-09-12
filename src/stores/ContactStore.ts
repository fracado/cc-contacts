import { defineStore } from 'pinia'
import axios from 'axios'
import type { Contact } from '@/types'

interface ContactState {
	contacts: Contact[]
	isLoading: boolean
	totalContactCount: number
	filter: string
	sortCriteria: string
	sortOrder: 'asc' | 'desc'
}

export const useContactStore = defineStore('contactStore', {
	state: (): ContactState => ({
		contacts: [],
		isLoading: false,
		totalContactCount: 0,
		filter: '',
		sortCriteria: 'first_name',
		sortOrder: 'asc'
	}),
	getters: {
		filteredContacts(state: ContactState): Contact[] {
			let filtered = state.contacts
			if (state.filter) {
				filtered = filtered.filter((contact) =>
					contact.status.toLowerCase().includes(state.filter.toLowerCase())
				)
			}
			return filtered.sort((a, b) => {
				let comparison = 0
				if (state.sortCriteria === 'first_name') {
					comparison = a.first_name.localeCompare(b.first_name)
				} else if (state.sortCriteria === 'last_name') {
					comparison = a.last_name.localeCompare(b.last_name)
				} else if (state.sortCriteria === 'company') {
					comparison = (a.company || '').localeCompare(b.company || '')
				}
				return state.sortOrder === 'asc' ? comparison : -comparison
			})
		}
	},
	actions: {
		async getContacts(): Promise<void> {
			console.log('getContacts function called')
			this.isLoading = true
			try {
				const response = await axios.get<Contact[]>('http://localhost:3000/contacts')
				this.contacts = response.data
				console.log('response.data', response.data)
				this.totalContactCount = response.data.length
			} catch (error) {
				console.error('Error fetching contacts:', error)
			} finally {
				this.isLoading = false
			}
		},
		async addContact(contact: Contact): Promise<void> {
			try {
				const response = await axios.post<Contact>(
					'http://localhost:3000/contacts',
					contact
				)
				this.contacts.push(response.data)
				this.totalContactCount++
			} catch (error) {
				console.error('Error adding contact:', error)
			}
		},
		async updateContact(contact: Contact): Promise<void> {
			try {
				await axios.put(`http://localhost:3000/contacts/${contact.id}`, contact)
				const index = this.contacts.findIndex((c) => c.id === contact.id)
				if (index !== -1) {
					this.contacts[index] = contact
				}
			} catch (error) {
				console.error('Error updating contact:', error)
			}
		},
		setFilter(filter: string): void {
			this.filter = filter
		},
		setSortCriteria(criteria: string): void {
			this.sortCriteria = criteria
		},
		setSortOrder(order: 'asc' | 'desc'): void {
			this.sortOrder = order
		}
	}
})
