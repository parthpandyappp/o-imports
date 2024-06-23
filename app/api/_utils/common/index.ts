import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export async function generateOrganisedImports(code: string, language: string) {
  const prompt = `
    You are an AI model that organizes import statements in code snippets provided by the user. The user will provide a code snippet and specify the programming language. Your task is to organize the import statements in a logical and structured manner based on the context of the provided code. The import statements should be grouped and sorted according to their source. For instance, in JavaScript, you might group imports from external libraries, internal libraries, and local files separately.
    
    Below is the input you will receive:
    
    language: this can be any programming language
    code: this is the code snippet on which you've to work upon, identify the imports and group them according to their source.
    
    You should return the organized import statements in the same programming language, strictly in JSON format with the following structure:
    
    {
      "result": "<organized_import_code>"
    }
    
    If no changes are made to the input, then the value of the key "result" should be the same as the input.
    
    Suppose you receive the following code snippet as input and the language is JavaScript:
    
    '''javascript
    import { FunctionComponent, useState } from 'react';
    import { usePathname } from 'next/navigation';
    
    import { H6 } from '@library/atoms/typography';
    import DateRangePicker from '@library/molecules/date-range-picker';
    import HighlightsContainer from '@components/highlights-container';
    import HighlightsContainerWithThreadsData from '@components/highlights-container-with-threads-data';
    
    import { getDate, getTodayDate } from '@library/molecules/date-range-picker/helpers;
    
    import * as classNames from './styles';
    import HighlightsUI from '@components/highlights-container/highlights-ui';
    '''
    
    Your output should be:
    
    {
      "result": "// react\\nimport { FunctionComponent, useState } from 'react';\\n\\n// next\\nimport { usePathname } from 'next/navigation';\\n\\n// library\\nimport { H6 } from '@library/atoms/typography';\\nimport DateRangePicker from '@library/molecules/date-range-picker';\\nimport { getDate, getTodayDate } from '@library/molecules/date-range-picker/helpers;\\n\\n// components\\nimport HighlightsContainer from '@components/highlights-container';\\nimport HighlightsContainerWithThreadsData from '@components/highlights-container-with-threads-data';\\nimport HighlightsUI from '@components/highlights-container/highlights-ui';\\n\\n// styles\\nimport * as classNames from './styles';"
    }
    
    Important requirements:
    1. Ensure that each category block begins with a lowercase comment indicating the source of the imports before that respective block.
    2. Every block of imports must have a relevant and accurate comment.
    3. Use your knowledge to accurately identify the source of each import.
    4. If the code does not contain any import statements or the input is irrelevant, return the code unchanged.
    5. Identify the import section and organize it while keeping the rest of the code unchanged.
    6. Do not miss any import statements; ensure all imports are categorized and labeled correctly.
    7. Label all imports, including those from common libraries (e.g., from 'react', from 'react-router-dom', etc.).
    
    Here is the code snippet you need to organize:
    
    '''${language}
    ${code}
    '''
    
    Return a single JSON object with a key "result" and the value as the single-line formatted string of the organized import code.
    `;

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  console.log({ res: chatCompletion.choices[0].message });
  return chatCompletion.choices[0].message.content;
}
