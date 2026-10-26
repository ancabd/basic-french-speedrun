/* ---------- bulk import ---------- */
function parseBulk(text,defLv,defList){
  const out={items:[],concepts:[],errors:[]};text=(text||'').trim();if(!text)return out;
  if(text[0]==='['){
    try{JSON.parse(text).forEach((o,i)=>{
      if(o&&o.fr&&o.en)out.items.push({fr:String(o.fr),en:String(o.en),lv:o.level||defLv,list:o.list||defList,day:+o.day||0});
      else if(o&&o.concept)out.concepts.push({name:String(o.concept),lv:o.level||defLv,list:o.list||defList,day:+o.day||0,t:(o.templates||[]).filter(t=>t.fr&&t.en).map(t=>[t.fr,t.en])});
      else out.errors.push('Entry '+(i+1)+' needs "fr" and "en", or "concept".');
    })}catch(e){out.errors.push('That JSON could not be read: '+e.message)}
    return out;
  }
  let lv=defLv,list=defList,cur=null,day=0;
  text.split(/\r?\n/).forEach((raw,i)=>{
    const line=raw.trim();let m;
    if(!line){cur=null;return}
    if(m=line.match(/^##\s*(.+)$/)){cur={name:m[1].trim(),lv,list,day,t:[]};out.concepts.push(cur);return}
    if(m=line.match(/^#\s*(level|list|day)\s*:\s*(.+)$/i)){const k=m[1].toLowerCase();if(k==='level')lv=m[2].trim();else if(k==='list')list=m[2].trim();else day=parseInt(m[2])||0;cur=null;return}
    if(line[0]==='#')return;
    let p=line.indexOf('\t'),w=1;if(p<0){p=line.indexOf(' = ');w=3}if(p<0){p=line.indexOf('=');w=1}
    const fr=p<0?'':line.slice(0,p).trim(),en=p<0?'':line.slice(p+w).trim();
    if(!fr||!en){out.errors.push(`Line ${i+1}: expected “français = english”.`);return}
    if(cur){
      const a=[...fr.matchAll(/\{([^}]*)\}/g)].map(x=>x[1].split('|').length),b=[...en.matchAll(/\{([^}]*)\}/g)].map(x=>x[1].split('|').length);
      if(a.length!==b.length||a.some((n,j)=>n!==b[j])){out.errors.push(`Line ${i+1}: the {choices} on both sides need the same number of slots and options.`);return}
      cur.t.push([fr,en]);
    }else out.items.push({fr,en,lv,list,day});
  });
  return out;
}
/* Your own imports go to state.mine. Words already in the course are skipped (their flashcards already exist). */
function addBulk(r){
  let ni=0,nc=0,dup=0;const M=state.mine;
  r.items.forEach(o=>{if(COURSE.byFr.has(norm(o.fr))||M.items.some(i=>norm(i.fr)===norm(o.fr))){dup++;return}
    M.items.push(bindItem({id:'u:'+slug(o.list||'My words')+':'+slug(o.fr),fr:o.fr,en:o.en,lv:o.lv||'',list:o.list||'My words',day:o.day||0}));ni++});
  r.concepts.forEach(c=>{if(COURSE.byName.has(norm(c.name))){dup++;return}
    const ex=M.concepts.find(x=>norm(x.name)===norm(c.name));
    if(ex){if(c.day)ex.day=c.day;c.t.forEach(t=>{if(!ex.t.some(u=>u[0]===t[0]))ex.t.push(t)})}
    else{M.concepts.push(bindConcept({id:'uc:'+slug(c.name),name:c.name,lv:c.lv||'',list:c.list||'My words',day:c.day||0,t:c.t}));nc++}});
  return {ni,nc,dup};
}
function expand(fr,en){
  const re=/\{([^}]*)\}/g,picks=[...fr.matchAll(re)].map(m=>Math.floor(Math.random()*m[1].split('|').length));
  let i=0;const f=fr.replace(re,(_,g)=>g.split('|')[picks[i++]].trim());i=0;
  const e=en.replace(re,(_,g)=>{const a=g.split('|');return (a[picks[i++]]??a[0]).trim()});
  return {fr:f.replace(/\s+/g,' '),en:e.replace(/\s+/g,' ')};
}

