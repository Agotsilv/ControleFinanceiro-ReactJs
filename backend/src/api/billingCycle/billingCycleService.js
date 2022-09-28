const BillingCycle = require("./billingCycle.js");

// importação do erro em array
const errorHandler = require("../common/errorHandle");

BillingCycle.methods(["get", "post", "put", "delete"]);
BillingCycle.updateOptions({ new: true, runValidators: true });

//APLICAÇÃO DO ERRO NO ERROHANDLER E FAZ A CONVERSÃO DE ERROS PADRINIZADAS
BillingCycle.after("post", errorHandler).after("put", errorHandler);

// Basicamente, o código abaixo está definindo como uma chamada get, em /api/billingCycles deve se comportar.
// Dentro da função, estamos apenas fazendo um find sem passar nenhum parâmetro.
// Dessa forma, o mongoose busca todos os registros na coleção BillingCycles de forma indiscriminada.
// Caso a consulta não produza nenhum erro, na resposta retornamos os documentos. Caso contrário, retornamos um Status
// Code 500 e a mensagem de erro proveniente do banco de dados.

BillingCycle.route("get", (req, res, next) => {
  BillingCycle.find({}, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      res.status(500).json({ errors: [error] });
    }
  });
})

//COUNT MOSTRA A QUANTIDADE DE "POSTS" CONTIDOS PELO USUÁRIO
BillingCycle.route("count", (req, res, next) => {
  BillingCycle.count((error, value) => {
    if (error) {
      res.status(500).json({ errors: [error] });
    } else {
      res.json({ value });
    }
  });
});

//MOSTRAR O TOTAL CREDITO E DEBITO NO SISTEMA
BillingCycle.route("summary", (req, res, next) => {
  BillingCycle.aggregate(
    [
      {
        $project: {
          credit: { $sum: "$credits.value" },
          debt: { $sum: "$debts.value" },
        },
      },
      {
        $group: {
          _id: null,
          credit: { $sum: "$credit" },
          debt: { $sum: "$debt" },
        },
      },
      {
        $project: { _id: 0, credit: 1, debt: 1 },
      },
    ],
    (error, result) => {
      if (error) {
        res.status(500).json({ errors: [error] });
      } else {
        res.json(result[0] || { credit: 0, debt: 0 });
      }
    }
  );
});

module.exports = BillingCycle;
