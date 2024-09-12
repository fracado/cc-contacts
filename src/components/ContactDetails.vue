<template>
  <div class="bg-white shadow-button rounded-md mb-6 w-[325px]">
    <div class="flex flex-row gap-1 font-black text-2xl text-slate-700 p-5">
      <h1>
        {{ contact.first_name }}
        {{ contact.last_name }}
      </h1>
    </div>
    <div class="pb-5 px-5 text-slate-600 font-semibold flex flex-row gap-2">
      <div class="flex-[0.5]">
        <p>phone:</p>
        <p>email:</p>
        <p>company:</p>
        <p>status:</p>
      </div>
      <div class="flex-1">
        <p>{{ contact.phone }}</p>
        <p>{{ contact.email }}</p>
        <p>{{ contact.company }}</p>
        <p>{{ contact.status }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type{ Contact } from '@/types';

export default defineComponent({
  props: {
    contact: {
      type: Object as PropType<Contact>,
      required: true
    }
  },
  setup() {
    return {};
  }
});
</script>
