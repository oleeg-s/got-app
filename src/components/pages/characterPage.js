import React, {Component} from 'react';
import ItemList from '../itemList/itemList';
import ItemDetails, {Field} from '../itemDetails/itemDetails';
import Error from '../error/error';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock/rowBlock';

export default class CharacterPage extends Component {

    gotService = new GotService();

    state = {
        selectedChar: 130,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedChar: id,
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
                getData={this.gotService.getAllCharacters}
                renderItem={({name, gender}) => `${name} (${gender})`}/>
        )

        const itemDetails = (
            <ItemDetails 
                itemId={this.state.selectedChar}
                getData={this.gotService.getCharacter}>
                <Field field='gender' label='Gender'/>
                <Field field='born' label='Born'/>
                <Field field='died' label='Died'/>
                <Field field='culture' label='Culture'/>
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={itemDetails}/>
        )
    }
}
