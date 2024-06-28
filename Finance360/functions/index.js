/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const https = require("https");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

const fetchHistoricalChartData = (symbol, from, to) => {
  const KEY = "zuhVrxezRiRVgIYA2xt6XezbDreLv47a";
  const PATH = `/api/v3/historical-chart/5min/${symbol}?`+
   `from=${from}&to=${to}&apikey=${KEY}`;
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "financialmodelingprep.com",
      port: 443,
      path: PATH,
      method: "GET",
    };

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        resolve(data);
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.end();
  });
};

// Firebase function to fetch historical chart data
exports.getHistoricalChartData = onRequest(async (request, response) => {
  logger.info("Fetching historical chart data", {structuredData: true});

  const {symbol, from, to} = request.query;

  if (!symbol || !from || !to) {
    response.status(400).send("Missing required parameters: symbol, from, to");
    return;
  }

  try {
    const data = await fetchHistoricalChartData(symbol, from, to);
    response.status(200).send(data);
  } catch (error) {
    logger.error("Error fetching historical chart data:", error);
    response.status(500).send("Error fetching historical chart data");
  }
});

const fetchStockData = (symbol) => {
  return new Promise((resolve, reject) => {
    const KEY = "zuhVrxezRiRVgIYA2xt6XezbDreLv47a";
    const options = {
      hostname: "financialmodelingprep.com",
      port: 443,
      path: `/api/v3/quote/${symbol}?apikey=${KEY}`,
      method: "GET",
    };

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        resolve(data);
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.end();
  });
};

exports.getStockData = onRequest(async (request, response) => {
  logger.info("Fetching stock data", {structuredData: true});

  const {symbol} = request.query;

  if (!symbol) {
    response.status(400).send("Missing required query parameter: symbol");
    return;
  }

  try {
    const data = await fetchStockData(symbol);
    response.status(200).send(data);
  } catch (error) {
    logger.error("Error fetching stock data:", error);
    response.status(500).send("Error fetching stock data");
  }
});


const fetchFinancialNews = () => {
  const KEY = "b4ee4af9b9c64710be2504dbceaeb049";
  const PATH = `/v2/everything?q=finance&apiKey=${KEY}`;
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "newsapi.org",
      port: 443,
      path: PATH,
      method: "GET",
    };

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        resolve(data);
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.end();
  });
};

// Firebase function to fetch financial news
exports.getFinancialNews = onRequest(async (request, response) => {
  logger.info("Fetching financial news", {structuredData: true});

  try {
    const data = await fetchFinancialNews();
    response.status(200).send(data);
  } catch (error) {
    logger.error("Error fetching financial news:", error);
    response.status(500).send("Error fetching financial news");
  }
});

