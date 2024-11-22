function Validation(values) { //Validações de erro
    let error = {}
  
    // Padrões para validação
    const user_email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const user_pwd_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    const user_nm_pattern = /^[a-zA-ZÀ-ÿ' -]{3,80}$/
    const user_fn_pattern = /^\(?([14689][1-9]|2[12478]|3[1-578]|5[1345]|7[134579])\)? ?9?[2-9][0-9]{3}-?[0-9]{4}$/
    const ende_log_pattern = /^[A-Za-zÀ-ú\s,\.]+$/
    const ende_num_pattern = /^\d+[A-Za-z0-9\-\/]*$/
    const ende_comp_pattern = /^[A-Za-zÀ-ú0-9\s\-\/,\.]*$/;
    const ende_brr_pattern = /^[A-Za-zÀ-ú\s]+$/;
    const ende_cep_pattern = /^\d{5}-?\d{3}$/
    const ende_cida_pattern = /^[A-Za-zÀ-ú\s]+$/
    const user_cn_cpf_pattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/;
    const user_cn_cnpj_pattern = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$|^\d{14}$/;
    const validStates = [
      "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", 
      "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", 
      "SP", "SE", "TO"
    ]

    // Validação do select
    if(values.user_tp === ""){
      error.user_tp = "Obrigatório"
    }else if(values.user_tp === "Selecione"){
      error.user_tp = "Selecione se você é CPF ou CNPJ"
    }

    // Validação do nome
    if (values.user_nm === "") {
      error.user_nm = "Insira seu nome"
    } else if (!user_nm_pattern.test(values.user_nm)) {
      error.user_nm = "Nome inválido"
    }

    // Validação do CPF/CNPJ
    if (values.user_cn === "") {
      error.user_cn = "Digite seu CPF/CNPJ";
    } else if (values.user_tp === "1") {
      // Se o usuário selecionou CPF, verifica se o formato é de CPF
      if (!user_cn_cpf_pattern.test(values.user_cn) || !validateCPF(values.user_cn)) {
        error.user_cn = "CPF inválido";
      }
    } else if (values.user_tp === "2") {
      // Se o usuário selecionou CNPJ, verifica se o formato é de CNPJ
      if (!user_cn_cnpj_pattern.test(values.user_cn) || !validateCNPJ(values.user_cn)) {
        error.user_cn = "CNPJ inválido";
      }
    } else {
      error.user_cn = "Insira um CPF ou CNPJ válido";
    }
    
    // Função para validar CPF
    function validateCPF(cpf) {
      cpf = cpf.replace(/\D/g, "") // Remove caracteres não numéricos
  
      // Verifica se o CPF tem 11 dígitos ou se todos os números são iguais
      if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false
      }
  
      // Valida os dois dígitos verificadores
      let sum = 0
      let remainder
      for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i)
      }
      remainder = (sum * 10) % 11
      if (remainder === 10 || remainder === 11) remainder = 0
      if (remainder !== parseInt(cpf.substring(9, 10))) return false
  
      sum = 0
      for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i)
      }
      remainder = (sum * 10) % 11
      if (remainder === 10 || remainder === 11) remainder = 0
      if (remainder !== parseInt(cpf.substring(10, 11))) return false
  
      return true
    }
  
    // Função para validar CNPJ
    function validateCNPJ(cnpj) {
      cnpj = cnpj.replace(/\D/g, "") // Remove caracteres não numéricos
  
      // Verifica se o CNPJ tem 14 dígitos ou se todos os números são iguais
      if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
        return false
      }
  
      // Valida os dois dígitos verificadores
      let length = cnpj.length - 2
      let numbers = cnpj.substring(0, length)
      let digits = cnpj.substring(length)
      let sum = 0
      let pos = length - 7
  
      for (let i = length; i >= 1; i--) {
        sum += numbers.charAt(length - i) * pos--
        if (pos < 2) pos = 9
      }
      let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
      if (result !== parseInt(digits.charAt(0))) return false
  
      length++
      numbers = cnpj.substring(0, length)
      sum = 0
      pos = length - 7
  
      for (let i = length; i >= 1; i--) {
        sum += numbers.charAt(length - i) * pos--
        if (pos < 2) pos = 9
      }
      result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
      if (result !== parseInt(digits.charAt(1))) return false
  
      return true
    }
  
    // Validação do tel/cel
    if (values.user_fn === "") {
      error.user_fn = "Insira seu número de tel./celular"
    } else if (!user_fn_pattern.test(values.user_fn)) {
      error.user_fn = "DD ou número de tel./celular inválido"
    }
  
    // Validação do e-mail
    if (values.user_email === "") {
      error.user_email = "Insira seu e-mail"
    } else if (!user_email_pattern.test(values.user_email)) {
      error.user_email = "E-mail inválido"
    }
  
    // Validação da senha
    if (values.user_pwd === "") {
      error.user_pwd = "Insira sua senha"
    } else if (!user_pwd_pattern.test(values.user_pwd)) {
      error.user_pwd = <div id="text_danger_user_pwd"><p>A senha deve conter pelo menos:</p>
        <ul>
          <li>Mínimo de 8 caracteres;</li>
          <li>Uma letra maiúscula;</li>
          <li>Uma letra minúscula;</li>
          <li>Um caractere especial ($,#,@,!, etc);</li>
          <li>Um número;</li>
        </ul>
      </div>
    }
    
    // Validação de confirmação de senha
    if (values.user_pwd_confirm === "") {
      error.user_pwd_confirm = "Confirme sua senha";
    } else if (values.user_pwd !== values.user_pwd_confirm) {
      error.user_pwd_confirm = "As senhas não coincidem";
    }

    // Validação do logradouro
    if (values.ende_log === "") {
      error.ende_log = "Insira seu endereço"
    } else if (!ende_log_pattern.test(values.ende_log)) {
      error.ende_log = "Endereço inválido"
    }
  
    // Validação do número (opcional)
    if (values.ende_num && !ende_num_pattern.test(values.ende_num)) {
      error.ende_num = "Número inválido";
    }
    
    // Validação do complemento (opcional)
    if (values.ende_comp && !ende_comp_pattern.test(values.ende_comp)) {
      error.ende_comp = "Complemento inválido";
    }

    // Validação do Bairro
    if (values.ende_brr === "") {
      error.ende_brr = "Insira seu bairro";
    } else if (!ende_brr_pattern.test(values.ende_brr)) {
        error.ende_brr = "Bairro inválido";
    }

    // Validação do CEP
    if (values.ende_cep === "") {
      error.ende_cep = "Insira seu CEP"
    } else if (!ende_cep_pattern.test(values.ende_cep)) {
      error.ende_cep = "CEP inválido"
    }
    
    // Validaçao do Estado
    if (values.ende_uf === "") {
      error.ende_uf = "Insira seu estado"
    } else if (!validStates.includes(values.ende_uf.toUpperCase())) {
      error.ende_uf = "Estado inválido"
    }

    // Validação da cidade
    if (values.ende_cida === "") {
      error.ende_cida = "Insira sua cidade"
    } else if (!ende_cida_pattern.test(values.ende_cida)) {
      error.ende_cida = "Cidade inválida"
    }
  
    return error
  }
  
  
  function formatCpfCnpj (value) { //MASCARÁ PARA CPF E CNPJ
    value = value.replace(/\D/g, ""); 
    if (value.length <= 11) {
      // Formata como CPF: 000.000.000-00
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else {
      // Formata como CNPJ: 00.000.000/0000-00
      return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    }
  };


  function cleanCpfCnpj(user_cn) { // Remove qualquer caractere que não seja número
    return user_cn.replace(/\D/g, ''); 
  }

  export { formatCpfCnpj };
  export { cleanCpfCnpj };
  export default Validation;