/* ---------- game data ---------- */
const SK={
 l:{n:'Listening',d:'Hear French, type the meaning',gives:'Block cards'},
 g:{n:'Grammar',d:'Translate fresh sentences into French',gives:'Combo cards'},
 w:{n:'Writing',d:'Type the French for words, dictation, then a free answer',gives:'Attack cards or a cut'},
 s:{n:'Speaking',d:'Say words aloud, then answer a question',gives:'A weakening card'},
 r:{n:'Reading',d:'Read a short text, then answer questions',gives:'A support card'}};
let B=null; // battle
function hit(v){let d=v+B.p.str;if(B.p.weak)d=Math.floor(d*.75);if(B.boss.vuln)d=Math.floor(d*1.5);d=Math.max(0,Math.round(d*(B.mult??1)));B.dealt=(B.dealt||0)+d;const ab=Math.min(B.boss.blk,d);B.boss.blk-=ab;B.boss.hp=Math.max(0,B.boss.hp-(d-ab));B.fx=true}
function blk(v){B.p.blk+=v}
function drawN(n){while(n-->0){if(B.hand.length>=10)return;if(!B.draw.length){if(!B.disc.length)return;B.draw=shuffle(B.disc);B.disc=[]}B.hand.push(B.draw.pop())}}
const CARDS={
 frappe:{n:'Frappe',s:'w',r:0,c:1,atk:1,d:'Deal 9 damage.',f:()=>hit(9)},
 tirade:{n:'Tirade',s:'w',r:1,c:2,atk:1,d:'Deal 20 damage.',f:()=>hit(20)},
 parade:{n:'Parade',s:'l',r:0,c:1,d:'Gain 7 Block.',f:()=>blk(7)},
 rempart:{n:'Rempart',s:'l',r:1,c:2,d:'Gain 16 Block.',f:()=>blk(16)},
 accord:{n:'Accord',s:'g',r:0,c:1,atk:1,d:'Deal 6 damage. Boss gets 2 Vulnerable.',f:()=>{hit(6);B.boss.vuln+=2}},
 conj:{n:'Conjugaison',s:'g',r:1,c:1,x:1,d:'Gain 3 Strength for this fight. Once per fight.',f:()=>{B.p.str+=3}},
 bonjour:{n:'Bonjour !',s:'s',r:0,c:1,d:'Boss gets 2 Weak. Gain 4 Block.',f:()=>{B.boss.weak+=2;blk(4)}},
 cafe:{n:'Café',s:'r',r:0,c:0,x:1,d:'Draw 2 cards. Heal 3 HP. Once per fight.',f:()=>{drawN(2);heal(3)}}
};
const OLDCARD={mot:'frappe',syn:'frappe',faux:'frappe',gros:'tirade',dico:'tirade',brouillon:'frappe',rature:'frappe',plume:'frappe',dissert:'tirade',oreille:'parade',sous:'parade',silence:'rempart',echo:'rempart',exception:'accord',regle:'conj',vire:'bonjour',liaison:'bonjour',marque:'cafe',tisane:'cafe',biblio:'cafe'};
const BOSSES=[
 {n:'Les Faux Amis',g:'≠',t:'“Actuellement” does not mean what you think it means.',m:[['a',6],[['w',2],['a',3]],['a',4,2],['b',8]]},
 {n:'Le Subjonctif',g:'que',t:'Il faut que tu perdes.',m:[['s',2],['a',6],['a',7],[['b',6],['a',4]]]},
 {n:'Madame Exception',g:'!',t:'Every rule you learned has me in it.',m:[['u',2],['a',5,2],['b',10],['a',10]]},
 {n:'Le H Aspiré',g:'h',t:'No liaison for you.',m:[['b',8],['a',9],['w',2],['a',3,3]]},
 {n:'La Liaison Dangereuse',g:'z’',t:'Les ennemis arrivent, and you will hear the z.',m:[['a',5],['a',6],[['s',1],['b',5]],['a',7]]},
 {n:'Quatre-Vingt-Dix-Neuf',g:'99',t:'Four twenties, ten, nine. Count them.',m:[['a',9],['b',9],['a',4,2],['u',1],['a',9]]},
 {n:'Le Contrôle',g:'A2',hp:1.25,t:'The day 7 checkpoint. Show me what holds you back.',m:[['a',7],['b',8],['a',5,2],['w',1],['a',9]]},
 {n:'L’Examen B1',g:'B1',hp:1.4,t:'Could you spend a normal day in French? Prove it.',m:[['a',8],[['s',1],['b',6]],['a',5,2],['u',1],['a',10]]}];
const ROMAN=['I','II','III','IV','V','VI'];
const bossFor=d=>d===7?6:d>=21?7:(d-1)%6;
const DEFAULT_LEVELS=[['A2.1',300],['A2.2',350],['A2.3',400],['B1.1',450],['B1.2',500],['B1.3',550],['B2.1',600],['B2.2',700],['B2.3',800]].map(([n,x])=>({n,x}));

