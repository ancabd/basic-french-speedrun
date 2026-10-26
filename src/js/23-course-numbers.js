/* ---------- course: numbers (generated, so every number is spelled correctly) ---------- */
function frNum(n){
  const U=['zéro','un','deux','trois','quatre','cinq','six','sept','huit','neuf','dix','onze','douze','treize','quatorze','quinze','seize'],T=['','','vingt','trente','quarante','cinquante','soixante'];
  if(n<17)return U[n];if(n<20)return 'dix-'+U[n-10];
  if(n<70){const t=T[Math.floor(n/10)],u=n%10;return u===0?t:u===1?t+' et un':t+'-'+U[u]}
  if(n<80)return n===71?'soixante et onze':'soixante-'+frNum(n-60);
  if(n<100)return n===80?'quatre-vingts':'quatre-vingt-'+frNum(n-80);
  if(n<1000){const h=Math.floor(n/100),r=n%100;return (h>1?U[h]+' ':'')+'cent'+(r?' '+frNum(r):h>1?'s':'')}
  const k=Math.floor(n/1000),r=n%1000;return (k>1?frNum(k)+' ':'')+'mille'+(r?' '+frNum(r):'');
}
function enNum(n){
  const U=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'],T=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
  if(n<20)return U[n];if(n<100)return T[Math.floor(n/10)]+(n%10?'-'+U[n%10]:'');
  if(n<1000)return U[Math.floor(n/100)]+' hundred'+(n%100?' and '+enNum(n%100):'');
  return enNum(Math.floor(n/1000))+' thousand'+(n%1000?' '+enNum(n%1000):'');
}
function numbersBulk(){
  const sl=(a,f)=>'{'+a.map(f).join('|')+'}',ages=[18,21,25,30,34,42,47,56,61,68,73,80,88,95],prices=[12,15,19,24,39,50,65,70,75,79,84,90,99,120,250],years=[1985,1990,1994,1998,2000,2003,2011];
  const list=[...Array(21).keys(),21,22,30,31,40,50,60,69,70,71,72,75,77,79,80,81,85,89,90,91,92,95,97,99,100,101,200,250,1000,2000];
  return `
# list: Nombres
# day: 1
## Les nombres
J'ai ${sl(ages,frNum)} ans = I am ${sl(ages,String)} years old
Ça coûte ${sl(prices,frNum)} euros = It costs ${sl(prices,String)} euros
Il est {une heure|deux heures|trois heures|quatre heures|cinq heures|six heures|sept heures|huit heures|neuf heures|dix heures|onze heures|midi|minuit} = It is {1 o'clock|2 o'clock|3 o'clock|4 o'clock|5 o'clock|6 o'clock|7 o'clock|8 o'clock|9 o'clock|10 o'clock|11 o'clock|noon|midnight}
Nous sommes le {premier|deux|cinq|quinze|vingt et un|trente} {janvier|mars|mai|juillet|octobre|décembre} = It is the {1st|2nd|5th|15th|21st|30th} of {January|March|May|July|October|December}
Je suis né(e) en ${sl(years,frNum)} = I was born in ${sl(years,String)}

# day: 1
${list.map(n=>`${frNum(n)} = ${n} / ${enNum(n)}`).join('\n')}
un million = one million / a million / 1000000
premier = first / 1st
deuxième = second / 2nd
J'ai trente-deux ans = I am 32 years old / I am thirty-two years old / I am 32
Ça coûte quinze euros = It costs 15 euros / It costs fifteen euros
Il est huit heures = It is 8 o'clock / It is eight o'clock / It is 8
Le train part à dix-sept heures = The train leaves at 5 pm / The train leaves at 17:00 / The train leaves at 5 / The train leaves at 17
J'habite au numéro quatre-vingt-douze = I live at number 92 / I live at number ninety-two
Il y a soixante-dix personnes = There are 70 people / There are seventy people
`;
}
