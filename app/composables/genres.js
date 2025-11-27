export const useMovieGenres = () => {
  const fetchGenres = async () => {
    const res = await useApiRequest('/genre/movie/list', {
      query: {
        language: 'uk'
      }
    })
    return res.data.value?.genres
  }
  return {
    fetchGenres
  }
}

export const useTvSeriesGenres = () => {
  const fetchGenres = async () => {
    const res = await useApiRequest('/genre/tv/list', {
      query: {
        language: 'uk'
      }
    })
    return res.data.value?.genres
  }
  return {
    fetchGenres
  }
}
