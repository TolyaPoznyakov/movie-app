<template>
<div class="">
  <div class="movies-wrapper">
  <CardMovieCard
      v-for="movie in movies"
      :key="movie.id"
      :movie="movie"
  />
  </div>
</div>
</template>


<script setup>
import {useApiRequest} from "~/composables/apiRequest.js";

const movies = ref(null);
const fetchMovies = async ()=>{

  const res = await useApiRequest('/movie/now_playing')
  movies.value = res.data.value.results;
}

onMounted(()=>{
  fetchMovies()
})

</script>


<style scoped>

.movies-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

</style>