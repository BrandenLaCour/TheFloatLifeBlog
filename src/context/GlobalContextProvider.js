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
        category: "Onewheel Lifestyle",
      };
    }
    case "TIPS_AND_TRICKS": {
      return {
        ...state,
        category: "Tips and Tricks",
      };
    }
    case "CONTENT_CREATION_AND_MEDIA": {
      return {
        ...state,
        category: "Content Creation and Media",
      };
    }
    case "SAFETY_AND_AWARENESS": {
      return {
        ...state,
        category: "Safety and Awareness",
      };
    }
    case "FROM_THE_PROS": {
      return {
        ...state,
        category: "From The Pros",
      };
    }
    case "EVERYTHING_ELSE": {
      return {
        ...state,
        category: "Everything Else",
      };
    }
    case "CATEGORY": {
      return {
        ...state,
        category: action.payload,
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
