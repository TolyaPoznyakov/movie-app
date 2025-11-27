<template>
  <div class="movie-card" @click="emit('click')">
    <div class="movie-card-inner">
      <div class="movie-card-front">
        <img :src="posterUrl" :alt="movie.title">
      </div>
      <div class="movie-card-back">
        <div class="content">
          <h3>{{ movie.title }} ({{ releaseYear }})</h3>
          <p class="details">
            Genres: {{ genreNames.join(', ') }} | Rating: ⭐ {{ movie.vote_average }}
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

const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Abenteuer" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Komödie" },
  { id: 80, name: "Krimi" },
  { id: 99, name: "Dokumentarfilm" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Familie" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "Historie" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Musik" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Liebesfilm" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV-Film" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "Kriegsfilm" },
  { id: 37, name: "Western" }
]

const genreNames = computed(() =>
  (props.movie.genre_ids || [])
    .map(id => genres.find(g => g.id === id)?.name)
    .filter(Boolean)
)


const posterUrl = `https://image.tmdb.org/t/p/w342${props.movie.poster_path}`
const releaseYear = (props.movie.release_date || props.movie.first_air_date)?.split("-")[0] || ''

const emit = defineEmits(['click'])

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
  cursor: pointer;
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
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;

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
  box-sizing: border-box;
  text-align: center;
}

</style>
