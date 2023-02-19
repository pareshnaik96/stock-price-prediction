const axios = require('axios');


const stock = async (req, res) => {
  const symbol = req.params.symbol
  const interval = "1mo"
  const range = "1y"
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?&interval=${interval}&range=${range}`;

  try {
    const response = await axios.get(url);
    const stock = response.data.chart.result[0].indicators.quote[0].close;
    const stockData = stock.slice(0,12)

    return res.send({stock:stockData});

  } catch (error) {
    console.error(error);
    return res.status(500).send('Error fetching stock data');
  }
};


const predictedStock = async (req, res) => {
  const symbol = req.params.symbol;
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`;

  try {
    const response = await axios.get(url);
    const stockData = response.data.chart.result[0].indicators.quote[0].close;

    // Predicted data for the next 5 days
    const predictedData = [];
    const lastFiveDays = stockData.slice(stockData.length - 5);

    for (let i = 0; i < 5; i++) {
        // Calculate the predicted value based on the previous 5 days' data
        const predictedValue = lastFiveDays.reduce((sum, lastFiveDays) => sum + lastFiveDays, 0) / lastFiveDays.length;
        
        // Add the predicted value to the array of predicted data
        predictedData.push(predictedValue);
        
        // Shift the previous 5th days' data to the left and add the predicted value to the end
        lastFiveDays.shift();
        lastFiveDays.push(predictedValue);
    }
    return res.send({predicted:predictedData});

  } catch (error) {
    console.error(error);
    return res.status(500).send('Error fetching stock data');
  }
};


module.exports.stock = stock
module.exports.predictedStock = predictedStock













