import "./App.css";
import { Route, Routes } from "react-router-dom";

import AuthProvider from "./lib/context/AuthContext";

import Auth from "./pages/auth/Auth";
import Todo from "./pages/Todo/Todo";
import TodoProvider from "./lib/context/TodoContext";

function App() {
  return (
    <AuthProvider>
      <TodoProvider>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </TodoProvider>
    </AuthProvider>
  );
}

export default App;
