import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useContext } from 'react';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

import { AuthProvider, AuthContext } from './contexts/auth';

/* O AuthContext.Provider também precisa ser inicializado com alguns parâmetros,
os valores que eu desejo armazenar. Nesse caso os valores que eu quero armazenar são: 1)Se o usuário está autenticado ou não, 2) Qual é esse usuário, 3) Os métodos de login e logaut. 

Por hora os values do Provider estarão fixos, só para perceber como consigo consultar esses valores.
*/
const AppRoutes = () => {

  /*Vamos puxar a informação se ele está autenticado ou não. Se ele estiver autenticado retorna o children, se não tiver eu mando ele para onde deveria estar que é o /login */
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);

    if(loading){
      return <div className="loading">Carregando...</div>
    }

    if(!authenticated){
      return <Navigate to="/login" />
    }

    return children;
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/login" element={<LoginPage />}></Route>
          <Route exact path="/" element={<Private> <HomePage /> </Private>}></Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default AppRoutes;