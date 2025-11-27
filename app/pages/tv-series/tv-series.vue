<template>
  <div class="w-full px-4">
    <div class="w-full flex justify-center pb-10 gap-4">
      <USelect
          v-if="tvSeriesGenres.length > 0"
          v-model="selectedGenres"
          :items="tvSeriesGenres"
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
      <DateRangeFilter v-model="dateRange" />
    </div>

    <div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
      <movie-card
        v-for="item in formattedMovieList"
        :key="item.id"
        :movie="item"
        @click="handleClick(item.id, 'tv')"
      />
    </div>
    <base-pagination
      :page="page"
      :total-pages="totalPages"
      :total-movies="totalMovies"
      :items-per-page="itemsPerPage"
      @next="nextPage"
      @prev="prevPage"
    />
  </div>
</template>

<script setup>
import { useApiRequest } from '~/composables/apiRequest.js'
import { debounce } from '~/utils/debounce.js'
import { useTvSeriesGenres } from '~/composables/genres.js'

const { fetchGenres } = useTvSeriesGenres()

const { $moment } = useNuxtApp()

const tvSeries = ref([])
const searchedTvSeries = ref([])
const search = ref('')
const page = ref(1)
const totalPages = ref(1)
const tvSeriesGenres = ref([])
const selectedGenres = ref([])
const totalMovies = ref(1)
const itemsPerPage = 20



const handleClick = (id, type) => {
  if (type === 'movie') {
    navigateTo(`/movies/${id}`)
  }
  else if (type === 'tv') {
    navigateTo(`/tv-series/${id}`)
  }
}

const dateRange = shallowRef({
  start: null,
  end: null
})

const startDate = computed(() => $moment({
  year: dateRange.value.start?.year,
  month: dateRange.value.start?.month - 1,
  day: dateRange.value.start?.day
}).format("YYYY-MM-DD"))

const endDate = computed(() => $moment({
  year: dateRange.value.end?.year,
  month: dateRange.value.end?.month - 1,
  day: dateRange.value.end?.day
}).format("YYYY-MM-DD"))


const moviesList = computed(() => search.value ? searchedTvSeries.value : tvSeries.value)

const formattedMovieList = computed(() => moviesList.value.map(movie => ({ ...movie, title: movie.name }) ))

const fetchTvAndSeries = async () => {
  const res = await useApiRequest('/discover/tv', {
    query: {
      page: page.value,
      with_genres: selectedGenres.value.join(','),
      'first_air_date.gte': startDate.value,
      'first_air_date.lte': endDate.value
    }
  })
  tvSeries.value = res.data.value.results
  totalPages.value = res.data.value.total_pages
  totalMovies.value = res.data.value.total_results
}

const searchTvAndSeries = async () => {
  if (!search.value) return

  const res = await useApiRequest('/search/tv', {
    query: {
      query: search.value,
      page: page.value
    }
  })

  if (!res.data.value) {
    return
  }

  searchedTvSeries.value = res.data.value.results
  totalPages.value = res.data.value.total_pages
  totalMovies.value = res.data.value.total_results
}

const debouncedSearch = debounce(searchTvAndSeries, 800)

watch(search, () => {
  page.value = 1
  debouncedSearch()
})

watch(selectedGenres, async () => {
  await fetchTvAndSeries()
})

watch(dateRange, async () => {
  await fetchTvAndSeries()
})

onMounted(async () => {
  await fetchTvAndSeries()
  tvSeriesGenres.value = await fetchGenres()
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
  if (search.value) await searchTvAndSeries()
  else await fetchTvAndSeries()
}
</script>

<style scoped>

</style>
