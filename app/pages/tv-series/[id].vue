<template>
  <div>
    <UContainer>
      <back-button class="mb-5"/>
      <movie-description
        v-if="formattedSerialDetails" :movie="formattedSerialDetails"
      />
    </UContainer>
  </div>
</template>


<script setup>
import { useApiRequest } from "~/composables/apiRequest.js"
import { useRoute } from 'vue-router'

const route = useRoute()
const seriesId = route.params.id

const formattedSerialDetails = computed(() => serialDetails.value && ({
  ...serialDetails.value,
  title: serialDetails.value.name,
  original_title: serialDetails.value.original_name,
  release_date: serialDetails.value.first_air_date,
  runtime: serialDetails.value.episode_run_time?.[0],
  original_language: serialDetails.value.languages?.[0]
}))

const serialDetails = ref(null)

const fetchSerial = async () => {
  const res = await useApiRequest(`/tv/${seriesId}`)
  serialDetails.value = res.data.value
}

onMounted(() => {
  fetchSerial()
})

</script>



<style scoped>


</style>



