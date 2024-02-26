
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

