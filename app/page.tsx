"use client";
// axios
import axios from "axios";

// react
import { useEffect, useState } from "react";

// components
import LanguagesDropDownMenu from "@/components/languages-dropdown";
import TextAreaComponent from "@/components/textarea-section";
import CodeBlock from "@/components/code-block";
import DisabledSection from "@/components/feedback-ui/disabled-section";
import ProcessingLoader from "@/components/feedback-ui/processing-loader";
import InfoSection from "@/components/feedback-ui/info-section";

// lucide-react
import { MoveLeft } from "lucide-react";

export default function Home() {
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [organisedCode, setOrganisedCode] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  // for mobile ui
  const [mockLoading, setMockLoading] = useState<boolean>(false);
  const [proceedToOrganise, setProceedToOrganise] = useState<boolean>(false);

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
  }, [code, selectedLanguage]);

  useEffect(() => {
    setCode("");
    setOrganisedCode("");
    setProceedToOrganise(false);
  }, [selectedLanguage]);

  const isLanguageSelected = Boolean(selectedLanguage.length);

  const handleOrganiseImportsInMobile = () => {
    if (!proceedToOrganise) {
      setMockLoading(true);
      setTimeout(() => {
        setProceedToOrganise((prev) => !prev);
        setMockLoading(false);
      }, 1500);
    } else setProceedToOrganise((prev) => !prev);
  };

  return (
    <main className="flex flex-col p-8 md:p-12 h-full w-full overflow-auto">
      <div className="mt-20 md:mt-36 w-full">
        <LanguagesDropDownMenu onChangeLanguage={setSelectedLanguage} />
      </div>
      <div className="block md:flex grow-0 md:grow gap-4 items-center justify-center mt-6 h-full">
        <section className="md:block w-full md:w-1/2 border rounded h-3/4 md:max-lg:h-3/4 max-h-[362px] md:max-h-[600px] relative">
          <div className="hidden md:block h-full">
            <TextAreaComponent
              code={code}
              setCode={setCode}
              isLanguageSelected={isLanguageSelected}
            />
          </div>
          <div className="block md:hidden h-full w-full overflow-auto relative">
            {mockLoading ? <ProcessingLoader /> : null}

            {!proceedToOrganise ? (
              !mockLoading ? (
                <TextAreaComponent
                  code={code}
                  setCode={setCode}
                  isLanguageSelected={isLanguageSelected}
                />
              ) : null
            ) : (
              <CodeBlock
                organisedCode={organisedCode}
                selectedLanguage={selectedLanguage}
              />
            )}
          </div>
          <button
            className={`block md:hidden py-2 px-2 text-white text-sm text-center font-semibold bg-black w-full mt-2 rounded ${
              !code.length && "opacity-30 cursor-not-allowed"
            }`}
            onClick={() => handleOrganiseImportsInMobile()}
            disabled={!code.length}
          >
            {proceedToOrganise ? (
              <span className="flex gap-2 justify-center items-center">
                <MoveLeft /> Back
              </span>
            ) : (
              "Organise"
            )}
          </button>
          {!isLanguageSelected ? (
            <div className="gap-2 absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
              <DisabledSection />
            </div>
          ) : null}
        </section>
        <section className="hidden md:block w-full md:w-1/2 border rounded h-3/4 md:max-lg:h-3/4 max-h-[362px] md:max-h-[600px] relative overflow-auto p-4">
          {!loading ? (
            <CodeBlock
              organisedCode={organisedCode}
              selectedLanguage={selectedLanguage}
            />
          ) : (
            <ProcessingLoader />
          )}
          {isLanguageSelected && !code.length ? (
            <div className="gap-2 absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
              <InfoSection />
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
