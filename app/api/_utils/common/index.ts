// openai
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export async function generateOrganisedImports(code: string, language: string) {
  const prompt = `
  You are an AI model that organizes import statements in code snippets provided by the user. The user will provide a code snippet and specify the programming language. Your task is to organize the import statements in a logical and structured manner based on the context of the provided code. The import statements should be grouped and sorted according to their source. For instance, in Python, you might group imports from standard libraries, third-party libraries, and local imports separately.

  Below is the input you will receive:

  language: this can be any programming language
  code: this is the code snippet on which you've to work upon, identify the imports and group them according to their source.

  You should return the organized import statements in the same programming language, strictly in JSON format with the following structure:

  {
    "result": "<organized_import_code>"
  }

  If no changes are made to the input, then the value of the key "result" should be the same as the input.

  Suppose you receive the following code snippet as input and the language is Python:

  '''python
  import requests
  from bs4 import BeautifulSoup
  import pandas as pd
  import numpy as np
  import matplotlib.pyplot as plt
  import seaborn as sns
  from sklearn.model_selection import train_test_split
  from sklearn.linear_model import LinearRegression
  from sklearn.metrics import mean_squared_error
  import datetime
  import json

  # Web scraping example
  def scrape_data(url):
      response = requests.get(url)
      soup = BeautifulSoup(response.text, 'html.parser')
      titles = soup.find_all('h2', class_='title')
      data = [title.get_text() for title in titles]
      return data

  url = 'https://example.com'
  '''

  Your output should be:

  {
    "result": "// requests\\nimport requests;\\n\\n// bs4\\nfrom bs4 import BeautifulSoup;\\n\\n// pandas\\nimport pandas as pd;\\n\\n// numpy\\nimport numpy as np;\\n\\n// matplotlib\\nimport matplotlib.pyplot as plt;\\n\\n// seaborn\\nimport seaborn as sns;\\n\\n// sklearn\\nfrom sklearn.model_selection import train_test_split;\\nfrom sklearn.linear_model import LinearRegression;\\nfrom sklearn.metrics import mean_squared_error;\\n\\n// datetime\\nimport datetime;\\n\\n// json\\nimport json;\\n\\n# Web scraping example\\ndef scrape_data(url):\\n    response = requests.get(url)\\n    soup = BeautifulSoup(response.text, 'html.parser')\\n    titles = soup.find_all('h2', class_='title')\\n    data = [title.get_text() for title in titles]\\n    return data\\n\\nurl = 'https://example.com'"
  }

  Important requirements:
  1. Ensure that each category block begins with a lowercase comment indicating the source of the imports before that respective block.
  2. Every block of imports must have a relevant and accurate comment.
  3. Use your knowledge to accurately identify the source of each import.
  4. If the code does not contain any import statements or the input is irrelevant, return the code unchanged.
  5. Identify the import section and organize it while keeping the rest of the code unchanged.
  6. Do not miss any import statements; ensure all imports are categorized, labeled correctly, and imported statements are complete with a semicolon in case of single-line imports and a semicolon in case of multi-line imports.
  7. Label all imports, including those from common libraries (e.g., from 'react', from 'react-router-dom', etc.)
  8. Below are the few things from which you can understand and perform better:
  - for import 'import { User } from './models/User';' the label should be 'models'
  - for import 'import { ProductService } from './services/ProductService';' the label should nbe 'services'
  9. The import label should't have any special character such as '@'. for instance see the below example:
  suppose for 'import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';' the label should be fortawesome only.

  from point 8, we got to understand that the label should be same as the module name from which the entity is imported

  Here is the code snippet you need to organize:

  '''${language}
  ${code}
  '''

  Return a single JSON object with a key "result" and the value as the single-line formatted string of the organized import code, including the whole remaining code unchanged, ensuring no part of the original code is omitted or replaced.
  `;

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  console.log({ res: chatCompletion.choices[0].message });
  return chatCompletion.choices[0].message.content;
}
