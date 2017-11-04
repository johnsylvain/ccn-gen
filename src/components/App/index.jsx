import React, { Component } from 'react';
import faker from 'faker/locale/en';

import CreditCard from '../CreditCard';
// import Button from './Button';

import './App.scss';

class App extends Component {
  constructor() {
    super();

    this.state = {
      cardType: 'VISA',
      cardDetails: {
        ccn: null,
        exp: null,
        cvc: null,
        name: null
      }
    }
  }

  _generateCard(type) {
    this.setState({
      cardDetails: {
        name: faker.name.findName()
      }
    })
  }

  componentWillMount() {
    this._generateCard(this.state.cardType);
  }

  render() {
    return <div className="App">
      <CreditCard type={this.state.cardType} details={this.state.cardDetails} />
    </div>
  }
}

export default App;