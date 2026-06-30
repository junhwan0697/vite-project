// src/App.jsx
import React, { useState } from "react";
import TranslationPanel from "./components/TranslationPanel";
import ActionArea from "./components/ActionArea";
import ThemeToggle from "./components/ThemeToggle";

import { LANGUAGES } from "./components/languages";
import { fetchTranslation } from "./api/translation";
import "./App.css";

function App() {
  const [sourceLang, setSourceLang] = useState("ko");
  const [targetLang, setTargetLang] = useState("en");
  const [sourceText, setSourceText] = useState("");
  const [targetText, setTargetText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const handleTranslate = async (isLearnMode = false) => {
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

      if (isLearnMode) {
        const clozeText = translatedResult
          .split(" ")
          .map((word) => (Math.random() > 0.5 ? "_".repeat(word.length) : word))
          .join(" ");
        setTargetText(clozeText);
      } else {
        setTargetText(translatedResult);
      }
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
    <div className={`app-wrapper ${theme}`}>
      {/* 분리한 컴포넌트를 사용하고 props로 상태와 함수를 전달합니다 */}
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

      <div className="container">
        <header>
          <h1>번역기🌐</h1>
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
            onTranslate={() => handleTranslate(false)}
            onLearnMode={() => handleTranslate(true)}
            isLoading={isLoading}
          />

          <TranslationPanel
            id="target"
            lang={targetLang}
            setLang={setTargetLang}
            text={targetText}
            placeholder="번역 결과 또는 학습 문제가 여기에 표시됩니다."
            readOnly
            languages={LANGUAGES}
            className="output-area"
          />
        </main>
      </div>
    </div>
  );
}

export default App;
