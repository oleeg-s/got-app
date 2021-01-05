import React, {Component} from 'react';
import ItemList from '../itemList/itemList';
import Error from '../error/error';
import GotService from '../../services/gotService';
import {withRouter} from 'react-router-dom';


class BooksPage extends Component {

    gotService = new GotService();

    state = {
        error: false
    }


    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {

        if (this.state.error) {
            return <Error/>
        }


        return (
            <ItemList 
                onItemSelected={(itemId) => {
                    this.props.history.push(itemId);
                }}
                getData={this.gotService.getAllBooks}
                renderItem={(item) => item.name}/>
        )
    }
}

export default withRouter(BooksPage);