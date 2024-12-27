const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

let stocks = [
  {
    id: 1,
    name: 'reliance industries',
    price: 2500,
    growth: 3.5,
    industry: 'finance',
    exchange: 'nse',
  },
  {
    id: 2,
    name: 'hdfc bank',
    price: 1800,
    growth: 4.2,
    industry: 'finance',
    exchange: 'bse',
  },
  {
    id: 3,
    name: 'icici bank',
    price: 1600,
    growth: 5.1,
    industry: 'finance',
    exchange: 'nse',
  },
  {
    id: 4,
    name: 'tata consultancy services',
    price: 3200,
    growth: 2.9,
    industry: 'finance',
    exchange: 'bse',
    price: 1900,
  },
  {
    id: 5,
    name: 'infosys',
    price: 2900,
    growth: 3.8,
    industry: 'finance',
    exchange: 'nse',
  },
  {
    id: 6,
    name: "dr. reddy's laboratories",
    price: 2100,
    growth: 4.7,
    industry: 'pharma',
    exchange: 'bse',
  },
  {
    id: 7,
    name: 'sun pharmaceutical',
    price: 2300,
    growth: 3.2,
    industry: 'pharma',
    exchange: 'nse',
  },
  {
    id: 8,
    name: 'cipla',
    growth: 2.6,
    price: 2100,
    exchange: 'bse',
    industry: 'pharma',
  },
  {
    id: 9,
    name: 'ntpc',
    price: 1200,
    growth: 4.1,
    industry: 'power',
    exchange: 'nse',
  },
  {
    id: 10,
    name: 'power grid corporation',
    price: 1500,
    growth: 3.4,
    industry: 'power',
    exchange: 'bse',
  },
  {
    id: 11,
    name: 'adani power',
    price: 2200,
    growth: 5.3,
    industry: 'power',
    exchange: 'nse',
  },
  {
    id: 12,
    name: 'lupin',
    price: 2000,
    growth: 4.5,
    industry: 'pharma',
    exchange: 'bse',
  },
  {
    id: 13,
    name: 'axis bank',
    price: 1750,
    growth: 2.8,
    industry: 'finance',
    exchange: 'nse',
  },
  {
    id: 14,
    name: 'state bank of india',
    price: 1450,
    growth: 3.6,
    industry: 'finance',
    exchange: 'bse',
  },
  {
    id: 15,
    name: 'bajaj finance',
    price: 2650,
    growth: -2.9,
    industry: 'finance',
    exchange: 'nse',
  },
  {
    id: 16,
    name: "dr. reddy's laboratories",
    price: 1950,
    growth: 4.3,
    industry: 'pharma',
    exchange: 'bse',
  },
  {
    id: 17,
    name: 'biocon',
    price: 1850,
    growth: 3.9,
    industry: 'pharma',
    exchange: 'nse',
  },
  {
    id: 18,
    name: 'torrent power',
    price: 1600,
    growth: 2.4,
    industry: 'power',
    exchange: 'bse',
  },
  {
    id: 19,
    name: 'tata power',
    price: 1750,
    growth: 4.0,
    industry: 'power',
    exchange: 'nse',
  },
  {
    id: 20,
    name: 'jsw energy',
    price: 1450,
    growth: 3.1,
    industry: 'power',
    exchange: 'bse',
  },
];

// Given stock objects array, sort the stock objects in price, low-to-high (ascending order by price).
function sortByPriceLowToHigh(stock1, stock2) {
  return stock1.price - stock2.price;
}

// Given stock objects array, sort the stock objects in price, high-to-low (descending order by price).
function sortByPriceHighToLow(stock1, stock2) {
  return stock2.price - stock1.price;
}

// Given stock objects array, sort the stock objects by growth, low-to-high (ascending order by growth).
function sortByGrowthLowToHigh(stock1, stock2) {
  return stock1.growth - stock2.growth;
}

// Given stock objects array, sort the stock objects by growth, high-to-low (descending order by growth).
function sortByGrowthHighToLow(stock1, stock2) {
  return stock2.growth - stock1.growth;
}

// Given a stocks array element of type object and desired Stock Exchange(NSE or BSE) as arguments, check if exchange of stock object matches with the desired exchange.
function filterByExchange(eleObj, desiredExchange) {
  return eleObj.exchange.toLowerCase() === desiredExchange.toLowerCase();
}

// Given a stocks array element of type object and desired Stock Exchange(NSE or BSE) as arguments, check if exchange of stock object matches with the desired exchange.
function filterByIndustry(eleObj, desiredIndustry) {
  return eleObj.industry.toLowerCase() === desiredIndustry.toLowerCase();
}

// Endpoint 1: Sort stocks by pricing (ascending order by pricing)
app.get('/stocks/sort/pricing', (req, res) => {
  let pricingOrder = req.query.pricing;

  let sortedStocks = stocks.slice();

  if (pricingOrder === 'low-to-high') {
    sortedStocks.sort(sortByPriceLowToHigh);
  } else if (pricingOrder === 'high-to-low') {
    sortedStocks.sort(sortByPriceHighToLow);
  } else {
    console.log(`INVALID Pricing Order: ${pricingOrder}`);
  }

  res.json({ stocks: sortedStocks });
});

// Endpoint 2: Sort stocks by growth high-to-low (descending order by price)
app.get('/stocks/sort/growth', (req, res) => {
  let growthOrder = req.query.growth;

  let sortedStocks = stocks.slice();

  if (growthOrder === 'low-to-high') {
    sortedStocks.sort(sortByGrowthLowToHigh);
  } else if (growthOrder === 'high-to-low') {
    sortedStocks.sort(sortByGrowthHighToLow);
  } else {
    console.log(`INVALID Growth Order: ${growthOrder}`);
  }

  res.json({ stocks: sortedStocks });
});

// Endpoint 3: Given an array of stocks (each element is an object), return only the stocks having Exchange same as desired Exchange given as query param
app.get('/stocks/filter/exchange', (req, res) => {
  let desiredExchange = req.query.exchange;
  let sortedStocks = stocks.filter((eleObj) =>
    filterByExchange(eleObj, desiredExchange)
  );
  res.json({ stocks: sortedStocks });
});

// Endpoint 4: Given an array of stocks (each element is an object), return only the stocks having the same industrial sector as desired Industry given as query param
app.get('/stocks/filter/industry', (req, res) => {
  let desiredIndustry = req.query.industry;
  let sortedStocks = stocks.filter((eleObj) =>
    filterByIndustry(eleObj, desiredIndustry)
  );
  res.json({ stocks: sortedStocks });
});

// Endpoint 4: Given an array of stocks (each element is an object), return the array in original form
app.get('/stocks', (req, res) => {
  res.json({ stocks: stocks });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
