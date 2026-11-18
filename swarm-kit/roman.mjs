const T=[[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
export function roman(n){
  if(!Number.isInteger(n)||n<1||n>3999) throw new RangeError('n must be an integer 1..3999');
  let s='';for(const [v,r] of T){while(n>=v){s+=r;n-=v;}}return s;
}
