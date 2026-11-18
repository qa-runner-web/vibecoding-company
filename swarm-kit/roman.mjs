const T=[[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
export function toRoman(n){
  if(!Number.isInteger(n)||n<1||n>3999) throw new RangeError('n must be an integer 1..3999');
  let s='';for(const [v,r] of T){while(n>=v){s+=r;n-=v;}}return s;
}
export function fromRoman(s){
  if(typeof s!=='string'||!/^[MDCLXVI]+$/.test(s)) throw new TypeError('invalid roman numeral');
  let i=0,n=0;for(const [v,r] of T){while(s.startsWith(r,i)){n+=v;i+=r.length;}}
  if(i!==s.length||toRoman(n)!==s) throw new TypeError('invalid roman numeral');
  return n;
}
