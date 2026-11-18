export function clamp(n,min,max){
  if(min>max) throw new RangeError('min must be <= max');
  return Math.min(Math.max(n,min),max);
}
