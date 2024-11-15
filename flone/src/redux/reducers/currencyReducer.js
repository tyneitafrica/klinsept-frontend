import { SET_CURRENCY, SET_CURRENCIES } from "../actions/currencyActions";

const initState = {
  currencySymbol: "€", // Default symbol for Euro
  currencyName: "EUR",  // Default currency is Euro
  currencyRate: 1,     // Default rate for Euro (1:1)
  availableCurrencies: [], // To store the available currencies
};

const currencyReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_CURRENCY: {
      const { currencyName, currencyRate } = action.payload;

      // Handle setting the currency based on the name
      let currencySymbol = "€"; // Default symbol for Euro

      if (currencyName === "USD") {
        currencySymbol = "$";
      } else if (currencyName === "KES") {
        currencySymbol = "KSh";
      } else if (currencyName === "BIF") {
        currencySymbol = "FBu";
      } else if (currencyName === "UGX") {
        currencySymbol = "USh";
      } else if (currencyName === "TZS") {
        currencySymbol = "TSh";
      } else if (currencyName === "RWF") {
        currencySymbol = "Fr";
      } else if (currencyName === "ETB") {
        currencySymbol = "Br";
      } else if (currencyName === "SOS") {
        currencySymbol = "SSh";
      } else if (currencyName === "SDG") {
        currencySymbol = "SDG";
      }

      return {
        ...state,
        currencySymbol,
        currencyRate,
        currencyName,
      };
    }
    case SET_CURRENCIES: {
      // Set the available currencies from the fetched data
      return {
        ...state,
        availableCurrencies: action.payload,
      };
    }
    default:
      return state;
  }
};

export default currencyReducer;
