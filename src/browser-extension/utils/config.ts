export const instructions = ({ sourceLangId, targetLangId, targetLangLabel }: { sourceLangId: string, targetLangId: string, targetLangLabel: string}) => {
  return `
Instructions:
- You are an artificial intelligence agent responsible for translating languages from audio to text
- Please just repeat and translate what has been said and translate it
- The conversations you hear will be in ${targetLangId} and ${sourceLangId}
- When translating, make sure to translate the entire sentence, not just parts of it
- If you cannot translate a word, leave it blank
- So that all users can understand, respond in both ${targetLangId} and ${sourceLangId}
- output everything said since the last translation

Personality:
- None

Format:
\`\`\`
{
  "source": "translated text",
  "dest": "${targetLangLabel}"
}
\`\`\`
`;
};

export const langOptions = [{"id":"en","label":"English"},{"id":"zh-Hans","label":"简体中文"},{"id":"zh-Hant","label":"繁體中文"},{"id":"lzh","label":"古文"},{"id":"ja","label":"日本語"},{"id":"ko","label":"한국어"},{"id":"fr","label":"Français"},{"id":"de","label":"Deutsch"},{"id":"es","label":"Español"},{"id":"it","label":"Italiano"},{"id":"ru","label":"Русский"},{"id":"pt","label":"Português"},{"id":"nl","label":"Nederlands"},{"id":"pl","label":"Polski"},{"id":"ar","label":"العربية"},{"id":"af","label":"Afrikaans"},{"id":"am","label":"አማርኛ"},{"id":"az","label":"Azərbaycan"},{"id":"be","label":"Беларуская"},{"id":"bg","label":"Български"},{"id":"bn","label":"বাংলা"},{"id":"bs","label":"Bosanski"},{"id":"ca","label":"Català"},{"id":"ceb","label":"Cebuano"},{"id":"co","label":"Corsu"},{"id":"cs","label":"Čeština"},{"id":"cy","label":"Cymraeg"},{"id":"da","label":"Dansk"},{"id":"el","label":"Ελληνικά"},{"id":"eo","label":"Esperanto"},{"id":"et","label":"Eesti"},{"id":"eu","label":"Euskara"},{"id":"fa","label":"فارسی"},{"id":"fi","label":"Suomi"},{"id":"fj","label":"Fijian"},{"id":"fy","label":"Frysk"},{"id":"ga","label":"Gaeilge"},{"id":"gd","label":"Gàidhlig"},{"id":"gl","label":"Galego"},{"id":"gu","label":"ગુજરાતી"},{"id":"ha","label":"Hausa"},{"id":"haw","label":"Hawaiʻi"},{"id":"he","label":"עברית"},{"id":"hi","label":"हिन्दी"},{"id":"hmn","label":"Hmong"},{"id":"hr","label":"Hrvatski"},{"id":"ht","label":"Kreyòl Ayisyen"},{"id":"hu","label":"Magyar"},{"id":"hy","label":"Հայերեն"},{"id":"id","label":"Bahasa Indonesia"},{"id":"ig","label":"Igbo"},{"id":"is","label":"Íslenska"},{"id":"jw","label":"Jawa"},{"id":"ka","label":"ქართული"},{"id":"kk","label":"Қазақ"},{"id":"mn","label":"Монгол хэл"},{"id":"tr","label":"Türkçe"},{"id":"ug","label":"ئۇيغۇر تىلى"},{"id":"uk","label":"Українська"},{"id":"ur","label":"اردو"},{"id":"vi","label":"Tiếng Việt"},{"id":"sv","label":"Svenska"},{"id":"th","label":"ไทย"}]
export const defaultSourceLangId = 'en'
export const defaultTargetLangId = 'zh-Hans'
export const getLangLabel = (langId: string) => {
  return langOptions.find(option => option.id === langId)?.label || 'English'
}