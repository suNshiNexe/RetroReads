import Validation from '../Validations/loginValidation';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Login/login.css';
import '../css/global.css';


function Login() {
  const [values, setValues] = useState({
    user_email: '',
    user_pwd: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Verifica se o usuário já está logado e redireciona quando vai para o login
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate('/');
    }
  }, [navigate]);

  const handleInput = (event) => {
    const { name, value } = event.target;
    // Atualiza o valor do campo específico em 'values'
    setValues(prev => ({ ...prev, [name]: value }));
    // Validação apenas do campo atual
    const fieldError = Validation({ ...values, [name]: value })[name];
    // Atualiza o erro somente do campo em que o usuário está escrevendo
    setErrors(prevErrors => ({ ...prevErrors, [name]: fieldError }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Realiza a validação e armazena os erros
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    // Se não houver erros de validação, faz a requisição POST (login)
    if (!validationErrors.user_email && !validationErrors.user_pwd) {
      axios.post('http://localhost:8081/login', values)
        .then(res => {
          console.log("Resposta do backend:", res.data);
          if (res.data.token && res.data.user) {

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user_id", res.data.user.id);
            localStorage.setItem("user_name", res.data.user.name);
            localStorage.setItem("user_email", res.data.user.email);
            navigate('/'); // Redireciona para a página inicial
          } else {
            alert("Conta não existente ou dados incorretos.");
          }
        })
        .catch(err => {
          console.error("Erro no login:", err);
          alert("Erro ao tentar fazer login.");
        });
    } else {
      console.log("Erros de validação: ", validationErrors);
    }
  };

  return (
    <div className='container' id='container'>
      <div className='titleAndSignup'>
        <h1 className='h1-title'>Login</h1>
        <Link to='/signup' className='btn-default'>Ainda não tenho conta ➔</Link>
      </div>

      <div className='form-container-login'>

        <form onSubmit={handleSubmit} >
          <h1 className='h1-subTitle'>Dados da conta</h1>
          <div className='form-field'>
            <label htmlFor="user_email">E-mail:</label>
            <input type="email" id='login-user_email' placeholder="Digite seu e-mail" name='user_email' onChange={handleInput} />
            {errors.user_email && <span className='text-danger'>{errors.user_email}</span>}
          </div>

          <div className='form-field'>
            <label htmlFor="user_pwd">Senha:</label>
            <input type="password" id='login-user_pwd' placeholder="Digite sua senha" name='user_pwd' onChange={handleInput} />
            {errors.user_pwd && <span className='text-danger'>{errors.user_pwd}</span>}
          </div>

          <div className='forgotPassword-container'>
            <Link to="#" className='forgotPassword'>Esqueci minha senha ➔</Link>
          </div>

          <button type='submit' className='btn-Success'>Realizar login</button>
        </form>
      </div>
    </div>
  )
}

//Lougout do usuário
function logout() {
  if (localStorage.getItem("token")) {
    localStorage.removeItem("token");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_email");
    window.location.href = 'http://localhost:3000/Login'
  }
}

export { logout };
export default Login;