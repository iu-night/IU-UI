<script setup lang="ts">
const value = ref(true)
</script>

<template>
  <IuSpace align="center">
    <IuSwitch v-model="value" />
    <IuSwitch v-model="value" disabled />
  </IuSpace>
</template>
