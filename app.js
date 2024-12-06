


    const API_URL = 'https:api.themoviedb.org/4/discover/movie?sort_by=popularity.desc&api_key=74364953fe3d4e9ed00c72f0fbf3eee3&page=1'
    const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
    const SEARCH_API =
      'https://api.themoviedb.org/4/search/movie?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDM2NDk1M2ZlM2Q0ZTllZDAwYzcyZjBmYmYzZWVlMyIsIm5iZiI6MTczMzUxOTI0Ny4zNzksInN1YiI6IjY3NTM2NzhmMzdmMTg1NjIwMjA4YTZkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6EEu4UNu7ZhPcXaSyTCZM6j-ylwzPNNf_tB0vITD_kA="'
    
    const form = document.getElementById('form')
    const search = document.getElementById('search')
    const main = document.getElementById('main')
    
    getMovies(API_URL)
    
    async function getMovies(url) {
      const res = await fetch(url)
      const data = await res.json()
    
      showMovies(data.results)
    }
    
    form.addEventListener('submit', (e) => {
      e.preventDefault()
    
      const searchTerm = search.value
    
      if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)
    
        search.value = ''
      } else {
        window.location.reload()
      }
    })
    
    function showMovies(movies) {
      main.innerHTML = ''
    
      movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie
    
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
    
        movieEl.innerHTML = `
        
        <img
        src="${IMG_PATH + poster_path}" alt="${title}"
      />
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3> ${title}  <small> Overview </small> </h3>
        <p>
         ${overview}
        </p>
      </div>
    
        `
    
        main.appendChild(movieEl)
      })
    }
    
    function getClassByRate(vote) {
      if (vote >= 8) {
        return 'green'
      } else if (vote >= 5) {
        return 'orange'
      } else {
        return 'red'
      }
    }


