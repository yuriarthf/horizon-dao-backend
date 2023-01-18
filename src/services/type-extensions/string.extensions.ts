// Extend String prototype
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
declare interface String {
  add(numStr: string): string;
  minus(numStr: string): string;
  mul(numStr: string): string;
  div(numStr: string): string;
  numberToFixed(decimals: number): string;
}

String.prototype.add = function (numStr: string) {
  return (parseFloat(String(this)) + parseFloat(numStr)).toString();
};

String.prototype.minus = function (numStr: string) {
  return (parseFloat(String(this)) - parseFloat(numStr)).toString();
};

String.prototype.mul = function (numStr: string) {
  return (parseFloat(String(this)) * parseFloat(numStr)).toString();
};

String.prototype.div = function (numStr: string) {
  return (parseFloat(String(this)) / parseFloat(numStr)).toString();
};

String.prototype.numberToFixed = function (decimals: number) {
  return parseFloat(String(this)).toFixed(decimals);
};
