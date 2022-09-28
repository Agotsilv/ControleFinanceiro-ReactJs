//TRATAMENTO DE ERRO EM ARRAYS PARA QUE APAREÇA SOMENTE OS ERROS
//PROPOSTOS NO RESTFULL
const _ = require("lodash");

// RETORNO DE REQUISIÇÃO, RESPOSTA E NEXT
module.exports = (req, res, next) => {
  //PEGA MENSAGEM PADRÃO DO NODE RESTFUL
  const bundle = res.locals.bundle;

  // PARSE PARA PODER RETIRAR AS STRING E RETORNAR APENAS A STRING ERRORS
  if (bundle.errors) {
    const errors = parseErrors(bundle.errors);
    res.status(500).json({ errors });
  } else {
    next();
  }
};

const parseErrors = (nodeRestfulErrors) => {
  const errors = [];
  _.forIn(nodeRestfulErrors, (error) => errors.push(error.message));
  return errors;
};
