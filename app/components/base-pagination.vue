<template>
  <div class="flex justify-center gap-4 my-8">
    <UButton
        :disabled="page === 1"
        class="bg-[#a10000] hover:bg-[#490000] active:bg-[#490000] text-white cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed disabled:hover:scale-100 hover:scale-105"
        icon="i-heroicons-arrow-left"
        @click="$emit('prev')"
    >
      Previous
    </UButton>

    <span class="px-4 py-2 text-lg font-medium">Page {{ page }}</span>

    <UButton
        class="bg-[#a10000] hover:bg-[#490000] active:bg-[#490000] text-white cursor-pointer hover:scale-105"
        trailing-icon="i-heroicons-arrow-right"
        @click="$emit('next')"
    >
      Next
    </UButton>
  </div>
</template>


<script setup>
defineProps({
  page: {
    type: Number,
    default: 1,
  },
  totalPages: {
    type: Number,
    default: 1,
  }
})

defineEmits(['next', 'prev'])
</script>


<style scoped>

</style>