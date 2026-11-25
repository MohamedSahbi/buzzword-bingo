// Suggestions shown while players write their sealed predictions (public: these are prompts, not answers).
// English and Czech here; other cultures in advent/ideas/<code>.js.
import enUS from './ideas/en-US.js';
import enAU from './ideas/en-AU.js';
import ja from './ideas/ja.js';
import ptBR from './ideas/pt-BR.js';
import hi from './ideas/hi.js';
import ptPT from './ideas/pt-PT.js';
import fr from './ideas/fr.js';

export const PREDICT_IDEAS = {
  'en-US': enUS, 'en-AU': enAU, ja, 'pt-BR': ptBR, 'pt-PT': ptPT, hi, fr,
  en: ['Someone falls asleep after lunch', 'Grandad tells last year’s joke', 'The sprouts go uneaten', 'Someone gets socks', 'The dog steals food', 'A board game argument', 'Paper hat stays on all day', 'A present needs batteries', 'The turkey is late', 'Someone mentions the sales', 'Someone sings along to the telly', 'A bauble breaks', 'Someone says “I’m so full”', 'The cracker joke gets a groan', 'Someone cries at a film'],
  cs: ['Táta usne u pohádky', 'Dostanu ponožky', 'Strejda řekne loňský vtip', 'Někdo najde kost v kaprovi', 'Salát dojde jako první', 'Babička řekne, že jsme zhubli', 'Pes dostane víc dárků než já', 'Někdo pláče u Popelky', 'Rozbije se baňka', 'Lodička se potopí', 'Někdo uvidí zlaté prasátko', 'Zvoneček zazvoní před dojedením', 'Někdo zapomene dárek v autě', 'Někdo řekne „to je moc“', 'Pohádka poběží potřetí'],
};
