import { ListItem, ListItemText } from '@material-ui/core';
import {Component} from 'react';
import '../css/Movie.css';
import Description from './Description';

class Movie extends Component{

    constructor(props){
        super(props);
        this.state= {
            clicked: false
        };
    }

    clickHandler = ()=>{
        this.setState({clicked: !this.state.clicked});
    }

    render(){
        const {clicked} = this.state;
        return(
            <div>
                <ListItem button divider className="item" onClick={this.clickHandler}>
                    <ListItemText
                        className="text"
                        primary={this.props.title}
                        secondary={this.props.release_date+", Language: "+this.props.original_language}/>
                </ListItem>
                {clicked &&
                    <Description
                    title={this.props.title}
                    id={this.props.id}
                    relatedHandler={this.props.relatedHandler}/>
                }
            </div>

        )
    }
}

export default Movie;