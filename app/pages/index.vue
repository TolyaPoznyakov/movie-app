<template>
<div class="w-full">
  <div class="w-full flex justify-center pb-15 gap-4">
    <AppInput
        v-model="search"
        class="w-lg h-10"
        placeholder="Search movies..."
        size="xl"
    />
  </div>
  <div class="movies-wrapper">
  <CardMovieCard
      v-for="movie in moviesList"
      :key="movie.id"
      :movie="movie"
  />
  </div>
</div>
</template>


<script setup>
import {useApiRequest} from "~/composables/apiRequest.js";
import {debounce} from "~/utils/debounce.js";

const moviesInCinema = ref(null)
const movies = ref(null);
const search = ref('');

const moviesList = computed(() => search.value ? movies.value : moviesInCinema.value)

const fetchMovies = async ()=>{
  const res = await useApiRequest('/movie/now_playing')
  moviesInCinema.value = res.data.value.results;
}

const searchMovies = async () => {
  const res = await useApiRequest('/search/movie', {
    query: {
      query: search.value
    }
  })

  if (!res.data.value) {
    return
  }

  movies.value = res.data.value.results;
}

const debouncedSearch = debounce(searchMovies, 800)

watch(search, async () => {
  await debouncedSearch()
})

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