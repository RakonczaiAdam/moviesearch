import {Component} from 'react';
import MOVIE from '../query/MovieQuery';
import Spinner from './Spinner';
import { Query } from 'react-apollo';
import { Box, Button } from '@material-ui/core';
import '../css/Description.css';

class Description extends Component{

    constructor(props){
        super(props);
        this.state ={
            wikiData: null,
            wikiUrl: null
        }
    }

    componentDidMount(){
        this.wikiRequest();
    }

    wikiRequest = async ()=>{
        const search = this.props.title.replace(" ", "%20");
        const url =
            "https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=info|extracts&format=json&exintro=&inprop=url&titles="+search;
        const response = await fetch(url);
        const jsonContent = await response.json();
        console.log(jsonContent);
        const pages = jsonContent.query.pages;
        const pageIds = Object.keys(pages);
        const firstPageId = pageIds.length ? pageIds[0] : null;
        this.setState({
                wikiData: pages[firstPageId].extract,
                wikiUrl: pages[firstPageId].fullurl
            }
        );
    }

    relatedHandler = ()=>{
        this.props.relatedHandler(this.props.id);
    }

    render(){
        const {wikiData, wikiUrl} = this.state
        return(
            <Box className="data">
                <div dangerouslySetInnerHTML={{__html: wikiData}}></div>
                Wiki link: <a href={wikiUrl} 
                target="_blank" rel="noreferrer">{" "+this.props.title}</a>
                                   
                <Query query={MOVIE} variables={
                    {
                        "movie_id": parseInt(this.props.id)
                    }
                }>
                {
                    ({loading, error, data})=>{
                        if(loading){
                            return(<Spinner/>)
                        }
                        if(error != null){
                            const imdb_id = error.toString().split('"')[1];
                            return(
                                <div>
                                    IMDB link: <a href={"https://www.imdb.com/title/"+imdb_id} 
                                    target="_blank" rel="noreferrer">{" "+this.props.title}</a>
                                    <br/>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="secondary"
                                        onClick={this.relatedHandler}
                                    >Related</Button>
                                </div>
                            )
                        }else{
                            return(
                                <div>
                                    <a href={"https://www.imdb.com/title/"+data.getMovie.imdb_id}
                                    target="_blank" rel="noreferrer">{" "+this.props.title}</a>
                                    <br/>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="secondary"
                                        onClick={this.relatedHandler}
                                    >Related</Button>
                                </div>
                                
                            )
                        }
                    }
                }
            </Query>
        </Box>
        )
    }
}

export default Description;