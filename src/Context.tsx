import React, { createContext, useState } from 'react';
import StateInterface from './types/StateInterface';

type ContextType = {
  state: StateInterface,
  setState: React.Dispatch<React.SetStateAction<StateInterface>>
}

const initialState: StateInterface = {
  theme: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'
}

export const Context = createContext<ContextType>({
  state: initialState,
  setState: () => {} 
}) as React.Context<ContextType>;

export const Provider = (props: any) => {
  const [state, setState] = useState<StateInterface>(initialState);
  return (
    <Context.Provider value={{ state, setState }}>
      {props.children}
    </Context.Provider>
  );
};
