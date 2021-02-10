import React, {Component} from 'react' ;
import {Query} from 'react-apollo';
import Movie from './Movie';
import { List } from '@material-ui/core';
import Spinner from './Spinner';

class MovieList extends Component{

    render(){
        return (
        <div>
            <Query query={this.props.query} variables={
                {
                    "smq":{
                        "query": this.props.title
                    },
                    "movie_id": parseInt(this.props.movie_id),
                    "page": 1
                }
            }>
                {
                    ({loading, error, data})=>{
                        if(loading){
                            return(<Spinner/>)
                        }
                        if(error != null){
                            return(<div>{error.toString()}</div>)
                        }else{
                            if(this.props.movie_id === -1){
                                return(
                                    <List>{data.searchMovie.results.map(result=>(
                                        <Movie
                                            key={result.id}
                                            id={result.id}
                                            title={result.title}
                                            release_date={result.release_date}
                                            original_language={result.original_language}
                                            relatedHandler={this.props.relatedHandler}
                                            />
                                    ))}</List>
                                )
                            }else{
                                return(
                                    <List>{data.getSimilarMovies.results.map(result=>(
                                        <Movie
                                            key={result.id}
                                            id={result.id}
                                            title={result.title}
                                            release_date={result.release_date}
                                            original_language={result.original_language}
                                            relatedHandler={this.props.relatedHandler}
                                            />
                                    ))}</List>
                                )
                            }
                        }
                    }
                }
            </Query>
        </div>
        );
    }
  }

export default MovieList;
