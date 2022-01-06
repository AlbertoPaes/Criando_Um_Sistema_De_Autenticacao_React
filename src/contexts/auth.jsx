import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router';

/*No momento que eu faço o que está abaixo ele cria o contexto. O contexto é como
se fosse uma área reservada do sistema, uma memória central que ele vai deixar disponível para gravar certas informações. São informações que a conotação delas indicam que elas precisam ser globais. 

Por exemplo, um usuário é global eu preciso deixar ele disponível em todo o meu sistema. Se não por exemplo não consigo pegar o id do usuário.
*/

/*Colocarei as regras de Login aqui também no auth*/

/*O authenticated vai ser um parâmetro que vai trabalhar como true ou false. Então precisamos trabalhar com:
user != null então authenticated = true
user === null então autenticated = false

Para fazer essa conversão acima existem várias formas de fazer, como usando casting: Boolean(user). Mas faremos de uma outra forma usando !!user que é a mesma coisa.

Depois de fazer: <AuthContext.Provider value= { {authenticated: !!user, user, login, logout } }>
tenho as informações sendo compartilhadas de usuário, login e logout.
*/

export const AuthContext = createContext();

/*Com o children ele passa a exibir o conteúdo dos filhos dele*/

export const AuthProvider = ( {children} ) => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    const recoveredUser = localStorage.getItem('user');

    if(recoveredUser){
      setUser(JSON.parse(recoveredUser));
    }

    setLoading(false);
  }, [])
  
  /*Essa é a função que vai receber do login essas duas informações abaixo como parâmetro */
  const login = (email,password) => {
    console.log( "login auth", { email, password });

    //Uma vez tendo a informação de email e password eu deveria ir numa API e criar uma section. Depois essa API vai retornar um usuário que terá o nosso id e o nosso email. Por enquanto vamos simular isso depois colocar a API.

    /* Isso seria a resposta da minha section */
    const loggedUser = {
      id: '123',
      email
    }

    localStorage.setItem("user", JSON.stringify(loggedUser));


    if(password==="secret"){
      setUser(loggedUser);
      navigate("/");
    }
  }

  const logout = () => {
    console.log("logout"); 
    setUser(null);
    localStorage.remove("user");
    navigate("/login");
  }

  return (
    <AuthContext.Provider value= { {authenticated: !!user, user, loading, login, logout } }>
      {children}
    </AuthContext.Provider>
  );
} 