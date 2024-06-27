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
const axios = require("axios");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});


exports.getStockPrice = onRequest(async (request, response) => {
  logger.info("Fetching stock price", {structuredData: true});

  try {
    const {symbol} = request.query;
    if (!symbol) {
      response.status(400).send("Symbol query parameter is required");
      return;
    }

    const apiUrl = "https://financialmodelingprep.com/api/v3/stock/real-time-price/${symbol}?apikey=${apiKey}";
    const apiResponse = await axios.get(apiUrl);
    const stockPrice = apiResponse.data.price;

    response.status(200).json({price: stockPrice});
  } catch (error) {
    logger.error("Error fetching stock pric", {error: error.message});
    response.status(500).json({error: error.message});
  }
});
