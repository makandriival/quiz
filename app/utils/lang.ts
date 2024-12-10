export const loadMsgs = async (lang: string) => {
  return await import(`../messages/${lang}.json`);
};