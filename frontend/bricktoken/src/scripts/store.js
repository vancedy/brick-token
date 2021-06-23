import React, {useReducer, useContext, createContext} from "react";

const StoreContext = createContext();
const initialState = {
    message: '',
    address: null,
    balance: 0,
    BRCKbalance:0,
}

const accountReducer = (state, action) =>{
    switch(action.type){
        case "NEW-ADDY":
            return{
                ...state,
                address: action.newAddress,
                message: action.messsage
            }
        case "SET-BALANCE":
            return{
                ...state,
                balance: action.newBalance
            }
        case "SET-BRCK":
            return{
                ...state,
                BRCKbalance: action.newBRCK
            }
        default: 
            throw new Error('Unknown action')
    }
};

export const StoreProvider = ({children})=>{
    const [state,dispatch] = useReducer(accountReducer, initialState)
    return <StoreContext.Provider value={{state,dispatch}}>{children}</StoreContext.Provider>
};

export const useStore = () => useContext(StoreContext)
