<template>
	<div
		v-if="isVisible"
		class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
	>
		<div class="bg-white p-6 rounded shadow-lg w-96">
			<h2 class="text-2xl mb-4">{{ isEditMode ? 'Edit Contact' : 'Create Contact' }}</h2>
			<FormKit type="form" @submit="submitForm">
				<FormKit
					v-model="localContact.first_name"
					type="text"
					name="first_name"
					label="First Name"
					validation="required"
					validation-visibility="dirty"
				/>
				<FormKit
					v-model="localContact.last_name"
					type="text"
					name="last_name"
					label="Last Name"
					validation="required"
					validation-visibility="dirty"
				/>
				<FormKit
					v-model="localContact.phone"
					type="text"
					name="phone"
					label="Phone"
					validation="required|matches:/^[0-9\W]*$/"
					validation-visibility="dirty"
				/>
				<FormKit
					v-model="localContact.email"
					type="text"
					name="email"
					label="Email"
					validation="required|email"
					validation-visibility="dirty"
				/>
				<FormKit
					v-model="localContact.company"
					type="text"
					name="company"
					label="Company"
					validation="required"
					validation-visibility="dirty"
				/>
				<FormKit
					v-model="localContact.status"
					type="select"
					label="Status"
					name="status"
					placeholder="Select a status..."
					:options="['customer', 'prospect']"
					validation="required"
					validation-visibility="dirty"
				/>
				<div class="flex justify-end mb-[-50px]">
					<button
						type="button"
						class="mr-2 py-3 px-5 ring-1 ring-cyan-900/80 bg-gray-100 rounded"
						@click="closeModal"
					>
						Cancel
					</button>
				</div>
			</FormKit>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { FormKit } from '@formkit/vue'
import { Contact } from '@/types'

export default defineComponent({
	components: { FormKit },
	props: {
		isVisible: {
			type: Boolean,
			required: true
		},
		contact: {
			type: Object as PropType<Contact>,
			required: true
		},
		isEditMode: {
			type: Boolean,
			required: true
		}
	},
	emits: ['close', 'save'],
	setup(props, { emit }) {
		const localContact = ref({ ...props.contact })
		watch(
			() => props.contact,
			(newContact) => {
				localContact.value = { ...newContact }
			},
			{ immediate: true }
		)

		const closeModal = () => {
			emit('close')
		}

		const submitForm = () => {
			emit('save', localContact.value)
		}

		return {
			localContact,
			closeModal,
			submitForm
		}
	}
})
</script>
