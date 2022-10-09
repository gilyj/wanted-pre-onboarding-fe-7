import {
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";

const initialState = {
  authState: null,
  info: {
    email: "",
    password: "",
  },
  register: false,
  title: "로그인",
};

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(
    window.localStorage.getItem("access_token")
  );

  const [authInfo, setAuthInfo] = useState(initialState.info);
  const [register, setRegister] = useState(initialState.register);
  const [title, setTitle] = useState(initialState.title);

  useEffect(() => {
    if (window.localStorage.getItem("access_token")) {
      setAuthState("login");
    } else {
      setAuthState(null);
    }
  }, [authState]);

  useEffect(() => {
    if (register) {
      setTitle("회원가입");
    } else {
      setTitle("로그인");
    }
  }, [register]);

  const setInfoHandler = useCallback((data) => {
    setAuthInfo((prev) => ({
      ...prev,
      ...data,
    }));
  }, []);

  const setRegHandler = useCallback(() => {
    setRegister((prev) => !register);
  }, [register]);

  const authValue = useMemo(() => {
    return {
      setInfoHandler,
      authState,
      authInfo,
      setRegHandler,
      register,
      setRegHandler,
      title,
    };
  }, [setInfoHandler, authState, authInfo, register, setRegHandler, title]);

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
