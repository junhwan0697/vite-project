export const fetchTranslation = async (text, sourceLang, targetLang) => {
  const langPair = `${sourceLang}|${targetLang}`;

  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`,
    );
    const data = await response.json();

    return data.responseData.translatedText;
  } catch (error) {
    console.error("API 요청 중 에러 발생:", error);
    throw new Error("번역을 가져오는 데 실패했습니다.");
  }
};
