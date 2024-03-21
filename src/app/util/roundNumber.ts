export default function roundNumber(val: number, digits: number): number {
  return Number(val.toFixed(digits));
}
