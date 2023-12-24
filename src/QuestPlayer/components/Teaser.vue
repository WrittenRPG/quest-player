<script setup>
import { defineProps, computed } from 'vue';
import { marked } from 'marked';

const props = defineProps({
  quest: Object,
  onStart: Function
});

const renderedMarkdown = computed(() => {
  if (props.quest.description) {
    return marked(props.quest.description);
  }
  return '';
});
</script>

<template>
  <div>
    <h1 class="mb-8 max-w-3xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">{{ quest.name }}</h1>
    <div class="md:flex">
      <div class="md:w-3/5 md:pr-8 prose max-w-none">
        <div v-html="renderedMarkdown" class="text-lg font-normal text-gray-700 mb-8"></div>
        <button @click="props.onStart" class="w-full rounded-lg bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Start Quest</button>
      </div>
      <div class="md:w-2/5">
        <img v-if="quest.image" :src="quest.image" class="rounded-lg w-full" alt="Quest Image">
      </div>
    </div>
  </div>
</template>
