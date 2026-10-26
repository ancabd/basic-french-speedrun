#!/usr/bin/env node
// Boss balance simulator. Plays thousands of simulated fights against each day's boss and finds the boss HP
// at which a player who answers 75% of questions right, with only that day's required lessons, wins about 7 in 10.
// Run after changing lessons, cards or bosses:  npm run balance   (prints a new DAYHP line for src/js/50-battle.js)
//   node tools/balance.js 5 9   calibrates only days 5 to 9
const fs = require('fs'), path = require('path'), { fork } = require('child_process');
const TARGET = d => d === 21 ? .55 : d === 7 ? .6 : .7;     // checkpoint and final test are a bit harder

if (process.argv[2] === '--worker') return worker(+process.argv[3], +process.argv[4]);
const D0 = +(process.argv[2] || 1), D1 = +(process.argv[3] || 21);
const days = []; for (let d = D0; d <= D1; d++) days.push(d);
const n = Math.min(7, days.length), chunks = Array.from({ length: n }, (_, i) => days.filter((_, j) => j % n === i));
const results = {};
let left = chunks.length;
console.log(`Calibrating days ${D0}-${D1} in ${n} processes (a few minutes)...`);
chunks.forEach(ch => {
  const p = fork(__filename, ['--worker', ch[0], ch[ch.length - 1], ...ch.map(String)]);
  p.on('message', m => { results[m.d] = m; console.log(`day ${String(m.d).padStart(2)}: HP ${String(m.hp).padStart(3)} | required lessons, 75% right: ${m.req}% win, ~${m.turns} turns | +3 extra lessons: ${m.extra}% | 60% right: ${m.low}% | 90% right: ${m.high}%`); });
  p.on('exit', () => { if (--left) return;
    const src = fs.readFileSync(path.join(__dirname, '..', 'src', 'js', '50-battle.js'), 'utf8');
    const cur = JSON.parse(src.match(/const DAYHP=(\[[^\]]*\])/)[1]);
    days.forEach(d => { cur[d - 1] = results[d].hp; });
    console.log('\nPaste into src/js/50-battle.js:\nconst DAYHP=' + JSON.stringify(cur) + ';');
  });
});

function worker() {
  const list = process.argv.slice(5).map(Number);
  const { JSDOM } = require('jsdom');
  let html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8').replace('const bossHpFor=', 'let bossHpFor=');
  const dom = new JSDOM(html, { runScripts: 'dangerously', url: 'https://cartes.test/', beforeParse(w) { w.scrollTo = () => {}; w.speechSynthesis = { cancel() {}, speak() {}, getVoices() { return []; } }; w.SpeechSynthesisUtterance = function () {}; } });
  const w = dom.window, ev = c => w.eval(c);
  setTimeout(() => {
    ev(`window.render=()=>{};window.save=()=>{};window.toast=()=>{};window.HPT={};bossHpFor=d=>Math.round(HPT[d]*(state.diff||1));
    // a player who takes the best of the 3 cards each lesson offers (40% of lessons scored 80%+, so strong cards appear)
    window.SIM=(day,extra,acc)=>{state.stage=day;state.li=Math.min(8,Math.floor(day*.6));
      const pref=['tirade','conj','frappe','accord','rempart','parade','bonjour','cafe'],deck=[];
      const take=k=>{const o=offer(k,Math.random()<.4?.9:.6);o.sort((a,b)=>{const r=x=>(x==='conj'&&deck.includes('conj'))?9:pref.indexOf(x);return r(a)-r(b)});deck.push(o[0])};
      lessonPlan(day).forEach(q=>{for(let i=0;i<q.need;i++)take(q.k)});
      const ks=['w','g','l','w','s'];for(let i=0;i<extra;i++)take(ks[i%5]);
      state.day.deck=deck;startBattle();let t=0;
      const answer=()=>{if(B.q){B.q.ans=(Math.random()<acc)?B.q.c:(B.q.c+1)%4;qResolve();return true}return false};
      while(!B.over&&t<80){let go=true;while(go&&!B.over){go=false;let best=-1,bs=-1;B.hand.forEach((id,i)=>{const c=CARDS[id];if(c.c>B.p.en)return;const sc=c.c*10+c.r+(c.atk?0:2);if(sc>bs){bs=sc;best=i}});if(best>=0){play(best);while(answer());go=true}}
        if(!B.over){endTurn();while(!B.over&&answer());}t++}
      return [B.over,t]}`);
    const rate = (d, extra, acc, n) => { let wn = 0, t = 0; for (let i = 0; i < n; i++) { const r = JSON.parse(ev(`JSON.stringify(SIM(${d},${extra},${acc}))`)); if (r[0] === 'won') wn++; t += r[1]; } return [wn / n, t / n]; };
    for (const d of list) {
      let lo = 60, hi = 420;
      for (let it = 0; it < 6; it++) { const mid = (lo + hi) / 2; ev(`HPT[${d}]=${mid}`); if (rate(d, 0, .75, 40)[0] > TARGET(d)) lo = mid; else hi = mid; }
      const hp = Math.round((lo + hi) / 2 / 5) * 5; ev(`HPT[${d}]=${hp}`);
      const a = rate(d, 0, .75, 50), pct = x => Math.round(x * 100);
      process.send({ d, hp, req: pct(a[0]), turns: Math.round(a[1]), extra: pct(rate(d, 3, .75, 30)[0]), low: pct(rate(d, 0, .6, 30)[0]), high: pct(rate(d, 0, .9, 30)[0]) });
    }
    process.exit(0);
  }, 200);
}
