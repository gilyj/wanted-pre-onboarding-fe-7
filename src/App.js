import './App.css';
import { Route, Routes } from 'react-router-dom';

import AuthProvider from './lib/context/AuthContext';


import Auth from './pages/auth/Auth';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Auth />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
