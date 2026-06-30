import React from "react";

function ActionArea({ onSwap, onTranslate, onLearnMode, isLoading }) {
  return (
    <div className="action-area">
      <button id="swap-btn" onClick={onSwap} title="언어 바꾸기">
        ⇄
      </button>
      <button id="translate-btn" onClick={onTranslate} disabled={isLoading}>
        {isLoading ? "번역 중..." : "번역하기"}
      </button>
      <button id="learn-btn" onClick={onLearnMode} disabled={isLoading}>
        학습 문제 만들기
      </button>
    </div>
  );
}

export default ActionArea;
