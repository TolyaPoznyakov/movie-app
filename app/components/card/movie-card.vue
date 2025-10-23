<template>
  <div class="movie-card">
    <img :src="posterUrl" :alt="movie.title" />
    <div class="content">
      <h2>{{ movie.title }} ({{ releaseYear }})</h2>
      <p class="details">
        Genres: Romance, Drama | Rating: ⭐ {{ movie.vote_average }}
      </p>
      <p class="overview">{{ movie.overview }}</p>
    </div>
  </div>
</template>

<script setup>
const movie = {
  // id: null,
  title: "Our Fault",
  release_date: "2025-10-15",
  vote_average: 8.191,
  // genres_ids: [ 10749, 18 ],
  // adult: false,
  overview:
      "Jenna and Lion's wedding brings about the long-awaited reunion between Noah and Nick...",
  poster_path: "/yzqHt4m1SeY9FbPrfZ0C2Hi9x1s.jpg",
};

const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
const releaseYear = movie.release_date.split("-")[0];
</script>


<style scoped>
.movie-card {
  background: #1e1e1e;
  border-radius: 1rem;
  overflow: hidden;
  max-width: 350px;
  color: white;
}
img {
  width: 100%;
}
.content {
  padding: 1rem;
}
.overview {
  color: #ccc;
  font-size: 0.95rem;
}
</style>
