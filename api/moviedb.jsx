import { AUTHORIZATION } from "@env"

import axios from "axios"

//static endpoints
const API_BASE_URL = "https://api.themoviedb.org/3"
const trendingMoviesEndpoint = `${API_BASE_URL}/trending/movie/day`
const upcomingMoviesEndpoint = `${API_BASE_URL}/movie/upcoming`
const topRatedMoviesEndpoint = `${API_BASE_URL}/movie/top_rated`
const searchMoviesEndpoint = `${API_BASE_URL}/search/movie`

//dynamic endpoints
const movieDetailsEndpoint = (id) => `${API_BASE_URL}/movie/${id}`
const movieCreditsEndpoint = (id) => `${API_BASE_URL}/movie/${id}/credits`
const similarMoviesEndpoint = (id) => `${API_BASE_URL}/movie/${id}/similar`
const personDetailsEndpoint = (id) => `${API_BASE_URL}/person/${id}`
const personMoviesEndpoint = (id) =>
  `${API_BASE_URL}/person/${id}/movie_credits`

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
    headers: {
      accept: "application/json",
      Authorization: AUTHORIZATION,
    },
  }
  try {
    const res = await axios(options)
    return res.data
  } catch (err) {
    console.log(`api error: ${err}`)
    return {}
  }
}

export const fetchTrendingMovies = () => {
  console.log(trendingMoviesEndpoint)
  return apiCall(trendingMoviesEndpoint)
}
export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndpoint)
}
export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndpoint)
}

export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailsEndpoint(id))
}
export const fetchMovieCredits = (id) => {
  return apiCall(movieCreditsEndpoint(id))
}
export const fetchSimilarMovies = (id) => {
  return apiCall(similarMoviesEndpoint(id))
}
export const fetchPersonDetails = (id) => {
  return apiCall(personDetailsEndpoint(id))
}
export const fetchPersonMovies = (id) => {
  return apiCall(personMoviesEndpoint(id))
}
export const searchMovies = (query) => {
  return apiCall(searchMoviesEndpoint, query)
}
