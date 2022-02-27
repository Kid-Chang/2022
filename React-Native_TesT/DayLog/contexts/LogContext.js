import React from 'react';
import {createContext, useState} from 'react';

const LogContext = createContext();

export function LogContextProvider({children}) {
  const [text, setText] = useState('');
  return (
    <LogContext.Provider value={{text, setText}}>
      {children}
      {/* 예제의 경우 컴포넌트 내부에 <RootStack />이 있기에, {children}에 저게 들어간다. */}
    </LogContext.Provider>
  );
}

export default LogContext;
