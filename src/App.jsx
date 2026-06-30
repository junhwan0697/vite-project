import React, { useState } from "react";
import TranslationPanel from "./components/TranslationPanel";
import ActionArea from "./components/ActionArea";
import { LANGUAGES } from "./components/languages";
import { fetchTranslation } from "./api/translation";
import "./App.css";

function App() {
  const [sourceLang, setSourceLang] = useState("ko");
  const [targetLang, setTargetLang] = useState("en");
  const [sourceText, setSourceText] = useState("");
  const [targetText, setTargetText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      alert("번역할 텍스트를 입력해주세요!");
      return;
    }

    setIsLoading(true);
    setTargetText("번역 중...");

    try {
      const translatedResult = await fetchTranslation(
        sourceText,
        sourceLang,
        targetLang,
      );
      setTargetText(translatedResult);
    } catch (error) {
      setTargetText(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(targetText);
    setTargetText(sourceText);
  };

  return (
    <div className="container">
      <header>
        <h1>번역기 🌐</h1>
      </header>

      <main className="translator-box">
        <TranslationPanel
          id="source"
          lang={sourceLang}
          setLang={setSourceLang}
          text={sourceText}
          setText={setSourceText}
          placeholder="번역할 내용을 입력하세요."
          languages={LANGUAGES}
          className="input-area"
        />

        <ActionArea
          onSwap={handleSwap}
          onTranslate={handleTranslate}
          isLoading={isLoading}
        />

        <TranslationPanel
          id="target"
          lang={targetLang}
          setLang={setTargetLang}
          text={targetText}
          placeholder="번역 결과가 여기에 표시됩니다."
          readOnly
          languages={LANGUAGES}
          className="output-area"
        />
      </main>
    </div>
  );
}

export default App;
