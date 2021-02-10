import {gql} from 'apollo-boost';

const SIMILAR_MOVIE =gql
        `query getSimilarMovies($movie_id:Int!, $page: Int!){
            getSimilarMovies(movie_id: $movie_id, page: $page){
              results{
                id
                title
                release_date
                original_language
              }
            }
          }`

export default SIMILAR_MOVIE;