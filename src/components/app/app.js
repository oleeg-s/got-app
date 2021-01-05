import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header/header';
import RandomChar from '../randomChar';
import Error from '../error/error';
import GotService from '../../services/gotService';
import CharacterPage from '../pages/characterPage';
import BooksPage from '../pages/booksPage';
import HousesPage from '../pages/housesPage';
import BooksItem from '../pages/booksItem';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './app.css';

const style = {
    height: 60,
    width: 200,
    color: 'white',
    background: 'darkblue',
    borderRadius: '3px',
    outline: 'none',
    borderStyle: 'none',
    marginBottom: '15px'
}

export default class App extends Component  {

    gotService = new GotService();

    state = {
        showRandom: true,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandom: !state.showRandom
            }
        })
    }

    render() {
        const {showRandom} = this.state;

        const randomChar = showRandom ? <RandomChar/> : null;

        if (this.state.error) {
            return <Error/>
        }

        return (
            <Router>
                <div className='app'> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {randomChar}
                                <button type="button" 
                                        onClick={this.toggleRandomChar}
                                        style={style}>toggle randomChar</button>
                            </Col>
                        </Row>

                        <Route path='/'/>
                        <Route path='/characters' component={CharacterPage}/>
                        <Route path='/houses' component={HousesPage}/>
                        <Route path='/books' exact component={BooksPage}/>
                        <Route path='/books/:id' render={({match}) => {
                            const {id} = match.params;
                            return <BooksItem bookId={id}/>
                        }}/>

                    </Container>
                </div>
            </Router>
        );
    }
};

