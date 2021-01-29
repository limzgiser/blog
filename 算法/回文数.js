/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  if (x < 0) {
    return false;
  }
  var d = 0;
  f = x;
  while (f > 0) {
    d = d * 10 + (f % 10);
    f = (f - (f % 10)) / 10;
  }
  return d === x;
};
