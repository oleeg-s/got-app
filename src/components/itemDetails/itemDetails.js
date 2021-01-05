import React, {Component} from 'react';
import GotService from '../../services/gotService';
import Spinner from '../spinner/spinner';
import Error from '../error/error';
import './charDetails.css';

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>   
    )
}

export {
    Field
}


export default class ItemDetails extends Component {

    gotService = new GotService();

    state = {
        item: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    onItemDetailsLoaded = (item) => {
        this.setState({
            item,
            loading: false
        })
    }

    updateItem() {
        const {itemId, getData} = this.props;
        if (!itemId) {
            return;
        }

        this.setState({
            loading: true
        })

        getData(itemId)
            .then(this.onItemDetailsLoaded)
            .catch(() => {this.onError()})
    }

    onError() {
        this.setState({
            item: null,
            error: true
        })
    }

    render() {

        if(!this.state.loading && this.state.error) {
            return <Error/>
        } else if (!this.state.item) {
            return <span className='select-error'>Please select item in the list</span>
        }

        
        if (this.state.loading) {
            return (
                <div className="char-details rounded">
                    <Spinner/>
                </div>
            )
        }

        const {name} = this.state.item;
        const {item} = this.state;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </div>
        );
    }
}