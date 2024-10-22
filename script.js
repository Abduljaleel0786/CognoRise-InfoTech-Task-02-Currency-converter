document.addEventListener("DOMContentLoaded", () => {
    let convertButton = document.getElementById("buttons");
    convertButton.addEventListener("click", convertCurrency);

    function buildList() {
        fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json")
            .then((res) => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then((data) => {
                let fromCountry = document.getElementById("fromcountry");
                let toCountry = document.getElementById("tocountry");

                for (let code in data) {
                    let fromOption = document.createElement("option");
                    fromOption.value = code;
                    fromOption.textContent = data[code];
                    fromCountry.appendChild(fromOption);

                    let toOption = document.createElement("option");
                    toOption.value = code;
                    toOption.textContent = data[code];
                    toCountry.appendChild(toOption);
                }
            })
            .catch((error) => {
                console.error("Error fetching currency list:", error);
                document.getElementById("error-message").textContent = "Failed to load currency list. Please try again later.";
            });
    }

    let currencyInfo;

    function loadCurrencyValues() {
        fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json")
            .then((res) => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then((data) => {
                currencyInfo = data;
            })
            .catch((error) => {
                console.error("Error fetching currency values:", error);
                document.getElementById("error-message").textContent = "Failed to load currency data. Please try again later.";
            });
    }

    loadCurrencyValues();
    buildList();

    function convertCurrency() {
        let fromCountry = document.getElementById("fromcountry").value;
        let toCountry = document.getElementById("tocountry").value;
        let amountToConvert = document.getElementById("amount").value;
        let resultField = document.getElementById("result");
        let errorMessage = document.getElementById("error-message");

        errorMessage.textContent = ''; // Clear previous error messages

        if (fromCountry && toCountry) {
            let { eur } = currencyInfo;
            let convertedAmount = eur[toCountry] / eur[fromCountry];
            if (amountToConvert) {
                resultField.value = (amountToConvert * convertedAmount).toFixed(2);
            } else {
                resultField.value = "";
                errorMessage.textContent = "Please enter a valid amount.";
            }
        } else {
            resultField.value = "";
            errorMessage.textContent = "Please select valid currency options.";
        }
    }
});
