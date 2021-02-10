import './css/App.css';
import React, {Component} from 'react' ;
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import MovieList from './component/MovieList';
import { Button } from '@material-ui/core';
import MOVIE_LIST from './query/MovieListQuery';
import SIMILAR_MOVIE from './query/SimilarMovieQuery';

const client = new ApolloClient({uri: 'https://tmdb.apexlab.io/graphql'});

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      title : "",
      showQuery : false,
      query: MOVIE_LIST,
      movie_id: -1
    };
  }

  titleChangeHandler = (e)=>{
      this.setState({title : e.target.value});
      this.setState({showQuery : false});
  }

  submitHandler = (e)=>{
      this.setState({
        query : MOVIE_LIST,
        movie_id: -1,
        showQuery : true
      });
  }

  relatedHandler = (id)=>{
    this.setState({
      query: SIMILAR_MOVIE,
      movie_id: id,
      showQuery: true
    });
  }

  render(){
      const {showQuery, title, query, movie_id} = this.state;
      return (
        <div className="App">
          <header className="App-header">
            <h1>Movie searcher</h1>
            <input onChange={this.titleChangeHandler} className="textfield"/>
            <Button 
              onClick={this.submitHandler} 
              size="small"
              variant="contained"
              color="primary"
              >Search</Button>
          </header>
          <div>
          </div>
          {showQuery && 
          <ApolloProvider client={client}>
            <MovieList 
            title={title}
            query={query}
            movie_id={movie_id}
            relatedHandler = {this.relatedHandler}/>
          </ApolloProvider>}
        </div>
      );
    }
  }


export default App;
