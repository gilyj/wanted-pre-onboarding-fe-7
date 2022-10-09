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
  todo: "",
  todoList: [],
};

export const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [todo, setTodo] = useState(initialState.todo);
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
      setTodo(payload);
    },
    [todo]
  );

  const todoValue = useMemo(() => {
    return {
      setTodoHandler,
      todo,
      todoList,
    };
  }, [setTodoHandler, todo, todoList]);

  return (
    <TodoContext.Provider value={todoValue}>{children}</TodoContext.Provider>
  );
};

export default TodoProvider;
