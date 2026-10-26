/* ---------- course: the 21-day plan (phases, notes) ----------
   Content only. Edit freely: the app reads everything about a day from here and the other course files. */
const PHASES=[
 {n:'Foundation',tag:'Survive',from:1,to:3,lv:'~A1 to A1/A2',goal:'Build enough French to construct simple sentences immediately.',
  q:{l:2,g:2,w:1,s:1},
  focus:[['Listening','Crack why spoken French sounds so different from the page: pronunciation, sound and spelling, contractions, liaison.'],['Speaking','Start on day 1. Ugly French is allowed.']],
  grammar:['être','avoir','aller','faire','vouloir','pouvoir','devoir','aimer','present tense','negation','questions','articles','gender','adjective agreement','basic pronouns','passé composé','futur proche'],
  can:['Introduce myself','Talk about where I’m from','Say what languages I speak','Talk about hobbies and interests','Ask and answer basic questions','Talk about what I’m doing','Talk about what I did','Talk about what I’m going to do','Understand slow, simple French','Survive a basic interaction without switching languages']},
 {n:'Construction',tag:'Build',from:4,to:7,lv:'~A1 to A2',goal:'Become capable of handling normal everyday situations.',
  q:{g:2,l:2,s:2,w:2},
  focus:[['Listening','Move from learner French to learner French plus simple authentic French. French audio, French subtitles, French audio.'],['Speaking','60 to 90 minutes a day. Answer questions you have not prepared for.']],
  grammar:['passé composé','imparfait','passé composé vs imparfait','object pronouns','y / en','common prepositions','comparisons','quantities','relative clauses','conjunctions','future','conditional','expressing opinions'],
  can:['Describe people and places','Talk about past experiences','Talk about future plans','Explain preferences','Give simple reasons','Ask for clarification','Tell a basic story','Describe a problem','Make suggestions','Maintain a basic conversation']},
 {n:'Immersion',tag:'Immerse',from:8,to:14,lv:'~A2 to A2/B1',goal:'Stop primarily studying French. Start living in French.',
  q:{l:3,r:20,s:2,w:2,g:1},
  focus:[['Listening','The priority now: 2+ hours a day of serious listening. TV5MONDE, RFI, YouTube, podcasts, interviews, news, documentaries.'],['Reading','Ordinary articles, simple news, transcripts, Wikipedia, graded readers, subtitles. Guess unknown words from context; do not look up everything.'],['Speaking','Train situation to French, not English thought to translation. Build automatic chunks (they are in your Words as “Notes: chunks”).'],['Vocabulary','About 50 to 80 useful items a day, phrases over isolated words. Paste them into Words.']]},
 {n:'Performance',tag:'Perform',from:15,to:21,lv:'~A2/B1 to B1-ish',goal:'Prove that French works without preparation: can I function when French is coming at me?',
  q:{s:3,l:2,r:20,w:2,g:1},
  focus:[['Speaking','Every day: 30 min conversation, 10 min spontaneous monologue, correction and redo. Topics: opinions, travel, relationships, technology, society, education, work, hobbies, culture, hypotheticals, problems and solutions.'],['Listening','Increasingly normal-speed material. Understand the meaning without decoding every word.'],['Reading','Unfamiliar material under time pressure. Main idea? What happened? Why? Consequences? The author’s opinion?'],['Writing','A diagnostic tool: 150 to 250 words a day. Look for recurring errors, not perfect sentences.']]}];
/* Topics already done before the app existed (pre-ticked on the plan checklists for older saves). */
const PRE=['0:être','0:avoir','0:aller','0:faire','0:vouloir','0:pouvoir','0:devoir','0:present tense','0:negation','0:questions','0:passé composé','0:futur proche','1:passé composé','1:imparfait'];
const SCORE_DAYS=[1,3,7,10,14,17,21],SCORE_K=[['l','Listening'],['r','Reading'],['s','Speaking'],['w','Writing'],['f','Fluency']];
const phaseOf=d=>PHASES.find(p=>d<=p.to)||PHASES[3];
const DAYNOTE={7:'Checkpoint day: a mini A2-style test. The point is to find what is holding you back.',21:'Final test: a B1 simulation. Could you spend a normal day operating primarily in French?'};
