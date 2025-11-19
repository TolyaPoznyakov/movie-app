<template>
  <div class="w-full px-4">
    <div class="w-full flex justify-center pb-10 gap-4">
      <USelect
        v-if="movieGenres.length > 0"
        v-model="selectedGenres"
        :items="movieGenres"
        multiple
        placeholder="Select genre"
        value-key="id"
        label-key="name"
        class="w-[150px]"
      />
      <AppInput
        v-model="search"
        class="w-lg h-10"
        placeholder="Search movies..."
        size="xl"
      />
    </div>
    <div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
      <MovieCard
        v-for="movie in moviesList"
        :key="movie.id"
        :movie="movie"
      />
    </div>
    <base-pagination
      :page="page"
      :total-pages="totalPages"
      @next="nextPage"
      @prev="prevPage"
    />
  </div>
</template>

<script setup>
import { useApiRequest } from '~/composables/apiRequest.js'
import { debounce } from '~/utils/debounce.js'
import { useMovieGenres } from '~/composables/genres.js'

const { fetchGenres } = useMovieGenres()

const moviesInCinema = ref(null)
const movies = ref(null)
const search = ref('')
const page = ref(1)
const totalPages = ref(1)
const movieGenres = ref([])
const selectedGenres = ref([])

const moviesList = computed(() => search.value ? movies.value : moviesInCinema.value)

const fetchMovies = async () => {
  const res = await useApiRequest('/discover/movie', {
    query: {
      page: page.value,
      with_genres: selectedGenres.value.join(',')
    }
  })
  moviesInCinema.value = res.data.value.results
  totalPages.value = res.data.value.total_pages
}

const searchMovies = async () => {
  if (!search.value) return

  const res = await useApiRequest('/search/movie', {
    query: {
      query: search.value,
      page: page.value
    }
  })

  if (!res.data.value) {
    return
  }

  movies.value = res.data.value.results
  totalPages.value = res.data.value.total_pages
}

const debouncedSearch = debounce(searchMovies, 800)

watch(search, () => {
  page.value = 1
  debouncedSearch()
})

watch(selectedGenres, async () => {
  await fetchMovies()
})
// TODO: have a look of ASYNC hooks call
onMounted(async () => {
  await fetchMovies()
  movieGenres.value = await fetchGenres()
})

const nextPage = async () => {
  if (page.value < totalPages.value) {
    page.value++
    await updateMovies()
  }
}

const prevPage = async () => {
  if (page.value > 1) {
    page.value--
    await updateMovies()
  }
}

const updateMovies = async () => {
  if (search.value) await searchMovies()
  else await fetchMovies()
}
</script>

<style scoped>

</style>
