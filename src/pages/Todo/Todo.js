import React, { memo, useCallback, useContext, useState } from "react";
import useAxios from "../../lib/Hooks/useAxios";

import { API_URL, METHODS } from "../../lib/api/Constants";
import { TodoContext } from "../../lib/context/TodoContext";

const Todo = () => {
  const { setTodoHandler, todoTitle, todoList } = useContext(TodoContext);
  const { reqFunc } = useAxios();

  const onChangeHandler = useCallback(
    (e) => {
      setTodoHandler(e.target.value);
    },
    [todoTitle]
  );

  const [listIdx, setListIdx] = useState(null);
  const [todoValue, setTodoValue] = useState(null);

  const onCreateTodoHandler = () => {
    let token = window.localStorage.getItem("access_token");
    let params = {
      method: METHODS.POST,
      url: API_URL.TODO.CREATE,
      data: { todo: todoTitle },
    };

    let headers = {
      Authorization: `Bearer ${token}`,
      ContentType: "application/json",
    };

    reqFunc(params, headers);
  };

  const onModifiedHandler = (id) => {
    let value = todoList.filter((item) => item.id === id)[0].todo;

    setListIdx(id);
    setTodoValue(value);
  };

  const onModCompHandler = () => {
    setListIdx(null);
  };

  const onIsCompleteHandler = (e, id) => {
    setListIdx(null);

    let value = todoList.filter((item) => item.id === id)[0].todo;

    let token = window.localStorage.getItem("access_token");
    let params = {
      method: METHODS.PUT,
      url: `${API_URL.TODO.UPDATE}/${id}`,
      data: {
        todo: todoTitle,
        isCompleted: false,
      },
    };

    let headers = {
      Authorization: `Bearer ${token}`,
      ContentType: "application/json",
    };

    reqFunc(params, headers);
  };

  const onDeleteHandler = (id) => {
    let token = window.localStorage.getItem("access_token");
    let params = {
      method: METHODS.DELETE,
      url: `${API_URL.TODO.UPDATE}/${id}`,
    };

    let headers = {
      Authorization: `Bearer ${token}`,
      ContentType: "application/json",
    };

    reqFunc(params, headers);
  };

  return (
    <div>
      <h1>TODO</h1>

      <div className="input-wrap">
        <input
          type="text"
          placeholder="todo"
          name="todoTitle"
          // value={todoTitle || ""}
          onChange={onChangeHandler}
        />
        <button onClick={onCreateTodoHandler}>등록</button>
      </div>

      <ul className="list-wrap">
        {todoList.map((item) =>
          item.id !== listIdx ? (
            <li className="card" key={item.id}>
              <input
                type="checkbox"
                name={item.id}
                id={item.id}
                onChange={(e) => onIsCompleteHandler(e, item.id)}
                // checked={item.isCompleted ? true : false}
              />
              <label htmlFor={item.id}>{item.todo}</label>
              <button onClick={() => onModifiedHandler(item.id)}>수정</button>
              <button onClick={() => onDeleteHandler(item.id)}>삭제</button>
            </li>
          ) : (
            <li className="card" key={item.id}>
              <input
                type="text"
                name={item.id}
                id={item.id}
                onChange={onChangeHandler}
                // value={"" || todoValue}
              />
              <button onClick={(e) => onIsCompleteHandler(e, item.id)}>
                완료
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default memo(Todo);
