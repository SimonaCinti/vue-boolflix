/*           **
**           **
**  Boolflix **
**           **
**           */


//TODO: Milestone 1: 
//TODO: - searchbar - print a schermo dei film con i seguenti valori: 1) Titolo 2) Titolo Originale 3) Lingua 4) Voto 

var app = new Vue({
    el: '#app',
    data: {
        // Data raccolti
        searchInput: '',
        // Array of movies
        movies: [],
    }, // end Data
    methods:{
        getResult(){
            axios.get('https://api.themoviedb.org/3/search/movie',{
                params: {
                    api_key: '8ee3ad03988875233a1bddc1e4e8ff76',
                    query: 'ritorno al futuro'
                }
            })
                .then(response => {
                    // handle success
                    console.log(response.data.results);
                    return this.movies = response.data.results
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        }
    }
})