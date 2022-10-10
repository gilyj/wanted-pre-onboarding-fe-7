import {
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { API_URL, METHODS } from "../api/Constants";
import useAxios from "../Hooks/useAxios";

const initialState = {
  todoTitle: "",
  todoList: [],
};

export const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [todoTitle, setTodoTitle] = useState(initialState.todoTitle);
  const [todoList, setTodoList] = useState(initialState.todoList);

  const { reqFunc } = useAxios();

  let token = window.localStorage.getItem("access_token");

  useEffect(() => {
    let params = {
      method: METHODS.GET,
      url: API_URL.TODO.GETTODOS,
    };

    let headers = {
      Authorization: `Bearer ${token}`,
      ContentType: "",
    };

    reqFunc(params, headers).then((res) => {
      setTodoList((item) => (item = res.data));
    });
  }, []);

  const setTodoHandler = useCallback(
    (payload) => {
      setTodoTitle(payload);
    },
    [todoTitle]
  );

  const todoValue = useMemo(() => {
    return {
      setTodoHandler,
      todoTitle,
      todoList,
    };
  }, [setTodoHandler, todoTitle, todoList]);

  return (
    <TodoContext.Provider value={todoValue}>{children}</TodoContext.Provider>
  );
};

export default TodoProvider;
