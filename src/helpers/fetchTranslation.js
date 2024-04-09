export function fetchTranslation(text, sourceLang, targetLang) {
  const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
    text
  )}&langpair=${sourceLang}|${targetLang}`;

  return fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data.responseData.translatedText;
    })
    .catch((error) => {
      console.error("There was a problem fetching the translation:", error);
      return null; // or handle the error in a way that suits your application
    });
}
