import React, { useContext, useEffect } from "react";
import useAxios from "../../lib/Hooks/useAxios";
import { AuthContext } from "../../lib/context/AuthContext";

import { METHODS, API_URL } from "./../../lib/api/Constants";
import { useNavigate } from "react-router-dom";

// 아이디 : wdf@daum.net / 비밀번호 : 12345678

const Auth = () => {
  const navigate = useNavigate();
  const { reqFunc } = useAxios();
  const {
    setInfoHandler,
    authState,
    authInfo,
    register,
    setRegHandler,
    title,
  } = useContext(AuthContext);

  useEffect(() => {
    if (authState === "login") {
      navigate("/todo");
    } else {
      navigate("/");
    }
  }, [authState]);

  const onSignInHandler = (e) => {
    e.preventDefault();

    let url = register ? API_URL.AUTH.SIGNUP : API_URL.AUTH.SIGNIN;

    let headers = {
      Accept: "application/json",
      Authorization: "",
    };

    let params = {
      method: METHODS.POST,
      url: url,
      data: authInfo,
    };

    reqFunc(params, headers)
      .then((res) => {
        if (res.status === 200) {
          navigate("/todo");
        }
      })
      .catch((err) => console.log(err));
  };

  const onChangeHandler = (e) => {
    setInfoHandler({
      [e.target.name]: e.target.value,
    });
  };

  const onRegClickHandler = () => {
    setRegHandler();
  };

  return (
    <>
      <h1>{title}</h1>
      <form onSubmit={onSignInHandler}>
        <input
          type="text"
          name="email"
          id="email"
          onChange={onChangeHandler}
          value={"" || authInfo.email}
        />
        <input
          type="password"
          name="password"
          id="password"
          onChange={onChangeHandler}
          value={"" || authInfo.password}
        />
        {register ? (
          <div className="btn-wrap">
            <button type="button" onClick={onRegClickHandler}>
              취소
            </button>
            <button type="submit">회원가입</button>
          </div>
        ) : (
          <div className="btn-wrap">
            <button type="button" onClick={onRegClickHandler}>
              회원가입
            </button>
            <button type="submit">로그인</button>
          </div>
        )}
      </form>
    </>
  );
};

export default Auth;
