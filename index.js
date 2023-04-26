const express = require('express');
const app = express();

// Função de validação de CPF (https://www.macoratti.net/alg_cpf.htm)

// A validação do Primeiro Digito multiplicamos cada um dos números, da direita para a esquerda por números crescentes a partir do número 2
function validarPrimeiroDigito(cpf) {
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += cpf[i] * (10 - i);
  }
  const resto = (sum * 10) % 11;
  if (resto < 10) {
    return cpf[9] == resto;
  }
  return cpf[9] == 0;
}
// A Validação do Segundo Digito 
function validarSegundoDigito(cpf) {
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += cpf[i] * (11 - i);
  }
  const resto = (sum * 10) % 11;
  if (resto < 10) {
    return cpf[10] == resto;
  }
  return cpf[10] == 0;
}


function validarRepetido(cpf) {
  const primeiro = cpf[0];
  let diferente = false;
  for(let i = 1; i < cpf.length; i++) {
    if(cpf[i] != primeiro) {
      diferente = true;
    }
  }
  return diferente;
}
// Se o numero de gitos for maior que 11
function validarCpf(cpf) {
  if (cpf.length != 11) {
    return false;
  }
//   Se for repetido
  if(!validarRepetido(cpf)) {
    return false;
  }
//   Se regra do primeiro digito não for verdadeira
  if (!validarPrimeiroDigito(cpf)) {
    return false;
  }
//   Se regra do Segundo digito não for verdadeira
  if (!validarSegundoDigito(cpf)) {
    return false;
  }
  return true;
}


const cpf = "37873528804".split("").map((e) => parseInt(e));

const cpfValido = validarCpf(cpf);

// console.log(cpfValido);

app.get('/validar-cpf/:cpf', (req, res) => {
  const cpf = req.params.cpf.split("").map((e) => parseInt(e));
  const cpfValido = validarCpf(cpf);
  res.json({ cpfValido });
});

app.listen(3009, () => {
  console.log('Servidor iniciado na porta 3000');
});

