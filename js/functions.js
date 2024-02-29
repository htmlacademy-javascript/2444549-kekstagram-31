
function getStringComparison (string, maxLength) {
  return (string.length <= maxLength);
}
getStringComparison('',);


function palindrome (string) {
  const lowerRegString = string.toLowerCase().replaceAll();
  let reverseString = '';
  for (let i = string.length - 1; i >= 0; i--){
    reverseString += string[i];
  }
  return (lowerRegString === reverseString);
}
palindrome();

function isNumber (string) {
  let checkString = '';
  for (let i = 0; i <= string.length - 1; i++) {
    if (string[i] >= 0) {
      checkString += string[i];
    }
  }
  return checkString || NaN;
}
isNumber();

/*
function isNumber (string) {
  let checkString = '';
  for (let i = 0; i <= string.length - 1; i++) {
    if (string[i] >= 0) {
      checkString += string[i];
    }
  }
  return checkString || NaN;
}
isNumber('123');
// eslint-disable-next-line no-console
console.log(isNumber);

// const getNumber = (string) => {
//   let number = '';
//   // string = string.toString().replaceAll(' ', '');
//   for (let i = 0; i < string.length; i++) {
//     if(!(isNaN(Number(string[i])) && string[i].trim())) {
//       number += string[i]
//     }
//   }
//   return parseInt(number, 10)
// };

function getNumber(str) {
  return parseFloat(str.replace(/\D/g, ''));
}

// eslint-disable-next-line no-console
console.log(getNumber(' агент.   '));
*/
