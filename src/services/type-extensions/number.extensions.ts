// Extend Number prototype
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
declare interface Number {
  percentOf(num: number): number;
  toFixedCeil(decimals: number): string;
  roundCeil(decimals: number): number;
}

Number.prototype.percentOf = function (num: number) {
  return (Number(this) * num) / 100;
};

Number.prototype.toFixedCeil = function (decimals: number) {
  return this.roundCeil(decimals).toFixed(decimals);
};

Number.prototype.roundCeil = function (decimals: number) {
  const decimalMultiplier = 10 ** decimals;
  return Math.ceil(Number(this) * decimalMultiplier) / decimalMultiplier;
};
