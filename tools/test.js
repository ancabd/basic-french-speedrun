#!/usr/bin/env node
// End-to-end checks on the built index.html, in a simulated browser (jsdom).
// Run: npm install (once), then npm test. Exits non-zero if anything fails.
const fs = require('fs'), path = require('path');
const { JSDOM } = require('jsdom');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

let failed = 0, passed = 0;
const ok = (cond, name, extra) => { if (cond) passed++; else { failed++; console.log('  FAIL', name, extra !== undefined ? JSON.stringify(extra).slice(0, 400) : ''); } };

function open(save) {
  const errors = [];
  const dom = new JSDOM(html, { runScripts: 'dangerously', url: 'https://cartes.test/', pretendToBeVisual: true, beforeParse(w) {
    w.scrollTo = () => {}; w.Element.prototype.scrollIntoView = function () {};
    w.speechSynthesis = { cancel() {}, speak() {}, getVoices() { return []; } }; w.SpeechSynthesisUtterance = function () {};
    if (save) w.localStorage.setItem('cartes.v1', typeof save === 'string' ? save : JSON.stringify(save));
    w.addEventListener('error', e => errors.push(e.message));
    w.console.warn = (...a) => { errors.push('warn: ' + a.map(String).join(' ')); }; w.console.error = () => {};
  } });
  const w = dom.window, d = w.document;
  const app = {
    w, d, errors,
    ev: c => w.eval(c),
    click: s => { const el = typeof s === 'string' ? d.querySelector(s) : s; if (!el) throw new Error('missing ' + s); el.click(); },
    text: s => (d.querySelector(s) || { textContent: '' }).textContent.replace(/\s+/g, ' ').trim(),
    // play one lesson of skill k, answering everything correctly
    lesson(k) {
      app.click(`.lrow[data-k="${k}"]`);
      if (app.ev('view') !== 'session') return false;
      if (k === 'r') app.click('[data-a=rstart]');
      let guard = 0;
      while (app.ev('view') === 'session' && guard++ < 30) {
        const q = app.ev('cur().k');
        if (q === 'rq') app.click(`[data-a=ropt][data-i="${app.ev('cur().c')}"]`);
        else if (q === 's' || q === 'fs') app.click('[data-a=self][data-r=ok]');
        else {
          const a = d.querySelector('#ans');
          a.value = q === 'fw' ? Array.from({ length: 70 }, (_, i) => 'mot' + i).join(' ') : q === 'l' ? app.ev('firstEn(cur().it.en)') : app.ev('cur().ans');
          app.click('#chk');
        }
        app.click('#nx');
      }
      const take = d.querySelector('.card[data-a=take]'); if (take) take.click();
      return true;
    },
    finishDay() { for (const q of app.ev('JSON.stringify(quests())') ? JSON.parse(app.ev('JSON.stringify(quests())')) : []) for (let i = q.have; i < q.need; i++) app.lesson(q.k); },
  };
  return new Promise(r => setTimeout(() => r(app), 150));
}

(async () => {
  // ---------- course content ----------
  console.log('Course content');
  {
    const a = await open();
    const c = JSON.parse(a.ev(`JSON.stringify({problems:COURSE.problems,items:COURSE.items.length,concepts:COURSE.concepts.length,
      texts:COURSE.texts.map(t=>({id:t.id,day:t.day,q:t.qs.map(q=>[q.o.length,q.c]),w:!!t.write,miss:t.gloss.filter(g=>!glossRe(g.m).test(t.paras.join(' '))&&!glossRe(g.alt).test(t.paras.join(' '))).map(g=>g.m),g:t.gloss.length})),
      conceptDays:[...new Set(COURSE.concepts.map(c=>c.day))].sort((x,y)=>x-y),
      dupIds:COURSE.items.length-new Set(COURSE.items.map(i=>i.id)).size})`));
    ok(!c.problems.length, 'course parses without problems', c.problems);
    ok(c.items > 400 && c.concepts > 30, 'course has words and concepts', [c.items, c.concepts]);
    ok(c.dupIds === 0, 'item ids are unique');
    for (let d = 1; d <= 21; d++) { const n = c.texts.filter(t => t.day === d).length; ok(n === (d <= 7 ? 1 : 2), `day ${d} has ${d <= 7 ? 1 : 2} text(s)`, n); }
    c.texts.forEach(t => {
      ok(!t.miss.length, `${t.id}: every glossary word appears in the text`, t.miss);
      ok(t.q.length >= 3 && t.q.every(([n, k]) => n === 4 && k >= 0 && k < 4), `${t.id}: 3+ questions with 4 options and one right answer`, t.q);
      ok(t.w, `${t.id}: has a writing prompt`);
      ok(t.g >= 6, `${t.id}: has 6+ glossary words`, t.g);
    });
    for (let d = 1; d <= 20; d++) ok(c.conceptDays.includes(d), `day ${d} unlocks at least one grammar concept`);
    ok(!a.errors.length, 'no errors on load', a.errors);
  }

  // ---------- fresh start ----------
  console.log('Fresh start');
  {
    const a = await open();
    ok(a.ev('state.stage') === 1 && a.ev('state.schema') === 2, 'starts on day 1, schema 2');
    ok(a.text('#app h1') === 'Day 1', 'lessons screen shows day 1', a.text('#app h1'));
    ok(a.ev('pool().every(i=>!i.day||i.day<=1)') && a.ev('pool().length') > 50, 'only day-1 words are available', a.ev('pool().length'));
    ok(a.ev('JSON.stringify(quests().map(q=>q.k+q.need))') === '["g2","l2","w1","s1","r1"]', 'day 1 lessons follow phase I', a.ev('JSON.stringify(quests())'));
    ok(a.d.querySelector('.bosspanel button').disabled, 'boss is locked before the lessons');
    // reading lesson
    a.lesson('r');
    ok(a.ev('state.read.t1a') === 1 && a.ev('state.day.done.r') === 1, 'reading lesson counts and records the text', a.ev('JSON.stringify(state.read)'));
    // the text's words now lead the writing lesson
    a.click('[data-a=tab][data-v=home]');
    const fromText = a.ev(`(()=>{const ids=new Set(COURSE.textsFor(1)[0].gloss.map(g=>g.item.id));return pick('v',6).filter(i=>ids.has(i.id)||i.day===1).length})()`);
    ok(fromText >= 3, "today's words lead the flashcards", fromText);
    a.finishDay();
    ok(a.ev('quests().every(q=>q.ok)'), 'all day-1 lessons can be completed', a.ev('JSON.stringify(quests())'));
    a.click('[data-a=tab][data-v=home]');
    ok(!a.d.querySelector('.bosspanel button').disabled, 'boss opens once lessons are done');
    a.click('[data-a=fight]');
    ok(a.ev('state.day.deck.length') === 0 && a.ev('B.day') === 1, 'the fight spends the deck');
    a.ev("B.boss.hp=1;B.boss.blk=0;B.hand.unshift('frappe');B.p.en=3;render()");
    const atk = [...a.d.querySelectorAll('.hand .card')].find(c => /question/.test(c.textContent));
    if (atk) { a.click(atk); a.click(`[data-a=qans][data-i="${a.ev('B.q.c')}"]`); await new Promise(r => setTimeout(r, 1000)); }
    ok(a.ev('state.stage') === 2 && a.ev('JSON.stringify(state.day.done)') === '{}', 'winning opens day 2 and resets the lessons', [a.ev('state.stage')]);
    a.click('.over [data-a=tab][data-v=plan]');
    ok(a.d.querySelectorAll('.nd').length === 21 && a.d.querySelectorAll('.nd.done').length === 1, 'map shows 21 days, one done');
    a.click('.nd[data-d="5"]'); ok(/Finish day 4/.test(a.text('.sheet')), 'locked day explains how to unlock it');
    a.click('.scrim');
    ok(!a.errors.length, 'no errors during play', a.errors);
  }

  // ---------- upgrade an old save ----------
  console.log('Upgrade from schema 1');
  {
    const old = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures', 'schema1-save.json'), 'utf8'));
    const withHistory = old.items.filter(i => Object.keys(i.s).length);
    const a = await open(old);
    ok(a.ev('state.schema') === 2 && a.ev('state.stage') === 9, 'upgraded to schema 2, still on day 9');
    ok(a.ev('state.items') === undefined && a.ev('state.concepts') === undefined, 'course copies are gone from the save');
    const kept = withHistory.filter(i => a.ev(`(()=>{const c=COURSE.byFr.get(norm(${JSON.stringify(i.fr)}));const id=c?c.id:'u:'+${JSON.stringify(i.id)};return !!(state.srs[id])})()`)).length;
    ok(kept === withHistory.length, 'flashcard history kept for every word', [kept, withHistory.length]);
    ok(a.ev(`state.mine.items.filter(i=>i.list==='Mes mots').length`) === 2, 'your own list is kept');
    ok(a.ev(`state.mine.concepts.some(c=>c.name==='Mon concept')`), 'your own concept is kept');
    ok(a.ev(`allConcepts().find(c=>c.name==='Imparfait').on`) === false, 'a concept you switched off stays off');
    ok(a.ev('JSON.stringify(state.day.deck)') === JSON.stringify(old.day.deck), 'deck kept');
    ok(a.ev('state.day.done.w') === 1 && a.ev('state.day.done.l') === 1, "today's lessons kept");
    ok(a.ev('state.plan.scores[10].l') === '4' && a.ev('state.plan.scores[7].l') === '3.75', 'scoreboard kept');
    ok(a.ev('JSON.parse(localStorage.getItem("cartes.v1")).schema') === 2, 'upgraded save is written back');
    ok(!a.errors.length, 'no errors after upgrade', a.errors);
    // backups
    const backup = a.ev('JSON.stringify(state)');
    const b = await open();
    b.ev(`adopt(${backup});save()`);
    ok(b.ev('state.stage') === 9 && b.ev('Object.keys(state.srs).length') === a.ev('Object.keys(state.srs).length'), 'a backup restores into a fresh browser');
    const c2 = await open('{not json');
    ok(c2.ev('state.stage') === 1 && c2.ev('localStorage.getItem("cartes.v1.unreadable")') === '{not json', 'an unreadable save is set aside, not lost');
  }

  // ---------- importing ----------
  console.log('Importing');
  {
    const a = await open();
    a.click('[data-a=tab][data-v=words]');
    a.d.querySelector('#bulk').value = 'le pain = the bread\nle hibou = the owl\n# day: 3\nle renard = the fox';
    a.d.querySelector('#blist').value = 'Animaux';
    a.click('[data-a=import]');
    ok(a.ev('state.mine.items.length') === 2, 'course words are skipped, new ones added', a.ev('JSON.stringify(state.mine.items)'));
    ok(a.ev(`pool().some(i=>i.fr==='le hibou')&&!pool().some(i=>i.fr==='le renard')`), 'imported words respect # day');
    a.click('[data-a=dellist][data-n="Animaux"]'); a.click('[data-a=dellist][data-n="Animaux"]');
    ok(a.ev('state.mine.items.length') === 0, 'your list can be deleted');
    ok(!a.d.querySelector('[data-a=dellist][data-n="Starter"]'), 'course lists cannot be deleted');
  }

  // ---------- battle questions ----------
  console.log('Battle questions');
  {
    const a = await open();
    a.ev('state.stage=15');
    const bad = a.ev(`(()=>{B={seenQ:new Set()};let bad=0;for(let i=0;i<1500;i++){const q=mcq();if(q.opts.length!==4||new Set(q.opts).size!==4||q.c<0||q.c>3)bad++}B=null;return bad})()`);
    ok(bad === 0, 'every battle question has 4 different options and one right answer', bad);
  }

  console.log(`\n${passed} passed, ${failed} failed`);
  process.exit(failed ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
