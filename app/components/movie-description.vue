<template>
  <div class="movie">
    <div class="px-5">
      <h1>{{ movie.title }}</h1>
      <p class="tagline">
        {{ movie.tagline }}
      </p>
      <ul class="info">
        <li><strong>Оригінальна назва:</strong> {{ movie.original_title }}</li>
        <li><strong>Мова:</strong> {{ movie.original_language.toUpperCase() }}</li>
        <li><strong>Жанри:</strong> {{ genres }}</li>
        <li><strong>Тривалість:</strong> {{ movie.runtime }} хв</li>
        <li><strong>Дата релізу:</strong> {{ movie.release_date }}</li>
        <li><strong>Бюджет:</strong> ${{ formatNumber(movie.budget) }}</li>
        <li><strong>Касові збори:</strong> ${{ formatNumber(movie.revenue) }}</li>
        <li><strong>Рейтинг:</strong> {{ movie.vote_average }} ({{ movie.vote_count }} голосів)</li>
        <li><strong>Статус:</strong> {{ movie.status }}</li>
      </ul>

      <div class="overview">
        <h2>Опис</h2>
        <p>{{ movie.overview }}</p>
      </div>

      <div class="production">
        <h2>Виробництво</h2>
        <ul>
          <li
            v-for="company in movie.production_companies"
            :key="company.id"
          >
            <img
              v-if="company.logo_path"
              :src="imageUrl(company.logo_path)"
              :alt="company.name"
              class="logo"
            >
            <span>{{ company.name }} ({{ company.origin_country }})</span>
          </li>
        </ul>
      </div>

      <a
        :href="movie.homepage"
        target="_blank"
        class="homepage"
      >Офіційний сайт</a>
    </div>
    <div class="movie__poster">
      <div>
        <img
          :src="imageUrl(movie.poster_path)"
          :alt="movie.title"
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  movie: {
    type: Object,
    default: () => ({})
  }
})

const genres = computed(() => props.movie.genres.map(g => g.name).join(', '))

const imageUrl = path => path ? `https://image.tmdb.org/t/p/w500${path}` : ''

const formatNumber = num => num.toLocaleString('en-US')
</script>

<style scoped>
.movie {
  font-family: 'Segoe UI', sans-serif;
  color: #222;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.info {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
}
.info li {
  margin: 0.3rem 0;
}
.overview {
  margin-top: 1.5rem;
}
.production ul {
  list-style: none;
  padding: 0;
}
.logo {
  height: 24px;
  vertical-align: middle;
  margin-right: 8px;
}
.homepage {
  font-size: 20px;
  font-weight: 500;
  display: inline-block;
  margin-top: 1rem;
  text-decoration: none;
  color: #00307c;
  transition: 0.3s;
}

.homepage:hover {
  color: #0054c1;
}
</style>
