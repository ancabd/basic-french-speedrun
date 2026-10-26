const TABS=[['home','Lessons','♠'],['plan','Map','★'],['deck','Deck','♥'],['words','Words','♦'],['setup','Setup','♣']];
function render(){
  const app=$('#app'),full=['session','battle','reward','loading'].includes(view);
  app.className=full?'full':'';
  app.innerHTML=view==='home'?vHome():view==='plan'?vMap():view==='deck'?vDeck():view==='words'?vWords():view==='setup'?vSetup():view==='session'?vSession():view==='reward'?vReward():view==='battle'?vBattle():`<div class="spacer"></div><p class="center"><b>Writing new sentences for you…</b></p><p class="center muted">Built from your studied concepts and the words you know.</p><div class="spacer"></div>`;
  const nav=$('#nav');nav.className=full?'hide':'';
  nav.innerHTML=TABS.map(t=>`<button data-a="tab" data-v="${t[0]}" class="${view===t[0]?'on':''}"><i>${t[2]}</i>${t[1]}</button>`).join('');
  if(view==='session'&&sess.ph==='ask'){const q=cur(),a=$('#ans');if(a&&q.k!=='fs')a.focus();if(q.k==='l'||q.k==='w')say(q.it.fr)}
  if(view==='session'&&sess.ph==='fb'){const n=$('#nx');if(n)n.focus()}
  if(view==='battle'&&B&&B.q&&B.q.ans!=null){const g=$('#qgo');if(g)g.focus()}
  if(view==='plan'&&mapScroll){mapScroll=false;const c=document.querySelector('.nd.cur');if(c)c.scrollIntoView({block:'center'})}
}

/* ---------- actions ---------- */
const A={
  tab:d=>{view=d.v;B=null;mapSheet=null;mapScroll=d.v==='plan';importMsg=null;delArm=null;window.scrollTo(0,0);render()},
  node:d=>{mapSheet=+d.d;render()},
  sheetclose:()=>{mapSheet=null;render()},
  jump:()=>{const n=+$('#jump').value;if(!(n>=1&&n<=21))return;state.stage=n;state.day.done={};save();toast('Now on day '+n+'.');view='home';render()},
  go:d=>startSession(d.k),
  home:()=>{view='home';reward=null;B=null;render()},
  cut:d=>{if(!reward)return;const id=state.day.deck.splice(+d.i,1)[0];reward=null;view='home';save();render();if(id)toast(CARDS[id].n+' crossed out of your deck.')},
  fight:()=>{if(state.stage<=21&&state.day.deck.length>=3&&quests().every(q=>q.ok))startBattle()},
  play:d=>play(+d.i),endturn:endTurn,
  check,next,override,listen,dictate,
  qans:d=>qAnswer(+d.i),qgo:qResolve,
  sayq:()=>say(cur().q.fr),
  rstart:()=>{if(!sess||sess.k!=='r')return;sess.ph='ask';glossSel=null;window.scrollTo(0,0);render()},
  ropt:d=>readAnswer(+d.i),
  gloss:d=>{glossSel=glossSel===+d.i?null:+d.i;render()},
  saytext:()=>say(sess.text.paras.join(' ')),
  sayword:()=>{if(sess&&sess.text&&glossSel!=null)say(sess.text.gloss[glossSel].f)},
  say:()=>{const q=cur();say(q.it?q.it.fr:q.ans)},
  self:d=>{stopRec();settle(d.r,'')},
  acc:d=>{const a=$('#ans');if(!a)return;const s=a.selectionStart??a.value.length,e=a.selectionEnd??s;a.value=a.value.slice(0,s)+d.c+a.value.slice(e);a.focus();a.setSelectionRange(s+1,s+1)},
  quit:()=>{stopRec();try{speechSynthesis.cancel()}catch(e){}sess=null;view='home';render()},
  take:d=>{state.day.deck.push(d.id);toast(CARDS[d.id].n+' joined your deck.');reward=null;view='home';save();render()},
  import:()=>{const r=parseBulk($('#bulk').value,$('#blv').value,$('#blist').value.trim()||'My words'),n=addBulk(r);
    importMsg={ok:(n.ni||n.nc)?`Added ${n.ni} word${n.ni===1?'':'s'} or phrase${n.ni===1?'':'s'} and ${n.nc} grammar concept${n.nc===1?'':'s'}.`:(r.errors.length?'Nothing was added.':n.dup?'Nothing new to add: those are already in the course or your lists.':'Nothing new to add. Paste one entry per line, like “le chat = the cat”.'),errors:r.errors.slice(0,8)};
    if((n.ni||n.nc)&&n.dup)importMsg.ok+=` ${n.dup} already in the course or your lists were skipped.`;
    const keep=r.errors.length?$('#bulk').value:'';if(n.ni||n.nc)save();render();$('#bulk').value=keep},
  dellist:d=>{if(delArm!==d.n){delArm=d.n;return render()}state.mine.items=state.mine.items.filter(i=>i.list!==d.n);state.mine.concepts=state.mine.concepts.filter(c=>c.list!==d.n);delArm=null;save();render()},
  savelv:()=>{const cur=state.levels[+$('#curlv').value]?.n,ls=[];
    $('#lvls').value.split(/\n/).forEach(l=>{const m=l.trim().match(/^(.+?)\s*=\s*(\d+)$/);if(m)ls.push({n:m[1].trim(),x:Math.max(10,+m[2])});else if(l.trim())ls.push({n:l.trim(),x:400})});
    if(!ls.length)return toast('Keep at least one level.');
    state.levels=ls;const i=ls.findIndex(l=>l.n===cur);state.li=i>=0?i:Math.min(state.li,ls.length-1);state.hp=Math.min(state.hp,maxHp());save();toast('Levels saved.');render()},
  export:()=>{$('#bk').value=JSON.stringify(state);$('#bk').select()},
  restore:()=>{try{const s=JSON.parse($('#bk').value);if(!s||s.v!==1||!(Array.isArray(s.items)||s.srs))throw 0;adopt(s);save();toast('Backup restored.');view='home';render()}catch(e){toast('That is not a backup from this app.')}}
};
document.addEventListener('click',e=>{const el=e.target.closest('[data-a]');if(!el||el.disabled)return;const f=A[el.dataset.a];if(f)f(el.dataset)});
document.addEventListener('change',e=>{const t=e.target,ds=t.dataset||{};
  if(ds.c&&t.type==='checkbox'){const c=allConcepts().find(x=>x.id===ds.c);if(c){c.on=t.checked;save()}}
  else if(ds.p){if(t.checked)state.plan.done[ds.p]=true;else delete state.plan.done[ds.p];save()}
  else if(ds.s){const [d,k]=ds.s.split(':');(state.plan.scores[d]=state.plan.scores[d]||{})[k]=t.value.trim();save()}
  else if(t.id==='pstart'&&t.value){state.plan.start=t.value;save();render()}
  else if(t.id==='diff'){state.diff=+t.value;save();toast('Boss difficulty saved.')}
});
document.addEventListener('input',e=>{if(e.target.id==='ans'){const c=$('#wc');if(c)c.textContent=words(e.target.value)}});
document.addEventListener('keydown',e=>{if(e.key!=='Enter'||view!=='session'||e.target.tagName==='TEXTAREA')return;if(sess.ph==='ask'&&e.target.id==='ans'){e.preventDefault();check()}else if(sess.ph==='fb'&&e.target.tagName!=='BUTTON'){e.preventDefault();next()}});
try{speechSynthesis.getVoices()}catch(e){}

load();render();initCloud();initAI();
