<template>
<div>
  <nuxt-link class="main-btn hover:scale-105" to="/">MAIN PAGE</nuxt-link>
</div>
</template>


<script setup lang="ts">

</script>


<style scoped>

div  {
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-btn  {
  text-decoration: none;
  color: #a10000;
  font-size: 30px;
  font-family: Impact, fantasy;
  letter-spacing: 2px;
  transition: 0.3s;
}

.main-btn:hover {
  color: #490000;
}

</style>