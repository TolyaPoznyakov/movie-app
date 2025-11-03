<template>
  <div>
    <movie-description
        v-if="moviesDetails" :movie="moviesDetails"
    />
  </div>
</template>


<script setup>
import {useApiRequest} from "~/composables/apiRequest.js";
import { useRoute } from 'vue-router'

const route = useRoute()
const movieId = route.params.id

const moviesDetails = ref(null);
const fetchMovies = async ()=>{
  const res = await useApiRequest(`/movie/${movieId}`)
  moviesDetails.value = res.data.value;
}

onMounted(()=>{
  fetchMovies()
})

</script>



<style scoped>


</style>



