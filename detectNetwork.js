// Given a credit card number, this function should return a string with the
// name of a network, like 'MasterCard' or 'American Express'
// Example: detectNetwork('343456789012345') should return 'American Express'

// How can you tell one card network from another? Easy!
// There are two indicators:
//   1. The first few numbers (called the prefix)
//   2. The number of digits in the number (called the length)

// // HELPER FUNCTIONS

//   // useful for Discover: pre-prepared calculations
//   let cardNumberForDiscoverPrefixSet = new Set([cardNumber.slice(0,4), cardNumber.slice(0,3), cardNumber.slice(0,2)]);
//   // test if cNFDPS is a subset of dPS
//   let isDiscoverPrefix = false;
//   for (let elem of cardNumberForDiscoverPrefixSet) {
//     if (discoverPrefixSet.has(elem)) {
//       isDiscoverPrefix = true;
//       break // if so, break, otherwise false
//     }
//   };


// DATA

// Switch always has a prefix of 4903, 4905, 4911, 4936, 564182, 633110, 6333, or 6759 and a length of 16, 18, or 19.  } else {
//   NOTE: potential conflict with Visa. Multi-number prefixes take precedence. Therefore, these appear first
let switchLengthSet = new Set([16, 18, 19]);
let switchPrefixSet = new Set(['4903', '4905', '4911', '4936', '6759', '564182', '633110']);
// The Diner's Club network always starts with a 38 or 39 and is 14 digits long
let dinersClubLengthSet = new Set ([14]);
let dinersClubPrefixSet = new Set (['38', '39']);
// The American Express network always starts with a 34 or 37 and is 15 digits long
let americanExpressLengthSet = new Set([15]);
let americanExpressPrefixSet = new Set(['34', '37']);
// Visa always has a prefix of 4 and a length of 13, 16, or 19.
let visaLengthSet = new Set([13, 16, 19]);
let visaPrefixSet = new Set(['4']);
// MasterCard always has a prefix of 51, 52, 53, 54, or 55 and a length of 16.
let masterCardLengthSet = new Set([16]);
let masterCardPrefixArr = arrFromNumRange(51, 55);
// console.log(masterCardPrefixArr);
let masterCardPrefixSet = setFromArr(masterCardPrefixArr);
// console.log(masterCardPrefixSet);
// Discover always has a prefix of 6011, 644-649, or 65, and a length of 16 or 19.
let discoverLengthSet = new Set([16, 19]);
let discoverPrefixArr = concatArrs(['6011'], arrFromNumRange(644, 649), ['65']);
let discoverPrefixSet = setFromArr(discoverPrefixArr);
// let discoverPrefixSet = new Set(['6011', '644', '645', '646', '647', '648', '649', '65']);
// Maestro always has a prefix of 5018, 5020, 5038, or 6304, and a length of 12-19.
let maestroLengthArr = arrFromNumRange(12, 19);
let maestroLengthSet = setFromArr(maestroLengthArr);
let maestroPrefixSet = new Set(['5018', '5020', '5038', '6304']);
// China UnionPay always has a prefix of 622126-622925, 624-626, or 6282-6288 and a length of 16-19.
let chinaUnionPayLengthArr = concatArrs(arrFromNumRange(16,19));
let chinaUnionPayLengthSet = setFromArr(chinaUnionPayLengthArr);
let chinaUnionPayPrefixArr = concatArrs(arrFromNumRange(624, 626), arrFromNumRange(6282, 6288), arrFromNumRange(62126, 622925) );
let chinaUnionPayPrefixSet = setFromArr(chinaUnionPayPrefixArr);


//  HELPER FUNCTIONS

function arrFromNumRange(start,end) {
  // i: start and end range of numbers
  // o: array of that range
  // assume: good data
  let arr = [];
  for (let rangeIndex = start; rangeIndex < (end - 1); rangeIndex++) {
    arr.push(rangeIndex)
  }
  return arr
};

function numArrToStrArr(numArr) {
  strArr = [];
  for (let i = 0; i < numArr.length; i++) {
    strArr.push(numArr[i].toString);
  }
  return strArr
};

function concatArrs(...args) {
  return args.reduce((previous, current) => {
    return previous.concat(current);
  });
};

function setFromArr(arr) {
  return (new Set(arr))
}





var detectNetwork = function(cardNumber) {
  // Note: `cardNumber` will always be a string
  // The Diner's Club network always starts with a 38 or 39 and is 14 digits long
  // The American Express network always starts with a 34 or 37 and is 15 digits long

  // Once you've read this, go ahead and try to implement this function, then return to the console.

/*
  // Switch always has a prefix of 4903, 4905, 4911, 4936, 564182, 633110, 6333, or 6759 and a length of 16, 18, or 19.  } else {
  if ( (isCCNWLength(switchLengthSet, cardNumber.length) && (isCCNWPrefix(switchPrefixSet, cardNumberPrefixForSwitchTestSet) ) ) ) {
    return "Switch"
*/

// HELPER FUNCTIONS

  // useful for Discover: pre-prepared calculations
  let cardNumberForDiscoverPrefixSet = new Set([cardNumber.slice(0,4), cardNumber.slice(0,3), cardNumber.slice(0,2)]);
  // test if cNFDPS is a subset of dPS
  let isDiscoverPrefix = false;
  for (let elem of cardNumberForDiscoverPrefixSet) {
    if (discoverPrefixSet.has(elem)) {
      isDiscoverPrefix = true;
      break // if so, break, otherwise false
    }
  };


    // The Diner's Club network always starts with a 38 or 39 and is 14 digits long
  if ( (cardNumber.length === 14) && (cardNumber.slice(0,2) === '38') || (cardNumber.slice(0,2) === '39') ) {
    return "Diner's Club"
  // The American Express network always starts with a 34 or 37 and is 15 digits long
  } else if ( (cardNumber.length === 15) && (cardNumber.slice(0,2) === '34') || (cardNumber.slice(0,2) === '37') ) {
    return "American Express"
  // Visa always has a prefix of 4 and a length of 13, 16, or 19.
  } else if ( (visaLengthSet.has(cardNumber.length) ) && (cardNumber.slice(0,1) === '4') ) {
    return "Visa"
  // MasterCard always has a prefix of 51, 52, 53, 54, or 55 and a length of 16.
  } else if ( (cardNumber.length === 16) && (masterCardPrefixSet.has(cardNumber.slice(0,2) ) ) ) {
    return "MasterCard"
  // Discover always has a prefix of 6011, 644-649, or 65, and a length of 16 or 19.
  } else if ( (discoverLengthSet.has(cardNumber.length) ) && (isDiscoverPrefix) ) {
    return "Discover"
  // Maestro always has a prefix of 5018, 5020, 5038, or 6304, and a length of 12-19.
  } else if ( (maestroLengthSet.has(cardNumber.length) ) || (maestroPrefixSet.has(cardNumber.slice(0,4) ) ) ) {
    return "Maestro"
  // // China UnionPay always has a prefix of 622126-622925, 624-626, or 6282-6288 and a length of 16-19
  // } else if ( (isCCNWLength(chinaUnionPayLengthSet, cardNumber.length) && (isCCNWPrefix(chinaUnionPayPrefixSet, cardNumberPrefixForChinaUnionPayTestSet) ) ) ){
  //   return "Switch"
  } else {
    return "Not in these networks"
  }

};


// DATA and TESTS

console.log("TEST DATA AND CALLS");
// Switch always has a prefix of 4903, 4905, 4911, 4936, 564182, 633110, 6333, or 6759 and a length of 16, 18, or 19.  } else {
// TESTS TBD

// The Diner's Club network always starts with a 38 or 39 and is 14 digits long
myCardNumber = '38345678901234';
console.log("DC: ", detectNetwork(myCardNumber));
myCardNumber = '39345678901234';
console.log("DC: ", detectNetwork(myCardNumber));

// The American Express network always starts with a 34 or 37 and is 15 digits long
myCardNumber = '343456789012345';
console.log("Amex: ", detectNetwork(myCardNumber));
myCardNumber = '373456789012345';
console.log("Amex: ", detectNetwork(myCardNumber));

// Visa always has a prefix of 4 and a length of 13, 16, or 19.
myCardNumber = '4123456789012';
console.log("Visa: ", detectNetwork(myCardNumber));
myCardNumber = '4123456789012345';
console.log("Visa: ", detectNetwork(myCardNumber));
myCardNumber = '4123456789012345678';
console.log("Visa: ", detectNetwork(myCardNumber));

// MasterCard always has a prefix of 51, 52, 53, 54, or 55 and a length of 16.
myCardNumber = '5112345678901234';
console.log("MasterCard: ", detectNetwork(myCardNumber));
myCardNumber = '5212345678901234';
console.log("MasterCard: ", detectNetwork(myCardNumber));
myCardNumber = '5312345678901234';
console.log("MasterCard: ", detectNetwork(myCardNumber));
myCardNumber = '5412345678901234';
console.log("MasterCard: ", detectNetwork(myCardNumber));
myCardNumber = '5512345678901234';
console.log("MasterCard: ", detectNetwork(myCardNumber));

// Discover always has a prefix of 6011, 644-649, or 65, and a length of 16 or 19.
myCardNumber = '6011567890123456';
console.log("Discover: ", detectNetwork(myCardNumber));
myCardNumber = '6011567890123456789';
console.log("Discover: ", detectNetwork(myCardNumber));
myCardNumber = '6444567890123456';
console.log("Discover: ", detectNetwork(myCardNumber));
myCardNumber = '6444567890123456789';
console.log("Discover: ", detectNetwork(myCardNumber));
myCardNumber = '6454567890123456';
console.log("Discover: ", detectNetwork(myCardNumber));
myCardNumber = '6454567890123456789';
console.log("Discover: ", detectNetwork(myCardNumber));
myCardNumber = '6464567890123456';
console.log("Discover: ", detectNetwork(myCardNumber));
myCardNumber = '6464567890123456789';
console.log("Discover: ", detectNetwork(myCardNumber));
myCardNumber = '6474567890123456';
console.log("Discover: ", detectNetwork(myCardNumber));
myCardNumber = '6474567890123456789';
console.log("Discover: ", detectNetwork(myCardNumber));
myCardNumber = '6484567890123456';
console.log("Discover: ", detectNetwork(myCardNumber));
myCardNumber = '6484567890123456789';
console.log("Discover: ", detectNetwork(myCardNumber));
myCardNumber = '6494567890123456';
console.log("Discover: ", detectNetwork(myCardNumber));
myCardNumber = '6494567890123456789';
console.log("Discover: ", detectNetwork(myCardNumber));
myCardNumber = '6534567890123456';
console.log("Discover: ", detectNetwork(myCardNumber));
myCardNumber = '6534567890123456789';
console.log("Discover: ", detectNetwork(myCardNumber));

// Maestro always has a prefix of 5018, 5020, 5038, or 6304, and a length of 12-19.

myCardNumber = '501856789012';
console.log("Maestro: ", detectNetwork(myCardNumber));
myCardNumber = '5018567890123';
console.log("Maestro: ", detectNetwork(myCardNumber));
myCardNumber = '50185678901234';
console.log("Maestro: ", detectNetwork(myCardNumber));
myCardNumber = '501856789012345';
console.log("Maestro: ", detectNetwork(myCardNumber));
myCardNumber = '5018567890123456';
console.log("Maestro: ", detectNetwork(myCardNumber));
myCardNumber = '50185678901234567';
console.log("Maestro: ", detectNetwork(myCardNumber));
myCardNumber = '501856789012345678';
console.log("Maestro: ", detectNetwork(myCardNumber));
myCardNumber = '5018567890123456789';
console.log("Maestro: ", detectNetwork(myCardNumber));
myCardNumber = '502056789012';
console.log("Maestro: ", detectNetwork(myCardNumber));
myCardNumber = '5020567890123';
console.log("Maestro: ", detectNetwork(myCardNumber));
myCardNumber = '50205678901234';
console.log("Maestro: ", detectNetwork(myCardNumber));
myCardNumber = '502056789012345';
console.log("Maestro: ", detectNetwork(myCardNumber));
myCardNumber = '5020567890123456';
console.log("Maestro: ", detectNetwork(myCardNumber));
myCardNumber = '50205678901234567';
console.log("Maestro: ", detectNetwork(myCardNumber));
myCardNumber = '502056789012345678';
console.log("Maestro: ", detectNetwork(myCardNumber));
myCardNumber = '5020567890123456789';
console.log("Maestro: ", detectNetwork(myCardNumber));
myCardNumber = '503856789012';
console.log("Maestro: ", detectNetwork(myCardNumber));
myCardNumber = '5038567890123';
console.log("Maestro: ", detectNetwork(myCardNumber));
myCardNumber = '50385678901234';
console.log("Maestro: ", detectNetwork(myCardNumber));
myCardNumber = '503856789012345';
console.log("Maestro: ", detectNetwork(myCardNumber));
myCardNumber = '5038567890123456';
console.log("Maestro: ", detectNetwork(myCardNumber));
myCardNumber = '50385678901234567';
console.log("Maestro: ", detectNetwork(myCardNumber));
myCardNumber = '503856789012345678';
console.log("Maestro: ", detectNetwork(myCardNumber));
myCardNumber = '5038567890123456789';
console.log("Maestro: ", detectNetwork(myCardNumber));
myCardNumber = '630456789012';
console.log("Maestro: ", detectNetwork(myCardNumber));
myCardNumber = '6304567890123';
console.log("Maestro: ", detectNetwork(myCardNumber));
myCardNumber = '63045678901234';
console.log("Maestro: ", detectNetwork(myCardNumber));
myCardNumber = '630456789012345';
console.log("Maestro: ", detectNetwork(myCardNumber));
myCardNumber = '6304567890123456';
console.log("Maestro: ", detectNetwork(myCardNumber));
myCardNumber = '63045678901234567';
console.log("Maestro: ", detectNetwork(myCardNumber));
myCardNumber = '630456789012345678';
console.log("Maestro: ", detectNetwork(myCardNumber));
myCardNumber = '6304567890123456789';
console.log("Maestro: ", detectNetwork(myCardNumber));

