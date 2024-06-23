"use client";
// axios
import axios from "axios";

// react
import { useEffect, useRef, useState } from "react";

// react-code-blocks
import { CopyBlock, github } from "react-code-blocks";

// components
import { ShieldAlert, Info } from "lucide-react";
import LanguagesDropDownMenu from "@/components/languages-dropdown";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Home() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [organisedCode, setOrganisedCode] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (code.length) {
      (async () => {
        try {
          setLoading(true);
          const {
            data: { result },
          } = await axios.post("/api/generate-organised-imports", {
            code,
            language: selectedLanguage,
          });
          setOrganisedCode(result);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [code]);

  useEffect(() => {
    setCode("");
    setOrganisedCode("");
  }, [selectedLanguage]);

  const isLanguageSelected = Boolean(selectedLanguage.length);

  return (
    <main className="grow flex flex-col p-12 h-full">
      <div>
        <LanguagesDropDownMenu onChangeLanguage={setSelectedLanguage} />
      </div>
      <div className="flex flex-grow gap-4 items-center justify-center mt-6 h-full">
        <section className="w-1/2 border rounded h-full max-h-[600px] relative">
          <textarea
            value={code}
            ref={textareaRef}
            onChange={(e) => setCode(e.target.value)}
            className={`min-h-full min-w-full p-4 ${
              !isLanguageSelected && "bg-gray-200"
            }`}
            disabled={!isLanguageSelected}
          />
          {!isLanguageSelected ? (
            <div className="gap-2 absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
              <div>
                <Alert>
                  <ShieldAlert className="h-5 w-5" />
                  <AlertTitle>Disabled</AlertTitle>
                  <AlertDescription>
                    Please select a programming language from the dropdown above
                    to enable this area.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          ) : null}
        </section>
        <section className="p-4 w-1/2 border rounded h-full max-h-[600px] overflow-auto relative">
          {!loading ? (
            <CopyBlock
              text={organisedCode}
              language={"javascript"}
              showLineNumbers={false}
              theme={github}
              wrapLongLines
            />
          ) : (
            <div className="gap-2 absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-black"></span>
              </span>
              <p className="text-gray-400 spin-in-3">Processing...</p>
            </div>
          )}
          {isLanguageSelected && !code.length ? (
            <div className="gap-2 absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
              <div>
                <Alert>
                  <Info className="h-5 w-5" />
                  <AlertTitle>Info</AlertTitle>
                  <AlertDescription>
                    organised imports will be available from here
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
