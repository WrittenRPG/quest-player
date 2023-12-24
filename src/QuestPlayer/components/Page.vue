<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import { marked } from 'marked';
import RollResult from './RollResult.vue';

const props = defineProps({
  page: Object,
  session: Object
});

const emit = defineEmits(['triggerAction']);

const renderedMarkdown = computed(() => {
  if (props.page.markdown) {
    return marked(props.page.markdown);
  }
  return '';
});

const rollResult = computed(() => {
    console.log(props.session);
  if (props.session.progress.rolls && props.session.progress.rolls[props.page.key]) {
    return props.session.progress.rolls[props.page.key];
  }
  return null;
});

const triggerAction = (optionKey) => {
  emit('triggerAction', optionKey);
};
</script>

<template>

    <RollResult v-if="rollResult" :rollResult="rollResult" />

    <h3 v-if="props.page.title" class="mb-8 max-w-3xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">{{ props.page.title }}</h3>

    <div class="md:flex">
        <div class="md:w-2/5" v-if="props.page.image">
            <img :src="props.page.image" class="rounded-lg w-full" alt="Page Image">
      </div>
      <div class="md:w-3/5 md:pl-8 prose max-w-none">
        <div v-html="renderedMarkdown" class="text-lg font-normal text-gray-700 mb-8"></div>
        <div v-if="props.page.options">
          <div v-for="(option, optionKey) in props.page.options" :key="optionKey" class="mb-2">
            <button @click="triggerAction(option.action)" class="w-full rounded-lg bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{{ option.label }}</button>
          </div>
        </div>
      </div>
    </div>

  </template>
