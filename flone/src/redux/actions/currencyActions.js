import axios from "axios";

export const SET_CURRENCY = "SET_CURRENCY";
export const SET_CURRENCIES = "SET_CURRENCIES"; // New action for setting currencies

const API_KEY = "aa770193026262416728a2807c526e2e";
const BASE_URL = `http://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`;

// Action to fetch currencies for East African countries
export const fetchCurrencies = () => {
  return (dispatch) => {
    axios
      .get(BASE_URL)
      .then((response) => {
        const rates = response.data.rates;
        const currenciesToInclude = [
          "USD", "EUR", "KES", "UGX", "TZS", "RWF", "BIF", "ETB", "SOS", "SDG"
        ];

        const filteredCurrencies = Object.keys(rates).filter((currency) =>
          currenciesToInclude.includes(currency)
        );
        dispatch({
          type: SET_CURRENCIES,
          payload: filteredCurrencies,
        });
      })
      .catch((err) => {
        console.error("Error fetching currency data: ", err);
      });
  };
};

// Action to set the selected currency
export const setCurrency = (currencyName) => {
  return (dispatch) => {
    axios
      .get(BASE_URL)
      .then((response) => {
        const rates = response.data.rates;
        const EURToCurrency = rates[currencyName];

        if (EURToCurrency) {
          dispatch({
            type: SET_CURRENCY,
            payload: { currencyName, currencyRate: EURToCurrency },
          });
        } else {
          console.error(`Currency ${currencyName} not found in rates.`);
        }
      })
      .catch((err) => {
        console.error("Error fetching currency rates: ", err);
      });
  };
};
