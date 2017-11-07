export function ccngen(type) {
  let pos;
	let str = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
	let sum = 0;
	let final_digit = 0;
  let i = 0;
	let t = 0;
	let len_offset = 0;
  let len = 0;
  let templates = {
    'Visa': 'xxxx xxxx xxxx xxxx',
    'Mastercard': 'xxxx xxxx xxxx xxxx',
    'amex': 'xxxx xxxxxx xxxxx'
  }
  

	//
	// Fill in the first values of the string based with the specified bank's prefix.
	//

	// Visa
	if (type === 'Visa') {
		str[0] = 4;
		pos = 1;
		len = 16;
	}
	// Mastercard
	else if (type === 'Mastercard') {
		str[0] = 5;
		t = Math.floor(Math.random() * 5) % 5;
		str[1] = 1 + t;	  // Between 1 and 5.
		pos = 2;
		len = 16;
	}
	// American Express
	else if (type === 'amex') {
		str[0] = 3;
		t = Math.floor(Math.random() * 4) % 4;
		str[1] = 4 + t;	  // Between 4 and 7.
		pos = 2;
		len = 15;
	}

	//
	// Fill all the remaining numbers except for the last one with random values.
	//

	while (pos < len - 1) {
		str[pos++] = Math.floor(Math.random() * 10) % 10;
	}

	//
	// Calculate the Luhn checksum of the values thus far.
	//

	len_offset = (len + 1) % 2;
	for (pos = 0; pos < len - 1; pos++) {
		if ((pos + len_offset) % 2) {
			t = str[pos] * 2;
			if (t > 9) {
				t -= 9;
			}
			sum += t;
		}
		else {
			sum += str[pos];
		}
	}

	//
	// Choose the last digit so that it causes the entire string to pass the checksum.
	//

	final_digit = (10 - (sum % 10)) % 10;
  str[len - 1] = final_digit;
  
  //
  // Fill out template
  //

  return templates[type].replace(/[x]/g, function() {
    return str[i++];
  });
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