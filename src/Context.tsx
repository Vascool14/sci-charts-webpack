import React, { createContext, useState } from 'react';
import { ContextInterface, StateInterface}  from './types';

const initialState: StateInterface = {
  theme: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light',
  DATA: {},
  allOptions: [],
  selectedOption: 'World', 
  selectedYear: 2021,
}

export const Context = createContext<ContextInterface>({
  state: initialState,
  setState: () => {} 
}) as React.Context<ContextInterface>;

export const Provider = (props: any) => {
  const [state, setState] = useState<StateInterface>(initialState);
  return (
    <Context.Provider value={{ state, setState }}>
      {props.children}
    </Context.Provider>
  );
};
