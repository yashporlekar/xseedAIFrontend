import React, { createContext, useState } from "react";
import { IntlProvider } from 'react-intl';
import English from '../languages/en-US.json';
//import Spanish from '../languages/es-MX.json';
import { flattenMessages } from "../utils/multi-language-utils";

interface AppContextProps {
  locale: string;
  selectLanguage: (e: { target: { value: any } }) => void;
}

const local = navigator.language;
let language = English; // :any;
// if (local === "en-US") 
//   language = English;
// else
//   language = Spanish;

export const Context = createContext<AppContextProps>({
  locale: local,
  selectLanguage: (e) => {
    // default implementation or empty function
  },
});

const Wrapper: React.FC<{ children: React.ReactNode }> = (props) => {
  const [locale, setLocal] = useState(local);
  const [messages, setMessages] = useState(language);

    function selectLanguage(e: { target: { value: any; }; }) {
    const newLocal = e.target.value;
    setLocal(newLocal);
    setMessages(() => {
      // if (newLocal === "es-MX")
      //   return Spanish;
      // else
        return English;
    });
  }

  return (
    <Context.Provider value={{ locale, selectLanguage }}>
      <IntlProvider locale={locale} messages={flattenMessages(messages)}>
        {props.children}
      </IntlProvider>
    </Context.Provider>
  );
}

export default Wrapper;