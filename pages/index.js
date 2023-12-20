import React, { useState, useEffect } from 'react';
import {Header, FileEditor, Output, ThemeDropdown} from '../components'
import { defineTheme } from "../lib/defineTheme";
import { languageOptions } from "../constants/languageOptions";
import {sendCode} from "../services"
import { useCookies } from 'react-cookie';
const cppDefault = `#include<iostream>
using namespace std;

int main(){
  //Type your Code here
} 
`;
export default function home(){
  const [cookies, setCookie] = useCookies(['code']);
  const [code, setCode] = useState(cppDefault);
  useEffect(() => {
    const storedCode = cookies.code;

    if (storedCode) {
      setCode(storedCode);
    }
  }, [cookies.code]);
  const [output, setOutput] = useState();
  const [language, setLanguage] = useState(languageOptions[0]); 
  const[error,setError]=useState(false);
  const [theme, setTheme] = useState("oceanic-next");
  const handleSubmit = async () => {
    setError(false);
    if(!code || !language){
      setError(true)
      return
    }
    const response = await sendCode(code, language);
        //console.log(response)
    setOutput(response);
  };
  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);
  
    if (["light", "vs-dark"].includes(theme.value)){
      setTheme(theme);
    } else if (theme.value) {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []); 
  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };
  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        setCookie('code', data, { path: '/', maxAge: 24 * 60 * 60 });
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  return (
    <div className='min-h-screen'>
      <Header
        onSelectChange={onSelectChange}
        handleThemeChange={handleThemeChange}
        theme={theme}
        handleSubmit={handleSubmit}
        code = {code}
      />
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-5 col-span-1 lg:mx-5 lg:my-2'>
        </div>
        <div className="lg:col-span-7 col-span-1">
          <div className="lg:sticky relative top-8 lg:my-2 lg:mx-5">
              <FileEditor code={cookies.code} language={language?.value} theme={theme.value} onChange={onChange} />   
          </div>
          <div className='lg:sticky relative top-8 lg:my-2 lg:mx-5'>
              <Output output={output}/>
          </div> 
        </div>
      </div>
      
    </div>
  );
}