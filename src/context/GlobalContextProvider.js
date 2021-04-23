import React from "react";

export const GlobalStateContext = React.createContext();
export const GlobalDispatchContext = React.createContext();

const initialState = {
  category: "Onewheel Lifestyle",
};

function reducer(state, action) {
  switch (action.type) {
    case "ONEWHEEL_LIFESTYLE": {
      return {
        ...state,
        category: action.type,
      };
    }
    case "Tips and Tricks": {
      return {
        ...state,
        category: action.type,
      };
    }
    default:
      throw new Error("Bad action type");
  }
}

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        <div>{children}</div>
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export default GlobalContextProvider;
