// this CustomInputComponent is a custom component i created
// to make the code cleaner
// using the react-select package
import CustomInputComponent from "./components/InputSection";
import React, { useEffect, useState } from "react";
// below is a react Icon
import { IoSwapHorizontal } from "react-icons/io5";
// I created a dataTransferObject and imported it here
// more detail is in the file
import { DataTransferObject } from "./components/DTO";

const Page = () => {
  const [amount, setamount] = useState(); // this is the amount inputed to convert
  const [amountConverted, setamountConverted] = useState(); // this is the amount converted by the api
  const [CurrencyToConvert, setCurrencyToConvert] = useState({
    value: "",
    label: "",
  }); // this is the currency spec to convert to
  const [SelectedCurrency, setSelectedCurrency] = useState({
    value: "",
    label: "",
  }); // this is the currency spec to convert from

  // below conatins all the currencies from the api
  // the data goes through the dto before coming here
  const [Currencies, setCurrencies] = useState([]);

  const API_KEY = process.env.REACT_APP_API_KEY;

  // this is using fetch api to get all the currencies from the api
  const getCurrencies = async () => {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/codes`,
      { method: "GET" }
    );
    const result = await response.json();

    // below once the request is successful
    // it will store the currencies in the useState()
    if (response.status === 200) {
      setCurrencies(DataTransferObject(result.supported_codes));
    }
  };

  // this is the function i used to convert the currency
  // using exchange rate api
  const convertCurrency = async (value) => {
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${SelectedCurrency.value}`;

    const response = await fetch(url, { method: "GET" });
    const result = await response.json();

    if (response.status === 200) {
      setamountConverted(
        handleConversion(result, CurrencyToConvert.value, value)
      );
    }
  };

  // the function below is to handle the currency conversion.
  const handleConversion = (data, toCurrency, amount) => {
    if (data) {
      const conversionRate = data.conversion_rates[toCurrency];
      return amount * conversionRate;
    }
    return 0;
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  return (
    <>
      <div class="container">
        <b class="converter-title">Currency Converter</b>
        <p class="converter-description">
          This converter was made with react js, CSS, and {" "}
          <a class="api-link" href="https://exchangerate-api.com">
            exchange-rate api
          </a>
        </p>
        <br />

        <div class="converter-box">
          <div class="converter-controls">
            <CustomInputComponent
              label="From"
              data={Currencies.filter(
                (currency, index) =>
                  currency.value !== (CurrencyToConvert?.value || [])
              )}
              inputValue={amount}
              disabled={SelectedCurrency?.value ? false : true}
              tootip={SelectedCurrency?.value ? "" : "Select a value first"}
              onInput={(text) => {
                if (CurrencyToConvert?.value) {
                  setamount(text);
                  convertCurrency(text);
                } else {
                  alert("Select the currency to convert");
                }
              }}
              clearable={true}
              searchable={true}
              onChange={(data) => {
                setamount("");
                setamountConverted("");
                setSelectedCurrency(data);
              }}
            />

            <div class="swap-icon">
              <IoSwapHorizontal size={20} color="white" />
            </div>

            <CustomInputComponent
              label="To"
              disabled={true}
              inputValue={amountConverted}
              data={Currencies.filter(
                (currency, index) => currency.value !== SelectedCurrency?.value
              )}
              clearable={true}
              searchable={true}
              onChange={(data) => {
                setamount("");
                setamountConverted("");
                setCurrencyToConvert(data);
              }}
            />
          </div>

          <br />

          {CurrencyToConvert ? (
            <b class="conversion-result">
              {SelectedCurrency && amount} {SelectedCurrency?.label} ={" "}
              {amountConverted} {CurrencyToConvert?.value}
            </b>
          ) : (
            ""
          )}
        </div>

        <div class="spacer"></div>
      </div>
    </>
  );
};

export default Page;
