export const instructions = ({ sourceLangId, targetLangId }: { sourceLangId: string, targetLangId: string}) => {
  const sourceLangName = getLang(sourceLangId)?.name
  const targetLangName = getLang(targetLangId)?.name
  const sourceText = getLang(sourceLangId)?.sourceText
  const destText = getLang(targetLangId)?.destText
  return `
Instructions:
- You are an artificial intelligence agent responsible for translating languages from audio to text
- Please just repeat and translate what has been said and translate it
- The audio will play in ${sourceLangName}
- When translating, make sure to translate the entire sentence, not just parts of it
- If you cannot translate a word, leave it blank
- Respond in both ${sourceLangName} and ${targetLangName}
- output everything said since the last translation

Personality:
- None

Format:
\`\`\`
{
  "source": "${sourceText}",
  "dest": "${destText}"
}
\`\`\`
`;
};

export const langOptions = [
  {"id":"en","label":"English","name":"English","sourceText":"original text","destText":"translated text"},
  {"id":"zh-Hans","label":"简体中文","name":"Simplified Chinese","sourceText":"原始文本","destText":"翻译后的文本"},
  {"id":"zh-Hant","label":"繁體中文","name":"Traditional Chinese","sourceText":"原始文本","destText":"翻譯後的文本"},
  {"id":"lzh","label":"古文","name":"Classical Chinese","sourceText":"原始文本","destText":"翻譯後的文本"},
  {"id":"ja","label":"日本語","name":"Japanese","sourceText":"原文","destText":"翻訳されたテキスト"},
  {"id":"ko","label":"한국어","name":"Korean","sourceText":"원문","destText":"번역된 텍스트"},
  {"id":"fr","label":"Français","name":"French","sourceText":"texte original","destText":"texte traduit"},
  {"id":"de","label":"Deutsch","name":"German","sourceText":"Originaltext","destText":"übersetzter Text"},
  {"id":"es","label":"Español","name":"Spanish","sourceText":"texto original","destText":"texto traducido"},
  {"id":"it","label":"Italiano","name":"Italian","sourceText":"testo originale","destText":"testo tradotto"},
  {"id":"ru","label":"Русский","name":"Russian","sourceText":"исходный текст","destText":"переведенный текст"},
  {"id":"pt","label":"Português","name":"Portuguese","sourceText":"texto original","destText":"texto traduzido"},
  {"id":"nl","label":"Nederlands","name":"Dutch","sourceText":"oorspronkelijke tekst","destText":"vertaalde tekst"},
  {"id":"pl","label":"Polski","name":"Polish","sourceText":"tekst oryginalny","destText":"tekst przetłumaczony"},
  {"id":"ar","label":"العربية","name":"Arabic","sourceText":"النص الأصلي","destText":"النص المترجم"},
  {"id":"af","label":"Afrikaans","name":"Afrikaans","sourceText":"oorspronklike teks","destText":"vertaalde teks"},
  {"id":"am","label":"አማርኛ","name":"Amharic","sourceText":"የመነሻ ጽሑፍ","destText":"የተተረጎሙ ጽሑፍ"},
  {"id":"az","label":"Azərbaycan","name":"Azerbaijani","sourceText":"əsli mətn","destText":"tərcümə olunmuş mətn"},
  {"id":"be","label":"Беларуская","name":"Belarusian","sourceText":"арыгінальны тэкст","destText":"перакладзены тэкст"},
  {"id":"bg","label":"Български","name":"Bulgarian","sourceText":"оригинален текст","destText":"преведен текст"},
  {"id":"bn","label":"বাংলা","name":"Bengali","sourceText":"মূল পাঠ্য","destText":"অনুবাদিত পাঠ্য"},
  {"id":"bs","label":"Bosanski","name":"Bosnian","sourceText":"izvorni tekst","destText":"prevedeni tekst"},
  {"id":"ca","label":"Català","name":"Catalan","sourceText":"text original","destText":"text traduït"},
  {"id":"ceb","label":"Cebuano","name":"Cebuano","sourceText":"orihinal nga teksto","destText":"gitubag nga teksto"},
  {"id":"co","label":"Corsu","name":"Corsican","sourceText":"testu originale","destText":"testu traduttu"},
  {"id":"cs","label":"Čeština","name":"Czech","sourceText":"původní text","destText":"přeložený text"},
  {"id":"cy","label":"Cymraeg","name":"Welsh","sourceText":"testun gwreiddiol","destText":"testun wedi'i gyfieithu"},
  {"id":"da","label":"Dansk","name":"Danish","sourceText":"original tekst","destText":"oversat tekst"},
  {"id":"el","label":"Ελληνικά","name":"Greek","sourceText":"πρωτότυπο κείμενο","destText":"μεταφρασμένο κείμενο"},
  {"id":"eo","label":"Esperanto","name":"Esperanto","sourceText":"originala teksto","destText":"tradukita teksto"},
  {"id":"et","label":"Eesti","name":"Estonian","sourceText":"originaaltekst","destText":"tõlgitud tekst"},
  {"id":"eu","label":"Euskara","name":"Basque","sourceText":"jatorrizko testua","destText":"itzulitako testua"},
  {"id":"fa","label":"فارسی","name":"Persian","sourceText":"متن اصلی","destText":"متن ترجمه شده"},
  {"id":"fi","label":"Suomi","name":"Finnish","sourceText":"alkuperäinen teksti","destText":"käännetty teksti"},
  {"id":"fj","label":"Fijian","name":"Fijian","sourceText":"ivola taumada","destText":"ivola vakadewataki"},
  {"id":"fy","label":"Frysk","name":"Frisian","sourceText":"oarspronklike tekst","destText":"oerset tekst"},
  {"id":"ga","label":"Gaeilge","name":"Irish","sourceText":"téacs bunaidh","destText":"téacs aistrithe"},
  {"id":"gd","label":"Gàidhlig","name":"Scottish Gaelic","sourceText":"teacsa tùsail","destText":"teacsa eadar-theangaichte"},
  {"id":"gl","label":"Galego","name":"Galician","sourceText":"texto orixinal","destText":"texto traducido"},
  {"id":"gu","label":"ગુજરાતી","name":"Gujarati","sourceText":"મૂળ લખાણ","destText":"અનુવાદિત લખાણ"},
  {"id":"ha","label":"Hausa","name":"Hausa","sourceText":"rubutu na asali","destText":"rubutu mai fassara"},
  {"id":"haw","label":"Hawaiʻi","name":"Hawaiian","sourceText":"kikokikona kumu","destText":"kikokikona unuhi ʻia"},
  {"id":"he","label":"עברית","name":"Hebrew","sourceText":"טקסט מקורי","destText":"טקסט מתורגם"},
  {"id":"hi","label":"हिन्दी","name":"Hindi","sourceText":"मूल पाठ","destText":"अनुवादित पाठ"},
  {"id":"hmn","label":"Hmong","name":"Hmong","sourceText":"tsab ntawv qub","destText":"tsab ntawv txhais"},
  {"id":"hr","label":"Hrvatski","name":"Croatian","sourceText":"izvorni tekst","destText":"prevedeni tekst"},
  {"id":"ht","label":"Kreyòl Ayisyen","name":"Haitian Creole","sourceText":"tèks orijinal","destText":"tèks tradui"},
  {"id":"hu","label":"Magyar","name":"Hungarian","sourceText":"eredeti szöveg","destText":"fordított szöveg"},
  {"id":"hy","label":"Հայերեն","name":"Armenian","sourceText":"բնօրինակ տեքստ","destText":"թարգմանված տեքստ"},
  {"id":"id","label":"Bahasa Indonesia","name":"Indonesian","sourceText":"teks asli","destText":"teks terjemahan"},
  {"id":"ig","label":"Igbo","name":"Igbo","sourceText":"okwu mbụ","destText":"okwu zuru oke"},
  {"id":"is","label":"Íslenska","name":"Icelandic","sourceText":"upprunalegur texti","destText":"þýddur texti"},
  {"id":"jw","label":"Jawa","name":"Javanese","sourceText":"teks asli","destText":"teks terjemahan"},
  {"id":"ka","label":"ქართული","name":"Georgian","sourceText":"ორიგინალური ტექსტი","destText":"თარგმნილი ტექსტი"},
  {"id":"kk","label":"Қазақ","name":"Kazakh","sourceText":"түпнұсқа мәтін","destText":"аударылған мәтін"},
  {"id":"mn","label":"Монгол хэл","name":"Mongolian","sourceText":"эх бичвэр","destText":"орчуулагдсан бичвэр"},
  {"id":"tr","label":"Türkçe","name":"Turkish","sourceText":"orijinal metin","destText":"çevirilmiş metin"},
  {"id":"ug","label":"ئۇيغۇر تىلى","name":"Uyghur","sourceText":"ئاسلىي تېكىست","destText":"تەرجىمە قىلىنغان تېكىست"},
  {"id":"uk","label":"Українська","name":"Ukrainian","sourceText":"оригінальний текст","destText":"перекладений текст"},
  {"id":"ur","label":"اردو","name":"Urdu","sourceText":"اصل متن","destText":"ترجمہ شدہ متن"},
  {"id":"vi","label":"Tiếng Việt","name":"Vietnamese","sourceText":"văn bản gốc","destText":"văn bản dịch"},
  {"id":"sv","label":"Svenska","name":"Swedish","sourceText":"ursprunglig text","destText":"översatt text"},
  {"id":"th","label":"ไทย","name":"Thai","sourceText":"ข้อความต้นฉบับ","destText":"ข้อความแปล"}
]

export const defaultSourceLangId = 'en'
export const defaultTargetLangId = 'zh-Hans'
export const getLangLabel = (langId: string) => {
  return langOptions.find(option => option.id === langId)?.label || 'English'
}

const getLang = (langId: string) => {
  return langOptions.find(option => option.id === langId)
}