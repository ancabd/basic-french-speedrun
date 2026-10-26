/* ---------- views ---------- */
function cardHtml(id,attrs,cls){const c=CARDS[id];if(!c)return '';return `<button class="card k-${c.s} r${c.r} ${cls||''}" ${attrs||''}><span class="cost">${c.c}</span><span class="cn">${c.n}</span><span class="cd">${c.d}</span><span class="ck">${SK[c.s].n}${c.r?' ✦':''}${c.atk?', asks a question':''}</span></button>`}
function tarot(i,label){const b=BOSSES[i];return `<div class="tarot b${i}"><div class="num">${esc(label||'')}</div><div class="glyph">${esc(b.g)}</div><div class="nm">${esc(b.n)}</div></div>`}
function vDeck(){
  const d=state.day.deck;
  return `<h1>Today’s deck</h1><p class="muted">${d.length?`${d.length} card${d.length===1?'':'s'}. Every boss fight spends the whole deck, win or lose. To remove one, finish a Writing lesson and choose to cross a card out.`:'Your deck is empty. Pass any lesson to earn your first card.'}</p>
  <div class="cards">${d.map(id=>cardHtml(id,'tabindex="-1"')).join('')}</div>
  <h2>All 8 cards</h2>
  <div class="cards">${Object.keys(CARDS).map(id=>cardHtml(id,'tabindex="-1"')).join('')}</div>
  <p class="muted">✦ marks a strong card, offered after a round scored 80% or more. Each card is labelled with the exercise that gives it most often.</p>
  <h2>How a fight works</h2>
  <p class="muted">Your Energy each turn grows with your deck: 3, then 1 more for every 3 cards beyond 7 (4 at 10 cards, 5 at 13, up to 6 at 16). You draw 2 more cards than your Energy. Every attack card asks a French question first: right, it hits at full strength; wrong, at half. Every boss attack asks one too: right, you dodge half the damage. Weak means 25% less damage dealt, Vulnerable means 50% more damage taken.</p>`;
}
function vWords(){
  const lists={},row=(o,n)=>{const L=(lists[n]=lists[n]||{n,w:0,c:0,course:!!o.course,day:0});if(o.day&&(!L.day||o.day<L.day))L.day=o.day;return L};
  allItems().forEach(i=>row(i,i.list).w++);allConcepts().forEach(c=>row(c,c.list).c++);
  const mine=Object.values(lists).filter(l=>!l.course),course=Object.values(lists).filter(l=>l.course).sort((a,b)=>a.day-b.day||a.n.localeCompare(b.n));
  const lrow=l=>`<div><div class="g"><b>${esc(l.n)}</b><br><small>${l.w?l.w+' word'+(l.w===1?'':'s')+' and phrase'+(l.w===1?'':'s'):''}${l.w&&l.c?', ':''}${l.c?l.c+' grammar concept'+(l.c===1?'':'s'):''}${l.course?(l.day?', from day '+l.day:'')+(l.day>planDay()?' (locked)':''):''}</small></div>${l.course?'':`<button class="link" data-a="dellist" data-n="${esc(l.n)}">${delArm===l.n?'Tap again to delete':'Delete'}</button>`}</div>`;
  const crow=c=>`<div><input type="checkbox" id="c${c.id}" data-c="${c.id}" ${c.on?'checked':''}><label class="g" for="c${c.id}" style="margin:0">${esc(c.name)}<br><small style="font-weight:400">${c.day?'Day '+c.day+(dayOk(c)?'':' (locked)')+', ':''}${esc(c.list)}, ${c.t.length} pattern${c.t.length===1?'':'s'}</small></label></div>`;
  const cs=allConcepts().slice().sort((a,b)=>(a.day||0)-(b.day||0));
  return `<h1>Words and grammar</h1>
  <label for="bulk">Paste a list</label>
  <textarea id="bulk" spellcheck="false" autocapitalize="off" placeholder="le chat = the cat&#10;la gare = the station"></textarea>
  <div class="two"><div><label for="blist">List name</label><input type="text" id="blist" value="My words"></div>
  <div><label for="blv">Level</label><select id="blv">${state.levels.map((l,i)=>`<option ${i===state.li?'selected':''}>${esc(l.n)}</option>`).join('')}</select></div></div>
  <p style="margin-top:12px"><button class="btn wide" data-a="import">Add to my words</button></p>
  ${importMsg?`<p>${esc(importMsg.ok)}</p>${importMsg.errors.map(e=>`<p class="err">${esc(e)}</p>`).join('')}`:''}
  <details><summary>How to format a list</summary>
  <p class="muted">One entry per line, French first, then <b>=</b> (or a tab, so spreadsheet columns paste straight in), then English. Use <b>/</b> between English answers that should both count.</p>
<pre># list: Travel
# level: B1.1
le quai = the platform
le billet = the ticket / the fare
Je me suis trompé de train = I got on the wrong train

## Futur simple
{Je prendrai|Nous prendrons} le {train|bus} = {I will take|We will take} the {train|bus}</pre>
  <p class="muted">A line starting with <b>##</b> names a grammar concept. The lines right under it are sentence patterns: each {a|b} slot picks one option at random, and the same pick is used on the English side, so the first French slot pairs with the first English slot. A blank line ends the concept. Put <b># day: 9</b> above a concept to keep it locked until day 9 of your plan. With Claude available, Grammar rounds also get new sentences written from your studied concepts and the words you know.</p>
  <p class="muted">Words tagged with a level above your current one wait until you reach it. A JSON array of {"fr","en","level"} objects works too.</p></details>
  <h2>Your lists</h2>
  ${mine.length?`<div class="list">${mine.map(lrow).join('')}</div>`:'<p class="muted">Nothing of your own yet. Paste a list above.</p>'}
  <h2>The course</h2>
  <p class="muted">Words, phrases and grammar that come with the 21-day plan. Each unlocks on its day; words from a day's texts are in lists named after the text.</p>
  <details><summary>${course.length} course lists</summary><div class="list">${course.map(lrow).join('')}</div></details>
  <h2>Grammar concepts</h2>
  <p class="muted">Ticked concepts count as studied once their day comes, and appear in Grammar lessons and boss questions. Untick one to leave it out.</p>
  <details><summary>${cs.length} concepts</summary><div class="list">${cs.map(crow).join('')}</div></details>`;
}
function vSetup(){
  return `<h1>Setup</h1>
  <h2>Levels</h2>
  <p class="muted">One level per line: its name, then the XP needed to finish it. Add, rename, or reorder as you like.</p>
  <textarea id="lvls" spellcheck="false" style="min-height:210px">${esc(state.levels.map(l=>l.n+' = '+l.x).join('\n'))}</textarea>
  <label for="curlv">Your current level</label>
  <select id="curlv">${state.levels.map((l,i)=>`<option value="${i}" ${i===state.li?'selected':''}>${esc(l.n)}</option>`).join('')}</select>
  <p style="margin-top:12px"><button class="btn wide" data-a="savelv">Save levels</button></p>
  <h2>Boss difficulty</h2>
  <select id="diff">${[[.7,'Gentle'],[1,'Standard'],[1.4,'Brutal']].map(o=>`<option value="${o[0]}" ${(state.diff||1)==o[0]?'selected':''}>${o[1]}</option>`).join('')}</select>
  <h2>How the game works</h2>
  <p class="muted">The plan is 21 days, done at your own pace. Each day has lessons to pass, weighted the way its phase asks, including one or two short texts to read. Words from a day’s texts become flashcards from that day on. Once they are done, that day’s boss opens; beat it to unlock the next day. Every passed lesson earns a card, and you can repeat any lesson for more. A boss fight spends your whole deck, win or lose, and you start each fight at full HP. Every attack, yours or the boss’s, comes with a multiple-choice French question that decides how hard it lands. Bosses get tougher with each day; your maximum HP grows by 5 with each level.</p>
  <h2>Jump to a day</h2>
  <p class="muted">If you are further along, or want to redo a day, go straight to it. Days before it count as done.</p>
  <div class="two"><select id="jump" aria-label="Day">${Array.from({length:21},(_,i)=>`<option value="${i+1}" ${i+1===curDay()?'selected':''}>Day ${i+1}</option>`).join('')}</select><button class="btn alt" data-a="jump">Go to this day</button></div>
  <h2>Your data</h2>
  <p class="muted">${esc(syncMsg)}</p>
  <div class="rowbtns"><button class="btn alt" data-a="export">Show backup text</button><button class="btn alt" data-a="restore">Restore from text</button></div>
  <textarea id="bk" spellcheck="false" style="margin-top:10px" placeholder="Backup text appears here. To restore, paste a backup and tap Restore from text."></textarea>`;
}
const ACC=['é','è','ê','à','â','ç','ù','û','î','ï','ô','œ','’'];
function vSession(){
  if(sess.k==='r')return vReading();
  const q=cur(),k=q.k,fb=sess.ph==='fb',frIn=k!=='l';
  const pips=sess.qs.map((x,j)=>`<i class="${x.res?(x.res==='no'?'bad':'good'):j===sess.i?'cur':''}"></i>`).join('');
  const hear=`<button class="btn" data-a="say">Play the audio</button>`;
  const P={v:()=>`<div class="ask">Type this in French</div><div class="big">${esc(q.it.en)}</div>`,
    g:()=>`<div class="ask">Translate into French</div><div class="big">${esc(q.en)}</div>${q.concept?`<span class="chip">${esc(q.concept)}</span>`:''}`,
    l:()=>`<div class="ask">What does this mean in English?</div>${hear}`,
    w:()=>`<div class="ask">Type what you hear, in French</div>${hear}`,
    s:()=>`<div class="ask">Say this aloud</div><div class="big fr">${esc(q.it.fr)}</div>`,
    fw:()=>`<div class="ask">Free answer: write ${q.min} words or more in French</div><div class="big fr free">${esc(q.q.fr)}</div><div class="ask" style="margin:10px 0 0">${esc(q.q.en)}</div>`,
    fs:()=>`<div class="ask">Free answer: speak in French, ${q.min} words or more</div><div class="big fr free">${esc(q.q.fr)}</div><div class="ask" style="margin:10px 0 0">${esc(q.q.en)}</div>`}[k]();
  const free=k==='fw'||k==='fs',selfBtns=`<div class="rowbtns"><button class="btn alt" data-a="self" data-r="no">Not yet</button><button class="btn alt" data-a="self" data-r="ok">I answered in French</button></div>`;
  let body;
  if(fb){
    const head=free?(q.res==='ok'?'Good answer':'Keep working on this one'):q.res==='ok'?'Correct':q.res==='accent'?'Correct, but check the accents':'Not quite';
    const fr=q.it?q.it.fr:q.ans,en=q.it?q.it.en:q.en;
    let det;
    if(free){const f=q.fb||{self:true};det=f.self?`<p>You graded this one yourself.</p>`:f.off?`<p>The corrector could not be reached, so this was judged on length alone (${words(q.val)} words).</p>`:`<p>Score ${Math.round(f.score)} of 100, ${words(q.val)} words.</p>${k==='fs'?`<p class="muted">Heard: ${esc(q.val)}</p>`:''}<p class="muted" style="margin:10px 0 2px">Corrected</p><p class="a">${esc(f.corrected||'')}</p>${(f.notes||[]).map(n=>`<p>${esc(n)}</p>`).join('')}`}
    else det=`<p class="a">${esc(fr)}</p><p>${esc(en)}</p>${q.res!=='ok'&&q.val?`<p class="muted">You answered: ${esc(q.val)}</p>`:''}`;
    body=`<div class="fb ${q.res==='no'?'no':''}"><b>${head}</b>${det}</div>
    <div class="rowbtns">${canSay&&(!free||q.ans)?`<button class="btn alt" data-a="say">${free?'Hear the correction':'Hear it'}</button>`:''}<button class="btn" data-a="next" id="nx">${sess.i<sess.qs.length-1?'Next':'Finish round'}</button></div>
    ${q.res==='no'&&!free?'<p class="center"><button class="link" data-a="override">My answer was right</button></p>':''}`;
  }else if(k==='s'){
    body=`<div class="rowbtns">${canSay?'<button class="btn alt" data-a="say">Hear it</button>':''}${SR&&!srOff?'<button class="btn" data-a="listen">Speak now</button>':''}</div>
    <p class="muted" style="margin-top:16px">${SR&&!srOff?'Or say it, listen to the model, and grade yourself:':'Say it, listen to the model, then grade yourself:'}</p>
    <div class="rowbtns"><button class="btn alt" data-a="self" data-r="no">Not yet</button><button class="btn alt" data-a="self" data-r="ok">I said it right</button></div>`;
  }else if(k==='fw'){
    body=`<textarea id="ans" lang="fr" spellcheck="false" autocapitalize="sentences" aria-label="Your answer"></textarea><div class="acc">${ACC.map(c=>`<button data-a="acc" data-c="${c}">${c}</button>`).join('')}</div><p class="muted"><span id="wc">0</span> of ${q.min} words</p><button class="btn wide" data-a="check" id="chk">Check my writing</button>`;
  }else if(k==='fs'){
    const hearQ=canSay?'<button class="btn alt" data-a="sayq">Hear the question</button>':'';
    body=SR&&!srOff&&AI?`<div class="rowbtns">${hearQ}<button class="btn" data-a="dictate" id="dic">Start speaking</button></div>
    <textarea id="ans" lang="fr" spellcheck="false" style="margin-top:12px" aria-label="What you said" placeholder="What you say appears here. Fix anything the microphone misheard before checking."></textarea>
    <p class="muted"><span id="wc">0</span> of ${q.min} words</p><button class="btn wide" data-a="check" id="chk">Check my answer</button>
    <p class="muted" style="margin-top:16px">Or answer aloud without the microphone and grade yourself:</p>${selfBtns}`
    :`<div class="rowbtns">${hearQ}</div><p class="muted" style="margin-top:16px">Answer aloud for about a minute, then grade yourself:</p>${selfBtns}`;
  }else{
    body=`<input type="text" id="ans" lang="${frIn?'fr':'en'}" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" enterkeyhint="done" aria-label="Your answer" placeholder="${frIn?'En français':'In English'}">
    ${frIn?`<div class="acc">${ACC.map(c=>`<button data-a="acc" data-c="${c}">${c}</button>`).join('')}</div>`:'<div style="height:12px"></div>'}
    <button class="btn wide" data-a="check" id="chk">Check answer</button>`;
  }
  return `<div class="sbar"><button class="x" data-a="quit" aria-label="Leave round">✕</button><div class="pips">${pips}</div></div><div class="prompt">${P}</div>${body}`;
}
function vReward(){
  const r=reward,head=`<h1>${r.right} of ${r.n} correct</h1><p class="muted">+${r.xp} XP. ${r.passed?esc(lessonLine(r.k)):'Get at least half right for the lesson to count.'}</p>`;
  return `${head}${r.opts.length?`<h2>Pick one card for your deck</h2><div class="cards">${r.opts.map(id=>cardHtml(id,`data-a="take" data-id="${id}"`)).join('')}</div>${r.k==='w'&&state.day.deck.length?`<h2>Or cross out a card you hold</h2><p class="muted">Writing is editing: instead of taking a card, cross one out of your deck so your best cards come up more often.</p><div class="cards">${state.day.deck.map((id,i)=>cardHtml(id,`data-a="cut" data-i="${i}"`)).join('')}</div>`:''}<p class="center" style="margin-top:14px"><button class="link" data-a="home">Skip</button></p>`
    :`<p>Get at least half right to earn a card. Another round?</p><div class="rowbtns"><button class="btn alt" data-a="home">Back to lessons</button><button class="btn" data-a="go" data-k="${r.k}">Try again</button></div>`}`;
}
function vReading(){
  const t=sess.text,ph=sess.ph;
  const pips=sess.qs.map((x,j)=>`<i class="${x.res?(x.res==='no'?'bad':'good'):j===sess.i&&ph!=='read'?'cur':''}"></i>`).join('');
  const head=`<div class="sbar"><button class="x" data-a="quit" aria-label="Leave the lesson">✕</button><div class="pips">${pips}</div></div>`;
  const bar='';
  if(ph==='read')return `${head}<article class="rtext"><p class="muted">Day ${t.day} reading</p><h1 class="fr">${esc(t.title)}</h1>
    ${canSay?'<p><button class="btn alt" data-a="saytext">Listen to the text</button></p>':''}<div class="rbody fr">${textHtml(t)}</div></article>
    <p class="muted">Tap a highlighted word to see what it means. These words become flashcards from today.</p>
    <button class="btn wide" data-a="rstart">Answer ${t.qs.length} questions</button>${bar}`;
  const q=cur(),done=ph==='fb';
  return `${head}<div class="prompt"><div class="ask">${esc(t.title)}: question ${sess.i+1} of ${sess.qs.length}</div><div class="big fr rq">${esc(q.q)}</div></div>
  <div class="qo">${q.opts.map((o,i)=>`<button class="fr ${done&&i===q.c?'right':''} ${done&&i===q.pick&&i!==q.c?'wrong':''}" data-a="ropt" data-i="${i}" ${done?'disabled':''}>${esc(o)}</button>`).join('')}</div>
  ${done?`<p class="qr">${q.res==='ok'?'Correct.':`The answer was <b class="fr">${esc(q.opts[q.c])}</b>.`}</p><button class="btn wide" data-a="next" id="nx">${sess.i<sess.qs.length-1?'Next':'Finish the lesson'}</button>`:''}
  <details class="again"><summary>Show the text again</summary><div class="rbody fr">${textHtml(t)}</div></details>${bar}`;
}
function quizHtml(q){
  const done=q.ans!=null,ok=q.ans===q.c;
  const head=q.kind==='atk'?'Your attack: answer right to hit at full strength':'The boss attacks: answer right to dodge half the damage';
  return `<div class="quiz ${q.kind}"><p class="qk">${head}</p><p class="qa">${esc(q.ask)}</p><p class="qb ${q.bigFr?'fr':''}">${esc(q.big)}</p>${q.chip?`<span class="tag">${esc(q.chip)}</span>`:''}
  <div class="qo">${q.opts.map((o,i)=>`<button class="${q.fr?'fr':''} ${done&&i===q.c?'right':''} ${done&&i===q.ans&&!ok?'wrong':''}" data-a="qans" data-i="${i}" ${done?'disabled':''}>${esc(o)}</button>`).join('')}</div>
  ${done&&!ok?`<p class="qr">The answer was <b class="fr">${esc(q.opts[q.c])}</b>. ${q.kind==='atk'?'Your card hits at half strength.':'You take the full hit.'}</p><button class="btn wide" data-a="qgo" id="qgo">Continue</button>`:done?`<p class="qr">Correct.</p>`:''}</div>`;
}
function vBattle(){
  const b=B.boss,p=B.p,mx=maxHp(),bi=B.bi;
  const tags=(o,blkv)=>[blkv?`Block ${blkv}`:'',o.str?`Strength ${o.str}`:'',o.weak?`Weak ${o.weak}`:'',o.vuln?`Vulnerable ${o.vuln}`:''].filter(Boolean).map(t=>`<span class="tag">${t}</span>`).join('');
  const fx=B.fx;B.fx=false;
  const nd=B.day+1,over=B.over?`<div class="over"><h1>${B.over==='won'?`Day ${B.day} complete`:'Knocked out'}</h1><p>${B.over==='won'?(B.day>=21?`+${B.gain} XP. That was the final test: all 21 days are done.`:`+${B.gain} XP. Day ${nd} is open: ${esc(dayTopics(nd).join(', '))}. You start it with an empty deck.`):'Your cards are spent. Repeat any lesson to earn new ones, then try again.'}</p><div class="rowbtns"><button class="btn alt" data-a="tab" data-v="plan">See the map</button><button class="btn" data-a="home">${B.over==='won'?(B.day>=21?'Back to lessons':`Start day ${nd}`):'Back to lessons'}</button></div></div>`:'';
  return `<div class="arena ${fx?'hit':''}">${tarot(bi,'Day '+B.day)}<div>
    <div class="row" style="display:flex;justify-content:space-between"><b>${b.hp} HP</b><small>of ${b.max}</small></div><div class="bar hp"><i style="width:${b.hp/b.max*100}%"></i></div>
    <div class="tags">${tags(b,b.blk)}</div>
    ${B.over?'':`<div class="intent">Next: ${intentText()}</div>`}</div></div>
  <p class="msg">${esc(B.msg)}</p>${over}
  <div class="spacer"></div>
  <div class="me">
    <div style="display:flex;justify-content:space-between;align-items:baseline"><b>You: ${Math.max(0,state.hp)} HP</b><span class="pipsE" aria-label="${p.en} energy">${'●'.repeat(p.en)}<span style="opacity:.25">${'●'.repeat(Math.max(0,B.emax-p.en))}</span></span></div>
    <div class="bar hp" style="margin-top:6px"><i style="width:${Math.max(0,state.hp/mx*100)}%"></i></div>
    <div class="tags">${tags(p,p.blk)}${B.dbl?'<span class="tag">Next card twice</span>':''}<span class="tag">Draw pile ${B.draw.length}</span><span class="tag">Discard ${B.disc.length}</span></div>
  </div>
  ${B.over?'':B.q?quizHtml(B.q):`<div class="hand">${B.hand.length?B.hand.map((id,i)=>cardHtml(id,`data-a="play" data-i="${i}"`,CARDS[id].c>p.en?'dim':'')).join(''):'<p class="muted">No cards in hand.</p>'}</div>
  <button class="btn wide" data-a="endturn">End turn</button>`}`;
}
