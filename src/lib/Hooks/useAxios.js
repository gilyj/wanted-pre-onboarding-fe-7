import axios from "axios";

const useAxios = () => {
  const instance = axios.create();

  instance.interceptors.response.use(
    (response) => {
      if (response && response.status === 200) {
        console.log(response);

        if (response.data.access_token) {
          localStorage.setItem("access_token", response.data.access_token);
        }
      }

      return response;
    },
    (error) => {
      if (error) {
        console.log(error);
      }
      return Promise.reject(error);
    }
  );

  const req = (params, headers) => {
    let { method, url, data } = params;

    const config = {
      headers,
      method,
      url,
      data,
    };

    return instance(config);
  };

  const reqFunc = async (params, headers) => {
    const res = await req(params, headers);

    return res;
  };

  return { reqFunc };
};

export default useAxios;
