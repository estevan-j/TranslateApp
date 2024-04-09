export const selectLanguages = (languages, options) => {
  let selectedLenguages = languages.filter((language) => {
    if (options.includes(language.code)){
        return language;
    }
  });
  return selectedLenguages;
};
