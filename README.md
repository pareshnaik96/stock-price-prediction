# Stock Price Prediction

The project consists of building a demo full stack application that predicts the price of a stock in real time and displays it to the user.

### Key points
- Created microservice for computing the averages. Then the API server should interact with in order to receive the prediction data.
- The app serve a front-end panel which displays charts of Meta, Google and Apple stock price of the last 365 days (used public stock API, e.g. https://finance.yahoo.com/quote/fb/history?ltr=1 ) and a five-days price forecast.


### GET /api/stock/:symbol
- Returns all stocks price of the last 365 days. 
- Return the HTTP status 200 if stock price are found.
- Filter stock price list by applying filters. Query param can have filter.
  By symbol e.g. META, GOOG, AAPL, AMZN, TSLA

### GET /predictedStock/:symbol
- Returns predicted stocks price of five-days. 
- Return the HTTP status 200 if the forecast successfull.
- Show the forecast price by applying filter in Query params.
  By symbol e.g. META, GOOG, AAPL, AMZN, TSLA
