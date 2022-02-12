import React, { useReducer, createContext, useMemo } from "react";


//CREATE INFORMATION CONTEXT
export const InfoContext = createContext(); 
export const InfoConsumer =  InfoContext.Consumer;

//REDUCER WITH A SINGLE ACTION TYPE
const reducer = (state, action) => {
  return {...action.payload}
};

/*
    STATE EXEMPLE
const info = {
  error: {
    code : "500",
    name : "Something went wrong!",
    message : "There was a problem on our end. Please try again later. "
  },
  message : {
    type : "danger",
    message : "No user exists"
  },
  loading : true
}

*/
export const InfoProvider = ({ children }) => {
  
    const defaultInfo = {
        error: null,
        message : undefined,
        loading : true
    }
  
    const [info, dispatchInfo] = useReducer(reducer, defaultInfo);


    const contextValue = useMemo(() => {
      return { info, dispatchInfo };
    }, [info, dispatchInfo ]);

    console.log(info);
  
  
  
      return (
        <InfoContext.Provider value={contextValue}>
          {children}
        </InfoContext.Provider>
      );
    };
