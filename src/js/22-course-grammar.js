/* ---------- course: grammar concepts ----------
   Format (same as the Words tab importer): "# day: N" sets the day a concept unlocks, "## Name" starts a concept,
   each line under it is a sentence pattern "français = english" with matching {a|b} slots. */
const DAYMAP={'Présent':1,'Présent, négation':1,'Futur proche':2,'Futur proche, négation':2,'Questions avec est-ce que':2,'Passé composé':3,'Passé composé, négation':3,'Imparfait':4};
function conjugationSrc(){
  const P=['je','tu','il','nous','vous','ils'],E=['I','you','he','we','you (vous)','they'],BE=['am','are','is','are','are','are'],WAS=['was','were','was','were','were','were'];
  const AV=['ai','as','a','avons','avez','ont'],ET=['suis','es','est','sommes','êtes','sont'],AL=['vais','vas','va','allons','allez','vont'],AG=['(e)','(e)','','(e)s','(e)(s)','s'];
  const V=[
   ['aller','vais vas va allons allez vont','allé',1,['go','goes','went'],['au travail','à Lausanne','au cinéma'],['to work','to Lausanne','to the cinema']],
   ['apprendre','apprends apprends apprend apprenons apprenez apprennent','appris',0,['learn','learns','learned'],['le français','la leçon','la chanson'],['French','the lesson','the song']],
   ['avoir','ai as a avons avez ont','eu',0,['have','has','had'],['le temps','la clé','le livre'],['the time','the key','the book']],
   ['devoir','dois dois doit devons devez doivent','dû',0,['have to','has to','had to'],['travailler','partir','venir'],['work','leave','come']],
   ['être','suis es est sommes êtes sont','été',0,'be',['à Lausanne','à la maison','en retard'],['in Lausanne','at home','late']],
   ['faire','fais fais fait faisons faites font','fait',0,['do','does','did'],['le travail','la cuisine','le ménage'],['the work','the cooking','the housework']],
   ['pouvoir','peux peux peut pouvons pouvez peuvent','pu',0,'can',['venir','travailler','comprendre'],['come','work','understand']],
   ['venir','viens viens vient venons venez viennent','venu',1,['come','comes','came'],['de Roumanie','à Lausanne','ici'],['from Romania','to Lausanne','here']],
   ['voir','vois vois voit voyons voyez voient','vu',0,['see','sees','saw'],['le film','la mer','le problème'],['the film','the sea','the problem']],
   ['vouloir','veux veux veut voulons voulez veulent','voulu',0,['want to','wants to','wanted to'],['apprendre le français','partir','manger'],['learn French','leave','eat']]];
  const vow=f=>/^[aeiouéèêâîô]/i.test(f),cap=x=>x[0].toUpperCase()+x.slice(1);
  const subj=(p,f)=>p===0&&vow(f)?"j'"+f:P[p]+' '+f,ne=f=>(vow(f)?"n'":'ne ')+f+' pas';
  const fr=(v,t,neg,p)=>{const f=v[1].split(' ');
    if(t===0)return neg?P[p]+' '+ne(f[p]):subj(p,f[p]);
    if(t===1){const a=(v[3]?ET:AV)[p],pp=v[2]+(v[3]?AG[p]:'');return neg?P[p]+' '+ne(a)+' '+pp:subj(p,a+' '+pp)}
    return neg?P[p]+' '+ne(AL[p])+' '+v[0]:P[p]+' '+AL[p]+' '+v[0]};
  const en=(v,t,neg,p)=>{const e=v[4],s=E[p],n=neg?' not':'';
    if(e==='be')return t===0?`${s} ${BE[p]}${n}`:t===1?`${s} ${WAS[p]}${n}`:`${s} ${BE[p]}${n} going to be`;
    if(e==='can')return t===0?`${s} ${neg?'cannot':'can'}`:t===1?`${s} ${WAS[p]}${n} able to`:`${s} ${BE[p]}${n} going to be able to`;
    if(t===0)return neg?`${s} ${p===2?"doesn't":"don't"} ${e[0]}`:`${s} ${p===2?e[1]:e[0]}`;
    if(t===1)return neg?`${s} didn't ${e[0]}`:`${s} ${e[2]}`;
    return `${s} ${BE[p]}${n} going to ${e[0]}`};
  let out='# list: Notes: conjugaison\n';
  [['Présent',0,0],['Présent, négation',0,1],['Passé composé',1,0],['Passé composé, négation',1,1],['Futur proche',2,0],['Futur proche, négation',2,1]].forEach(([name,t,neg])=>{
    out+='\n# day: '+DAYMAP[name]+'\n## '+name+'\n';
    V.forEach(v=>{const r=[0,1,2,3,4,5];out+=`{${r.map(p=>cap(fr(v,t,neg,p))).join('|')}} {${v[5].join('|')}} = {${r.map(p=>cap(en(v,t,neg,p))).join('|')}} {${v[6].join('|')}}\n`});
  });
  return out;
}
const NOTE_CONCEPTS=`# list: Notes: grammaire
# day: 4
## Imparfait
{Je parlais|Tu parlais|Il parlait|Nous parlions|Vous parliez|Ils parlaient} {français|avec Marie} = {I used to speak|You used to speak|He used to speak|We used to speak|You (vous) used to speak|They used to speak} {French|with Marie}
{J'étais|Tu étais|Elle était|Nous étions|Vous étiez|Elles étaient} {à Lausanne|en retard|à la maison} = {I was|You were|She was|We were|You (vous) were|They (women) were} {in Lausanne|late|at home}

# day: 2
## Questions avec est-ce que
Est-ce que {tu parles|vous parlez|il parle} {français|anglais} ? = {Do you speak|Do you (vous) speak|Does he speak} {French|English}?
Est-ce que {tu as|vous avez|elle a} {un frère|une sœur|le temps} ? = {Do you have|Do you (vous) have|Does she have} {a brother|a sister|the time}?

`;
const STARTER_CONCEPTS=`# list: Starter
# day: 1
## Présent des verbes en -er
{Je mange|Tu manges|Nous mangeons} {une pomme|du pain|du fromage} = {I eat|You eat|We eat} {an apple|bread|cheese}
{Je parle|Elle parle|Ils parlent} français = {I speak|She speaks|They speak} French

# day: 3
## Passé composé avec avoir
{J'ai|Tu as|Elle a|Nous avons} {mangé|acheté} {une pomme|du pain} = {I|You|She|We} {ate|bought} {an apple|bread}

# day: 1
## Négation ne ... pas
{Je ne mange pas|Il ne mange pas|Nous ne mangeons pas} de {pain|fromage} = {I don't eat|He doesn't eat|We don't eat} {bread|cheese}
`;
const GRAMMAR=`# list: Plan: grammaire
# day: 1
## Aimer + nom ou infinitif
{J'aime|Tu aimes|Elle aime|Nous aimons|Vous aimez|Ils aiment} {le cinéma|la musique|voyager|lire} = {I like|You like|She likes|We like|You (vous) like|They like} {cinema|music|travelling|reading}
{Je n'aime pas|Il n'aime pas|Nous n'aimons pas} {le café|le sport|travailler le soir} = {I don't like|He doesn't like|We don't like} {coffee|sport|working in the evening}

# day: 2
## Articles: un, une, des, le, la, les
{J'ai|Tu as|Elle a} {un chat|une voiture|des amis|un frère|une sœur} = {I have|You have|She has} {a cat|a car|friends|a brother|a sister}
{J'aime|Il aime|Nous aimons} {le chocolat|la plage|les chiens|l'été} = {I like|He likes|We like} {chocolate|the beach|dogs|summer}
{Je n'ai pas|Elle n'a pas} {de chat|de voiture|d'amis} = {I don't have|She doesn't have} {a cat|a car|any friends}

# day: 3
## Accord de l'adjectif
{Il est grand|Elle est grande|Ils sont grands|Elles sont grandes} = {He is tall|She is tall|They (men) are tall|They (women) are tall}
{Il est content|Elle est contente|Ils sont contents|Elles sont contentes} = {He is happy|She is happy|They (men) are happy|They (women) are happy}
C'est {un petit chat|une petite maison|un grand jardin|une grande ville|une voiture rouge} = It is {a small cat|a small house|a big garden|a big city|a red car}

# day: 4
## Passé composé ou imparfait
{Je regardais un film quand tu as appelé|Il pleuvait quand je suis sorti(e)|Elle dormait quand nous sommes arrivé(e)s|Je lisais quand le téléphone a sonné} = {I was watching a film when you called|It was raining when I went out|She was sleeping when we arrived|I was reading when the phone rang}
{Avant, je travaillais à Paris|Hier, j'ai travaillé à Paris|Quand j'étais petit(e), j'aimais lire|Ce matin, j'ai lu le journal} = {Before, I used to work in Paris|Yesterday, I worked in Paris|When I was little, I liked reading|This morning, I read the newspaper}

# day: 5
## Pronoms objets: le, la, les, lui, leur
{Je le vois|Je la vois|Je les vois|Tu le connais|Elle les aime} = {I see him|I see her|I see them|You know him|She likes them}
{Je lui parle|Je leur parle|Il me parle|Elle te téléphone|Nous lui écrivons} = {I am speaking to him|I am speaking to them|He is speaking to me|She is calling you|We are writing to her}
{Je ne le vois pas|Je ne la connais pas|Il ne les aime pas} = {I don't see him|I don't know her|He doesn't like them}

## Y et en
{J'y vais|Tu y vas|Nous y allons|Elle y habite|J'y pense} = {I am going there|You are going there|We are going there|She lives there|I am thinking about it}
{J'en veux|J'en ai deux|Il en a beaucoup|Je n'en ai pas|Nous en parlons} = {I want some|I have two of them|He has a lot of them|I don't have any|We are talking about it}

## Prépositions courantes
{Je vais|Elle va|Nous allons} {à Paris|en France|au Canada|aux États-Unis|chez Marie} = {I am going|She is going|We are going} {to Paris|to France|to Canada|to the United States|to Marie's place}
Le livre est {sur la table|sous la chaise|dans le sac|devant la porte|derrière la maison|à côté du lit} = The book is {on the table|under the chair|in the bag|in front of the door|behind the house|next to the bed}

# day: 6
## Comparaisons
{Paul est plus grand que Marie|Marie est moins grande que Paul|Paul est aussi grand que Luc|Ce film est meilleur que le livre|Il parle mieux que moi} = {Paul is taller than Marie|Marie is less tall than Paul|Paul is as tall as Luc|This film is better than the book|He speaks better than me}
{Le train est plus rapide que le bus|Le bus est moins cher que le train|C'est la plus belle ville du monde|C'est le meilleur restaurant de la ville} = {The train is faster than the bus|The bus is less expensive than the train|It is the most beautiful city in the world|It is the best restaurant in town}

## Quantités
{J'ai|Il a|Nous avons} {beaucoup de travail|un peu de temps|trop de travail|assez d'argent|peu d'amis} = {I have|He has|We have} {a lot of work|a little time|too much work|enough money|few friends}
Je voudrais {un kilo de pommes|une bouteille d'eau|un verre de vin|une tasse de café|un morceau de fromage} = I would like {a kilo of apples|a bottle of water|a glass of wine|a cup of coffee|a piece of cheese}

## Pronoms relatifs: qui, que, où
{C'est l'homme qui parle français|C'est le film que j'ai vu|C'est la ville où j'habite|C'est le livre que je lis|C'est une amie qui habite à Paris} = {He is the man who speaks French|It is the film that I saw|It is the city where I live|It is the book that I am reading|She is a friend who lives in Paris}
{J'ai un ami qui travaille ici|Le café que tu bois est froid|Le jour où je suis arrivé(e), il pleuvait} = {I have a friend who works here|The coffee that you are drinking is cold|The day I arrived, it was raining}

## Conjonctions: parce que, mais, donc, quand
{Je reste à la maison parce que je suis fatigué(e)|Je veux venir, mais je dois travailler|Il pleut, donc je prends le bus|Quand j'ai le temps, je lis|Je mange parce que j'ai faim} = {I am staying home because I am tired|I want to come, but I have to work|It is raining, so I am taking the bus|When I have time, I read|I am eating because I am hungry}
{Si tu veux, on peut partir|Je ne sais pas si elle vient|Je travaille pendant que tu dors} = {If you want, we can leave|I don't know if she is coming|I work while you sleep}

# day: 7
## Futur simple
{Je parlerai|Tu parleras|Il parlera|Nous parlerons|Vous parlerez|Ils parleront} {avec Marie|français|demain} = {I will speak|You will speak|He will speak|We will speak|You (vous) will speak|They will speak} {with Marie|French|tomorrow}
{Je serai|Tu seras|Elle sera|Nous serons|Vous serez|Ils seront} {à Lausanne|en retard|à la maison} = {I will be|You will be|She will be|We will be|You (vous) will be|They will be} {in Lausanne|late|at home}
{J'aurai le temps demain|Tu iras à Paris|Il fera beau|Nous pourrons venir|Ils viendront ce soir|Je verrai} = {I will have time tomorrow|You will go to Paris|The weather will be nice|We will be able to come|They will come tonight|I will see}

## Conditionnel
{Je voudrais|Tu voudrais|Il voudrait|Nous voudrions|Vous voudriez|Ils voudraient} {un café|partir|apprendre le français} = {I would like|You would like|He would like|We would like|You (vous) would like|They would like} {a coffee|to leave|to learn French}
{Je pourrais venir demain|Tu devrais dormir|On pourrait aller au cinéma|J'aimerais voyager|Ce serait bien|Vous devriez essayer} = {I could come tomorrow|You should sleep|We could go to the cinema (on)|I would love to travel|That would be nice|You (vous) should try}

## Donner son opinion
{Je pense que|Je crois que|Je trouve que|À mon avis,|J'ai l'impression que} {c'est une bonne idée|c'est trop cher|tu as raison|ce film est intéressant} = {I think that|I believe that|I find that|In my opinion,|I have the impression that} {it is a good idea|it is too expensive|you are right|this film is interesting}
{Je suis d'accord avec toi|Je ne suis pas d'accord|Ça dépend|Tu as raison|Je ne suis pas sûr(e)} = {I agree with you|I don't agree|It depends|You are right|I am not sure}

# day: 8
## Venir de et être en train de
{Je viens|Tu viens|Elle vient|Nous venons|Ils viennent} {de manger|d'arriver|de finir|de partir} = {I have just|You have just|She has just|We have just|They have just} {eaten|arrived|finished|left}
{Je suis en train de|Il est en train de|Nous sommes en train de} {manger|travailler|lire|regarder un film} = {I am in the middle of|He is in the middle of|We are in the middle of} {eating|working|reading|watching a film}

## Verbes pronominaux
{Je me lève|Tu te lèves|Il se lève|Nous nous levons|Vous vous levez|Ils se lèvent} {tôt|à sept heures|tard} = {I get up|You get up|He gets up|We get up|You (vous) get up|They get up} {early|at seven o'clock|late}
{Je me couche tard|Elle s'appelle Marie|Je me souviens de toi|Nous nous reposons|Tu te dépêches|Ils s'amusent} = {I go to bed late|Her name is Marie|I remember you|We are resting|You are hurrying|They are having fun}

# day: 9
## Verbes pronominaux au passé composé
{Je me suis levé(e)|Tu t'es levé(e)|Il s'est levé|Elle s'est levée|Nous nous sommes levé(e)s|Ils se sont levés} {tôt|tard|à huit heures} = {I got up|You got up|He got up|She got up|We got up|They got up} {early|late|at eight o'clock}
{Je me suis couché(e) tard|Elle s'est réveillée à six heures|Nous nous sommes amusé(e)s|Je me suis trompé(e) de train|Il s'est dépêché} = {I went to bed late|She woke up at six o'clock|We had fun|I got on the wrong train|He hurried}

## Négations: jamais, rien, plus, personne
{Je ne fume jamais|Je ne vois rien|Je ne travaille plus ici|Je ne connais personne|Il ne dit rien|Elle ne vient jamais} = {I never smoke|I don't see anything|I don't work here anymore|I don't know anyone|He says nothing|She never comes}
{Je n'ai rien mangé|Je n'ai jamais vu ce film|Il n'a vu personne|Personne ne sait|Rien ne marche} = {I didn't eat anything|I have never seen this film|He didn't see anyone|Nobody knows|Nothing works}

# day: 10
## Impératif
{Parle plus lentement|Parlez plus lentement|Viens ici|Attendez un moment|Écoute|Regardez} = {Speak more slowly|Speak (vous) more slowly|Come here|Wait (vous) a moment|Listen|Look (vous)}
{Ne pars pas|N'oublie pas|Allons-y|Dis-moi|Donnez-moi ça|Ne t'inquiète pas} = {Don't leave|Don't forget|Let's go|Tell me|Give (vous) me that|Don't worry}

## Pronoms objets au passé et avec l'infinitif
{Je l'ai vu|Je l'ai vue|Je les ai vus|Je lui ai parlé|Il m'a dit bonjour} = {I saw him|I saw her|I saw them|I spoke to him|He said hello to me}
{Je vais le faire|Je veux la voir|Tu peux m'aider|Je dois lui parler|Il va nous appeler} = {I am going to do it|I want to see her|You can help me|I have to speak to her|He is going to call us}

# day: 11
## Il y a, il faut, depuis, pendant
{Il y a un problème|Il y a beaucoup de monde|Il n'y a pas de pain|Il faut partir|Il faut travailler|Il ne faut pas oublier} = {There is a problem|There are a lot of people|There is no bread|It is necessary to leave|It is necessary to work|One must not forget}
{J'habite ici depuis deux ans|J'apprends le français depuis une semaine|J'ai travaillé pendant trois heures|Je suis arrivé(e) il y a deux jours|Il est parti il y a une heure} = {I have lived here for two years|I have been learning French for a week|I worked for three hours|I arrived two days ago|He left an hour ago}

# day: 12
## Si + présent, futur
{Si j'ai le temps, je viendrai|S'il pleut, je resterai à la maison|Si tu veux, nous irons au cinéma|Si elle peut, elle viendra|Si vous travaillez, vous réussirez} = {If I have time, I will come|If it rains, I will stay home|If you want, we will go to the cinema|If she can, she will come|If you (vous) work, you will succeed}

# day: 13
## Plus-que-parfait
{J'avais déjà mangé|Tu avais déjà fini|Il avait oublié|Nous avions déjà vu ce film|Elle était déjà partie|Ils étaient déjà arrivés} = {I had already eaten|You had already finished|He had forgotten|We had already seen this film|She had already left|They had already arrived}
{Quand je suis arrivé(e), il était déjà parti|J'ai lu le livre que tu m'avais donné|Elle a dit qu'elle avait compris} = {When I arrived, he had already left|I read the book that you had given me|She said that she had understood}

# day: 14
## Gérondif et discours indirect
{J'apprends en écoutant|Il mange en regardant la télé|Elle travaille en chantant|Je me suis blessé(e) en tombant} = {I learn by listening|He eats while watching TV|She works while singing|I hurt myself falling}
{Il dit qu'il est fatigué|Elle dit qu'elle viendra|Il a dit qu'il était malade|Je sais qu'elle a raison|Il demande si tu viens} = {He says that he is tired|She says that she will come|He said that he was sick|I know that she is right|He asks if you are coming}

# day: 15
## Subjonctif présent
{Il faut que je parte|Il faut que tu viennes|Il faut qu'il fasse ses devoirs|Il faut que nous parlions|Il faut que vous soyez à l'heure|Il faut qu'ils aient le temps} = {I have to leave (il faut que)|You have to come (il faut que)|He has to do his homework (il faut que)|We have to talk (il faut que)|You (vous) have to be on time (il faut que)|They have to have time (il faut que)}
{Je veux que tu viennes|Je voudrais que vous m'aidiez|Je suis content(e) que tu sois là|Bien qu'il soit tard, je travaille|Je ne pense pas que ce soit vrai} = {I want you to come|I would like you (vous) to help me|I am happy that you are here|Although it is late, I am working|I don't think that it is true}

# day: 16
## Si + imparfait, conditionnel
{Si j'avais le temps, je voyagerais|Si j'étais riche, j'achèterais une maison|Si tu venais, je serais content(e)|S'il faisait beau, nous irions à la plage|Si je pouvais, je le ferais} = {If I had time, I would travel|If I were rich, I would buy a house|If you came, I would be happy|If the weather were nice, we would go to the beach|If I could, I would do it}

# day: 17
## Cause et conséquence
{Je suis en retard à cause du train|J'ai réussi grâce à toi|Comme il pleut, je reste ici|Il est malade, c'est pourquoi il ne vient pas|Puisque tu es là, aide-moi} = {I am late because of the train|I succeeded thanks to you|As it is raining, I am staying here (comme)|He is sick, that is why he is not coming|Since you are here, help me (puisque)}

# day: 18
## Opposition et concession
{Il est riche, pourtant il n'est pas heureux|Même si c'est difficile, je continue|J'aime le thé, alors que lui préfère le café|Malgré la pluie, nous sortons|Je viens quand même} = {He is rich, yet he is not happy|Even if it is difficult, I keep going|I like tea, whereas he prefers coffee|Despite the rain, we are going out|I am coming anyway}

# day: 19
## Pronoms relatifs: dont, ce qui, ce que
{C'est le film dont je parle|C'est l'ami dont je t'ai parlé|Voilà ce dont j'ai besoin|Je ne sais pas ce que tu veux|Ce qui est important, c'est d'essayer|Dis-moi ce qui se passe} = {It is the film I am talking about|He is the friend I told you about|That is what I need|I don't know what you want|What is important is to try|Tell me what is happening}

# day: 20
## Conditionnel passé
{J'aurais dû partir plus tôt|Tu aurais pu me le dire|J'aurais aimé venir|Il aurait fallu réserver|Nous serions venu(e)s|Si j'avais su, je serais resté(e)} = {I should have left earlier|You could have told me|I would have liked to come|It would have been necessary to book|We would have come|If I had known, I would have stayed}
`;
