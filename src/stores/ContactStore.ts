import { defineStore } from 'pinia';
import axios from 'axios';
import type { Contact } from '@/types';

interface ContactState {
  contacts: Contact[];
  isLoading: boolean;
  totalContactCount: number;
}

export const useContactStore = defineStore('contactStore', {
  state: (): ContactState => ({
    contacts: [],
    isLoading: false,
    totalContactCount: 0,
  }),
  actions: {
    async getContacts(): Promise<void> {
      this.isLoading = true;
      try {
        const response = await axios.get<Contact[]>('http://localhost:3000/contacts');
        this.contacts = response.data;
        this.totalContactCount = response.data.length;
      } catch (error) {
        console.error('Error fetching contacts:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
