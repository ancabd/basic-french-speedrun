/* ---------- course: reading texts ----------
   One text a day for days 1–7, two a day from day 8. Each uses only grammar unlocked by its day.
   They follow one story: Ana, from Romania, settling into Lausanne with Julien (a colleague),
   Karim (a friend, a cook) and Madame Rochat (her neighbour).

   Format of each text:
     @@<day><letter> | Title
     paragraphs (a blank line between paragraphs)
     -- gloss       one per line: "form in the text | dictionary form = english / other english"
                    (when the form in the text is already the dictionary form: "word = english")
                    These become flashcards from that day on.
     -- questions   "Question | *right answer | wrong | wrong | wrong" (the * marks the right one)
     -- write       "French prompt | English prompt" (offered as the Writing free answer)
*/
const TEXTS=`
@@1a | Ana à Lausanne
Bonjour ! Je suis Ana. J'ai trente-deux ans et je suis de Roumanie. J'habite à Lausanne, dans un petit appartement près du lac.

Je travaille dans un bureau en ville. Le matin, je prends le bus. Je parle roumain, anglais et un peu français. Le français est difficile, mais j'aime la langue.

Le soir, je fais la cuisine et je regarde un film. Je ne regarde pas la télévision. Le week-end, je veux visiter la ville. Je peux aller au lac à pied.
-- gloss
le lac = the lake
près du | près de = near / close to
le bureau = the office
le matin = the morning / in the morning
je prends | prendre = to take
la langue = the language
le soir = the evening / in the evening
difficile = difficult / hard
à pied = on foot
-- questions
How old is Ana? | *32 | 22 | 42 | 23
How does Ana get to work in the morning? | *By bus | On foot | By train | By car
What does Ana not watch? | *Television | Films | The lake | The news
-- write
Présente-toi comme Ana : ton âge, ta ville, tes langues. | Introduce yourself like Ana: your age, your city, your languages.

@@2a | Le week-end d'Ana
Ce week-end, Ana va visiter la ville avec Julien. Julien est un collègue. Il est sympa et il parle lentement, alors Ana comprend bien.

Samedi matin, ils vont prendre le métro. Ils vont aller à la cathédrale et au marché. Ana veut acheter des fruits, du pain et un fromage suisse.

« Est-ce que tu aimes le chocolat ? » demande Julien. « Oui, beaucoup ! » répond Ana. « Alors, on va manger une glace au chocolat près du lac. »

Dimanche, Ana ne va pas travailler. Elle va dormir et lire un livre.
-- gloss
un collègue | le collègue = the colleague
sympa = nice / friendly
lentement = slowly
le marché = the market
la cathédrale = the cathedral
demande | demander = to ask
répond | répondre = to answer / to reply
une glace | la glace = the ice cream / ice cream
dormir = to sleep
lire = to read
-- questions
Who is Julien? | *Ana's colleague | Ana's brother | Ana's neighbour | A waiter
What does Ana want to buy at the market? | *Fruit, bread and cheese | Chocolate and coffee | A book | Flowers
What are they going to eat by the lake? | *A chocolate ice cream | A pizza | Bread and cheese | Fruit
What is Ana going to do on Sunday? | *Sleep and read | Work | Visit the cathedral | Take the metro
-- write
Qu'est-ce que tu vas faire ce week-end ? | What are you going to do this weekend?

@@3a | Une journée au bord du lac
Samedi, Ana et Julien sont allés au marché. Ana a acheté des pommes rouges et un pain délicieux. Julien a pris un café dans une petite boulangerie.

Après, ils sont montés à la cathédrale. La vue est magnifique : le lac est bleu et les montagnes sont grandes et blanches. Ana a pris beaucoup de photos.

L'après-midi, ils sont descendus au bord du lac. Ils ont mangé une glace au chocolat. Le soir, Ana est rentrée à la maison. Elle est fatiguée mais contente. Elle n'a pas regardé de film : elle est allée au lit à neuf heures.
-- gloss
au bord du | au bord de = at the edge of / by / on the shore of
délicieux = delicious
la boulangerie = the bakery
la vue = the view
magnifique = magnificent / wonderful / beautiful
les montagnes | la montagne = the mountain
blanches | blanc = white
l'après-midi = the afternoon / in the afternoon
contente | content = happy / pleased
le lit = the bed
-- questions
What did Ana buy at the market? | *Red apples and bread | Cheese and wine | Coffee | Chocolate
Where did Julien have a coffee? | *In a small bakery | At the cathedral | By the lake | At home
What colour are the mountains? | *White | Blue | Green | Grey
When did Ana go to bed? | *At nine o'clock | At midnight | At eleven o'clock | At seven o'clock
-- write
Qu'est-ce que tu as fait samedi dernier ? Raconte. | What did you do last Saturday? Tell me about it.

@@4a | Quand Ana était petite
Quand Ana était petite, elle habitait dans un village en Roumanie. Sa famille avait une grande maison avec un jardin. Dans le jardin, sa grand-mère cultivait des tomates et des fleurs.

Chaque été, Ana allait à la rivière avec son frère. Ils nageaient, ils jouaient et ils rentraient tard. Le soir, la grand-mère racontait des histoires.

Un jour, quand Ana avait dix ans, elle est tombée dans la rivière. Son frère a sauté dans l'eau et il a aidé sa sœur. Elle a eu très peur, mais après, elle a ri. Aujourd'hui, elle raconte encore cette histoire à ses amis.
-- gloss
le village = the village
le jardin = the garden
la grand-mère = the grandmother
cultivait | cultiver = to grow (plants) / to cultivate
fleurs | la fleur = the flower
chaque = each / every
la rivière = the river
nageaient | nager = to swim
racontait | raconter = to tell (a story)
histoires | l'histoire = the story / history
a sauté | sauter = to jump
peur | avoir peur = to be afraid / to be scared
-- questions
Où habitait Ana quand elle était petite ? | *Dans un village en Roumanie | À Lausanne | À Genève | Dans une grande ville
Qu'est-ce que la grand-mère cultivait ? | *Des tomates et des fleurs | Des pommes | Des pommes de terre | Des oranges
Que faisaient Ana et son frère en été ? | *Ils nageaient et jouaient à la rivière | Ils travaillaient au jardin | Ils allaient à l'école | Ils regardaient la télé
Qu'est-ce qui est arrivé à Ana quand elle avait dix ans ? | *Elle est tombée dans la rivière | Elle a perdu son chat | Elle est partie à Lausanne | Elle est allée à Paris
-- write
Comment était ta vie quand tu étais petit(e) ? | What was your life like when you were little?

@@5a | Au marché avec Madame Rochat
Madame Rochat est la voisine d'Ana. Elle a soixante-dix-huit ans et elle va au marché chaque mardi. Aujourd'hui, Ana l'accompagne.

Au marché, Madame Rochat connaît tout le monde. Elle parle au fromager et elle lui demande des nouvelles de sa famille. « Vous voulez des abricots ? » demande le vendeur. « Oui, j'en prends un kilo », répond Madame Rochat.

Ana cherche des champignons. Elle en trouve sur une table, à côté des salades. Elle les achète pour faire une soupe.

Après le marché, les deux femmes vont au café en face de la gare. Elles y retournent maintenant chaque semaine. Madame Rochat raconte des histoires de Lausanne, et Ana les écoute avec plaisir.
-- gloss
la voisine = the neighbour (woman) / the neighbor / the neighbour
accompagne | accompagner = to go with / to accompany
connaît | connaître = to know (a person or a place)
tout le monde = everybody / everyone
le fromager = the cheese seller / the cheesemonger
les nouvelles = the news
le vendeur = the seller / the stallholder / the salesman
champignons | le champignon = the mushroom
en face de = opposite / across from / in front of
avec plaisir = with pleasure / gladly
-- questions
Qui est Madame Rochat ? | *La voisine d'Ana | La mère d'Ana | Une collègue d'Ana | La vendeuse du marché
Combien d'abricots Madame Rochat prend-elle ? | *Un kilo | Deux kilos | Un seul | Dix
Pourquoi Ana achète-t-elle des champignons ? | *Pour faire une soupe | Pour Madame Rochat | Pour une pizza | Pour une salade
Où est le café ? | *En face de la gare | À côté du lac | Derrière la cathédrale | Dans le marché
-- write
Tu vas au marché ou au supermarché ? Qu'est-ce que tu y achètes ? | Do you go to the market or the supermarket? What do you buy there?

@@6a | Lausanne ou Genève ?
Julien est né à Genève, mais il préfère Lausanne. « Lausanne est plus petite que Genève, dit-il, mais elle est plus belle. » Ana pose une question : « Pourquoi ? »

« Parce que c'est une ville où on marche beaucoup, répond Julien. Les rues montent et descendent, donc on voit toujours le lac. À Genève, les rues sont plus plates, mais la ville est plus internationale. »

Ana a un ami, Karim, qui travaille à Genève. Le restaurant où il travaille est le meilleur de la ville, dit-il. Karim gagne plus d'argent que Julien, mais il a moins de temps libre. Il travaille beaucoup et il dort peu.

Quand Ana pense aux deux villes, elle sait une chose : le chocolat que Karim lui offre est aussi bon à Lausanne qu'à Genève !
-- gloss
est né | naître = to be born
préfère | préférer = to prefer
rues | la rue = the street / the road
montent | monter = to go up / to climb
plates | plat = flat
gagne | gagner = to earn / to win
l'argent = money / the money
le temps libre = free time / spare time
moins de = less / fewer
peu = little / not much
offre | offrir = to offer / to give (as a gift)
-- questions
Quelle ville Julien préfère-t-il ? | *Lausanne | Genève | Paris | Berne
Pourquoi est-ce qu'on voit toujours le lac à Lausanne ? | *Parce que les rues montent et descendent | Parce que la ville est plate | Parce que le lac est très grand | Parce qu'on prend le bateau
Qu'est-ce que Karim a de moins que Julien ? | *Du temps libre | De l'argent | Du travail | Des amis
Où travaille Karim ? | *Dans un restaurant à Genève | Dans un bureau à Lausanne | Au marché | Dans une banque
-- write
Compare ta ville et une autre ville que tu connais. | Compare your city with another city you know.

@@7a | Un mois en Suisse
Ana écrit un message à son frère, Mihai.

« Salut Mihai ! Mon premier mois à Lausanne est fini. Je pense que mon français est meilleur, mais je ne suis pas sûre. Je comprends Julien et Madame Rochat, mais à la radio, les gens parlent trop vite.

Le mois prochain, je prendrai des cours de français le soir. J'apprendrai aussi à faire du ski : Julien dit que c'est facile, mais je ne le crois pas !

Tu viendras me voir en décembre ? Nous irons à Genève chez Karim et nous mangerons une fondue. À mon avis, tu adoreras la Suisse. Je voudrais aussi te présenter Madame Rochat : elle serait très contente de te rencontrer.

Bises, Ana »
-- gloss
écrit | écrire = to write
fini = finished / over
sûre | sûr = sure
trop vite = too fast / too quickly
cours | le cours = the class / the lesson / the course
le ski = skiing / ski
facile = easy
crois | croire = to believe
rencontrer = to meet
bises = love (at the end of a message) / kisses
-- questions
À qui Ana écrit-elle ? | *À son frère | À sa mère | À Julien | À Karim
Qu'est-ce qu'Ana fera le mois prochain ? | *Elle prendra des cours de français | Elle rentrera en Roumanie | Elle changera de travail | Elle ira à Paris
Pourquoi Ana ne comprend-elle pas bien la radio ? | *Les gens parlent trop vite | La radio est en allemand | Elle n'a pas de radio | Le son est mauvais
Qu'est-ce qu'ils mangeront chez Karim ? | *Une fondue | Une pizza | Du poisson | Une soupe
-- write
Écris un message à un ami : tes projets pour le mois prochain. | Write a message to a friend: your plans for next month.

@@8a | Le matin d'Ana
Ana se réveille à six heures et demie. Elle ne se lève pas tout de suite : elle reste cinq minutes au lit et elle écoute la radio en français. Ensuite, elle se lève, elle se douche et elle s'habille.

Elle prend son petit-déjeuner : du pain, du beurre et un café. À sept heures et quart, elle se brosse les dents et elle se dépêche, parce que le bus passe à sept heures vingt-cinq.

Ce matin, elle est en retard. Quand elle arrive à l'arrêt, le bus vient de partir ! Elle attend le prochain. Julien lui envoie un message : « Tu es où ? La réunion vient de commencer. » Ana répond : « Je suis en train d'attendre le bus. J'arrive dans dix minutes ! »

Au bureau, tout le monde est en train de travailler. Ana s'assoit, elle se calme et elle commence sa journée.
-- gloss
se réveille | se réveiller = to wake up
tout de suite = right away / immediately / straight away
se douche | se doucher = to shower / to have a shower
s'habille | s'habiller = to get dressed
le petit-déjeuner = breakfast / the breakfast
le beurre = butter / the butter
se brosse les dents | se brosser les dents = to brush one's teeth / to brush your teeth
l'arrêt = the stop / the bus stop
la réunion = the meeting
s'assoit | s'asseoir = to sit down
-- questions
Que fait Ana juste après son réveil ? | *Elle écoute la radio au lit | Elle se douche | Elle prend un café | Elle part au travail
Pourquoi Ana se dépêche-t-elle ? | *Le bus passe à sept heures vingt-cinq | Elle a une réunion à sept heures | Julien l'attend devant la maison | Elle doit acheter du pain
Quand Ana arrive à l'arrêt, que se passe-t-il ? | *Le bus vient de partir | Le bus arrive | Julien l'attend | Il pleut
Que fait Ana quand Julien lui écrit ? | *Elle est en train d'attendre le bus | Elle est en train de se doucher | Elle est en réunion | Elle dort
-- write
Décris ton matin, de ton réveil jusqu'au travail. | Describe your morning, from waking up to getting to work.

@@8b | Le message vocal de Karim
Ana écoute le message vocal de Karim.

« Salut Ana, c'est Karim ! Je viens de finir mon service au restaurant et je suis en train de rentrer à pied. Il est minuit, mais je ne suis pas fatigué. Tu sais, je me couche toujours très tard.

Je t'appelle parce que je viens d'avoir une idée. Samedi, le restaurant est fermé. Tu veux venir à Genève ? On se promène au bord du lac, et le soir, je cuisine pour toi et pour Julien.

Je me souviens que tu aimes la cuisine libanaise. Ma mère vient d'envoyer sa recette du taboulé, alors je vais faire un taboulé. Tu me réponds demain ? Bonne nuit ! »
-- gloss
le message vocal = the voice message / the voicemail
le service = the shift (in a restaurant) / service
me couche | se coucher = to go to bed
une idée | l'idée = the idea
fermé = closed
se promène | se promener = to go for a walk / to walk
cuisine | cuisiner = to cook
me souviens | se souvenir = to remember
la recette = the recipe
-- questions
Que vient de faire Karim ? | *Il vient de finir son service | Il vient de se lever | Il vient d'arriver à Lausanne | Il vient de manger
Pourquoi Karim n'est-il pas fatigué ? | *Il se couche toujours très tard | Il a dormi l'après-midi | Il boit beaucoup de café | Il ne travaille pas
Pourquoi samedi est-il un bon jour ? | *Le restaurant est fermé | Il fait beau | C'est son anniversaire | Julien est libre
Qu'est-ce que Karim va cuisiner ? | *Un taboulé | Une fondue | Une pizza | Une soupe
-- write
Laisse un message vocal à un ami pour l'inviter ce week-end. | Leave a voice message for a friend to invite them this weekend.

@@9a | Une journée à Genève
Samedi, Ana et Julien se sont levés tôt et ils ont pris le train pour Genève. Karim les attendait à la gare.

Ils se sont promenés au bord du lac et ils ont vu le jet d'eau. Ana n'a jamais vu de jet d'eau aussi grand ! Julien, lui, s'est ennuyé un peu : il connaît Genève par cœur.

Le soir, Karim a cuisiné un taboulé et du poulet. Personne n'a rien dit au début : tout le monde mangeait. Ensuite, ils se sont amusés et ils ont beaucoup ri.

Ana s'est couchée chez Karim, sur le canapé. Elle ne s'est pas réveillée avant dix heures. Le dimanche, elle ne voulait plus partir !
-- gloss
tôt = early
le jet d'eau = the water jet / the fountain
s'est ennuyé | s'ennuyer = to be bored / to get bored
par cœur = by heart
le poulet = chicken / the chicken
au début = at the beginning / at first
se sont amusés | s'amuser = to have fun / to enjoy oneself
ri | rire = to laugh
le canapé = the sofa / the couch
-- questions
Comment Ana et Julien sont-ils allés à Genève ? | *En train | En bus | En voiture | À pied
Pourquoi Julien s'est-il ennuyé ? | *Il connaît Genève par cœur | Il était fatigué | Il n'aime pas le lac | Il voulait travailler
Pourquoi personne n'a rien dit au début du repas ? | *Tout le monde mangeait | Ils étaient fâchés | Karim chantait | Ils regardaient un film
Où Ana a-t-elle dormi ? | *Sur le canapé de Karim | À l'hôtel | Dans le train | Chez Julien
-- write
Raconte une journée où tu t'es bien amusé(e). | Tell me about a day when you had a lot of fun.

@@9b | Nouvelle en ville
Quand Ana est arrivée à Lausanne, elle ne connaissait personne. Le premier soir, elle s'est assise dans son appartement vide et elle s'est sentie très seule. Elle n'avait rien dans le frigo et les magasins étaient déjà fermés.

Les premières semaines, elle ne sortait jamais le soir. Elle ne comprenait rien à la radio et elle n'osait pas parler français au travail.

Aujourd'hui, tout a changé. Elle ne mange plus seule le soir : elle dîne souvent avec Madame Rochat ou avec des collègues. Elle ne se perd plus dans les rues. Et elle ne s'est jamais sentie aussi bien dans une ville étrangère.
-- gloss
vide = empty
s'est sentie | se sentir = to feel
seule | seul = alone / lonely
le frigo = the fridge
les magasins | le magasin = the shop / the store
osait | oser = to dare
dîne | dîner = to have dinner / to dine
se perd | se perdre = to get lost
étrangère | étranger = foreign
-- questions
Comment Ana s'est-elle sentie le premier soir ? | *Très seule | Très contente | Malade | En colère
Pourquoi Ana ne pouvait-elle pas acheter à manger le premier soir ? | *Les magasins étaient fermés | Elle n'avait pas d'argent | Elle ne parlait pas français | Elle était malade
Qu'est-ce qu'Ana n'osait pas faire au début ? | *Parler français au travail | Sortir de l'appartement | Prendre le bus | Téléphoner à sa famille
Qu'est-ce qui a changé ? | *Elle ne mange plus seule le soir | Elle ne travaille plus | Elle n'aime plus Lausanne | Elle ne parle plus français
-- write
Comment tu t'es senti(e) la première fois dans une nouvelle ville ? | How did you feel the first time you were in a new city?

@@10a | La recette de Madame Rochat
Madame Rochat a donné sa recette de fondue à Ana. Elle l'a écrite sur une petite carte :

« Frotte le caquelon avec une gousse d'ail. Verse le vin blanc et chauffe-le doucement. Ajoute le fromage petit à petit et mélange-le toujours dans le même sens. Ne le laisse pas bouillir ! Quand la fondue est prête, mets un peu de poivre et sers-la tout de suite avec du pain coupé en cubes.

Et surtout, ne perds pas ton pain dans le caquelon : la tradition dit que la personne qui le perd doit chanter une chanson ! »

Ana a lu la recette deux fois. Elle va la préparer samedi pour Julien et Karim. Elle veut les impressionner.
-- gloss
frotte | frotter = to rub
le caquelon = the fondue pot
une gousse d'ail | la gousse d'ail = the garlic clove / a clove of garlic
verse | verser = to pour
chauffe | chauffer = to heat / to warm up
ajoute | ajouter = to add
petit à petit = little by little / bit by bit
mélange | mélanger = to mix / to stir
bouillir = to boil
le poivre = pepper / the pepper
impressionner = to impress
-- questions
Qu'est-ce qu'on fait en premier ? | *On frotte le caquelon avec de l'ail | On ajoute le fromage | On met du poivre | On coupe le pain
Que ne doit-on pas faire avec la fondue ? | *La laisser bouillir | La mélanger | Ajouter du vin | La servir avec du pain
Que doit faire la personne qui perd son pain ? | *Chanter une chanson | Payer le repas | Faire la vaisselle | Boire un verre d'eau
Pour qui Ana va-t-elle préparer la fondue ? | *Pour Julien et Karim | Pour Madame Rochat | Pour son frère | Pour ses collègues
-- write
Explique à un ami comment préparer ton plat préféré. Utilise l'impératif. | Explain to a friend how to make your favourite dish. Use the imperative.

@@10b | Le mot de Julien
Julien part en vacances une semaine. Il a laissé un mot à Ana au bureau :

« Ana, je pars demain matin. Voici quelques petites choses à faire cette semaine.

Arrose ma plante, s'il te plaît. Ne lui donne pas trop d'eau : une fois tous les trois jours, c'est assez.

Le client de Berne va appeler mardi. Réponds-lui en français, il ne parle pas anglais. Tu peux le faire, j'en suis sûr !

Je n'ai pas envoyé le rapport à la directrice. Envoie-le avant jeudi, s'il te plaît. Si tu as une question, écris-moi. Mais ne m'appelle pas avant dix heures : je vais dormir !

Merci mille fois. Je te rapporterai du chocolat de Bruxelles. Julien »
-- gloss
le mot = the note / the word
arrose | arroser = to water
la plante = the plant
une fois = once / one time
le client = the client / the customer
le rapport = the report
la directrice = the director (woman) / the manager / the director
rapporterai | rapporter = to bring back
-- questions
Pourquoi Julien a-t-il laissé un mot ? | *Il part en vacances | Il est malade | Il change de travail | Il est en retard
Combien de fois Ana doit-elle arroser la plante ? | *Une fois tous les trois jours | Tous les jours | Deux fois par jour | Une fois par semaine
Pourquoi Ana doit-elle répondre en français au client ? | *Il ne parle pas anglais | Julien le veut | C'est un client français | Ana doit pratiquer
Qu'est-ce que Julien n'a pas fait ? | *Envoyer le rapport | Arroser la plante | Appeler le client | Acheter son billet
-- write
Écris un mot à un collègue avant tes vacances. | Write a note to a colleague before your holiday.

@@11a | Ana cherche un appartement
Ana habite dans son petit studio depuis un mois et demi. Il est pratique, mais il n'y a pas de balcon et la cuisine est minuscule. Elle cherche un nouvel appartement depuis deux semaines.

À Lausanne, ce n'est pas facile. Il faut envoyer beaucoup de documents : un contrat de travail, des fiches de salaire et une copie du passeport. Il y a aussi beaucoup de monde à chaque visite.

Il y a trois jours, Ana a visité un deux-pièces près de la gare. Il y avait une vue sur le lac et un grand balcon. Elle est restée dans l'appartement pendant vingt minutes et elle a tout regardé.

Le loyer est un peu cher, mais il faut parfois faire des choix. Ce soir, elle va envoyer son dossier. Il faut croiser les doigts !
-- gloss
le studio = the studio flat / the studio apartment / the studio
pratique = practical / convenient
le balcon = the balcony
minuscule = tiny
des fiches de salaire | la fiche de salaire = the payslip / the pay slip
beaucoup de monde = a lot of people / many people
un deux-pièces | le deux-pièces = the two-room flat / the one-bedroom apartment
le loyer = the rent
le dossier = the application / the file
croiser les doigts = to cross one's fingers / to keep one's fingers crossed
-- questions
Depuis combien de temps Ana cherche-t-elle un appartement ? | *Depuis deux semaines | Depuis un mois et demi | Depuis trois jours | Depuis un an
Qu'est-ce qui manque dans son studio ? | *Un balcon | Une cuisine | Une salle de bains | Une fenêtre
Quand Ana a-t-elle visité le deux-pièces ? | *Il y a trois jours | Hier | Il y a deux semaines | Ce matin
Combien de temps est-elle restée dans l'appartement ? | *Vingt minutes | Deux heures | Cinq minutes | Toute la journée
-- write
Décris ton logement. Depuis combien de temps tu y habites ? | Describe your home. How long have you lived there?

@@11b | Six semaines de français
Ana apprend le français depuis six semaines. Il y a un mois, elle ne comprenait presque rien. Maintenant, elle suit une conversation simple sans problème.

Son professeur dit qu'il faut écouter du français tous les jours. Alors, pendant le trajet en bus, Ana écoute un podcast. Le soir, elle regarde une série avec des sous-titres en français, jamais en anglais.

Il y a encore des difficultés. Les nombres, par exemple : quatre-vingt-dix-sept, c'est long ! Et il faut faire attention aux faux amis. La semaine dernière, Ana a dit à un collègue qu'elle était « excitée » par le projet. Il a ri pendant cinq minutes.
-- gloss
presque = almost / nearly
suit | suivre = to follow
le professeur = the teacher
le trajet = the journey / the trip / the commute
sous-titres | le sous-titre = the subtitle
difficultés | la difficulté = the difficulty
faire attention = to pay attention / to be careful
faux amis | le faux ami = the false friend
le projet = the project
-- questions
Depuis combien de temps Ana apprend-elle le français ? | *Depuis six semaines | Depuis six mois | Depuis un an | Depuis deux semaines
Quand Ana écoute-t-elle un podcast ? | *Pendant le trajet en bus | Le soir au lit | Pendant le déjeuner | Le week-end
Quels sous-titres utilise-t-elle ? | *En français | En anglais | En roumain | Aucun
Pourquoi le collègue a-t-il ri ? | *Ana a utilisé un faux ami | Ana a raconté une blague | Ana s'est trompée de nombre | Ana est tombée
-- write
Comment tu apprends le français ? Qu'est-ce qu'il faut faire, à ton avis ? | How do you learn French? What should you do, in your opinion?

@@12a | Les projets du week-end
Julien est de retour de Bruxelles. Il propose une excursion pour samedi.

« S'il fait beau, nous irons à Montreux en bateau. Nous visiterons le château de Chillon et nous mangerons au bord du lac. S'il pleut, nous resterons à Lausanne et nous irons au musée. »

Ana aime l'idée. « Si nous allons à Montreux, j'apporterai un pique-nique, dit-elle. Et si Karim est libre, il viendra aussi. » Karim répond par message : « Si je finis tôt vendredi, je prendrai le premier train samedi matin. »

Madame Rochat, elle, a un conseil : « Si vous prenez le bateau, mettez un pull. Sur le lac, il fait toujours plus froid qu'en ville ! »
-- gloss
de retour = back (returned)
propose | proposer = to suggest / to propose
une excursion | l'excursion = the trip / the outing / the excursion
le bateau = the boat
le château = the castle
pleut | pleuvoir = to rain
le musée = the museum
apporterai | apporter = to bring
un pique-nique | le pique-nique = the picnic
un conseil | le conseil = the advice / the piece of advice
un pull | le pull = the jumper / the sweater
-- questions
Que feront-ils s'il fait beau ? | *Ils iront à Montreux en bateau | Ils resteront à Lausanne | Ils iront au musée | Ils iront à Genève
Que feront-ils s'il pleut ? | *Ils iront au musée | Ils iront au château | Ils prendront le bateau | Ils feront un pique-nique
Quand Karim viendra-t-il ? | *S'il finit tôt vendredi | S'il fait beau | Si Ana l'appelle | S'il n'est pas fatigué
Quel conseil donne Madame Rochat ? | *Mettre un pull | Prendre un parapluie | Partir tôt | Manger avant de partir
-- write
Qu'est-ce que tu feras ce week-end s'il fait beau ? Et s'il pleut ? | What will you do this weekend if the weather is nice? And if it rains?

@@12b | L'entretien de Karim
Karim a un entretien d'embauche lundi. Un grand hôtel de Lausanne cherche un chef. Il est nerveux et il en parle à Ana.

« Si j'obtiens ce poste, je déménagerai à Lausanne. Je serai plus près de vous, et je ne travaillerai plus la nuit. Mais si on me pose des questions difficiles, je ne saurai pas quoi répondre. »

Ana le rassure : « Si tu restes calme, tout se passera bien. Ils goûteront ta cuisine et ils verront que tu es excellent. Si tu veux, nous pouvons préparer l'entretien ensemble ce soir. »

Karim sourit. « D'accord. Et si j'ai le poste, je t'inviterai au restaurant. Pas au mien : dans un vrai restaurant, où quelqu'un d'autre fait la cuisine ! »
-- gloss
un entretien d'embauche | l'entretien d'embauche = the job interview
un chef | le chef = the chef / the head cook
nerveux = nervous
obtiens | obtenir = to get / to obtain
le poste = the job / the position / the post
déménagerai | déménager = to move (house) / to move
rassure | rassurer = to reassure
goûteront | goûter = to taste
ensemble = together
sourit | sourire = to smile
-- questions
Quel poste Karim veut-il obtenir ? | *Chef dans un grand hôtel | Serveur à Genève | Professeur de cuisine | Directeur d'un restaurant
Que fera Karim s'il obtient le poste ? | *Il déménagera à Lausanne | Il restera à Genève | Il arrêtera de cuisiner | Il partira au Liban
De quoi a-t-il peur ? | *Des questions difficiles | De la cuisine | Du directeur | De déménager
Où Karim invitera-t-il Ana ? | *Dans un restaurant où il ne cuisine pas | Dans son restaurant | Chez lui | Au château de Chillon
-- write
Si tu as un entretien demain, comment tu le prépareras ? | If you have an interview tomorrow, how will you prepare for it?

@@13a | Le train manqué
Samedi matin, Ana a manqué son train. Elle est arrivée à la gare à huit heures deux. Le train pour Montreux était parti à huit heures. Julien l'attendait sur le quai, l'air triste : il avait acheté les billets la veille.

Ana avait mis son réveil à six heures, mais elle avait oublié de l'allumer. Elle s'était réveillée à sept heures et demie et elle avait couru jusqu'à la gare.

Heureusement, Julien avait vérifié les horaires : il y avait un autre train à huit heures trente. Ils ont bu un café au buffet de la gare. Quand Karim est arrivé, ils avaient déjà fini leurs croissants. Il ne savait pas qu'ils avaient raté le premier train, et il a beaucoup ri quand ils lui ont raconté l'histoire.
-- gloss
manqué | manquer = to miss (a train, a bus)
le quai = the platform
l'air triste = looking sad
les billets | le billet = the ticket
la veille = the day before / the night before
le réveil = the alarm clock / the alarm
allumer = to switch on / to turn on
couru | courir = to run
heureusement = fortunately / luckily
les horaires | l'horaire = the timetable / the schedule
raté | rater = to miss (a train) / to fail
-- questions
À quelle heure le train pour Montreux était-il parti ? | *À huit heures | À huit heures deux | À huit heures trente | À sept heures et demie
Pourquoi Ana était-elle en retard ? | *Elle avait oublié d'allumer son réveil | Le bus était en retard | Elle était malade | Elle avait perdu son billet
Qui avait acheté les billets ? | *Julien | Ana | Karim | Madame Rochat
Qu'est-ce que Julien avait vérifié ? | *Les horaires des trains | La météo | Le prix des billets | L'adresse du château
-- write
Raconte une fois où tu as raté un train, un bus ou un rendez-vous. Qu'est-ce qui s'était passé avant ? | Tell me about a time you missed a train, a bus or an appointment. What had happened before?

@@13b | La fête surprise
Le dimanche suivant, c'était l'anniversaire de Madame Rochat. Ana et ses amis avaient préparé une fête surprise.

Ana avait fait un gâteau au chocolat la veille. Julien avait acheté des fleurs et Karim avait cuisiné des petits plats libanais. Ils avaient aussi invité Léo, le petit-fils de Madame Rochat, qui était venu de Fribourg.

Quand Madame Rochat est entrée dans l'appartement, tout le monde a crié « Surprise ! ». Elle n'avait rien remarqué. Elle a d'abord eu un peu peur, et puis elle a pleuré de joie.

« Personne n'avait organisé de fête pour moi depuis la mort de mon mari », a-t-elle dit. Ce soir-là, elle a raconté des histoires jusqu'à minuit.
-- gloss
la fête = the party
l'anniversaire = the birthday
le gâteau = the cake
des petits plats | le petit plat = the small dish / the dish
le petit-fils = the grandson
a crié | crier = to shout
remarqué | remarquer = to notice
d'abord = first / at first
a pleuré | pleurer = to cry
la joie = joy
la mort = death / the death
le mari = the husband
-- questions
Qu'est-ce qu'Ana avait préparé ? | *Un gâteau au chocolat | Des fleurs | Des plats libanais | Une fondue
Qui est Léo ? | *Le petit-fils de Madame Rochat | Le frère d'Ana | Un collègue de Julien | Le mari de Madame Rochat
Comment Madame Rochat a-t-elle réagi à la fin ? | *Elle a pleuré de joie | Elle est partie | Elle était fâchée | Elle s'est endormie
Pourquoi cette fête était-elle importante pour elle ? | *Personne n'avait organisé de fête pour elle depuis la mort de son mari | C'était sa première fête | Elle avait cent ans | Elle partait en voyage
-- write
Raconte une fête mémorable. Qu'est-ce que les gens avaient préparé ? | Tell me about a memorable party. What had people prepared?

@@14a | Apprendre en écoutant
Ana a remarqué une chose : elle apprend mieux en écoutant qu'en lisant des listes de vocabulaire. Le matin, elle écoute les informations en prenant son petit-déjeuner. Le soir, elle révise en cuisinant.

Son professeur lui a dit qu'il fallait aussi parler beaucoup. Il lui a expliqué que les erreurs étaient normales et qu'on apprenait en se trompant. Alors Ana parle français partout : en faisant les courses, en prenant le bus, en attendant son café.

Hier, une vendeuse lui a demandé si elle était française. Ana a répondu qu'elle était roumaine et qu'elle apprenait le français depuis deux mois. La vendeuse a dit que son accent était très joli. Ana est rentrée chez elle en souriant.
-- gloss
les informations = the news
révise | réviser = to revise / to review / to study
fallait | falloir = to be necessary (il fallait = you had to / it was necessary)
les erreurs | l'erreur = the mistake / the error
se trompant | se tromper = to make a mistake / to be wrong
partout = everywhere
faisant les courses | faire les courses = to do the shopping / to go grocery shopping
une vendeuse | la vendeuse = the shop assistant / the saleswoman
l'accent = the accent
-- questions
Comment Ana apprend-elle le mieux ? | *En écoutant | En lisant des listes | En écrivant | En regardant des images
Qu'est-ce que le professeur a expliqué ? | *Que les erreurs étaient normales | Qu'il fallait lire plus | Qu'Ana parlait trop | Que l'accent était important
Que fait Ana en faisant les courses ? | *Elle parle français | Elle écoute un podcast | Elle révise ses listes | Elle téléphone à son frère
Qu'est-ce que la vendeuse a dit ? | *Que son accent était très joli | Qu'elle parlait mal | Qu'elle était française | Qu'il fallait parler plus lentement
-- write
Rapporte une conversation récente : qui a dit quoi ? Utilise « il a dit que… ». | Report a recent conversation: who said what? Use "il a dit que…".

@@14b | Chez le médecin
Karim a mal au dos depuis une semaine. Il s'est blessé en portant des caisses au restaurant. Il est allé chez le médecin jeudi.

Le médecin lui a demandé s'il faisait du sport. Karim a répondu qu'il n'avait pas le temps et qu'il travaillait douze heures par jour. Le médecin lui a dit qu'il devait se reposer et qu'il ne fallait pas porter de choses lourdes pendant deux semaines.

Il lui a aussi conseillé de faire des exercices tous les matins et de marcher en allant au travail. En sortant du cabinet, Karim a appelé Ana. Il lui a dit qu'il allait suivre les conseils du médecin, mais qu'il ne savait pas comment cuisiner sans porter de casseroles !
-- gloss
mal au dos | avoir mal au dos = to have backache / to have a sore back / to have back pain
s'est blessé | se blesser = to hurt oneself / to get injured
portant | porter = to carry / to wear
des caisses | la caisse = the crate / the box
le médecin = the doctor
se reposer = to rest
lourdes | lourd = heavy
conseillé | conseiller = to advise
le cabinet = the doctor's office / the surgery / the practice
casseroles | la casserole = the saucepan / the pot
-- questions
Comment Karim s'est-il blessé ? | *En portant des caisses | En faisant du sport | En tombant dans la rue | En cuisinant
Qu'est-ce que le médecin lui a demandé ? | *S'il faisait du sport | S'il mangeait bien | S'il dormait bien | S'il fumait
Pendant combien de temps ne doit-il pas porter de choses lourdes ? | *Deux semaines | Une semaine | Un mois | Douze jours
Quel est le problème de Karim à la fin ? | *Il ne sait pas cuisiner sans porter de casseroles | Il ne peut pas marcher | Il a perdu son travail | Il n'aime pas le médecin
-- write
Raconte une visite chez le médecin : qu'est-ce qu'il t'a dit ? | Describe a visit to the doctor: what did they tell you?

@@15a | La colocation
Ana a enfin trouvé un appartement, mais il est grand et le loyer est cher. Elle va donc le partager avec une colocataire, Sophie, une étudiante en architecture. C'est sa première colocation. Avant d'emménager, elles ont écrit ensemble quelques règles.

« Il faut que chacune fasse la vaisselle après le repas. Il faut aussi que nous sortions les poubelles à tour de rôle, le lundi et le jeudi. Si une amie vient dormir, il est important qu'on prévienne l'autre. »

Sophie a ajouté : « Je veux que l'appartement soit calme après vingt-deux heures, parce que je me lève tôt pour l'université. » Ana était d'accord, mais elle a demandé que Sophie ne mette pas sa musique trop fort le samedi matin.

Madame Rochat, qui a aidé Ana à déménager, est contente qu'Ana reste dans le quartier. « Bien que tu déménages, tu seras toujours ma voisine préférée », lui a-t-elle dit. Maintenant, il faut qu'Ana achète des meubles. Julien lui a proposé de l'aider samedi, à condition qu'elle prépare une fondue.
-- gloss
la colocation = the flatshare / the house share
partager = to share
une colocataire | le colocataire = the flatmate / the roommate
emménager = to move in
règles | la règle = the rule
chacune | chacun = each one / everyone
la vaisselle = the dishes / the washing-up
les poubelles | la poubelle = the bin / the rubbish bin / the trash can
à tour de rôle = in turn / taking turns
prévienne | prévenir = to warn / to let know
le quartier = the neighbourhood / the neighborhood / the area
des meubles | le meuble = the piece of furniture / furniture
à condition qu' | à condition que = on condition that / provided that
-- questions
Pourquoi Ana partage-t-elle l'appartement ? | *Le loyer est cher | Elle se sent seule | Sophie est son amie d'enfance | L'appartement est petit
Que veut Sophie après vingt-deux heures ? | *Que l'appartement soit calme | Qu'Ana fasse la vaisselle | Que les amies partent | Qu'on sorte les poubelles
Qu'est-ce qu'Ana a demandé à Sophie ? | *De ne pas mettre sa musique trop fort le samedi matin | De faire la cuisine | De payer plus de loyer | De ne pas inviter d'amies
À quelle condition Julien aidera-t-il Ana ? | *Qu'elle prépare une fondue | Qu'elle paie le camion | Qu'elle l'aide aussi | Qu'il fasse beau
-- write
Écris les règles de ta colocation idéale. Utilise « il faut que… ». | Write the rules of your ideal flatshare. Use "il faut que…".

@@15b | Une lettre de la grand-mère
Ana a reçu une lettre de sa grand-mère, en roumain. Voici la lettre, traduite en français.

« Ma chère Ana, je suis heureuse que tu sois bien installée en Suisse. Ton frère m'a dit que tu parlais déjà français avec tes voisins. Je suis fière de toi.

Mais je veux que tu fasses attention à ta santé. Il faut que tu manges bien et que tu dormes assez. Je ne pense pas que tu prennes le temps de cuisiner tous les soirs ! Et je doute que la cuisine suisse soit aussi bonne que la mienne.

J'aimerais que tu viennes à Noël. Toute la famille sera là. Bien que le voyage soit long, ce serait une grande joie pour moi.

Je t'embrasse fort. Bunica »
-- gloss
traduite | traduire = to translate
chère | cher = dear
installée | installé = settled (in)
fière | fier = proud
la santé = health
doute | douter = to doubt
la mienne | le mien = mine
Noël = Christmas
le voyage = the journey / the trip
embrasse | embrasser = to kiss / to hug (je t'embrasse = love, at the end of a letter)
-- questions
Pourquoi la grand-mère est-elle fière ? | *Ana parle déjà français avec ses voisins | Ana a trouvé un appartement | Ana cuisine bien | Ana a un nouveau travail
Que veut la grand-mère pour la santé d'Ana ? | *Qu'elle mange bien et qu'elle dorme assez | Qu'elle fasse du sport | Qu'elle aille chez le médecin | Qu'elle rentre en Roumanie
De quoi la grand-mère doute-t-elle ? | *Que la cuisine suisse soit aussi bonne que la sienne | Qu'Ana parle français | Qu'Ana vienne à Noël | Que la Suisse soit belle
Qu'est-ce qu'elle aimerait ? | *Qu'Ana vienne à Noël | Qu'Ana lui écrive en français | Qu'Ana lui envoie du chocolat | Qu'Ana change de travail
-- write
Réponds à la lettre de la grand-mère. | Reply to the grandmother's letter.

@@16a | Si on gagnait au loto
Au bureau, pendant la pause, les collègues jouent à un petit jeu : « Qu'est-ce que tu ferais si tu gagnais au loto ? »

Julien répond le premier : « Si je gagnais un million, j'arrêterais de travailler et je ferais le tour du monde en voilier. » Sa collègue Nadia rit : « Toi ? Tu aurais le mal de mer après deux jours ! » Elle, elle achèterait une maison à la montagne et elle ouvrirait une petite librairie.

Ana réfléchit. Si elle était riche, elle n'arrêterait pas de travailler : elle aime son métier. Mais elle achèterait un appartement à Bucarest pour ses parents, et elle paierait les études de son frère. Avec le reste, elle inviterait tous ses amis de Lausanne en Roumanie, pour leur montrer le village de son enfance.

« Et si tu ne gagnais rien ? » demande Julien. Ana sourit : « Alors je continuerais exactement comme maintenant. Ce n'est pas si mal. »
-- gloss
la pause = the break
le jeu = the game
le loto = the lottery
le tour du monde = the round-the-world trip / the trip around the world
le voilier = the sailing boat / the sailboat
le mal de mer = seasickness
librairie | la librairie = the bookshop / the bookstore
réfléchit | réfléchir = to think / to reflect
le métier = the job / the profession / the trade
les études = studies / education
le reste = the rest
l'enfance = childhood
-- questions
Que ferait Julien s'il gagnait un million ? | *Le tour du monde en voilier | Il achèterait une maison à la montagne | Il ouvrirait une librairie | Rien de spécial
Pourquoi Nadia rit-elle ? | *Julien aurait le mal de mer | Julien n'aime pas voyager | Julien a déjà gagné | Julien ne sait pas nager
Pourquoi Ana n'arrêterait-elle pas de travailler ? | *Elle aime son métier | Elle aurait besoin d'argent | Elle s'ennuierait | Ses parents ne voudraient pas
Que ferait Ana pour son frère ? | *Elle paierait ses études | Elle lui achèterait une voiture | Elle l'inviterait en Suisse | Elle lui trouverait un travail
-- write
Qu'est-ce que tu ferais si tu gagnais au loto ? | What would you do if you won the lottery?

@@16b | Si j'habitais à Paris
Sophie, la colocataire d'Ana, rêve de Paris. Un soir, elle explique pourquoi.

« Si j'habitais à Paris, j'irais au musée tous les dimanches. Je me promènerais le long de la Seine et je travaillerais dans un grand bureau d'architectes. »

Ana n'est pas convaincue. « Si tu habitais à Paris, tu paierais un loyer énorme pour une chambre minuscule. Tu prendrais le métro aux heures de pointe et tu n'aurais pas de lac pour te baigner en été. »

Sophie réfléchit un moment. « C'est vrai. Si j'avais le choix, je garderais peut-être Lausanne pour vivre et Paris pour les week-ends. » Ana rit : « Voilà une solution parfaite. Et si tu partais un jour, je viendrais te voir très souvent ! »
-- gloss
rêve | rêver = to dream
le long de = along
convaincue | convaincu = convinced
énorme = enormous / huge
heures de pointe | l'heure de pointe = rush hour
te baigner | se baigner = to swim / to bathe / to go swimming
le choix = the choice
garderais | garder = to keep
parfaite | parfait = perfect
-- questions
Que ferait Sophie tous les dimanches à Paris ? | *Elle irait au musée | Elle se baignerait | Elle travaillerait | Elle prendrait le métro
Selon Ana, quel serait un problème à Paris ? | *Un loyer énorme pour une petite chambre | Le mauvais temps | La langue | Le manque de musées
Qu'est-ce qui manquerait à Paris, selon Ana ? | *Un lac pour se baigner | Des restaurants | Des bureaux d'architectes | Des parcs
Quelle solution Sophie trouve-t-elle ? | *Vivre à Lausanne et aller à Paris le week-end | Déménager à Paris | Ne jamais aller à Paris | Habiter à Genève
-- write
Si tu pouvais habiter dans n'importe quelle ville, laquelle choisirais-tu et pourquoi ? | If you could live in any city, which would you choose and why?

@@17a | La grève des transports
Lundi matin, Lausanne s'est réveillée sans bus ni métro. À cause d'une grève des transports publics, des milliers de personnes ont dû trouver une autre solution pour aller au travail.

Comme il faisait beau, beaucoup de gens ont pris le vélo. Les rues étaient donc pleines de cyclistes, et certains automobilistes étaient en colère. Les chauffeurs demandent une augmentation de salaire, c'est pourquoi ils ont arrêté le travail pendant vingt-quatre heures.

Ana, elle, est allée au bureau à pied. Elle a mis quarante minutes, mais grâce à la grève, elle a découvert un nouveau chemin à travers un parc. Puisque tout le monde arrivait en retard, la réunion de neuf heures a commencé à dix heures.

Le soir, la radio a annoncé que la grève était finie. Les chauffeurs ont obtenu une partie de l'augmentation. Ana a décidé de continuer à marcher le matin, au moins quand il fait beau.
-- gloss
la grève = the strike
les transports publics = public transport / public transportation
des milliers | le millier = thousands / about a thousand
le vélo = the bike / the bicycle
pleines | plein = full
cyclistes | le cycliste = the cyclist
automobilistes | l'automobiliste = the driver / the motorist
en colère = angry
les chauffeurs | le chauffeur = the driver
une augmentation de salaire | l'augmentation de salaire = the pay rise / the raise
le chemin = the path / the way
à travers = through / across
a annoncé | annoncer = to announce
-- questions
Pourquoi n'y avait-il pas de bus lundi ? | *À cause d'une grève | À cause de la neige | À cause d'un accident | À cause d'une fête
Pourquoi les chauffeurs ont-ils arrêté le travail ? | *Ils demandent une augmentation de salaire | Ils sont malades | Ils veulent plus de vacances | Les bus sont trop vieux
Qu'est-ce qu'Ana a découvert grâce à la grève ? | *Un nouveau chemin à travers un parc | Un nouveau café | Un vélo | Une nouvelle collègue
Pourquoi la réunion a-t-elle commencé à dix heures ? | *Tout le monde arrivait en retard | Le directeur était malade | La salle était fermée | Il n'y avait pas d'électricité
-- write
Raconte un problème de transport que tu as eu. Quelles en ont été les causes et les conséquences ? | Describe a transport problem you had. What were its causes and consequences?

@@17b | Le nouveau poste de Karim
Grâce à son talent et à beaucoup de préparation, Karim a obtenu le poste de chef au grand hôtel de Lausanne. Il a donc déménagé le mois dernier.

Comme le restaurant de l'hôtel est réputé, il travaille encore beaucoup, mais ses horaires sont plus réguliers. Il commence à neuf heures et il finit à dix-neuf heures, c'est pourquoi il peut enfin voir ses amis le soir.

Son ancien patron, à Genève, était furieux à cause de son départ. Puisque Karim était son meilleur cuisinier, il lui a proposé un meilleur salaire pour le garder. Mais Karim voulait changer de vie, et il a refusé.

Le premier mois n'a pas été facile. À cause du stress, il dormait mal, et il a fait quelques erreurs. Mais grâce au soutien de ses amis, il a vite trouvé sa place. La semaine prochaine, le directeur de l'hôtel va même ajouter un de ses plats libanais au menu.
-- gloss
le talent = the talent
réputé = renowned / famous / well known
réguliers | régulier = regular
enfin = finally / at last
patron | le patron = the boss
furieux = furious
le départ = the departure / leaving
le cuisinier = the cook
a refusé | refuser = to refuse / to turn down
le stress = stress
le soutien = the support
la place = the place
-- questions
Pourquoi Karim a-t-il obtenu le poste ? | *Grâce à son talent et à sa préparation | Grâce à son ancien patron | Parce qu'il connaissait le directeur | Parce qu'il parlait anglais
Pourquoi peut-il voir ses amis le soir maintenant ? | *Il finit à dix-neuf heures | Il ne travaille plus | Il habite avec Ana | Il travaille seulement le matin
Pourquoi son ancien patron était-il furieux ? | *Karim était son meilleur cuisinier et il partait | Karim avait fait des erreurs | Karim demandait plus d'argent | Karim avait fermé le restaurant
Qu'est-ce qui va se passer la semaine prochaine ? | *Un plat libanais de Karim sera au menu | Karim va retourner à Genève | Karim va ouvrir un restaurant | Karim va prendre des vacances
-- write
Parle d'un changement important dans ta vie. Pourquoi l'as-tu fait, et quelles en ont été les conséquences ? | Talk about an important change in your life. Why did you make it, and what were the consequences?

@@18a | Ville ou campagne ?
Pendant un dîner chez Ana, une discussion commence : vaut-il mieux vivre en ville ou à la campagne ?

Léo, le petit-fils de Madame Rochat, habite dans un village près de Fribourg. Pour lui, la campagne est plus agréable, même si on doit prendre la voiture pour tout. « Chez nous, l'air est pur et il n'y a pas de bruit, alors qu'en ville on entend des voitures toute la nuit. »

Sophie n'est pas d'accord. Elle aime la campagne, pourtant elle ne pourrait pas y vivre. « Malgré le calme, je m'ennuierais. En ville, il y a des concerts, des cinémas, des musées et des cafés ouverts tard. »

Ana pense à son enfance au village. Elle était heureuse là-bas, bien qu'il n'y ait pas grand-chose à faire. Aujourd'hui, elle préfère la ville, mais elle a quand même besoin de nature. « Lausanne, c'est le bon compromis, dit-elle. C'est une ville, et pourtant on voit les montagnes depuis la fenêtre. »
-- gloss
vaut-il mieux | il vaut mieux = it is better / it is best
la campagne = the countryside / the country
agréable = pleasant / nice
pur = pure / clean
le bruit = noise / the noise
ouverts | ouvert = open
là-bas = there / over there
grand-chose = much (pas grand-chose = not much)
besoin | avoir besoin de = to need
le compromis = the compromise
la fenêtre = the window
-- questions
Où habite Léo ? | *Dans un village près de Fribourg | À Lausanne | À Genève | À Paris
Quel inconvénient de la campagne Léo accepte-t-il ? | *On doit prendre la voiture pour tout | Il y a trop de bruit | Il fait froid | Il n'y a pas d'école
Pourquoi Sophie ne pourrait-elle pas vivre à la campagne ? | *Elle s'ennuierait | Elle n'aime pas la nature | Elle n'a pas de voiture | C'est trop cher
Pourquoi Lausanne est-elle un bon compromis pour Ana ? | *C'est une ville, et on voit quand même les montagnes | Il n'y a pas de bruit | C'est près de la Roumanie | Il y a peu de voitures
-- write
Tu préfères la ville ou la campagne ? Donne des arguments pour et contre. | Do you prefer the city or the countryside? Give arguments for and against.

@@18b | Le marathon de Julien
Julien s'est inscrit au marathon de Lausanne, alors qu'il n'avait jamais couru plus de dix kilomètres. Tout le monde lui a dit que c'était une mauvaise idée. Il s'est entraîné quand même, trois fois par semaine, malgré la pluie et le froid.

Le jour de la course, il faisait très chaud. Même s'il avait bien préparé la course, Julien a eu des difficultés après trente kilomètres. Ses jambes lui faisaient mal, pourtant il n'a pas abandonné.

Ana, Sophie et Karim l'attendaient près de l'arrivée avec une pancarte : « Allez Julien ! » Il est arrivé après quatre heures et quarante minutes. Ce n'était pas un temps extraordinaire, mais pour lui, c'était une victoire.

Le lendemain, il ne pouvait presque plus marcher. Malgré tout, il a déjà annoncé qu'il participerait au marathon de Genève l'année prochaine.
-- gloss
s'est inscrit | s'inscrire = to sign up / to register / to enrol
s'est entraîné | s'entraîner = to train / to practise / to practice
la pluie = the rain / rain
la course = the race / the run
jambes | la jambe = the leg
abandonné | abandonner = to give up / to drop out
l'arrivée = the finish line / the finish / the arrival
une pancarte | la pancarte = the sign / the placard
une victoire | la victoire = the victory / the win
le lendemain = the next day / the day after
malgré tout = despite everything / all the same / even so
-- questions
Pourquoi le marathon était-il une mauvaise idée selon les autres ? | *Julien n'avait jamais couru plus de dix kilomètres | Julien était malade | Il faisait trop froid | Julien n'avait pas de chaussures
Quand Julien a-t-il eu des difficultés ? | *Après trente kilomètres | Au départ | Après cinq kilomètres | Juste avant l'arrivée
Qu'est-ce que ses amis avaient préparé ? | *Une pancarte | Un gâteau | Une fondue | Des fleurs
Qu'a-t-il annoncé malgré tout ? | *Qu'il participerait au marathon de Genève | Qu'il arrêterait le sport | Qu'il ferait du vélo | Qu'il irait chez le médecin
-- write
Raconte un défi que tu as relevé malgré les difficultés. | Tell me about a challenge you took on despite the difficulties.

@@19a | Le livre dont tout le monde parle
Ce mois-ci, Ana lit un roman dont tout le monde parle à Lausanne. C'est l'histoire d'une femme qui quitte son pays pour recommencer sa vie dans une ville étrangère. Ce qui plaît à Ana, c'est que l'héroïne lui ressemble beaucoup.

Ce que l'auteur décrit très bien, ce sont les petites choses dont on a peur quand on arrive quelque part : téléphoner à une administration, comprendre une blague, se faire des amis. Ana a souri plusieurs fois en lisant, parce qu'elle a vécu exactement ce que le livre raconte.

Ce qui est moins réussi, à son avis, c'est la fin. Elle est trop rapide et un peu triste. Ana ne sait pas encore ce qu'elle va lire ensuite. Madame Rochat lui a parlé d'un écrivain suisse dont elle aime tous les livres. Ana va peut-être l'essayer.
-- gloss
le roman = the novel
quitte | quitter = to leave
recommencer = to start again / to begin again
plaît | plaire = to please (ça me plaît = I like it)
l'héroïne = the heroine
ressemble | ressembler à = to look like / to resemble / to be like
l'auteur = the author
décrit | décrire = to describe
quelque part = somewhere
une blague | la blague = the joke
réussi = successful / well done / good
un écrivain | l'écrivain = the writer
-- questions
De quoi parle le roman ? | *D'une femme qui recommence sa vie dans une ville étrangère | D'une famille suisse | D'un voyage autour du monde | D'un chef cuisinier
Qu'est-ce qui plaît à Ana ? | *L'héroïne lui ressemble | La fin est heureuse | Le livre est court | L'histoire se passe en Roumanie
Qu'est-ce qui est moins réussi selon Ana ? | *La fin | Le début | Les personnages | Le titre
De qui Madame Rochat a-t-elle parlé ? | *D'un écrivain suisse | D'une actrice | De son mari | D'un professeur
-- write
Parle d'un livre ou d'un film qui t'a plu. Dis ce qui était réussi et ce qui ne l'était pas. | Talk about a book or film you liked. Say what worked and what didn't.

@@19b | Un ami dont je suis fière
Pour un concours d'écriture de son cours de français, Ana a écrit un texte sur Karim.

« Karim est un ami dont je suis très fière. Ce que j'admire chez lui, c'est son courage. Il a quitté le Liban à vingt ans, sans parler un mot de français. Ce qui l'a aidé, dit-il, c'est la cuisine : dans une cuisine, on se comprend sans beaucoup parler.

Il a commencé comme plongeur dans un restaurant de Genève. Aujourd'hui, il est chef dans un grand hôtel. Le plat dont il est le plus fier, c'est le taboulé de sa mère, qu'il sert maintenant à des clients du monde entier.

Ce que les gens ne savent pas, c'est qu'il est aussi très drôle et très généreux. Quand je suis arrivée en Suisse, il m'a aidée à trouver tout ce dont j'avais besoin. Ce qui compte pour lui, ce n'est pas l'argent, ce sont les gens. »
-- gloss
un concours | le concours = the competition / the contest
l'écriture = writing
admire | admirer = to admire
le courage = courage
plongeur | le plongeur = the dishwasher (person) / the kitchen porter
le monde entier = the whole world
drôle = funny
généreux = generous
compte | compter = to count / to matter
-- questions
Pourquoi Ana est-elle fière de Karim ? | *Pour son courage | Pour son argent | Parce qu'il est célèbre | Parce qu'il parle cinq langues
Qu'est-ce qui a aidé Karim au début ? | *La cuisine | Ses amis suisses | Un cours de français | Son patron
Quel était son premier travail ? | *Plongeur dans un restaurant | Chef dans un hôtel | Serveur dans un café | Professeur de cuisine
Qu'est-ce qui compte pour Karim ? | *Les gens | L'argent | Le succès | Les voyages
-- write
Écris le portrait d'une personne dont tu es fier ou fière. | Write a portrait of a person you are proud of.

@@20a | Les regrets de Julien
Julien a eu une mauvaise semaine. Mardi, il a envoyé un e-mail important au mauvais client. Il aurait dû vérifier l'adresse avant de cliquer. Jeudi, il a oublié l'anniversaire de sa sœur. Il aurait pu mettre une alarme dans son téléphone, mais il n'y a pas pensé.

Vendredi soir, il raconte tout à Ana. « Si j'avais dormi plus, j'aurais fait moins d'erreurs. J'aurais dû prendre des vacances après le marathon. »

Ana l'écoute, puis elle lui dit : « Tu aurais pu faire pire, tu sais. L'année dernière, j'ai envoyé un message d'amour à mon directeur au lieu de mon copain. Si j'avais su, j'aurais changé de pays plus tôt ! »

Julien éclate de rire. Il se sent déjà mieux. Il aurait aimé que sa semaine soit différente, mais finalement, il a une bonne histoire à raconter.
-- gloss
vérifier = to check / to verify
cliquer = to click
une alarme | l'alarme = the alarm
pire = worse
un message d'amour | le message d'amour = the love message / the love letter
au lieu de = instead of
le copain = the boyfriend / the friend / the mate
éclate de rire | éclater de rire = to burst out laughing
finalement = in the end / finally
-- questions
Qu'est-ce que Julien aurait dû faire mardi ? | *Vérifier l'adresse de l'e-mail | Appeler sa sœur | Dormir plus | Prendre des vacances
Qu'a-t-il oublié jeudi ? | *L'anniversaire de sa sœur | Une réunion | Son téléphone | Le marathon
Qu'est-ce qu'Ana a fait l'année dernière ? | *Elle a envoyé un message d'amour à son directeur | Elle a raté un avion | Elle a perdu son travail | Elle a oublié l'anniversaire de son frère
Comment se sent Julien à la fin ? | *Mieux | Plus triste | Furieux | Fatigué
-- write
Raconte une chose que tu aurais faite différemment. | Tell me about something you would have done differently.

@@20b | Le voyage raté
Pour le long week-end, Ana et Sophie avaient prévu un voyage à Turin. Rien ne s'est passé comme prévu.

D'abord, leur train a été supprimé à cause de travaux. Elles auraient dû vérifier les informations la veille, mais elles ne l'ont pas fait. Elles ont pris un bus, qui a mis six heures au lieu de trois. Ensuite, l'hôtel qu'elles avaient réservé n'avait plus leur réservation. Elles auraient pu chercher un autre hôtel tout de suite, mais elles ont passé une heure à discuter avec le réceptionniste.

Finalement, elles ont dormi dans une petite chambre sans fenêtre. « Si on était restées à Lausanne, on aurait passé un week-end tranquille », a dit Sophie. Ana n'était pas d'accord : sans ces problèmes, elles n'auraient jamais découvert la petite pizzeria en face de l'hôtel, où elles ont mangé la meilleure pizza de leur vie.
-- gloss
prévu | prévoir = to plan / to foresee
supprimé | supprimer = to cancel / to delete
travaux | les travaux = the works / the roadworks / the engineering works
réservé | réserver = to book / to reserve
la réservation = the booking / the reservation
discuter = to talk / to discuss / to argue
le réceptionniste = the receptionist
tranquille = quiet / peaceful / calm
la chambre = the room / the bedroom
-- questions
Où Ana et Sophie voulaient-elles aller ? | *À Turin | À Paris | À Genève | À Milan
Pourquoi leur train a-t-il été supprimé ? | *À cause de travaux | À cause d'une grève | À cause de la neige | À cause d'un accident
Qu'est-ce qu'elles auraient pu faire à l'hôtel ? | *Chercher un autre hôtel tout de suite | Dormir dans le bus | Rentrer à Lausanne | Appeler la police
Pourquoi Ana n'est-elle pas d'accord avec Sophie ? | *Sans les problèmes, elles n'auraient pas découvert la pizzeria | Elle a aimé le bus | La chambre était belle | L'hôtel était gratuit
-- write
Raconte un voyage où rien ne s'est passé comme prévu. Qu'est-ce que tu aurais dû faire ? | Describe a trip where nothing went to plan. What should you have done?

@@21a | Le télétravail : liberté ou piège ?
Depuis quelques années, de plus en plus d'employés travaillent à la maison un ou deux jours par semaine. Le télétravail est-il une bonne chose ? Les avis sont partagés.

Pour ses défenseurs, il n'y a que des avantages. On ne perd plus de temps dans les transports, on organise sa journée comme on veut et on peut mieux concilier vie professionnelle et vie privée. Selon une étude récente, les télétravailleurs seraient même plus productifs.

Pourtant, d'autres sont plus critiques. Ce qui manque le plus, disent-ils, ce sont les contacts humains. En travaillant seul chez soi, on se sent parfois isolé, et il devient difficile de séparer le travail du reste de la vie. Bien que l'ordinateur soit éteint, on pense encore aux e-mails.

Le télétravail n'est donc ni un piège ni une liberté totale. À mon avis, la solution se trouve au milieu. Si les entreprises proposaient deux jours de télétravail et trois jours au bureau, tout le monde y gagnerait. Il faut que nous gardions le meilleur des deux mondes : la liberté de la maison et la chaleur d'une équipe.
-- gloss
le télétravail = remote work / working from home / teleworking
le piège = the trap
employés | l'employé = the employee
les avis | l'avis = the opinion / the view
partagés | partagé = divided / split / shared
défenseurs | le défenseur = the supporter / the defender
avantages | l'avantage = the advantage
concilier = to reconcile / to balance / to combine
une étude | l'étude = the study
isolé = isolated
éteint | éteindre = to switch off / to turn off
au milieu = in the middle
les entreprises | l'entreprise = the company / the business / the firm
la chaleur = the warmth / the heat
une équipe | l'équipe = the team
-- questions
Que dit l'étude récente ? | *Les télétravailleurs seraient plus productifs | Les télétravailleurs dorment plus | Le télétravail coûte cher | Personne n'aime le télétravail
Qu'est-ce qui manque le plus, selon les critiques ? | *Les contacts humains | Un bon ordinateur | Le temps libre | Les transports
Quel problème pose le travail chez soi ? | *Il est difficile de séparer le travail du reste de la vie | On perd du temps dans les transports | On gagne moins d'argent | On a trop de réunions
Quelle solution l'auteur propose-t-il ? | *Deux jours de télétravail et trois jours au bureau | Seulement le télétravail | Seulement le bureau | Une semaine sur deux
-- write
Le télétravail : pour ou contre ? Donne ton opinion et défends-la. | Remote work: for or against? Give your opinion and defend it.

@@21b | Trois mois plus tard
Ana relit le premier message qu'elle avait écrit à son frère en arrivant à Lausanne. Elle y avait mis des phrases simples, avec beaucoup de fautes. Aujourd'hui, elle sourit en pensant à tout ce qui a changé.

Elle a un nouvel appartement, une colocataire qui est devenue une amie, et une voisine qui est presque une deuxième grand-mère. Elle comprend la radio, elle lit des romans et elle discute avec ses collègues sans chercher ses mots. Bien sûr, elle fait encore des erreurs, et les nombres lui posent toujours quelques problèmes. Mais ce n'est plus important.

Si on lui avait dit, il y a trois mois, qu'elle se sentirait chez elle si vite, elle ne l'aurait pas cru. Demain, elle passe un examen de français de niveau B1. Elle est un peu nerveuse, pourtant elle sait une chose : quel que soit le résultat, elle peut maintenant vivre une journée normale entièrement en français. Et c'était exactement ce qu'elle voulait.
-- gloss
relit | relire = to reread / to read again
fautes | la faute = the mistake
devenue | devenir = to become
chercher ses mots = to search for one's words / to look for words
bien sûr = of course
un examen | l'examen = the exam / the test
le niveau = the level
quel que soit = whatever (is) / whatever
le résultat = the result
entièrement = entirely / completely / fully
-- questions
Qu'est-ce qu'Ana relit ? | *Son premier message à son frère | Un roman | Une lettre de sa grand-mère | La recette de la fondue
Qui est presque une deuxième grand-mère pour elle ? | *Sa voisine | Sa colocataire | Sa directrice | La mère de Karim
Qu'est-ce qui pose encore des problèmes à Ana ? | *Les nombres | La radio | Les romans | Ses collègues
Que fera Ana demain ? | *Elle passera un examen de niveau B1 | Elle rentrera en Roumanie | Elle déménagera | Elle commencera un nouveau travail
-- write
Écris à toi-même : qu'est-ce qui a changé depuis le début de ton apprentissage du français ? | Write to yourself: what has changed since you started learning French?
`;
