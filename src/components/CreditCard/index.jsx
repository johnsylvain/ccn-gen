import React from 'react';

import './CreditCard.scss';

const ccLogo = (type) => {
  if (type === 'Visa') {
    return <i className="fa fa-cc-visa"></i>
  } else if (type === 'Mastercard') {
    return <i className="fa fa-cc-mastercard"></i>    
  } else if (type === 'amex') {
    return <i className="fa fa-cc-amex"></i>
  }
}

const formatCCN = (ccn) => {
  let formatted = [];

  for (let i = 0; i < 4; i++) {
    formatted.push(ccn.slice(4 * i, 4 * i + 4).join(''));
  }

  return formatted.join(' ');
}

const CreditCard = ({ details, type }) => 
  <div className="CreditCard">
    <div className="CreditCard__header">
      <div>
        <div className="CreditCard__chip"></div>
      </div>
      <div className="CreditCard__header--right">
        {ccLogo(type)}
      </div>
    </div>
    <div className="CreditCard__ccn">
      {details.ccn}
    </div>
    <div className="CreditCard__details">
      <div>
        <span className="title">Card Holder</span>
        <span className="value">{details.name}</span>
      </div>
      <div className="CreditCard__details--right">
        <div>
          <span className="title">Expires</span>
          <span className="value">{details.exp}</span>
        </div>
      </div>
    </div>
  </div>

export default CreditCard;