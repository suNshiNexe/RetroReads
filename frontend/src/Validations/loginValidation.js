function Validation(values){
   let error = {}

    // Padrões para validação
   const user_email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   const user_pwd_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/

   // Validação do e-mail
   if(values.user_email === ""){
        error.user_email = "Insira seu e-mail"
   }
   else if(!user_email_pattern.test(values.user_email)){
        error.user_email = "Digite um e-mail válido";
   }

   // Validação da senha
   if(values.user_pwd === ""){
        error.user_pwd = "Insira sua senha"
   }else if(!user_pwd_pattern.test(values.user_pwd)){
        error.user_pwd = "A senha deve conter no mínimo 8 caracteres"
   }
   return error;
}

export default Validation;