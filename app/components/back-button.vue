<template>
  <UButton
      class="text-[#222] hover:bg-transparent hover:text-[#a10000] active:bg-transparent hover:scale-110 cursor-pointer ml-64"
      variant="ghost"
      icon="i-heroicons-arrow-uturn-left"
      @click="goBack"
  >
    Back
  </UButton>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<style scoped>

</style>