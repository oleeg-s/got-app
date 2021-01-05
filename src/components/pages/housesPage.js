import React, {Component} from 'react';
import ItemList from '../itemList/itemList';
import ItemDetails, {Field} from '../itemDetails/itemDetails';
import Error from '../error/error';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock/rowBlock';

export default class HousesPage extends Component {

    gotService = new GotService();

    state = {
        selectedHouse: null,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedHouse: id,
            error: false
        })
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

        const itemList = (
            <ItemList 
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllHouses}
                renderItem={(item) => item.name}/>
        )


        const itemDetails = (
            <ItemDetails 
                itemId={this.state.selectedHouse}
                getData={this.gotService.getHouse}>
                <Field field='region' label='Region'/>
                <Field field='words' label='Words'/>
                <Field field='titles' label='Titles'/>
                <Field field='ancestralWeapons' label='Ancestral Weapons'/>
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={itemDetails}/>
        )
    }
}

// const {getAllHouses} = new GotService();
// withData(ItemList, getAllHouses);
