export function median(a){
  if(!Array.isArray(a)||a.length===0) throw new RangeError('non-empty array required');
  const s=[...a].sort((x,y)=>x-y),m=s.length>>1;
  return s.length%2?s[m]:(s[m-1]+s[m])/2;
}
