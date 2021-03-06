var reverse = function (x) {
  var min = Math.pow(-2, 31);
  var max = Math.pow(2, 31) - 1;
  var sign = Math.sign(x); // 数字符号
  x = Math.abs(x);
  var result = 0;
  var remainder;
  while (x > 0) {
    remainder = x % 10; 
    x = (x - remainder) / 10;  
    result = result * 10 + remainder; 
  }
  result *= sign;
  if (result > max) {
    return 0;
  }
  if (result < min) {
    return 0;
  }
  return result;
};
