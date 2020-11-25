/*           **
**           **
**  Boolflix **
**           **
**           */


//TODO: Milestone 2: 1- trasforma il voto da 1 a 10 in un intero da 1 a 5 arrotondando per eccesso. 
//TODO: 2- trasforma la stringa statica della lingua in una delle due bandiere png e gestendo il caso in cui non c'è la bandiera della nazione ritornata

var app = new Vue({
    el: '#app',
    data: {
        // Data raccolti
        searchInput: '',
        // Array of movies
        movies: [],
        //Vote
        vote: 0,
    }, // end Data
    methods:{
        /**
         * Get result from searchbar
         */
        getResult(){
            axios.get('https://api.themoviedb.org/3/search/movie',{
                params: {
                    api_key: '8ee3ad03988875233a1bddc1e4e8ff76',
                    query: this.searchInput,
                    language: 'it-IT'
                }
            })
                .then(response => {
                    // Return movies
                    this.movies = response.data.results; 
                    // Return vote for a number upward to its nearest integer:
                    response.data.results.forEach((vote) => {  
                        return this.vote = Math.ceil(vote.vote_average);
                    })
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
            // Clear Searchbar
            this.searchInput= '';  
        }
        
    }
})