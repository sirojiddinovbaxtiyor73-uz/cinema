let API_key = 'dcea1fd7b3e65d34387ad6de7ef9cc5e'
let tokenTop = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_key}`
let tokenpopular = `https://api.themoviedb.org/3/movie/popular?api_key=${API_key}`
let tokenupcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_key}`
let tokensearch = `https://api.themoviedb.org/3/search/movie?api_key=${API_key}`

let append = document.querySelector('.append')
let btns = document.querySelectorAll('.btns')
let search = document.getElementById('search')
let min = document.getElementById("min")
let max = document.getElementById('max')
let score = document.getElementById('score')
let btn = document.querySelector(".btn")
let prev = document.querySelector(".prev")
let next = document.querySelector(".next")
let pageText = document.querySelector(".title")

let url = tokenTop
let page = 1

function getmovies() {
    fetch(url + '&page=' + page)
        .then(res => {
            console.log(res);
            
            return res.json()
        })
        .then(data => {
            console.log(data);
            console.log(data.results)
            showMovies(data.results)
        })
    pageText.innerHTML = page
} 

function showMovies(movies) {
    append.innerHTML = ''
    for (let i = 0; i < movies.length; i++) {
        let movie = movies[i]
        let year = Number(movie.release_date.slice(0, 4))
        if (min.value != '' && year < min.value) {
            continue
        }
        if (max.value != '' && year > max.value) {
            continue
        }
        if (score.value != '' && movie.vote_average < score.value) {
            continue
        }
        append.innerHTML += `
            <div class="movie">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <span class="orange">${movie.vote_average}</span>
                </div>
                <span class="date">${movie.release_date}</span>
                <div class="overview">${movie.overview}</div>
            </div>
        `

    }
}

for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function () {
        if (btns[i].value == 'top_rated') {
            url = tokenTop
        }
        if (btns[i].value == 'popular') {
            url = tokenpopular
        }
        if (btns[i].value == 'upcoming') {
            url = tokenupcoming
        }
        page = 1
        search.value = ''
        getmovies()
    })
}
btn.addEventListener('click', function () {
    if (search.value != '') {
        url = tokensearch + '&query=' + search.value
    }
    page = 1
    getmovies()
})
next.addEventListener('click', function () {
    page++
    getmovies()
})
prev.addEventListener('click', function () {
    page--
    getmovies()
})

getmovies()