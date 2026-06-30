import React from "react";

function TranslationPanel({
  id,
  lang,
  setLang,
  text,
  setText,
  placeholder,
  readOnly = false,
  languages,
  className,
}) {
  return (
    <div className={className}>
      {/* 언어 선택 Select */}
      <select value={lang} onChange={(e) => setLang(e.target.value)}>
        {languages.map((item) => (
          <option key={`${id}-${item.code}`} value={item.code}>
            {item.name}
          </option>
        ))}
      </select>

      {/* 텍스트 입력/출력 Textarea */}
      <textarea
        value={text}
        onChange={setText ? (e) => setText(e.target.value) : undefined}
        placeholder={placeholder}
        readOnly={readOnly}
      />
    </div>
  );
}

export default TranslationPanel;
