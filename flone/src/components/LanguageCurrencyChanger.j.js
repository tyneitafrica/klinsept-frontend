import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrency,
  fetchCurrencyRates,
} from "../redux/actions/currencyActions";
import i18n from "../helpers/i18n";

function LanguageCurrencyChanger() {
  const dispatch = useDispatch();
  const availableCurrencies = useSelector((state) => state.currencyData);

  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  // Fetch currency rates on component mount
  useEffect(() => {
    dispatch(fetchCurrencyRates());
  }, [dispatch]);

  // Update selected currency when currency data loads
  useEffect(() => {
    if (availableCurrencies?.selectedCurrency?.name) {
      setSelectedCurrency(availableCurrencies.selectedCurrency.name);
    }
  }, [availableCurrencies]);

  // Handle language change
  const handleLanguageChange = (event) => {
    const newLang = event.target.value;
    setSelectedLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  // Handle currency change
  const handleCurrencyChange = (event) => {
    const newCurrency = event.target.value;
    const selectedCurrencyData = availableCurrencies.currencies?.[newCurrency];

    if (selectedCurrencyData) {
      setSelectedCurrency(newCurrency);
      dispatch(setCurrency(selectedCurrencyData));
    }
  };

  return (
    <div className="language-currency-changer flex gap-4">
      {/* Language Selector */}
      <div className="language-selector">
        <select
          id="language-select"
          value={selectedLanguage}
          onChange={handleLanguageChange}
          className="form-select p-2 border rounded"
        >
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="sw">Swahili</option>
        </select>
      </div>

      {/* Currency Selector */}
      <div className="currency-selector">
        <select
          id="currency-select"
          value={selectedCurrency}
          onChange={handleCurrencyChange}
          className="form-select p-2 border rounded"
          disabled={!availableCurrencies.currencies} // Disable if currencies are not available
        >
          {availableCurrencies.currencies
            ? Object.entries(availableCurrencies.currencies).map(
                ([currencyKey, currencyData]) => (
                  <option key={currencyKey} value={currencyKey}>
                    {currencyData.name} ({currencyData.country})
                  </option>
                )
              )
            : null}
        </select>
      </div>
    </div>
  );
}

export default LanguageCurrencyChanger;
