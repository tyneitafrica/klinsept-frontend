import axios from "axios";
const API_KEY = "aa770193026262416728a2807c526e2e";
const BASE_URL = `https://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`;

export const SET_CURRENCY = "SET_CURRENCY";
export const SET_CURRENCIES = "SET_CURRENCIES";

// Utility for fetching rates (with caching and fallback)
const fetchRates = async () => {
  const fallbackRates = {
    USD: { rate: 1, symbol: "$" },
    EUR: { rate: 0.85, symbol: "€" },
    KES: { rate: 110.0, symbol: "KSh" },
    UGX: { rate: 3700.0, symbol: "USh" },
    TZS: { rate: 2300.0, symbol: "TSh" },
    RWF: { rate: 1200.0, symbol: "FRw" },
    BIF: { rate: 2070.0, symbol: "FBu" },
    ETB: { rate: 55.0, symbol: "Br" },
    SOS: { rate: 570.0, symbol: "Sh" },
    SDG: { rate: 700.0, symbol: "SDG" },
  };
  try {
    const response = await axios.get(BASE_URL);
    const rates = response.data.rates;

    // Merge rates with fallback for symbols
    const mergedRates = Object.keys(fallbackRates).reduce((acc, currency) => {
      if (rates[currency]) {
        acc[currency] = {
          rate: rates[currency],
          symbol: fallbackRates[currency].symbol,
        };
      }
      return acc;
    }, {});
    return mergedRates;
  } catch (error) {
    // console.error("Error fetching rates. Using fallback rates.", error);
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
        },
      });
    } else {
      console.error(`Currency ${currencyName} not found in rates.`);
    }
  };
};
