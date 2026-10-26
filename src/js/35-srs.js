/* ---------- picking material ---------- */
/* ---------- which words and concepts are available ----------
   Course words and concepts unlock on their day; your own imports are always available (unless tagged with a level above yours). */
const planDay=()=>Math.min(21,state.stage||1),curDay=planDay;
const lvOk=lv=>{if(!lv)return true;const i=state.levels.findIndex(l=>l.n===lv);return i<0||i<=state.li};
const dayOk=x=>!x.day||x.day<=planDay();
const pool=()=>allItems().filter(i=>dayOk(i)&&lvOk(i.lv));
/* A round mixes: words new today (from today's texts and lists) first, then reviews that are due, then other unseen words. */
function pick(k,n){
  const T=dayNum(today()),P=shuffle(pool()),d=planDay(),half=Math.ceil(n/2);
  const today_=P.filter(i=>i.day===d&&!i.s[k]),due=P.filter(i=>i.s[k]&&i.s[k][1]<=T).sort((a,b)=>a.s[k][1]-b.s[k][1]);
  const nw=P.filter(i=>!i.s[k]&&i.day!==d),rest=P.filter(i=>i.s[k]&&i.s[k][1]>T);
  const seen=new Set(),out=[];
  [today_.slice(0,half),due.slice(0,4),today_.slice(half),nw,due.slice(4),rest].forEach(g=>g.forEach(i=>{if(out.length<n&&!seen.has(i.id)){seen.add(i.id);out.push(i)}}));
  return shuffle(out);
}
const ready=k=>{const T=dayNum(today());return pool().filter(i=>!i.s[k]||i.s[k][1]<=T).length};
const IV=[0,1,3,7,16,35];
function srs(it,k,ok){const b=it.s[k]?it.s[k][0]:0,nb=ok?Math.min(5,b+1):0;(state.srs[it.id]=state.srs[it.id]||{})[k]=[nb,dayNum(today())+(ok?IV[nb]:0)]}
function srsRestore(it,k,prev){const e=state.srs[it.id];if(prev)(state.srs[it.id]=e||{})[k]=prev;else if(e){delete e[k];if(!Object.keys(e).length)delete state.srs[it.id]}}
const studied=()=>allConcepts().filter(c=>c.on&&lvOk(c.lv)&&dayOk(c));
const newToday=()=>studied().filter(c=>c.day===planDay());
function templateQs(n){
  const cs=studied().filter(c=>c.t.length);if(!cs.length)return [];
  const nw=cs.filter(c=>c.day===planDay()),out=[],seen=new Set();
  for(let i=0;i<n*8&&out.length<n;i++){const c=out.length<2&&nw.length&&i<12?rnd(nw):rnd(cs),x=rnd(c.t),e=expand(x[0],x[1]);if(seen.has(e.fr))continue;seen.add(e.fr);out.push({k:'g',en:e.en,ans:e.fr,alt:[],concept:c.name})}
  return shuffle(out);
}
const withTimeout=(p,ms)=>Promise.race([p,new Promise((_,r)=>setTimeout(()=>r(new Error('timeout')),ms))]);
async function aiSentences(n){
  const cs=studied();if(!AI||!cs.length)return [];
  let known=pool().filter(i=>i.s.v&&i.s.v[0]>=2);if(known.length<8)known=pool();
  const vocab=shuffle(known).slice(0,30).map(i=>`${i.fr} (${i.en})`).join('; ');
  const prompt=`You write practice sentences for an English speaker learning French at level ${state.levels[state.li].n}.
Grammar concepts the learner has studied: ${cs.map(c=>c.name).join('; ')}.
Vocabulary the learner knows: ${vocab}.
Write ${n} short English sentences for the learner to translate into French. Each sentence must practise exactly one of the listed concepts, and use only very common everyday words plus the vocabulary above. Vary the subjects and the concepts.${newToday().length?' Use these newly learned concepts in about half of the sentences: '+newToday().map(c=>c.name).join('; ')+'.':''} Keep each sentence under 12 words.
Return only a JSON array, no other text: [{"en":"English sentence","fr":"the most natural French translation","alt":["other fully correct French translations, if any"],"concept":"concept name"}]`;
  const r=await withTimeout(AI.json(prompt,{modelTier:'quick',cache:false}),30000);
  const arr=Array.isArray(r)?r:(r&&r.sentences)||[];
  return arr.filter(o=>o&&o.en&&o.fr).slice(0,n).map(o=>({k:'g',en:String(o.en),ans:String(o.fr),alt:Array.isArray(o.alt)?o.alt.map(String):[],concept:String(o.concept||''),ai:true}));
}

