<template>
  <UInput :ui="inputUIOptions" class="w-full h-full" />
</template>

<script setup>

const inputUIOptions = {
  base: 'focus-visible:ring-[#490000]',
  input: 'focus:outline-none'
}

</script>

<style scoped>

</style>