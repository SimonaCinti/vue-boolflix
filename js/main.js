/*           **
**           **
**  Boolflix **
**           **
**           */


//TODO: Milestone 3: aggiungere la copertina del film o della serie agli elenchi

var app = new Vue({
    el: '#app',
    data: {
        // Data raccolti
        searchInput: '',
        // Array of movies
        movies: [],
        // Arrays of Tv Series
        series: [],
        // available Flags
        availableFlags: ['it','en'],
        // selected Genre
        selectedGenre: 'all',
        // available genre
        movieGenre: [],
        // all genres
        allGenres: [
            { "id": 28, "name": "Action" },
            { "id": 12, "name": "Adventure" }, 
            { "id": 16, "name": "Animation" }, 
            { "id": 35, "name": "Comedy" }, 
            { "id": 80, "name": "Crime" }, 
            { "id": 99, "name": "Documentary" }, 
            { "id": 18, "name": "Drama" }, 
            { "id": 10751, "name": "Family" }, 
            { "id": 14, "name": "Fantasy" }, 
            { "id": 36, "name": "History" }, 
            { "id": 27, "name": "Horror" }, 
            { "id": 10402, "name": "Music" }, 
            { "id": 9648, "name": "Mystery" }, 
            { "id": 10749, "name": "Romance" }, 
            { "id": 878, "name": "Science Fiction" }, 
            { "id": 10770, "name": "TV Movie" }, 
            { "id": 53, "name": "Thriller" }, 
            { "id": 10752, "name": "War" }, 
            { "id": 37, "name": "Western" }]
    }, // end Data
    methods:{
        /**
         * Get result from searchbar
         */
        getResult(){
            // Call database
            this.getMovie();
            this.getSeries();
           
            // Clear Searchbar
            this.searchInput= '';  
        },

        /** 
         * Get Movie 
         */
        getMovie(){
            axios.get('https://api.themoviedb.org/3/search/movie', {
                params: {
                    api_key: '8ee3ad03988875233a1bddc1e4e8ff76',
                    query: this.searchInput,
                    language: 'it-IT'
                }
            })
                .then(response => {
                    // Return movies
                    this.movies = response.data.results;
                    //Copy genre available
                    this.movies.forEach((movie)=>{
                        if (!this.movieGenre.includes(movie.genre_ids) && (movie.genre_ids.length !== 0 )){
                            this.movieGenre.push(movie.genre_ids);
                        }
                    })
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        },

        /**
         * Get Tv-Series
        */
        getSeries(){
            axios.get('https://api.themoviedb.org/3/search/tv', {
                params: {
                    api_key: '8ee3ad03988875233a1bddc1e4e8ff76',
                    query: this.searchInput,
                    language: 'it-IT'
                }
            })
                .then(response => {
                    // Return series
                    this.series = response.data.results;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        },
        /**
         * Get Vote
         */
        getVote(value) {
            return Math.ceil(value / 2)
        },
        /**
         * Check lang
         */
        isLangFlag(lang){
            return this.availableFlags.includes(lang)
        },
        /**
         * Get flag img
         */
        getFlag(lang){
            return `./img/${lang}.png`
        },

        /**
         * Get poster image
         */
        getPoster(poster){
            return `https://image.tmdb.org/t/p/w342/${poster}`
        },

    }
})