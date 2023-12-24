<script setup>
import { ref, defineProps, watch, defineEmits, computed } from 'vue'
import Teaser from './components/Teaser.vue'
import Page from './components/Page.vue'
import Complete from './components/Complete.vue'
import { check as rollCheck } from '../scripts/Rolling.js';


const props = defineProps({
  quest: Object,
  initialSession: Object,
  showWelcome: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['start', 'triggerAction', 'complete']);

const session = ref(props.initialSession || {});

/*
watch(session, (newSession) => {
  emit('questAction', newSession);
});
*/

/*watch(currentPage, () => {
  handleRollIfNeeded();
});

const handleRollIfNeeded = () => {
  if (currentPage.value && currentPage.value.rollEnabled && currentPage.value.roll) {
    const result = rollCheck(currentPage.value.roll.dc);
    if (!session.value.rolls) {
      session.value.rolls = {};
    }
    session.value.rolls[currentPage.value.roll.key] = result;

    // Update the current page based on the roll result
    const resultKey = result.success ? currentPage.value.roll.actionSuccess : currentPage.value.roll.actionFail;
    session.value.progress.pageKey = resultKey;
  }
};*/

const startQuest = () => {
  if (!session.value.progress) {
    session.value.progress = {};
  }
  emit('start', {session: session.value});
  triggerAction('page:INDEX');
};

const triggerAction = (action) => {
  console.log('triggerAction', action);
  if(!session.value.progress.path){
    session.value.progress.path = [];
  }
  session.value.progress.path.push(action);
  const actionType = action.split(':')[0];
  const actionKey = action.split(':')[1];

  emit('triggerAction', {session: session.value, action: action});

  if (actionType === 'page') {
    triggerPageAction(actionKey);
  } else if (actionType === 'roll') {
    triggerRollAction(actionKey);
  }

};

const triggerPageAction = (actionKey) => {
  session.value.progress.currentPage = actionKey;
};

const triggerRollAction = (actionKey) => {
  if(!props.quest.rolls){
    return;
  }
  const roll = props.quest.rolls.find(r => r.key === actionKey);
  if (roll) {
    const result = rollCheck(roll.dc);
    session.value.rolls = session.value.rolls || {};
    session.value.rolls[roll.key] = result;

    const nextAction = result.success ? roll.actionSuccess : roll.actionFail;
    triggerAction(nextAction);
  }
};

const completeQuest = () => {
  session.value = { ...session.value, completed: true };
  emit('complete', {session: session.value});
};

const currentPage = computed(() => {
  let currentKey = session.value.progress?.currentPage || (props.showWelcome ? null : 'INDEX');
  return props.quest.pages.find(page => page.key === currentKey);
});

const isComplete = computed(() => {
  return false;
  //return props.quest.pages.find(page => page.key === currentPageKey.value);
});
</script>

<template>
  <div>

    <Teaser 
      v-if="showWelcome && !currentPage" 
      :quest="quest" 
      :onStart="startQuest"
    />

    <Page 
      v-else-if="currentPage" 
      :page="currentPage"
      :session="session"
      @triggerAction="triggerAction"
    />
    
    <Complete 
      v-else-if="isComplete" 
      :quest="quest"
      :session="session"
    />

  </div>
</template>
