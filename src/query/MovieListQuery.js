import {gql} from 'apollo-boost';

const MOVIE_LIST =gql
        `query searchMovie($smq: SearchMovieQuery){
            searchMovie(query: $smq){
              results{
                id
                title
                release_date
                original_language
              }
            }
          }`

export default MOVIE_LIST;