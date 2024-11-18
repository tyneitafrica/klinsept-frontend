import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrency, fetchCurrencies } from "../redux/actions/currencyActions";
import i18n from "../helpers/i18n";

function LanguageCurrencyChanger() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedCurrency, setSelectedCurrency] = useState("EUR"); // Default is Euro
  const dispatch = useDispatch();

  const availableCurrencies = useSelector(
    (state) => state.currencyData
  );
  useEffect(() => {
    // Fetch the list of available currencies when the component mounts
    dispatch(fetchCurrencies());
  }, [dispatch]);

  const handleLanguageChange = (event) => {
    const language = event.target.value;
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
  };

  const handleCurrencyChange = (event) => {
    const currency = event.target.value;
    setSelectedCurrency(currency);
    dispatch(setCurrency(currency)); // Dispatch action to set the currency
  };

  return (
    <div className="language-currency-changer">
      <div className="language-selector">
        <label htmlFor="language-select">Language:</label>
        <select
          id="language-select"
          value={selectedLanguage}
          onChange={handleLanguageChange}
          className="form-select"
        >
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="sw">Swahili</option>
        </select>
      </div>

      <div className="currency-selector">
        <label htmlFor="currency-select">Currency:</label>
        <select
          id="currency-select"
          value={selectedCurrency}
          onChange={handleCurrencyChange}
          className="form-select"
        >
          {/* Map over available currencies and display them in the dropdown */}
          {availableCurrencies.availableCurrencies &&
            availableCurrencies.availableCurrencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}

export default LanguageCurrencyChanger;
