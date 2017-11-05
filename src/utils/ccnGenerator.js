export function ccngen(type) {
  let temp;

  if (type === 'Visa') {
    temp = '4xxx xxxx xxxx xxxx';
  } else if (type === 'Mastercard') {
    temp = '5yxx xxxx xxxx xxxx';
  } else if (type === 'amex') {
    temp = '3yxx xxxxxx xxxxx';
  }

  return temp.replace(/[xy]/g, c => {
    let r = Math.random() * 10 | 0, 
      v = (c === 'x') ? r : (type === 'Mastercard') ? Math.random() * 5 | 0 : ([4, 7])[Math.random() * 2 | 0];
    return v;
  })
}

export function cvvgen(type) {
  let cvv = '';

  if (type === 'Visa' || type === 'Mastercard') {
    cvv = ('00' + Math.floor(Math.random() * 999)).slice(-3);
  } else if (type === 'amex') {
    cvv = ('000' + Math.floor(Math.random() * 9999)).slice(-4)
  }

  return cvv;
}