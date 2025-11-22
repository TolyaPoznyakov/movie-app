<template>
<div class="py-5 gap-12 flex justify-center items-center">
  <nuxt-link class="main-btn" to="/">MAIN PAGE</nuxt-link>
  <nuxt-link class="main-btn" to="/tv-series/tv-series">TV AND SERIES</nuxt-link>
</div>
</template>


<script setup lang="ts">

</script>


<style scoped>

.main-btn {
  @apply no-underline text-[#a10000] text-[30px] font-[Impact,Fantasy] tracking-[2px] transition duration-300 hover:text-[#490000] hover:scale-105;
}



</style>