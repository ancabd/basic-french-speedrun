/* ---------- saved data ----------
   One object, saved in this browser (and, inside claude.ai, to your account).
   It holds only progress and your own additions; course content comes from the course files.
     stage        current day of the plan (1–21, 22 once finished)
     day          { deck: card ids, done: lessons passed per skill on the current day }
     srs          flashcard history: srs[itemId][skill] = [box, dueDay]
     off          concepts you switched off: off[conceptId] = true
     read         reading texts passed: read[textId] = times
     mine         { items, concepts } you imported yourself
     plan         checklist ticks and scoreboard
   Bump SCHEMA and add a step to MIGRATIONS whenever this shape changes. */
const LS='cartes.v1',SCHEMA=2,TABV=['home','plan','deck','words','setup'];
let state,view='home',mapSheet=null,mapScroll=false,sess=null,reward=null,srOff=false,importMsg=null,delArm=null,glossSel=null;
function fresh(){return {v:1,schema:SCHEMA,ts:0,hp:50,xp:0,li:0,levels:DEFAULT_LEVELS.map(l=>({...l})),stage:1,diff:1,wins:0,started:false,
  day:{deck:[],done:{}},srs:{},off:{},read:{},mine:{items:[],concepts:[]},plan:{done:{},scores:{}}}}
const maxHp=()=>50+5*state.li;
function localSave(){try{localStorage.setItem(LS,JSON.stringify(state))}catch(e){}}
function save(){state.ts=Date.now();localSave();schedulePush()}

/* MIGRATIONS[n] upgrades a save from schema n to n+1. */
const MIGRATIONS={1:fromSchema1};
function upgrade(s){let v=s.schema||1;while(v<SCHEMA){s=MIGRATIONS[v](s);v++;s.schema=v}return s}
/* Schema 1 kept a copy of every word and concept inside the save. Map that history onto course ids. */
function fromSchema1(s){
  const n=fresh(),d=s.day||{};
  ['ts','hp','xp','li','levels','diff','wins','started','lastFree'].forEach(k=>{if(s[k]!=null)n[k]=s[k]});
  n.stage=s.stage??8;
  n.plan=s.plan?{done:s.plan.done||{},scores:s.plan.scores||{}}:{done:Object.fromEntries(PRE.map(k=>[k,true])),scores:{3:{l:'A2 3/3',s:'A1+?'},7:{l:'3.75',r:'3.5',s:'3.75',w:'3',f:'2'}}};
  n.day.deck=(d.deck||[]).map(id=>CARDS[id]?id:(OLDCARD[id]||'frappe'));
  if(s.stage!=null)['g','l','w','s'].forEach(k=>{if(d.done&&d.done[k])n.day.done[k]=d.done[k]});
  const better=(a,b)=>!a?b:!b?a:(b[0]>a[0]?b:a);
  (s.items||[]).forEach(it=>{const c=COURSE.byFr.get(norm(it.fr));let id;
    if(c)id=c.id;else{id='u:'+it.id;n.mine.items.push({id,fr:it.fr,en:it.en,lv:it.lv||'',list:it.list||'My words',day:0})}
    Object.keys(it.s||{}).forEach(k=>{const e=(n.srs[id]=n.srs[id]||{});e[k]=better(e[k],it.s[k])})});
  (s.concepts||[]).forEach(c=>{const cc=COURSE.byName.get(norm(c.name));
    if(cc){if(c.on===false)n.off[cc.id]=true}
    else n.mine.concepts.push({id:'uc:'+c.id,name:c.name,day:c.day||0,lv:c.lv||'',list:c.list||'My words',t:c.t||[]})});
  return n;
}
function bindMine(){state.mine.items.forEach(bindItem);state.mine.concepts.forEach(bindConcept)}
const allItems=()=>COURSE.items.concat(state.mine.items);
const allConcepts=()=>COURSE.concepts.concat(state.mine.concepts);
function adopt(s){state=upgrade(s);bindMine()}
function load(){
  buildCourse();
  let raw=null;try{raw=localStorage.getItem(LS)}catch(e){}
  if(raw){try{const s=JSON.parse(raw);if(s&&s.v===1)adopt(s)}catch(e){
    console.error('Could not read the saved data',e);try{localStorage.setItem(LS+'.unreadable',raw)}catch(_){}}}
  if(!state){state=fresh();bindMine()}
  localSave();
}
function heal(n){state.hp=Math.min(maxHp(),state.hp+n)}
function addXp(n){state.xp+=n;let up=false;while(state.li<state.levels.length-1&&state.xp>=state.levels[state.li].x){state.xp-=state.levels[state.li].x;state.li++;up=true}if(up){state.hp=maxHp();toast('Level up: '+state.levels[state.li].n)}}

/* ---------- cloud sync (per-person, optional; only inside claude.ai) ---------- */
let cloud=null,base='',pushT=null,pushing=false,syncMsg='Saved on this device.';
function schedulePush(){if(!cloud)return;clearTimeout(pushT);pushT=setTimeout(push,5000)}
async function push(){
  if(!cloud||pushing)return;pushing=true;const ts=state.ts;
  try{const s=JSON.stringify(state),n=Math.ceil(s.length/80000);
    for(let i=0;i<n;i++)await cloud.doc(base+'part'+i).set({s:s.slice(i*80000,(i+1)*80000)});
    await cloud.doc(base+'meta').set({ts,n});syncMsg='Saved to your account, so it follows you across devices.';
  }catch(e){syncMsg='Could not save to your account just now. Your progress is saved on this device.'}
  pushing=false;if(state.ts!==ts)schedulePush();
}
async function initCloud(){
  try{
    if(!window.claude||!claude.use)return;
    const [db,user]=await Promise.all([claude.use('db'),claude.use('user')]);
    if(!db||!user)return;const id=await user.id();if(!id)return;
    base='data/users/'+id+'/';
    const m=await db.doc(base+'meta').get();cloud=db;
    if(m.exists){const d=m.data();
      if(d.ts>(state.ts||0)){let s='';for(let i=0;i<d.n;i++){const p=await db.doc(base+'part'+i).get();if(!p.exists)return;s+=p.data().s}
        const r=JSON.parse(s);
        if(r&&r.v===1&&TABV.includes(view)){adopt(r);localSave();if((r.schema||1)<SCHEMA)save();render()}
      }else if(state.ts>d.ts)schedulePush();
    }else if(state.ts)schedulePush();
    syncMsg='Saved to your account, so it follows you across devices.';
    if(view==='setup')render();
  }catch(e){}
}
let AI=null;
function initAI(){try{if(window.claude&&claude.use)claude.use('sample').then(s=>{AI=s}).catch(()=>{})}catch(e){}}
