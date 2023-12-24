<script setup>
import QuestPlayer from './QuestPlayer/QuestPlayer.vue'
import Quest from './quests/basic.json'
</script>

<template>
  <div class="container mx-auto p-4">
    <QuestPlayer :quest="Quest" />
  </div>
</template>
