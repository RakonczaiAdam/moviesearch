import {gql} from 'apollo-boost';

const MOVIE =gql
        `query getMovie($movie_id: Int!){
            getMovie(movie_id: $movie_id){
              imdb_id
            }
          }`

export default MOVIE;