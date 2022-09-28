const express = require("express");

module.exports = function (server) {

  // AQUI DEFINIREMOS A URL BASE PARA TODAS AS ROTAS
  const router = express.Router();
  server.use("/api", router)

  //AQUI INICIAREMOS AS ROTAS PARA O CICLO DE PAGAMENTO
  const BillingCycle = require("../api/billingCycle/billingCycleService")
  BillingCycle.register(router, "/billingCycles")
};
