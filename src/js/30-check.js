/* ---------- answer checking ---------- */
const strip=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
function norm(s){return String(s).toLowerCase().replace(/[’‘`´]/g,"'").replace(/œ/g,'oe').replace(/æ/g,'ae').replace(/[.,!?;:"«»()¿¡…\-–—]/g,' ').replace(/\s+/g,' ').trim()}
function optx(a){const m=a.match(/\(([^)]*)\)/);if(!m)return [a];const pre=a.slice(0,m.index),post=a.slice(m.index+m[0].length);return optx(pre+post).concat(optx(pre+m[1]+post)).slice(0,16)}
function variants(ans,fr){const out=[];String(ans).split(fr?/\s+\/\s+|;/:/\/|;/).forEach(a=>{a=a.trim();if(!a)return;optx(a).forEach(x=>out.push(norm(x)))});return out.filter(Boolean)}
function lev(a,b){const m=a.length,n=b.length;if(Math.abs(m-n)>2)return 9;let p=Array.from({length:n+1},(_,i)=>i);for(let i=1;i<=m;i++){const c=[i];for(let j=1;j<=n;j++)c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));p=c}return p[n]}
function checkFr(input,expected,alts){
  const n=norm(input),c=variants(expected,true).concat((alts||[]).map(norm));
  if(c.includes(n))return 'ok';if(c.map(strip).includes(strip(n)))return 'accent';return 'no';
}
function checkEn(input,expected){
  const de=s=>s.replace(/\bi am\b/g,"i'm").replace(/\bit is\b/g,"it's").replace(/^(to|the|a|an) /,'');
  const n=de(norm(input)),c=variants(expected,false).map(de);
  if(c.includes(n))return 'ok';
  return c.some(x=>x.length>=5&&lev(x,n)<=(x.length>=10?2:1))?'ok':'no';
}

