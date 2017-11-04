export function ccngen(type) {
	let pos;
	let str = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
	let sum = 0;
	let final_digit = 0;
	let t = 0;
	let len_offset = 0;
	let len = 0;
	let issuer;

	//
	// Fill in the first values of the string based with the specified bank's prefix.
	//

	// Visa
	if (type === 'VISA') {
		str[0] = 4;
		pos = 1;
    len = 16;
	} else if (type === 'Mastercard') {
		str[0] = 5;
		t = Math.floor(Math.random() * 5) % 5;
		str[1] = 1 + t;	  // Between 1 and 5.
		pos = 2;
		len = 16;
	} else if (type === 'American Express') {
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

	return str;
}