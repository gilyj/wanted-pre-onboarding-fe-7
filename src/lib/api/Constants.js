export const METHODS = {
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
  DELETE: "delete",
};

export const API_URL = {
  AUTH: {
    SIGNUP: "/auth/signup",
    SIGNIN: "/auth/signin",
  },
  TODO: {
    CREATE: "/todos",
    GETTODOS: "/todos",
    UPDATE: `/todos/:{id}`,
  },
};
