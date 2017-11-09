import React, { Component } from 'react';
import faker from 'faker/locale/en';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Notification } from 'react-notification';

import CreditCard from '../CreditCard';
import { ccngen, cvvgen } from '../../utils/ccnGenerator';
import Button from '../Button';

import './App.scss';

class App extends Component {
  constructor() {
    super();

    this.state = {
      notification: {
        showing: false,
        title: ''
      },
      cardType: 'Visa',
      cardDetails: {
        ccn: null,
        exp: null,
        cvv: null,
        name: null
      }
    }

    this._generateCard = this._generateCard.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._handleCopy = this._handleCopy.bind(this);
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

  _handleCopy(type) {
    this.setState({
      notification: {
        showing: true,
        title: `Copied ${type}!`
      }
    })
  }

  componentWillMount() {
    this._generateCard(this.state.cardType);
  }

  render() {
    return <div className="container">
      <Notification 
        isActive={this.state.notification.showing}
        message={this.state.notification.title}
        barStyle={{
          fontSize: '11px',
          opacity: 0.8
        }}
        onDismiss={() => this.setState({ 
          notification: { showing: false } 
        })}
        onClick={() => this.setState({ 
          notification: { showing: false } 
        })}
      />
      <div className="App">
        <div className="App__body">
          <div className="App__CC">
            <CreditCard type={this.state.cardType} details={this.state.cardDetails} />
          </div>
          <div className="App__sidebar">
            <h3>Credit Card Number</h3>
            <CopyToClipboard text={this.state.cardDetails.ccn.replace(/ /g, '')} onCopy={this._handleCopy.bind(this, 'Credit Card Number')}>
              <pre>{this.state.cardDetails.ccn.replace(/ /g, '')}</pre>
            </CopyToClipboard>
            <h3>Card Holder</h3>
            <CopyToClipboard text={this.state.cardDetails.name} onCopy={this._handleCopy.bind(this, 'Card Holder')}>
              <pre>{this.state.cardDetails.name}</pre>
            </CopyToClipboard>
            <h3>Expiration Date</h3>
            <CopyToClipboard text={this.state.cardDetails.exp} onCopy={this._handleCopy.bind(this, 'Expiration Date')}>
              <pre>{this.state.cardDetails.exp}</pre>          
            </CopyToClipboard>
            <h3>CCV</h3>
            <CopyToClipboard text={this.state.cardDetails.cvv} onCopy={this._handleCopy.bind(this, 'CVV')}>
              <pre>{this.state.cardDetails.cvv}</pre>          
            </CopyToClipboard>
          </div>
        </div>
        <div className="App__footer">
          <Button value="Generate Visa" onClick={this._handleClick('Visa')}/>
          <Button value="Generate Mastercard" onClick={this._handleClick('Mastercard')}/>
          <Button value="Generate American Express" onClick={this._handleClick('amex')}/>
        </div>
      </div>
    </div>
  }
}

export default App;