import React, { Component } from 'react';
import faker from 'faker/locale/en';

import CreditCard from '../CreditCard';
import { ccngen } from '../../utils/ccnGenerator';
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
        ccv: null,
        name: null
      }
    }
  }

  _generateCard(type) {
    this.setState({
      cardDetails: {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        ccn: ccngen(type)
      }
    })
  }

  componentWillMount() {
    this._generateCard(this.state.cardType);
  }

  render() {
    return <div className="App">
      <div className="App__CC">
        <CreditCard type={this.state.cardType} details={this.state.cardDetails} />
      </div>
      <div className="App__body">
        <h3>Credit Card Number</h3>
        <h3>Expiration Date</h3>
        <h3>CCV</h3>
      </div>
    </div>
  }
}

export default App;