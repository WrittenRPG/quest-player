<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  rollResult: Object
});
</script>

<template>
  <div v-if="rollResult">
    <h3 :class="['border rounded mb-4 font-bold p-4', rollResult.success ? 'bg-green-400' : 'bg-red-400']">
      Roll: {{ rollResult.value }}. {{ rollResult.success ? 'Success!' : 'Fail!' }}
    </h3>
  </div>
</template>
