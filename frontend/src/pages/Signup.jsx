import Validation from '../Validations/signupValidation';
import { formatCpfCnpj } from "../Validations/signupValidation";
import { cleanCpfCnpj } from '../Validations/signupValidation';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Signup/signup.css';
import '../css/global.css';

function Signup() {
  const [isCPF, setIsCPF] = useState(false)
  const [values, setValues] = useState({
    user_nm: '',
    user_email: '',
    user_fn: '',
    user_pwd: '',
    user_cn: '',
    user_tp: '',
    ende_log: '',
    ende_num: '',
    ende_comp: '',
    ende_cida: '',
    ende_uf: '',
    ende_cep: '',
    ende_brr: '',
    user_pwd_confirm: '' //APENAS VALIDAÇÃO, NÃO ENTRA EM CONTATO COM O BANCO DE DADOS
  });
  
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  
  useEffect(() => { //Quando a pesssoa se cadastrar ser redirecionada a home
    if (localStorage.getItem("token")) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => { //Verifica se a pessoa é CPF ou CNPJ e muda os campos no cadastro
    if (values.user_tp === '1'){
      setIsCPF(true);
    } else if (values.user_tp === '2'){
      setIsCPF(false);
    } else {
      setIsCPF(null); 
    }
  }, [values.user_tp])

  const handleInput = (event) => {
    const { name, value } = event.target;
    let formattedValue = value;

    if (name === 'user_cn') {
      formattedValue = formatCpfCnpj(value); // Aplica a máscara CPF/CNPJ
    }

    setValues(prev => ({ ...prev, [name]: formattedValue }));
    
    const fieldError = Validation({ ...values, [name]: formattedValue })[name];
    setErrors(prevErrors => ({ ...prevErrors, [name]: fieldError }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    console.log("Submitting form", values); //adicionado para debug
    if (Object.keys(validationErrors).length === 0) {
      console.log("No errors, sending POST request") //adicionado para debug
      const user_cn_limpo = cleanCpfCnpj(values.user_cn);

      axios.post('http://localhost:8081/signup', {
        ...values,
        user_cn: user_cn_limpo
      })
        .then((res) => {
          console.log("Response from server", res) //adicionado para debug
          navigate('/login');
        })
        .catch(err => console.log("Error from server:", err));
    } else {
      console.log("Validation errors:", validationErrors); //adicionado para debug
    }
  };

  return (
    <div className='container' id='container'>
      <h1 className='h1-Title'>Cadastro de conta</h1>
      <div className='form-container-signup'>
        <form onSubmit={handleSubmit}>
          <div className='container-for-div'>
            <div className='personalData'>
              <h1 className='h1-subTitle'>Dados pessoais</h1>

              <div className='form-field'>
                <label htmlFor="user_tp">Tipo de cadastro:</label>
                <select name="user_tp" id="signup-user_tp" onChange={handleInput}>
                  <option>Selecione</option>
                  <option value="1" id='1'>Pessoa Física</option>
                  <option value="2" id='2'>Pessoa Jurídica</option>
                </select>
                {errors.user_tp && <span className='text-danger'>{errors.user_tp}</span>}
              </div>

              <div className='form-field'>
              {isCPF === null ? (
                  <>
                    <label htmlFor="user_nm">Nome/Razão Social:</label>
                    <input type="text" id='signup-user_nm' placeholder="Selecione PF ou PJ acima" readOnly value={""}/>
                  </>
              ) : !isCPF ? (
                  <>
                    <label htmlFor="user_nm">Razão Social:</label>
                    <input type="text" id='signup-user_nm' name='user_nm' onChange={handleInput} value={values.user_nm} />
                    {errors.user_nm && <span className='text-danger'>{errors.user_nm}</span>}
                  </>
                ) : (
                  <>
                    <label htmlFor="user_nm">Nome:</label>
                    <input type="text" id='signup-user_nm' name='user_nm' onChange={handleInput} value={values.user_nm} />
                    {errors.user_nm && <span className='text-danger'>{errors.user_nm}</span>}
                  </>
                )}
              </div>

              <div className='form-field'>
                {isCPF === null ? (
                  <>
                    <label htmlFor="user_cn">CPF/CNPJ:</label>
                    <input type="text" id='signup-user_cn' placeholder="Selecione PF ou PJ acima" readOnly value={""}/>
                  </>
                ) : !isCPF ? (
                  <>
                    <label htmlFor="user_cn">CNPJ:</label>
                    <input type="text" id='signup-user_cn' name='user_cn' onChange={handleInput} value={values.user_cn}/>
                    {errors.user_cn && <span className='text-danger'>{errors.user_cn}</span>}
                  </>
                ) : (
                  <>
                    <label htmlFor="user_cn">CPF:</label>
                    <input type="text" id='signup-user_cn' name='user_cn' onChange={handleInput} value={values.user_cn}/>
                    {errors.user_cn && <span className='text-danger'>{errors.user_cn}</span>}
                  </>
                )}
              </div>

              <div className='form-field'>
                  <label htmlFor="user_fn">Tel./Celular:</label>
                  <input type="tel" id='signup-user_fn' name='user_fn' onChange={handleInput}/>
                  {errors.user_fn && <span className='text-danger'>{errors.user_fn}</span>}
              </div>
            </div>

            <div className='addressData'>
              <h1 className='h1-subTitle'>Endereço</h1>
              <div className='form-field'>
                <label htmlFor="ende_log">Logradouro:</label>
                <input type="text" id='signup-ende_log' name='ende_log' onChange={handleInput}/>
                {errors.ende_log && <span className='text-danger'>{errors.ende_log}</span>}

                <label htmlFor="ende_num">Número:</label>
                <input type="text" id='signup-ende_num' placeholder="(opcional)" name='ende_num' onChange={handleInput}/>
                {errors.ende_num && <span className='text-danger'>{errors.ende_num}</span>}

                <label htmlFor="ende_comp">Complemento:</label>
                <input type="text" id='signup-ende_comp' placeholder="(opcional)" name='ende_comp' onChange={handleInput}/>
                {errors.ende_comp && <span className='text-danger'>{errors.ende_comp}</span>}

                <label htmlFor="ende_brr">Bairro:</label>
                <input type="text" id='signup-ende_brr' name='ende_brr' onChange={handleInput} />
                {errors.ende_brr && <span className='text-danger'>{errors.ende_brr}</span>}

                <label htmlFor="ende_cep">CEP:</label>
                <input type="text" id='signup-ende_cep' name='ende_cep' onChange={handleInput} />
                {errors.ende_cep && <span className='text-danger'>{errors.ende_cep}</span>}

                <label htmlFor="ende_uf">Estado:</label>
                <input type="text" id='signup-ende_uf' name='ende_uf' placeholder='UF' onChange={handleInput} />
                {errors.ende_uf && <span className='text-danger'>{errors.ende_uf}</span>}

                <label htmlFor="ende_cida">Cidade:</label>
                <input type="text" id='signup-ende_cida' name='ende_cida' onChange={handleInput} />
                {errors.ende_cida && <span className='text-danger'>{errors.ende_cida}</span>}
              </div>
            </div>

            <div className='accountData'>
              <h1 className='h1-subTitle'>Dados da conta</h1>

              <div className='form-field'>
                <label htmlFor="user_email">E-mail:</label>
                <input type="email" id='signup-user_email' name='user_email' onChange={handleInput}/>
                {errors.user_email && <span className='text-danger'>{errors.user_email}</span>}
              </div>

              <div className='form-field'>
                <label htmlFor="signup-user_pwd">Senha:</label>
                <input type="password" id='signup-user_pwd' name='user_pwd' onChange={handleInput}/>
                {errors.user_pwd && <span className='text-danger'>{errors.user_pwd}</span>}
              </div>
              
              <div className='form-field'>
                <label htmlFor="signup-user_pwd_confirm">Confirmar a senha:</label>
                <input type="password" id='signup-user_pwd_confirm' name='user_pwd_confirm' onChange={handleInput}/>
                {errors.user_pwd_confirm && <span className='text-danger'>{errors.user_pwd_confirm}</span>}
              </div>
            </div>
          </div>

          <button type='submit' className='btn-successful' id='btn btn-sucess'>Cadastrar</button>
        </form>
      </div>
    </div>
  );
} 

export default Signup;