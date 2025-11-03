<template>
<div>
  <nuxt-link class="main-btn" to="/">MAIN PAGE</nuxt-link>
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
  color: #490000;
  font-size: 30px;
  font-family: Impact, fantasy;
  letter-spacing: 2px;
  transition: 0.3s;
}

.main-btn:hover {
  color: #a10000;
}

</style>