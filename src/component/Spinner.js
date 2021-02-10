import { CircularProgress } from '@material-ui/core';
import {Component} from 'react';
import "../css/Spinner.css";

class Spinner extends Component{
    render(){
        return(
            <div className="spinner">
                <CircularProgress className="spinner"/>
                <p>Loading</p>
            </div>
        )
    }
}

export default Spinner;