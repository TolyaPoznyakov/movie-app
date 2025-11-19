<template>
  <div class="w-full h-full py-10">
    <iframe
      :src="videoUrl"
      allowfullscreen
      class="w-full h-[600px]"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const videoUrl = computed(() => `https://www.youtube.com/embed/${props.id}`)
</script>

<style scoped>

</style>
