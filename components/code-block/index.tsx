import { CopyBlock, github } from "react-code-blocks";

interface CodeBlockProps {
  organisedCode: string;
  selectedLanguage: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  organisedCode,
  selectedLanguage,
}) => {
  return (
    <CopyBlock
      text={organisedCode}
      language={selectedLanguage}
      showLineNumbers={false}
      theme={github}
      wrapLongLines
    />
  );
};

export default CodeBlock;
