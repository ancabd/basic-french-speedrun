/* ---------- battle ---------- */
const sv=v=>Math.round(v*SVK*(1+.03*((B?B.day:curDay())-1))*(state.diff||1));
const SVK=2.3;
/* boss HP per day, calibrated in simulated fights: a player answering 75% right with only the required lessons wins about 7 in 10 */
const DAYHP=[165,190,110,160,210,135,190,305,200,250,355,245,265,325,205,235,315,220,290,280,205];
const bossHpFor=d=>Math.round(DAYHP[Math.min(21,Math.max(1,d))-1]*(state.diff||1));
const movesOf=m=>Array.isArray(m[0])?m:[m];
const intent=()=>movesOf(B.def.m[B.boss.mi%B.def.m.length]);
function bossDmg(v){let d=sv(v)+B.boss.str;if(B.boss.weak)d=Math.floor(d*.75);if(B.p.vuln)d=Math.floor(d*1.5);return Math.max(0,d)}
function intentText(){return intent().map(m=>m[0]==='a'?`Attacks for ${bossDmg(m[1])}${m[2]>1?' × '+m[2]:''}`:m[0]==='b'?`Braces for ${sv(m[1])} Block`:m[0]==='s'?`Gains ${m[1]} Strength`:m[0]==='w'?'Will make you Weak':'Will make you Vulnerable').join(', then ')}
function startBattle(){
  const day=curDay(),bi=bossFor(day),def=BOSSES[bi],hp=bossHpFor(day),deck=state.day.deck.filter(id=>CARDS[id]);
  state.hp=maxHp();state.day.deck=[];
  B={tier:0,day,bi,def,seenQ:new Set(),q:null,mult:1,boss:{hp,max:hp,blk:0,str:0,weak:0,vuln:0,mi:0},p:{blk:0,str:0,weak:0,vuln:0,en:0,pw:{blk:0,draw:0}},draw:shuffle(deck),emax:energyFor(deck.length),hand:[],disc:[],played:0,dbl:false,msg:def.t,over:null};
  save();view='battle';startTurn();
}
/* Energy per turn grows with the deck: 3, plus 1 for every 3 cards beyond 7 (4 at 10 cards, 5 at 13, 6 at 16). */
const energyFor=n=>Math.min(6,3+Math.floor(Math.max(0,n-7)/3));
function startTurn(){B.p.blk=B.p.pw.blk;B.p.en=B.emax;B.played=0;B.dbl=false;drawN(B.emax+2+B.p.pw.draw);render()}
function play(i){
  const id=B.hand[i],c=CARDS[id];if(!c||B.over||B.q)return;
  if(c.c>B.p.en){toast('Not enough energy.');return}
  B.p.en-=c.c;B.hand.splice(i,1);B.played++;
  const fin=ok=>{B.mult=ok===false?.5:1;B.dealt=0;c.f();B.mult=1;if(!c.x)B.disc.push(id);
    B.msg=c.atk?(ok?`Correct: ${c.n} hits at full strength for ${B.dealt}.`:`Wrong: ${c.n} hits at half strength for ${B.dealt}.`):`You played ${c.n}.`;
    if(B.boss.hp<=0)return endBattle(true);save();render()};
  if(c.atk)ask('atk',fin);else fin(null);
}
function endTurn(){
  if(!B||B.over||B.q)return;B.disc.push(...B.hand);B.hand=[];B.boss.blk=0;B.said=[];B.mv=intent().slice();bossMove();
}
function bossMove(){
  if(!B.mv.length)return bossDone();
  const m=B.mv.shift();
  if(m[0]==='a')return ask('def',ok=>{let tot=0,full=0;
    for(let i=0;i<(m[2]||1);i++){let d=bossDmg(m[1]);full+=d;if(ok)d=Math.ceil(d/2);const ab=Math.min(B.p.blk,d);B.p.blk-=ab;state.hp-=d-ab;tot+=d-ab}
    B.said.push(ok?`swung for ${full}, you dodged half and took ${tot}`:tot?`hit you for ${tot}`:'attacked, and you blocked it all');
    if(state.hp<=0){B.msg=`${B.def.n} ${B.said.join(' and ')}.`;return endBattle(false)}
    B.fx=true;bossMove()});
  if(m[0]==='b'){B.boss.blk+=sv(m[1]);B.said.push('braced')}
  else if(m[0]==='s'){B.boss.str+=m[1];B.said.push('grew stronger')}
  else if(m[0]==='w'){B.p.weak+=m[1]+1;B.said.push('made you Weak')}
  else if(m[0]==='u'){B.p.vuln+=m[1]+1;B.said.push('made you Vulnerable')}
  bossMove();
}
function bossDone(){
  ['weak','vuln'].forEach(s=>{if(B.boss[s])B.boss[s]--;if(B.p[s])B.p[s]--});
  B.boss.mi++;if(B.boss.mi%B.def.m.length===0){B.boss.str+=2;B.said.push('is getting angrier')}
  B.msg=`${B.def.n} ${B.said.join(' and ')}.`;
  save();startTurn();
}
function endBattle(won){
  B.over=won?'won':'lost';state.started=true;
  if(won){B.gain=60+10*B.day;addXp(B.gain);state.wins=(state.wins||0)+1;
    if(state.stage===B.day){state.stage++;state.day.done={}}}
  state.hp=maxHp();save();render();
}

/* ---------- battle questions (multiple choice) ---------- */
const slotsOf=t=>[...t.matchAll(/\{([^}]*)\}/g)].map(m=>m[1].split('|'));
const fillT=(t,p)=>{let i=0;return t.replace(/\{([^}]*)\}/g,(_,g)=>{const a=g.split('|');return (a[p[i++]]??a[0]).trim()}).replace(/\s+/g,' ').trim()};
const firstEn=s=>String(s).split(/\s+\/\s+|\//)[0].trim();
function mcqGrammar(){
  const cs=studied().filter(c=>c.t.some(t=>slotsOf(t[0]).length));if(!cs.length)return null;
  const nt=cs.filter(c=>c.day===planDay()),c=nt.length&&Math.random()<.5?rnd(nt):rnd(cs),t=rnd(c.t.filter(t=>slotsOf(t[0]).length)),S=slotsOf(t[0]),p=S.map(a=>Math.floor(Math.random()*a.length));
  const fr=fillT(t[0],p),en=fillT(t[1],p),seen=new Set([fr]),ens=new Set([norm(en)]),opts=[];
  const tryAdd=q=>{const f=fillT(t[0],q),e=fillT(t[1],q);if(seen.has(f)||ens.has(norm(e)))return;seen.add(f);ens.add(norm(e));opts.push(f)};
  for(let n=0;n<40&&opts.length<3;n++){const q=p.slice(),s=Math.floor(Math.random()*S.length);if(S[s].length<2)continue;q[s]=(q[s]+1+Math.floor(Math.random()*(S[s].length-1)))%S[s].length;if(n>20){const s2=Math.floor(Math.random()*S.length);q[s2]=Math.floor(Math.random()*S[s2].length)}tryAdd(q)}
  if(opts.length<3)return null;
  return {ask:'Which is the French for',big:en,chip:c.name,fr:true,opts:[fr,...opts],c:0};
}
function mcqVocab(){
  const P=pool();if(P.length<4)return null;
  const seen=P.filter(i=>i.s.v||i.s.w||i.s.l),src=seen.length>=4?seen:P,it=rnd(src),toFr=Math.random()<.5;
  const show=i=>toFr?i.fr:firstEn(i.en),key=i=>norm(toFr?i.fr:firstEn(i.en)),wc=i=>i.fr.split(' ').length;
  const others=shuffle(P.filter(i=>i!==it&&key(i)!==key(it)&&norm(firstEn(i.en))!==norm(firstEn(it.en))&&norm(i.fr)!==norm(it.fr)));
  const sameList=others.filter(i=>i.list===it.list);others.sort((a,b)=>(a.list===it.list?0:9)-(b.list===it.list?0:9)||Math.abs(wc(a)-wc(it))-Math.abs(wc(b)-wc(it)));
  const opts=[],keys=new Set([key(it)]);for(const o of others){if(opts.length>=3)break;if(keys.has(key(o)))continue;keys.add(key(o));opts.push(show(o))}
  if(opts.length<3)return null;
  return toFr?{ask:'How do you say',big:firstEn(it.en),fr:true,opts:[it.fr,...opts],c:0}:{ask:'What does this mean?',big:it.fr,bigFr:true,opts:[firstEn(it.en),...opts],c:0};
}
function mcqNumber(){
  const hard=[16,17,19,21,31,41,51,61,66,69,70,71,72,75,76,77,79,80,81,84,88,90,91,92,95,96,97,99,100,101,180,250,1000];
  const n=Math.random()<.7?rnd(hard):20+Math.floor(Math.random()*80);
  const near=shuffle([n+10,n-10,n+1,n-1,n+20,n-20,n+11,n-11].filter(x=>x>=0&&x<10000&&x!==n)).slice(0,3);
  if(Math.random()<.5)return {ask:'Which one is',big:String(n),fr:true,opts:[frNum(n),...near.map(frNum)],c:0};
  return {ask:'Which number is this?',big:frNum(n),bigFr:true,opts:[String(n),...near.map(String)],c:0};
}
function mcq(){
  const r=Math.random(),order=r<.45?[mcqGrammar,mcqVocab,mcqNumber]:r<.8?[mcqVocab,mcqGrammar,mcqNumber]:[mcqNumber,mcqGrammar,mcqVocab];
  for(let tries=0;tries<6;tries++){for(const f of order){const q=f();if(!q)continue;if(B&&B.seenQ.has(q.big)&&tries<5)continue;
    const ord=shuffle(q.opts.map((o,i)=>i));q.c=ord.indexOf(0);q.opts=ord.map(i=>q.opts[i]);if(B)B.seenQ.add(q.big);return q}}
  return mcqNumber();
}
function ask(kind,then){B.q=Object.assign(mcq(),{kind,then,ans:null});render()}
function qAnswer(i){const q=B&&B.q;if(!q||q.ans!=null)return;q.ans=i;render();if(i===q.c)setTimeout(()=>{if(B&&B.q===q)qResolve()},900)}
function qResolve(){const q=B&&B.q;if(!q||q.ans==null)return;B.q=null;q.then(q.ans===q.c)}

