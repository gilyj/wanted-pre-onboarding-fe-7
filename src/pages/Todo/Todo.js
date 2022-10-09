import React, { memo, useCallback, useContext } from "react";
import useAxios from "../../lib/Hooks/useAxios";

import { API_URL, METHODS } from "../../lib/api/Constants";
import { TodoContext } from "../../lib/context/TodoContext";

const Todo = () => {
  const { setTodoHandler, todo, todoList } = useContext(TodoContext);
  const { reqFunc } = useAxios();

  const onChangeHandler = useCallback(
    (e) => {
      setTodoHandler(e.target.value);
    },
    [todo]
  );

  const onCreateTodoHandler = () => {
    let token = window.localStorage.getItem("access_token");
    let params = {
      method: METHODS.POST,
      url: API_URL.TODO.CREATE,
      data: { todo: todo },
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
          value={todo || ""}
          onChange={onChangeHandler}
        />
        <button onClick={onCreateTodoHandler}>등록</button>
      </div>

      <div className="list-wrap">
        {todoList.map((item, idx) => (
          <div key={item.id}>
            <div className="name">{item.todo}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Todo);
