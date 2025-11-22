<template>
  <div>
    <back-button class="ml-64"/>
    <movie-description
        v-if="moviesDetails" :movie="moviesDetails"
    />
  </div>
</template>


<script setup>
import { useApiRequest } from "~/composables/apiRequest.js"
import { useRoute } from 'vue-router'

const route = useRoute()
const seriesId = route.params.id

const moviesDetails = ref(null)
const fetchMovies = async ()=>{
  const res = await useApiRequest(`/tv/${seriesId}`)
  moviesDetails.value = res.data.value
}

onMounted(()=>{
  fetchMovies()
})

</script>



<style scoped>


</style>



