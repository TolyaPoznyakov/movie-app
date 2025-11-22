<template>
<div class="w-full px-4">
  <div class="w-full flex justify-center pb-10 gap-4">
    <AppInput
      v-model="search"
      class="w-lg h-10"
      placeholder="Search movies..."
      size="xl"
    />
  </div>

  <div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
  <movie-card
      v-for="item in moviesList"
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
import { useApiRequest } from "~/composables/apiRequest.js"
import { debounce } from "~/utils/debounce.js"

const tvAndSeries = ref(null)

const series = ref(null)
const search = ref('')
const page = ref(1)
const totalPages = ref(1)
const totalMovies = ref(1)
const itemsPerPage = 20



const handleClick = (id, type) => {
  if (type === 'movie') {
    navigateTo(`/movies/${id}`)
  } else if (type === 'tv') {
    navigateTo(`/tv-series/${id}`)
  }
}




const moviesList = computed(() => search.value ? series.value : tvAndSeries.value)

const fetchTvAndSeries = async ()=>{
  const res = await useApiRequest('/discover/tv', {
    query: {
      page: page.value
    }
  })
  tvAndSeries.value = res.data.value.results
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

  series.value = res.data.value.results
  totalPages.value = res.data.value.total_pages
  totalMovies.value = res.data.value.total_results
}

const debouncedSearch = debounce(searchTvAndSeries, 800)

watch(search, () => {
  page.value = 1
  debouncedSearch()
})

onMounted(()=>{
  fetchTvAndSeries()
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