import { useRef, useEffect } from "react";

interface TextAreaComponentProps {
  code: string;
  setCode: (code: string) => void;
  isLanguageSelected: boolean;
}

const TextAreaComponent: React.FC<TextAreaComponentProps> = ({
  code,
  setCode,
  isLanguageSelected,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isLanguageSelected]);

  return (
    <textarea
      value={code}
      ref={textareaRef}
      onChange={(e) => setCode(e.target.value)}
      className={`min-h-full min-w-full p-4 ${
        !isLanguageSelected && "bg-gray-200"
      }`}
      disabled={!isLanguageSelected}
    />
  );
};

export default TextAreaComponent;
