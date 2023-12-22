import React, { useState, useEffect } from 'react';
import { Header, FileEditor, Output, Scrapper, Input} from '../components';
import { defineTheme } from '../lib/defineTheme';
import { languageOptions } from '../constants/languageOptions';
import { sendCode, initializeWebSocket } from '../services';
import { useCookies } from 'react-cookie';
import {  handleSubmit,handleThemeChange, onSelectChange, onChange } from '../utils'
import { ToastContainer, toast } from "react-toastify";

const cppDefault = `#include<iostream>
using namespace std;

int main(){
  //Type your Code here
} 
`;
export default function Home() {
  const [cookies, setCookie] = useCookies(['code'],['room']);
  const [code, setCode] = useState(cppDefault);
  const [output, setOutput] = useState();
  const [language, setLanguage] = useState(languageOptions[0]);
  const [error, setError] = useState(false);
  const [theme, setTheme] = useState('oceanic-next');
  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState('');
  const [customInput, setCustomInput ] = useState('')
  useEffect(() => {
    defineTheme('oceanic-next').then((_) =>
      setTheme({ value: 'oceanic-next', label: 'Oceanic Next' })
    );
  }, []);
  useEffect(() => {
    const storedCode = cookies.code;
    if (storedCode) {
      setCode(storedCode);
    }
     if (socket) {
    socket.on('codeUpdate', ({ code: updatedCode, sender }) => {
      console.log(`Received code update from ${sender}:`, updatedCode);
      setCode(updatedCode);
    });

    socket.on('InitializeCode', (data) => {
      console.log(`Received code initialization request from ${data.requester}`);
      try {
        const currentCode = cookies.code;
        socket.emit('codeUpdate', { code: currentCode, sender: socket.id });
      } catch (error) {
        console.error('Error getting or sending code:', error);
      }
    });
  }
}, [cookies.code, socket]);

  return (
    <div className="min-h-screen">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className='position:fixed w-full top-0 left-0 '>
        <Header
          onSelectChange={(sl) => onSelectChange(sl, setLanguage)}
          handleThemeChange={(th) =>handleThemeChange(th, setTheme)}
          theme={theme}
          handleSubmit={() => handleSubmit(setError, sendCode, code, language, setOutput, socket, room, customInput)}
          onChange = {onChange}
          initializeWebSocket={()=>initializeWebSocket(socket, setSocket, room, code, toast)}
          room = {room}
          setRoom={setRoom}
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-2 ">
        <div className="position: sticky overflow-scroll">
          <Scrapper/>
        </div>
        <div className="position:fixed lg:col-span-1 ">
          <div className="position:fixed top-5 lg:my-2 lg:mx-5 ">
            <FileEditor
              code={code}
              language={language?.value}
              theme={theme.value}
              onChange={(action, data) => onChange(action, data, setCode, setCookie, socket, room)}
            />
            <div className='grid grid-cols-2'>
              <div className="w-full">
                <Output output={output} />
              </div>
              <div className='w-full mx-4 mt-6 p-2'>
                <Input customInput={customInput} setCustomInput={setCustomInput}/>
              </div> 
            <div>
                
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
  );
}
