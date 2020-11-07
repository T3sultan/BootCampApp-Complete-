import React, {createContext, useMemo, useReducer} from 'react'
import AsyncStorage from '@react-native-community/async-storage'

//1. creating our auth context
export const AuthContext = createContext()

function reducer(state, action){
    switch (action.type) {
        case "RESTORE_TOKEN":
            return{
                ...state,
                userToken:action.token,
                isLoading:false,
            }
        case "SIGN_IN":
            return{
                ...state,
                userToken:action.token,
                isLoading:false,
                isSignout:false,
            }
        case "SIGN_OUT":
            return{
                ...state,
                userToken:null,
                isLoading:false,
                isSignout:true,
            }
        
    
        default:
            break;
    }
}

export const AuthProvider = ({children}) =>{
    const [state,dispatch] = useReducer(reducer,{
        isLoading:true,
        isSignout:false,
        userToken:null
    })
    const authContext=useMemo(()=>({
        restoreToken:(token)=>{
            try {
                dispatch({type:"RESTORE_TOKEN", token:token})
            } catch (err) {
                console.log(err)
            }
        },

        signIn:async (token)=>{
            try {
                dispatch({type:"SIGN_IN", token})
                await AsyncStorage.setItem("userToken", token)
            } catch (err) {
                console.log(err)
            }
        },
        signUp:async (token)=>{
            try {
                dispatch({type:"SIGN_IN", token})
                await AsyncStorage.setItem("userToken", token)
            } catch (err) {
                console.log(err)
            }
        },
        signOut:async()=>{
            dispatch({type:"SIGN_OUT"})
            await AsyncStorage.removeItem("userToken")
        }

    }))
    return <AuthContext.Provider value={{authContext,state}}>{children}</AuthContext.Provider>
}