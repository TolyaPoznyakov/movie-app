<template>
  <div>
    <UContainer>
      <back-button class="mb-5" />
      <movie-description
        v-if="moviesDetails"
        :movie="moviesDetails"
      />
      <movie-trailer
        v-if="trailer"
        :id="trailer.key"
      />
    </UContainer>
  </div>
</template>

<script setup>
import { useApiRequest } from '~/composables/apiRequest.js'
import { useRoute } from 'vue-router'
import MovieTrailer from '~/components/movie-trailer.vue'

const route = useRoute()
const movieId = route.params.id

const moviesDetails = ref(null)

const trailer = computed(() => moviesDetails.value && moviesDetails.value.videos?.results?.find(item => item.type === 'Trailer'))

const fetchMovies = async () => {
  const res = await useApiRequest(`/movie/${movieId}`, {
    query: {
      append_to_response: 'videos'
    }
  })
  moviesDetails.value = res.data.value
}

onMounted(() => {
  fetchMovies()
})
</script>

<style scoped>

</style>
