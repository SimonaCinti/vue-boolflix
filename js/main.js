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
        // Hard copy movies - searched
        copyMovies: [],
        // Arrays of Tv Series
        series: [],
        // Hard copy  series - searched
        copySeries: [],
        // available Flags
        availableFlags: ['it','en'],
        // selected Genre
        selectedGenreM: 'all',
        selectedGenreS: 'all',
        // all genres for movies
        allGenMovies: [],
        // all genres for tv series
        allGenSeries: [],
        // empty result filter
        resultMovies: false,
        resultSeries: false,
    }, // end Data
    methods:{
        /**
         * Get result from searchbar
         */
        getResult(){
            // Call database
            this.getMovie();
            this.getSeries();
            this.getGenreMovie();
            this.getGenreSerie();
           
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
                    this.copyMovies = response.data.results
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
                    this.copySeries = response.data.results;
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
        /**
         *  Get All Genres Movies
         */
        getGenreMovie() {
            axios.get('https://api.themoviedb.org/3/genre/movie/list', {
                params: {
                    api_key: '8ee3ad03988875233a1bddc1e4e8ff76',}              
            })
                .then(response => {
                    // Return series
                    this.allGenMovies = response.data.genres;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        },

        /**
         * Get all Genre Tv Show
         */

        getGenreSerie() {
            axios.get('https://api.themoviedb.org/3/genre/tv/list', {
                params: {
                    api_key: '8ee3ad03988875233a1bddc1e4e8ff76',
                }

            })
                .then(response => {
                    // Return series
                    this.allGenSeries = response.data.genres;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        },
        /**
         * Select genre filter for movies
         */
        filterMovies(){
            // reset array for filter
            this.movies = this.copyMovies
            // check genre
                if (this.selectedGenreM !== 'all')
                {                  
                this.movies = this.movies.filter(
                    (movie) => {
                         if (movie.genre_ids.includes(this.selectedGenreM))
                         return movie
                    }
                    )
                } 
                else {
                    this.movies = this.copyMovies;
                } 
                // check if there are movies for the genre
                this.resultMovies = (this.movies.length ===0) ? true : false ;
                //return result
                return this.movies;
            
        },
        /**
         * Select genre filter for Tv Series
         */
        
        filterSeries() {
            // reset array for search
            this.series = this.copySeries
            // check genre
            if (this.selectedGenreS !== 'all') {
                this.series = this.series.filter(
                    (serie) => {
                        if (serie.genre_ids.includes(this.selectedGenreS))
                            return serie
                    }
                )
            } else { this.series = this.copySeries; }
            // check if there are movies for the genre
            this.resultSeries = (this.series.length === 0) ? true : false;
            //return result
            return this.series;
        },
    } 
})