import React, { Component } from 'react';
import faker from 'faker/locale/en';

import CreditCard from '../CreditCard';
import { ccngen, cvvgen } from '../../utils/ccnGenerator';
import Button from '../Button';

import './App.scss';

class App extends Component {
  constructor() {
    super();

    this.state = {
      cardType: 'VISA',
      cardDetails: {
        ccn: null,
        exp: null,
        cvv: null,
        name: null
      }
    }

    this._generateCard = this._generateCard.bind(this);
    this._handleClick = this._handleClick.bind(this);
  }

  _generateCard(type) {
    const formatDate = (str) => {
      let d = new Date(str);
      return `${('0' + (d.getMonth() + 1)).slice(-2)} / ${d.getFullYear().toString().slice(-2)}`;
    }

    this.setState({
      cardType: type,
      cardDetails: {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        ccn: ccngen(type),
        cvv: cvvgen(type),
        exp: formatDate(faker.date.future(5))
      }
    })
  }

  _handleClick(type) {
    return () => {
      this._generateCard(type);
    }
  }

  componentWillMount() {
    this._generateCard(this.state.cardType);
  }

  render() {
    return <div className="App">
      <div className="App__body">
        <div className="App__CC">
          <CreditCard type={this.state.cardType} details={this.state.cardDetails} />
        </div>
        <div className="App__sidebar">
          <h3>Credit Card Number</h3>
          <pre>{this.state.cardDetails.ccn}</pre>
          <h3>Expiration Date</h3>
          <pre>{this.state.cardDetails.exp}</pre>          
          <h3>CCV</h3>
          <pre>{this.state.cardDetails.cvv}</pre>          
        </div>
      </div>
      <div className="App__footer">
        <Button value="Generate Visa" onClick={this._handleClick('VISA')}/>
        <Button value="Generate Mastercard" onClick={this._handleClick('Mastercard')}/>
        <Button value="Generate American Express" onClick={this._handleClick('American Express')}/>
      </div>
    </div>
  }
}

export default App;