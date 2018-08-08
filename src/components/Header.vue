<template>
  <div>
    <h1 key="settings" v-if="settings.isActive">SETTINGS</h1>
    <h1 key="mytodos" v-else>MY TODOS</h1>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    settings: Object,
  },
};
</script>
