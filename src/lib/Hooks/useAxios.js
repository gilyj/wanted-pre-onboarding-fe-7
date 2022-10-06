import axios from 'axios';


const useAxios = () => {

  const headers = {
    Accept: "application/json",
    Authorization: ''
  }

  const instance = axios.create();

  instance.interceptors.response.use(
    (response) => {
      if(response && response.status === 200){
        console.log(response);

        if(response.data.access_token){
          localStorage.setItem('key', response.data.access_token)
        }
      }

      return response;
    },
    (error) => {
      if(error){
        console.log(error);
      }
      return Promise.reject(error);
    }
  )

  const req = (params) => {
    let {method, url, data} = params;

    const config = {
      headers,
      method,
      url,
      data
    }

    return instance(config);
  }

  const reqFunc = async(params) => {
    const res = await req(
      params
    )

    return res.data
  }

  return {reqFunc};
}

export default useAxios;