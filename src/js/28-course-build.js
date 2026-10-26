/* ---------- course: build ----------
   Turns the course files (21–26) into one structure the app reads:
     COURSE.items     every word and phrase, with a stable id ("v:" + its French), the day it starts, and its list
     COURSE.concepts  every grammar concept, with a stable id ("c:" + its name) and the day it unlocks
     COURSE.texts     the reading texts, one or two per day
   Course content lives here, not in saved data, so fixing a translation or adding a text reaches every save.
   Saved data only refers to these ids (flashcard history, concepts switched off). */
let COURSE=null;
const slug=s=>strip(norm(s)).replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,80);
const NOS=Object.freeze({});
/* Finds a glossary form in a text: whole words only, any case; a form ending in an apostrophe ("qu'") may touch the next word. */
function glossRe(s){return new RegExp('(?<![\\p{L}\\u0000-\\u0002])'+s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+(/['’]$/.test(s)?'':'(?![\\p{L}])'),'iu')}
/* "le lac" is also looked for as "lac", so "près du lac" still links to it. */
const ARTICLE=/^(?:(?:le|la|les|un|une|des|du|au|aux|de la) |l['’])/i;
/* Flashcard history lives in state.srs[id]; each item reads it through `it.s` (never saved with the item). */
function bindItem(it){if(!Object.getOwnPropertyDescriptor(it,'s'))Object.defineProperty(it,'s',{get(){return (state&&state.srs[it.id])||NOS},enumerable:false,configurable:true});return it}
/* A concept is "on" unless the learner switched it off (state.off[id]). */
function bindConcept(c){if(!Object.getOwnPropertyDescriptor(c,'on'))Object.defineProperty(c,'on',{get(){return !(state&&state.off[c.id])},set(v){if(v)delete state.off[c.id];else state.off[c.id]=true},enumerable:false,configurable:true});return c}

/* Reading texts are written in a small plain format, see 26-course-texts.js. */
function parseTexts(src){
  const out=[];
  src.split(/^@@/m).slice(1).forEach(block=>{
    const lines=block.split('\n'),head=lines.shift().split('|').map(s=>s.trim());
    const t={id:'t'+head[0],day:parseInt(head[0]),title:head[1],paras:[],gloss:[],qs:[],write:null};
    let sec='text',buf=[];
    const flush=()=>{if(buf.length){t.paras.push(buf.join(' '));buf=[]}};
    lines.forEach(raw=>{const line=raw.trim();
      if(/^--\s*\w+/.test(line)){flush();sec=line.replace(/^--\s*/,'').toLowerCase();return}
      if(sec==='text'){if(!line)flush();else buf.push(line);return}
      if(!line)return;
      if(sec==='gloss'){const [l,e]=line.split(' = ');const [m,f]=l.includes('|')?l.split('|').map(s=>s.trim()):[l.trim(),l.trim()];t.gloss.push({m,alt:m.replace(ARTICLE,''),f,e:(e||'').trim()})}
      else if(sec==='questions'){const p=line.split('|').map(s=>s.trim()),q={q:p[0],o:[],c:0};p.slice(1).forEach(o=>{if(o[0]==='*'){q.c=q.o.length;o=o.slice(1).trim()}q.o.push(o)});t.qs.push(q)}
      else if(sec==='write'){const p=line.split('|').map(s=>s.trim());t.write={fr:p[0],en:p[1]||''}}
    });
    flush();out.push(t);
  });
  return out;
}

function buildCourse(){
  const items=new Map(),concepts=new Map(),problems=[];
  const addItem=(o,list,day)=>{const id='v:'+slug(o.fr);if(!id||id==='v:')return;const ex=items.get(id);
    if(ex){if(day&&(!ex.day||day<ex.day))ex.day=day;return ex}
    const it=bindItem({id,fr:o.fr,en:o.en,day:day||0,list,course:true});items.set(id,it);return it};
  const addSrc=src=>{const r=parseBulk(src,'','Course');r.errors.forEach(e=>problems.push(e));
    r.items.forEach(o=>addItem(o,o.list,o.day));
    r.concepts.forEach(c=>{const id='c:'+slug(c.name),ex=concepts.get(id);
      if(ex){c.t.forEach(t=>{if(!ex.t.some(u=>u[0]===t[0]))ex.t.push(t)});if(c.day&&(!ex.day||c.day<ex.day))ex.day=c.day}
      else concepts.set(id,bindConcept({id,name:c.name,day:c.day||0,list:c.list,t:c.t.slice(),course:true}))})};
  [STARTER_CONCEPTS,conjugationSrc(),NOTE_CONCEPTS,numbersBulk(),GRAMMAR,VOCAB,MY_WORDS].forEach(addSrc);
  const texts=parseTexts(TEXTS);
  texts.forEach(t=>{t.gloss.forEach(g=>{g.item=addItem({fr:g.f,en:g.e},`Texte, jour ${t.day}: ${t.title}`,t.day)});
    if(t.qs.some(q=>q.o.length<2))problems.push('Text '+t.id+' has a question with fewer than 2 options');});
  if(problems.length)console.warn('Course problems:',problems);
  const byFr=new Map();items.forEach(it=>{const k=norm(it.fr);if(!byFr.has(k))byFr.set(k,it)});
  const byName=new Map();concepts.forEach(c=>byName.set(norm(c.name),c));
  COURSE={items:[...items.values()],concepts:[...concepts.values()],texts,byFr,byName,problems,
    item:id=>items.get(id),textsFor:d=>texts.filter(t=>t.day===d)};
  return COURSE;
}
