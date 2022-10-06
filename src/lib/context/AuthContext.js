import { createContext, useState, useMemo, useCallback } from 'react';

const initialState = {
  signUp: {
    email: '',
    password: '',
  },
  singIn: {
    email: '',
    password: ''
  }
}

export const SignUpContext = createContext();
export const SignInContext = createContext();


const AuthProvider = ({children}) => {

  const [signUpState, setSignUpState] = useState(initialState.signUp);
  const [signInState, setSignInState] = useState(initialState.singIn);

  const setLogin = useCallback((data) => {
    setSignUpState((prev) => ({
      ...prev,
      ...data
    }))
  }, [])

  const signUpValue = useMemo(() => {
    return{
      signUpState,
      setLogin

      
    }
  }, [signUpState, setLogin])

  const signInValue = () => {

  }

  return(
    <SignUpContext.Provider value={signUpValue}>
      <SignInContext.Provider value={signInValue}>
        {children}
      </SignInContext.Provider>
    </SignUpContext.Provider>
  )
}


export default AuthProvider;