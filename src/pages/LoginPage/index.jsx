import React, { useState, useContext } from "react";

import "./styles.css";
import { AuthContext } from "../../contexts/auth";

/*Para usar as informações que estão no contexto na LoginPage como login e logout, se está autenticado ou não, basta importar o useContext da biblioteca "react" e também o { AuthContext } */
const LoginPage = () => {

  /*Agora faço o desmonte daquilo que eu estou interessado:*/
  const { authenticated, login } = useContext(AuthContext);

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  /*A função handlesubmit é que vai mandar as informações para a API o método de autenticação. Esse método de
  autenticação vai verificar, se tudo tiver certo manda para a rota principal e deixa a informação de usuário
  disponível para qualquer parte do sistema através de contextos.
  */
  const handlesubmit = (e) => {
    e.preventDefault();
    console.log('submit', { email, password });

    login(email,password); //Integração com o meu contexto / API
  }

  return (
    <div id="login">
      <h1 className="title">Login do sistema</h1>
      <p>{String(authenticated)}</p>
      <form className="form" onSubmit={handlesubmit}> 
        <div className="field">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" 
          value={email} onChange={ (e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="password">Senha</label>
          <input type="password" name="password" id="password"
          value={password} onChange={ (e) => setPassword(e.target.value)}
          />
        </div>
        <div className="actions">
          <button type="submit">Entrar</button>
        </div>
        </form>
    </div>
  );
}

export default LoginPage;