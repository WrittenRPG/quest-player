<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  quest: Object,
  onStart: Function
});
</script>

<template>
  <div>
    <h1>Complete Results for {{ quest.name }}</h1>
    <p>{{ quest.description }}</p>
    <img v-if="quest.image" :src="quest.image" alt="Quest Image">
    <button @click="props.onStart">Start Quest</button>
  </div>
</template>
