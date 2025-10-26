<template>
  <div class="movie-card">
    <div class="movie-card-inner">
      <div class="movie-card-front">
        <img :src="posterUrl" :alt="movie.title" />
      </div>
      <div class="movie-card-back">
        <div class="content">
          <h2>{{ movie.title }} ({{ releaseYear }})</h2>
          <p class="details">
            Genres: Romance, Drama | Rating: ⭐ {{ movie.vote_average }}
          </p>
          <p class="overview">{{ movie.overview }}</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
const props = defineProps({
  movie: {
    type: Object,
    default: () => ({})
  }
})


const posterUrl = `https://image.tmdb.org/t/p/w342${props.movie.poster_path}`;
const releaseYear = props.movie.release_date.split("-")[0];
</script>


<style scoped>
.movie-card {
  background: #1e1e1e;
  border-radius: 1rem;
  overflow: hidden;
  max-width: 250px;
  color: white;
  aspect-ratio: 2 / 3;
  perspective: 1000px;
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

.movie-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.movie-card:hover .movie-card-inner {
  transform: rotateY(180deg);
}

/* FRONT & BACK */
.movie-card-front,
.movie-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
}

/* FRONT */
.movie-card-front img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* BACK */
.movie-card-back {
  background: #1e1e1e;
  color: #fff;
  transform: rotateY(180deg);
  padding: 16px;
  box-sizing: border-box;
  text-align: center;
}

</style>
