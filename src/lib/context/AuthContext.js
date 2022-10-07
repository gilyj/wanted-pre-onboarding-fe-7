import { createContext, useState, useMemo, useCallback, useEffect } from 'react';

const initialState = {
  authState: 'login',
  info: {
    email: '',
    password: '',
  },
}

export const AuthContext = createContext();


const AuthProvider = ({children}) => {
  const [authState, setAuthState] = useState(initialState.authState);
  const [authInfo, setAuthInfo] = useState(initialState.info);

  useEffect(() => {
    if(window.localStorage.getItem('key')){
      console.log('key')
    }
  }, [])

  // const [signUpState, setSignUpState] = useState(initialState.signUp);
  // const [signInState, setSignInState] = useState(initialState.singIn);

  // const setLogin = useCallback((data) => {
  //   setSignInState((prev) => ({
  //     ...prev,
  //     ...data
  //   }))
  // }, []);

  // const setRegister = useCallback((data) => {
  //   setSignUpState((prev) => ({
  //     ...prev,
  //     ...data
  //   }))
  // }, [])

  // const signUpValue = useMemo(() => {
  //   return{
  //     signUpState,
  //     setRegister
  //   }
  // }, [signUpState, setRegister])

  // const signInValue = useMemo(() => {
  //   return{
  //     signInState,
  //     setLogin,
  //   }
  // }, [signInState, setLogin])

  const setInfoHandler = useCallback((data) => {
    setAuthInfo((prev) => ({
      ...prev,
      ...data
    }))
  }, []);

  const authValue = useMemo(() => {
    return{
      setInfoHandler,
      authState,
      authInfo
    }
  }, [setInfoHandler, authState, authInfo])

  return(
    // <SignUpContext.Provider value={signUpValue}>
    //   <SignInContext.Provider value={signInValue}>
    //     {children}
    //   </SignInContext.Provider>
    // </SignUpContext.Provider>
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  )
}


export default AuthProvider;