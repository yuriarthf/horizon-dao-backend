// Extend Number prototype
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
declare interface Number {
  percentOf(num: number): number;
}

Number.prototype.percentOf = function (num: number) {
  return (Number(this) * num) / 100;
};
