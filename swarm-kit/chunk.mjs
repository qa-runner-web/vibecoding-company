export function chunk(a,size){
  if(!Number.isInteger(size)||size<1) throw new RangeError('size must be a positive integer');
  const r=[];for(let i=0;i<a.length;i+=size)r.push(a.slice(i,i+size));return r;
}
