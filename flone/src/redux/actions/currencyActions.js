import axios from "axios";

// const API_KEY = "689b448ff02f2c1ac6c5087db77ebb13";
// const BASE_URL = `https://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`;

const API_KEY = process.env.REACT_APP_EXCHANGE_RATE_API_KEY;
const BASE_URL = process.env.REACT_APP_EXCHANGE_RATE_URL;

export const SET_CURRENCY = "SET_CURRENCY";
export const SET_CURRENCIES = "SET_CURRENCIES";

// Fallback rates with country data
const fallbackRates = {
  USD: { rate: 1, symbol: "$", country: "United States" },
  EUR: { rate: 0.85, symbol: "€", country: "Eurozone" },
  KES: { rate: 110.0, symbol: "KSh", country: "Kenya" },
  UGX: { rate: 3700.0, symbol: "USh", country: "Uganda" },
  TZS: { rate: 2300.0, symbol: "TSh", country: "Tanzania" },
  RWF: { rate: 1200.0, symbol: "FRw", country: "Rwanda" },
  BIF: { rate: 2070.0, symbol: "FBu", country: "Burundi" },
  ETB: { rate: 55.0, symbol: "Br", country: "Ethiopia" },
  SOS: { rate: 570.0, symbol: "Sh", country: "Somalia" },
  SDG: { rate: 700.0, symbol: "SDG", country: "Sudan" },
};

// Utility for fetching rates (with caching and fallback)
const fetchRates = async () => {
  try {
    // Fetch rates from external API
    const response = await axios.get(BASE_URL+`access_key=${API_KEY}`);
    const rates = response.data.rates;
    console.log(response);

    // Merge fetched rates with fallback data
    const mergedRates = Object.keys(fallbackRates).reduce((acc, currency) => {
      if (rates[currency]) {
        // If the rate is available from the API, update the rate and keep fallback symbol & country
        acc[currency] = {
          rate: rates[currency],
          symbol: fallbackRates[currency].symbol,
          country: fallbackRates[currency].country,
        };
      } else {
        // If no rate is available from the API, fall back to the fallback data
        acc[currency] = fallbackRates[currency];
      }
      return acc;
    }, {});
    return mergedRates;
  } catch (error) {
    // Silently handle the error and return fallback rates
    return fallbackRates;
  }
};

// Action to fetch currencies for East African countries
export const fetchCurrencies = () => {
  return async (dispatch) => {
    const rates = await fetchRates();
    const currencyNames = Object.keys(rates);

    dispatch({
      type: SET_CURRENCIES,
      payload: currencyNames,
    });
  };
};

// Action to set the selected currency
export const setCurrency = (currencyName) => {
  return async (dispatch) => {
    const rates = await fetchRates();

    if (rates[currencyName]) {
      dispatch({
        type: SET_CURRENCY,
        payload: {
          currencyName,
          currencyRate: rates[currencyName].rate,
          currencySymbol: rates[currencyName].symbol,
          currencyCountry: rates[currencyName].country, // Added country
        },
      });
    } else {
      // No log here to avoid showing error in the terminal
      console.error(`Currency ${currencyName} not found in rates.`);
    }
  };
};
