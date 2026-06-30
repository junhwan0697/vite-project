import React from "react";

function ActionArea({ onSwap, onTranslate, isLoading }) {
  return (
    <div className="action-area">
      <button id="swap-btn" onClick={onSwap} title="언어 바꾸기">
        ⇄
      </button>
      <button id="translate-btn" onClick={onTranslate} disabled={isLoading}>
        {isLoading ? "번역 중..." : "번역하기"}
      </button>
      <button className="answer-btn">test</button>
    </div>
  );
}

export default ActionArea;
