/* ---------- sessions ---------- */
/* ---------- free questions (longer answers) ---------- */
const FREEQ=[[
 ["Présente-toi : comment tu t'appelles, d'où tu viens, où tu habites ?","Introduce yourself: your name, where you are from, where you live."],
 ["Quelles langues est-ce que tu parles, et pourquoi tu apprends le français ?","Which languages do you speak, and why are you learning French?"],
 ["Qu'est-ce que tu aimes faire pendant ton temps libre ?","What do you like to do in your free time?"],
 ["Qu'est-ce que tu as fait hier ?","What did you do yesterday?"],
 ["Qu'est-ce que tu vas faire demain ?","What are you going to do tomorrow?"],
 ["Qu'est-ce que tu fais aujourd'hui ?","What are you doing today?"],
 ["Parle de ta famille.","Talk about your family."]],[
 ["Décris ta ville ou ton quartier.","Describe your city or your neighbourhood."],
 ["Décris une personne importante pour toi.","Describe a person who matters to you."],
 ["Raconte ton dernier week-end.","Tell me about your last weekend."],
 ["Quels sont tes projets pour l'année prochaine ?","What are your plans for next year?"],
 ["Tu préfères la ville ou la campagne ? Explique pourquoi.","Do you prefer the city or the countryside? Explain why."],
 ["Raconte un voyage que tu as fait.","Tell me about a trip you took."],
 ["Décris un problème que tu as eu récemment et comment tu l'as résolu.","Describe a problem you had recently and how you solved it."],
 ["Un ami visite ta ville ce week-end. Qu'est-ce que tu lui proposes de faire ?","A friend is visiting your city this weekend. What do you suggest doing?"],
 ["Comment était ta vie quand tu étais enfant ?","What was your life like when you were a child?"]],[
 ["Raconte ta journée d'hier en détail, du matin au soir.","Describe yesterday in detail, from morning to evening."],
 ["Quel film ou quelle série as-tu vu récemment ? Qu'est-ce que tu en as pensé ?","Which film or series did you watch recently? What did you think of it?"],
 ["Qu'est-ce que tu viens de faire, et qu'est-ce que tu es en train de faire maintenant ?","What have you just done, and what are you doing right now?"],
 ["À ton avis, quelle est la meilleure façon d'apprendre une langue ?","In your opinion, what is the best way to learn a language?"],
 ["Décris ta routine du matin.","Describe your morning routine."],
 ["Parle de quelque chose que tu as lu ou écouté en français cette semaine.","Talk about something you read or listened to in French this week."],
 ["Qu'est-ce qui est difficile pour toi en français, et pourquoi ?","What is difficult for you in French, and why?"],
 ["Raconte un souvenir d'enfance.","Tell a childhood memory."]],[
 ["Que penses-tu des réseaux sociaux ? Donne des avantages et des inconvénients.","What do you think of social media? Give pros and cons."],
 ["Si tu pouvais vivre n'importe où, où est-ce que tu vivrais, et pourquoi ?","If you could live anywhere, where would you live, and why?"],
 ["Est-ce que le télétravail est une bonne chose ? Défends ton opinion.","Is remote work a good thing? Defend your opinion."],
 ["Quel est le plus grand problème de ta ville, et quelle solution proposes-tu ?","What is your city's biggest problem, and what solution do you propose?"],
 ["Est-ce que la technologie rend la vie meilleure ?","Does technology make life better?"],
 ["Qu'est-ce que tu aurais aimé apprendre à l'école ?","What would you have liked to learn at school?"],
 ["Faut-il voyager pour comprendre une autre culture ?","Do you need to travel to understand another culture?"],
 ["Qu'est-ce qui rend une amitié solide ?","What makes a friendship strong?"],
 ["Ton train est annulé et tu dois arriver ce soir. Explique le problème au guichet et demande une solution.","Your train is cancelled and you must arrive tonight. Explain the problem at the ticket desk and ask for a solution."]]];
function freeQ(k){
  const pi=PHASES.indexOf(phaseOf(Math.max(1,planDay()))),src=Math.random()<.65?FREEQ[pi]:FREEQ.slice(0,pi+1).flat(),min=(k==='fw'?[25,40,50,60]:[20,30,40,50])[pi];
  /* Writing often asks about a text you have read today */
  const readToday=COURSE.textsFor(planDay()).filter(t=>t.write&&state.read[t.id]);
  if(k==='fw'&&readToday.length&&Math.random()<.6){const t=rnd(readToday);return {k,q:{fr:t.write.fr,en:t.write.en},min,text:t.title}}
  let q=rnd(src);for(let i=0;i<6&&state.lastFree===q[0];i++)q=rnd(src);state.lastFree=q[0];
  return {k,q:{fr:q[0],en:q[1]},min};
}
const words=s=>(s.trim().match(/\S+/g)||[]).length;
let rec=null;
function recBtn(){const b=$('#dic');if(b)b.textContent=rec?'Stop speaking':'Start speaking';const c=$('#wc'),a=$('#ans');if(c&&a)c.textContent=words(a.value)}
function stopRec(){if(rec){const r=rec;rec=null;try{r.stop()}catch(e){}}recBtn()}
function dictate(){
  if(rec)return stopRec();
  try{const r=new SR();r.lang='fr-FR';r.continuous=true;r.interimResults=false;
    r.onresult=e=>{const a=$('#ans');if(!a)return;for(let i=e.resultIndex;i<e.results.length;i++)if(e.results[i].isFinal){const t=e.results[i][0].transcript.trim();if(t&&!a.value.trim().endsWith(t))a.value=(a.value.trim()?a.value.trim()+' ':'')+t}recBtn()};
    r.onerror=e=>{if(e.error==='not-allowed'||e.error==='service-not-allowed'){rec=null;srOff=true;toast('The microphone is not available here. Grade yourself instead.');render()}};
    r.onend=()=>{if(rec===r){try{r.start()}catch(e){rec=null;recBtn()}}};
    rec=r;r.start();recBtn();
  }catch(e){rec=null;srOff=true;render()}
}
const N=6;
async function startSession(k){
  if(k==='r')return startReading();
  let qs=[];
  if(k==='g'){
    qs=templateQs(N);
    if(AI&&studied().length){
      view='loading';render();
      try{const ai=await aiSentences(qs.length?3:N);if(ai.length)qs=shuffle(qs.slice(0,N-ai.length).concat(ai))}catch(e){if(!qs.length)toast('Could not write new sentences just now.')}
    }
    if(!qs.length){toast('Add a grammar concept with sentence patterns first.');view='words';return render()}
  }else{
    if(k==='w'){const a=pick('v',canSay?3:N).map(it=>({k:'v',it,ans:it.fr})),used=new Set(a.map(q=>q.it.id));
      const b=canSay?pick('w',N*2).filter(it=>!used.has(it.id)).slice(0,N-a.length).map(it=>({k:'w',it,ans:it.fr})):[];qs=shuffle(a.concat(b))}
    else qs=pick(k,N).map(it=>({k,it,ans:it.fr}));
    if(!qs.length){toast('Add some words first.');view='words';return render()}
    if(k==='w')qs.push(freeQ('fw'));else if(k==='s')qs.push(freeQ('fs'));
  }
  sess={k,qs,i:0,right:0,ph:'ask'};view='session';render();
}
const cur=()=>sess.qs[sess.i];
function say(t){try{if(!('speechSynthesis' in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='fr-FR';const v=speechSynthesis.getVoices().find(v=>/^fr/i.test(v.lang));if(v)u.voice=v;u.rate=.9;speechSynthesis.speak(u)}catch(e){}}
const canSay='speechSynthesis' in window;
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
function settle(r,val){
  const q=cur();if(sess.ph!=='ask')return;q.res=r;q.val=val;sess.ph='fb';
  if(r!=='no')sess.right++;
  if(q.it){q.prev=q.it.s[q.k]?q.it.s[q.k].slice():null;srs(q.it,q.k,r!=='no')}
  state.started=true;save();render();
}
function check(){
  const q=cur(),el=$('#ans'),val=el?el.value.trim():'';if(!val||sess.ph!=='ask')return;
  if(q.k==='fw'||q.k==='fs'){stopRec();return gradeFree(val)}
  settle(q.k==='l'?checkEn(val,q.it.en):checkFr(val,q.ans,q.alt),val);
}
async function gradeFree(val){
  const q=cur(),spoken=q.k==='fs';if(q.busy)return;
  const lenOk=words(val)>=Math.ceil(q.min*.7);
  if(!AI){q.fb={off:true};return settle(lenOk?'ok':'no',val)}
  q.busy=true;const b=$('#chk');if(b){b.disabled=true;b.textContent='Reading your answer…'}
  let fb=null;
  try{fb=await withTimeout(AI.json(`A learner of French at level ${state.levels[state.li].n}, on day ${Math.max(1,planDay())} of a 21-day intensive course, was asked this question: "${q.q.fr}"
They ${spoken?'answered aloud. Below is a speech-recognition transcript of what they said, so ignore punctuation, capitalisation and spelling, and judge only grammar, word choice and whether it answers the question':'answered in writing'}. About ${q.min} words or more were requested.
Their answer: """${val}"""
Grade it for a learner at that level. Return only JSON: {"score":0-100,"corrected":"their answer with every error fixed, keeping their meaning and their wording wherever it was correct","notes":["up to 4 short notes in English, each naming one error and its fix, recurring errors first"]}. Score 60 or more means understandable French that answers the question at roughly the requested length, with only minor errors.`,{modelTier:'default',cache:false}),45000)}catch(e){}
  q.busy=false;
  if(fb&&typeof fb.score==='number'){q.fb=fb;if(fb.corrected)q.ans=String(fb.corrected);settle(fb.score>=60?'ok':'no',val)}
  else{q.fb={off:true};settle(lenOk?'ok':'no',val)}
}
function override(){const q=cur();if(q.res!=='no')return;q.res='ok';sess.right++;if(q.it){srsRestore(q.it,q.k,q.prev);srs(q.it,q.k,true)}save();render()}
function next(){if(sess.ph!=='fb')return;if(sess.i<sess.qs.length-1){sess.i++;sess.ph='ask';render()}else finish()}
function offer(k,acc){
  const ok=id=>acc>=.8||CARDS[id].r===0,ids=Object.keys(CARDS).filter(ok);
  return shuffle(ids.filter(id=>CARDS[id].s===k)).concat(shuffle(ids.filter(id=>CARDS[id].s!==k))).slice(0,3);
}
function finish(){
  const n=sess.qs.length,acc=sess.right/n,xp=sess.right*(sess.k==='g'?15:10);
  const passed=acc>=.5;addXp(xp);if(passed)state.day.done[sess.k]=(state.day.done[sess.k]||0)+1;
  if(passed&&sess.text)state.read[sess.text.id]=(state.read[sess.text.id]||0)+1;
  reward={k:sess.k,right:sess.right,n,xp,passed,opts:passed?offer(sess.k,acc):[]};
  sess=null;view='reward';save();render();
}
function listen(){
  const q=cur();
  try{const r=new SR();r.lang='fr-FR';r.maxAlternatives=3;
    r.onresult=e=>{const alts=[...e.results[0]].map(a=>a.transcript);settle(alts.some(a=>checkFr(a,q.it.fr,[])!=='no')?'ok':'no','Heard: '+alts[0])};
    r.onerror=e=>{if(e.error==='not-allowed'||e.error==='service-not-allowed'){srOff=true;toast('The microphone is not available here. Grade yourself instead.');render()}else toast('Did not catch that. Try again.')};
    r.start();toast('Listening…');
  }catch(e){srOff=true;render()}
}


/* ---------- reading lesson ----------
   Read the day's text (tap a highlighted word for its meaning), then answer multiple-choice questions.
   Texts you have not passed yet come first; after that the day's texts take turns. */
function textForToday(){
  const d=planDay(),ts=state.stage>21?COURSE.texts:COURSE.textsFor(d);if(!ts.length)return null;
  return ts.slice().sort((a,b)=>(state.read[a.id]||0)-(state.read[b.id]||0))[0];
}
function startReading(){
  const t=textForToday();if(!t){toast('There is no text for this day yet.');return}
  glossSel=null;
  sess={k:'r',text:t,qs:t.qs.map(q=>{const ord=shuffle(q.o.map((_,i)=>i));return {k:'rq',q:q.q,opts:ord.map(i=>q.o[i]),c:ord.indexOf(q.c)}}),i:0,right:0,ph:'read'};
  view='session';window.scrollTo(0,0);render();
}
function readAnswer(i){const q=cur();if(sess.ph!=='ask')return;q.pick=i;settle(i===q.c?'ok':'no',q.opts[i])}
/* A glossary word; when tapped, its meaning opens inline right after it (tap again to close). */
function glossBtn(t,i,shown){const on=glossSel===i,g=t.gloss[i];
  return `<button class="gl ${on?'on':''}" data-a="gloss" data-i="${i}" aria-expanded="${on}">${esc(shown)}</button>`+(on?`<span class="glt" role="note"><b>${esc(g.f)}</b> ${esc(g.e)}${canSay?' <button class="link" data-a="sayword">Hear it</button>':''}</span>`:'')}
/* The text as HTML, with each glossary word turned into a button (first occurrence only, longest forms first). */
function textHtml(t){
  const order=t.gloss.map((g,i)=>i).sort((a,b)=>t.gloss[b].m.length-t.gloss[a].m.length),done=new Set();
  return t.paras.map(p=>{const hits=[];let s=p;
    order.forEach(i=>{if(done.has(i))return;const g=t.gloss[i];
      const m=s.match(glossRe(g.m))||(g.alt!==g.m&&g.alt?s.match(glossRe(g.alt)):null);if(!m)return;done.add(i);hits.push([i,m[0]]);s=s.slice(0,m.index)+'\u0001'+(hits.length-1)+'\u0002'+s.slice(m.index+m[0].length)});
    return '<p>'+s.split(/\u0001(\d+)\u0002/).map((part,j)=>j%2?glossBtn(t,hits[+part][0],hits[+part][1]):esc(part)).join('')+'</p>'}).join('');
}
