import React, { useContext } from 'react';
import useAxios from '../../lib/Hooks/useAxios';
import { AuthContext } from '../../lib/context/AuthContext';

import { METHODS, API_URL } from './../../lib/api/Constants';
import {useParams} from 'react-router-dom';


// 아이디 : wdf@daum.net / 비밀번호 : 12345678

const Auth = () => {
  const params = useParams();
  const {reqFunc} = useAxios();
  // const {signUpState, setLogin} = useContext(SignUpContext);
  const {setInfoHandler, authState, authInfo} = useContext(AuthContext);

  console.log(authInfo)
  
  console.log(params);
  const onSignInHandler = (e) => {
    e.preventDefault();

    let params = {
      method: METHODS.POST,
      url: API_URL.AUTH.SIGNIN,
      data: authInfo
    }
    reqFunc(params)
  }

  const onChangeHandler = (e) => {
    setInfoHandler(
      {
        [e.target.name] : e.target.value
      }
    );
  }
  return (
    <form onSubmit={onSignInHandler}>
      <input type="text" name="email" id="email" onChange={onChangeHandler} value={"" || authInfo.email} />
      <input type="password" name="password" id="password" onChange={onChangeHandler} value={"" || authInfo.password}/>

      <button>로그인</button>
    </form>
  );
};


export default Auth;