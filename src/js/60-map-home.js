/* ---------- the map: self-paced days ---------- */
const PC=['var(--k-s)','var(--k-g)','var(--k-l)','var(--k-v)'],PT=['#fff','var(--paper-ink)','#fff','#fff'];
const dayStatus=d=>d<state.stage?'done':d===state.stage?'cur':'locked';
function dayTopics(d){
  const cs=allConcepts().filter(c=>c.day===d).map(c=>c.name);
  if(cs.length)return cs;
  return d===21?['Everything from days 1 to 20','The final test: listening, reading, writing and speaking']:['Review what you have learned so far'];
}
function vMap(){
  const P=state.plan,cd=curDay(),nodes=[],parts=[];let y=0,gi=0;
  PHASES.forEach((p,pi)=>{
    const done=Math.max(0,Math.min(p.to,state.stage-1)-p.from+1);
    parts.push(`<div class="pb" style="top:${y}px;--pc:${PC[pi]}"><i></i><div class="g"><b>Phase ${ROMAN[pi]}, ${p.n}</b><small>Days ${p.from}–${p.to}, ${p.lv}</small></div><span class="pbs">${done}/${p.to-p.from+1}</span></div>`);
    y+=56+38;
    for(let d=p.from;d<=p.to;d++,gi++){const x=Math.round(50+27*Math.sin(gi*1.05+.4));nodes.push({d,x,y:y+36,pi});y+=104}
    y+=4;
  });
  const H=y,seg=[];
  for(let i=1;i<nodes.length;i++){const a=nodes[i-1],b=nodes[i],my=(a.y+b.y)/2,lit=dayStatus(b.d)!=='locked';
    seg.push(`<path d="M${a.x} ${a.y} C${a.x} ${my} ${b.x} ${my} ${b.x} ${b.y}" class="${lit?'lit':''}" style="${lit?'stroke:'+PC[b.pi]:''}"/>`)}
  const nodeHtml=nodes.map(n=>{const s=dayStatus(n.d),right=n.x<50||n.x===50,bi=bossFor(n.d),t=dayTopics(n.d);
    const lab=`<div class="nl ${s} ${right?'r':'l'}" style="top:${n.y}px;${right?`left:calc(${n.x}% + 48px)`:`right:calc(${100-n.x}% + 48px)`}">${s==='cur'?'<em class="here">You are here</em>':''}<b>Day ${n.d}${DAYNOTE[n.d]?(n.d===7?', checkpoint':', final test'):''}</b><span>${esc(t[0])}${t.length>1?` and ${t.length-1} more`:''}</span><small>${s==='done'?'Beat '+esc(BOSSES[bi].n):'Boss: '+esc(BOSSES[bi].n)}</small></div>`;
    return `<button class="nd ${s}" data-a="node" data-d="${n.d}" style="left:${n.x}%;top:${n.y}px;--pc:${PC[n.pi]};--pt:${PT[n.pi]}" aria-label="Day ${n.d}, ${s==='done'?'done':s==='cur'?'current day':'locked'}">${n.d}${s==='done'?'<i>✓</i>':''}</button>${lab}`}).join('');
  const chk=(key,label)=>`<label class="chk"><input type="checkbox" data-p="${esc(key)}" ${P.done[key]?'checked':''}>${esc(label)}</label>`;
  return `<h1>Your 21 days</h1>
  <p class="muted">${state.stage>21?'All 21 days are done. Keep practising as long as you like.':`Day ${cd} of 21, at your own pace. Finish a day’s lessons, then beat its boss to open the next day.`}</p>
  <div class="map" style="height:${H}px"><svg viewBox="0 0 100 ${H}" preserveAspectRatio="none" aria-hidden="true">${seg.join('')}</svg>${parts.join('')}${nodeHtml}</div>
  <h2>Notes from your plan</h2>
  <p class="muted">Goal: B1-ish functional French. Priority: listening, then reading, speaking, writing.</p>
  ${PHASES.map((p,i)=>`<details><summary>Phase ${ROMAN[i]}, ${p.n} (days ${p.from}–${p.to})</summary>
    <p>${esc(p.goal)}</p>${p.focus.map(f=>`<p class="muted"><b>${f[0]}.</b> ${esc(f[1])}</p>`).join('')}
    ${p.grammar?`<p style="margin-top:12px"><b>Grammar</b></p><div class="chks">${p.grammar.map(g=>chk(i+':'+g,g)).join('')}</div>`:''}
    ${p.can?`<p><b>By the end I can</b></p><div class="chks one">${p.can.map(g=>chk(i+':'+g,g)).join('')}</div>`:''}</details>`).join('')}
  <details><summary>Scoreboard</summary><p class="muted">The trend matters more than the absolute score.</p>
  <div class="scroll"><table><tr><th>Day</th>${SCORE_K.map(k=>`<th>${k[1]}</th>`).join('')}</tr>
  ${SCORE_DAYS.map(day=>`<tr><td>${day}${day===cd?' ●':''}</td>${SCORE_K.map(k=>`<td><input class="sc" type="text" data-s="${day}:${k[0]}" aria-label="Day ${day} ${k[1]}" value="${esc((P.scores[day]||{})[k[0]]||'')}"></td>`).join('')}</tr>`).join('')}</table></div></details>
  <details><summary>Day 7 checkpoint</summary><p class="muted">A mini A2-style test: 30 min listening, 30 min reading, 15 min recorded speaking, about 150 words of writing. Score each skill and fluency out of 5. The point is to find what is holding you back, not to judge yourself.</p></details>
  <details><summary>Day 21 final test</summary><p class="muted">A B1 simulation: 25 to 30 min listening on new material without subtitles, 45 min reading unseen texts, 45 min writing 160 to 200+ words, and 15 min speaking (personal interview, an interaction or problem, then express and defend an opinion). Final question: could I spend a normal day operating primarily in French?</p></details>
  <details><summary>The listening loop</summary><ol class="steps muted"><li>Listen with no subtitles. What did I understand?</li><li>Read the French transcript and find what I missed.</li><li>Listen again with no subtitles.</li><li>Shadow: speak along with the audio. Repeat.</li></ol><p class="muted">French subtitles beat English ones, which turn listening into reading English.</p></details>
  ${mapSheet?vSheet(mapSheet):''}`;
}
function vSheet(d){
  const s=dayStatus(d),p=phaseOf(d),pi=PHASES.indexOf(p),b=BOSSES[bossFor(d)],t=dayTopics(d),req=lessonPlan(d);
  return `<div class="scrim" data-a="sheetclose"></div><div class="sheet" role="dialog" aria-label="Day ${d}" style="--pc:${PC[pi]}">
  <div class="sh"><div><b>Day ${d}</b><small>Phase ${ROMAN[pi]}, ${p.n}</small></div><button class="x" data-a="sheetclose" aria-label="Close">✕</button></div>
  <p class="muted" style="margin:12px 0 4px">Most important to learn</p><ul class="topics">${t.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>
  ${DAYNOTE[d]?`<p class="muted">${esc(DAYNOTE[d])}</p>`:''}
  ${COURSE.textsFor(d).length?`<p class="muted" style="margin:12px 0 4px">Reading</p><p>${COURSE.textsFor(d).map(x=>'<span class="fr">'+esc(x.title)+'</span>'+(state.read[x.id]?' ✓':'')).join(', ')}</p>`:''}
  <p class="muted" style="margin:12px 0 4px">Lessons</p><p>${req.map(q=>`${SK[q.k].n} ×${q.need}`).join(', ')}</p>
  <p class="muted" style="margin:12px 0 4px">Boss</p><p><b>${esc(b.n)}</b>, ${bossHpFor(d)} HP</p>
  ${s==='cur'?'<button class="btn wide" data-a="tab" data-v="home">Go to this day’s lessons</button>':s==='done'?'<p><b>Done.</b> You beat this boss.</p>':`<p class="muted">Finish day ${d-1} to unlock this day.</p>`}</div>`;
}
function lessonPlan(d){
  const p=phaseOf(d),req=Object.assign({},p.q),nc=allConcepts().filter(c=>c.day===d&&c.on).length;
  req.r=COURSE.textsFor(d).length;
  if(nc>1)req.g=Math.max(req.g||0,2);
  if(!canSay&&req.l){req.w=(req.w||0)+req.l;delete req.l}
  return ['g','l','w','s','r'].filter(k=>req[k]).map(k=>({k,need:req[k]}));
}
function quests(){
  if(state.stage>21)return [];
  return lessonPlan(state.stage).map(({k,need})=>{const have=state.day.done[k]||0;return {k,need,have:Math.min(have,need),ok:have>=need}});
}
function lessonLine(k){const q=quests().find(q=>q.k===k);if(!q)return '';return q.ok?`${SK[k].n} lessons for day ${state.stage} are done.`:`${SK[k].n} lessons for day ${state.stage}: ${q.have} of ${q.need}.`}
const LDESC={g:'Translate sentences into French',l:'Hear French, type the meaning',w:'Words, dictation, then a free answer',s:'Say words aloud, then answer a question',r:'Read the day’s text, then answer questions about it'};
function vHome(){
  const L=state.levels[state.li],d=state.day,n=d.deck.length,st=state.stage,fin=st>21;
  const ph=phaseOf(curDay()),pi=PHASES.indexOf(ph),qs=fin?Object.keys(SK).map(k=>({k,need:0,have:0,ok:true})):quests(),all=qs.every(q=>q.ok);
  const nt=newToday().map(c=>c.name),topics=fin?[]:dayTopics(st);
  const mini=`<button class="mini" data-a="tab" data-v="plan" style="--pc:${PC[pi]}" aria-label="Open the map"><span class="mt"><b>Phase ${ROMAN[pi]}, ${ph.n}</b><small>${fin?'Plan complete':'Day '+st+' of 21'}</small></span><span class="dots">${Array.from({length:ph.to-ph.from+1},(_,i)=>{const dd=ph.from+i,s=dayStatus(dd);return `<i class="${s}">${s==='done'?'✓':dd}</i>`}).join('')}</span></button>`;
  const row=q=>{const off=q.k==='l'&&!canSay,focus=q.k==='g'&&nt.length?'Focus: '+nt.join(', '):LDESC[q.k];
    return `<button class="lrow e-${q.k}" data-a="go" data-k="${q.k}" ${off?'disabled':''}><span class="g"><b>${SK[q.k].n}</b><small>${esc(focus)}</small></span>${fin?'':`<span class="lp ${q.ok?'ok':''}">${q.ok?'✓ Done':q.have+' / '+q.need}</span>`}</button>`};
  const bi=bossFor(curDay()),b=BOSSES[bi];
  const bossTxt=fin?'':!all?`<p><b>${esc(b.n)}</b></p><p class="muted">${bossHpFor(st)} HP. Finish the lessons above to face it.</p><button class="btn wide" disabled>Finish the lessons first</button>`
    :n<3?`<p><b>${esc(b.n)}</b></p><p class="muted">Lessons done. You need at least 3 cards: repeat any lesson to earn more.</p><button class="btn wide" disabled>Earn ${3-n} more card${3-n===1?'':'s'}</button>`
    :`<p><b>${esc(b.n)} is waiting</b></p><p class="muted">${bossHpFor(st)} HP. The fight spends all ${n} cards, win or lose. Repeat lessons first for a stronger deck.</p><button class="btn wide" data-a="fight">Fight the boss</button>`;
  return `<div class="top">
    <div class="stat"><div class="row"><b>${esc(L.n)}</b><small>${state.xp} / ${L.x} XP</small></div><div class="bar"><i style="width:${Math.min(100,state.xp/L.x*100)}%"></i></div></div>
    <div class="stat"><div class="row"><b>${n} card${n===1?'':'s'}</b><small>${energyFor(n)} energy</small></div><div class="bar deckbar"><i style="width:${Math.min(100,n/15*100)}%"></i></div></div>
  </div>
  ${mini}
  ${fin?`<h1 style="margin-top:22px">All 21 days done</h1><p class="muted">Every boss is beaten. Keep practising: everything below still trains your French and earns XP.</p>`
  :`<h1 style="margin-top:22px">Day ${st}</h1>
  <section class="learn" style="--pc:${PC[pi]}"><p class="muted">Most important to learn</p><ul class="topics">${topics.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>${DAYNOTE[st]?`<p class="muted" style="margin-top:8px">${esc(DAYNOTE[st])}</p>`:''}${COURSE.textsFor(st).length?`<p class="muted" style="margin-top:8px">Reading: ${COURSE.textsFor(st).map(x=>'<span class="fr">'+esc(x.title)+'</span>'+(state.read[x.id]?' ✓':'')).join(', ')}</p>`:''}<p class="muted" style="margin-top:8px"><b>${ph.focus[0][0]}.</b> ${esc(ph.focus[0][1])}</p></section>`}
  <h2>${fin?'Practice':'Lessons'}</h2>
  ${fin?'':'<p class="muted">Each lesson passed with half or more right earns a card. Repeat any lesson for more cards; 80% or more brings the strong ones.</p>'}
  <div class="lessons">${qs.map(row).join('')}</div>
  ${fin?'':`<section class="bosspanel">${tarot(bi,'Day '+st)}<div>${bossTxt}</div></section>`}`;
}

