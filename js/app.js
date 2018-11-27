$(function () {

    var $url = 'http://api.nbp.pl/api/exchangerates/tables/c/';

    var $input = $(".money-value-input");
    var $selectTo = $(".money-value-currency-to-choice");
    var $selectFrom = $(".money-value-currency-from").find('select');
    var $button = $(".calculate-button");
    var $exchangerLink = $(".exchange-link");
    var $currencyLink = $(".currency-link");
    var rate;
    var day;

    // obliczanie PLN --> ...
    function convertCurrencyToPl() {

        event.preventDefault();
        var amount = $input.val();      // pobieranie wpisanej kwoty
        var from = $selectFrom.val();   // wybór waluty
        var results = 0;


        if (from === "AUD - Australia"){
            results = amount * rate[1].ask
        } else if (from === "CAD - Kanada"){
            results = amount * rate[2].ask
        } else if (from === "CHF - Szwajcaria") {
            results = amount * rate[5].ask
        } else if (from === "CZK - Czechy") {
            results = amount * rate[8].ask
        } else if (from === "DKK - Dania") {
            results = amount * rate[9].ask
        } else if (from === "EUR - Unia Europejska") {
            results = amount * rate[3].ask
        } else if (from === "GBP - Wielka Brytania") {
            results = amount * rate[6].ask
        } else if (from === "HUF - Węgry") {
            results = amount * rate[4].ask
        } else if (from === "JPY - Japonia") {
            results = amount * rate[7].ask
        } else if (from === "NOK - Norwegia") {
            results = amount * rate[10].ask
        } else if (from === "SEK - Szwecja") {
            results = amount * rate[11].ask
        } else if (from === "USD - USA") {
            results = amount * rate[0].ask
        }

        // usuwa mema i wpisuje wynik naszych obliczeń
        function addResultText() {
            var $newText = $(`
            <span>${$input.val()}</span>
            <span id="currency">${$selectFrom.val()}</span>
            <span>=</span>
            <span id="results">${results.toFixed(2)}</span>
            <span id="currency">${$selectTo.val()}</span>
        `);
            $(".form-text-content").empty().append($newText);
        }

        addResultText();
    }

    // obliczanie ... --> PLN
    function convertCurrencyFromPl() {

        event.preventDefault();
        var amount = $input.val();
        var to = $selectTo.val();
        var results = 0;

        if (to === "AUD - Australia"){
            results = amount / rate[1].bid
        } else if (to === "CAD - Kanada"){
            results = amount / rate[2].bid
        } else if (to === "CHF - Szwajcaria") {
            results = amount / rate[5].bid
        } else if (to === "CZK - Czechy") {
            results = amount / rate[8].bid
        } else if (to === "DKK - Dania") {
            results = amount / rate[9].bid
        } else if (to === "EUR - Unia Europejska") {
            results = amount / rate[3].bid
        } else if (to === "GBP - Wielka Brytania") {
            results = amount / rate[6].bid
        } else if (to === "HUF - Węgry") {
            results = amount / rate[4].bid
        } else if (to === "JPY - Japonia") {
            results = amount / rate[7].bid
        } else if (to === "NOK - Norwegia") {
            results = amount / rate[10].bid
        } else if (to === "SEK - Szwecja") {
            results = amount / rate[11].bid
        } else if (to === "USD - USA") {
            results = amount / rate[0].bid
        }

        function addResultText() {
            var $newText = $(`
            <span>${$input.val()}</span>
            <span id="currency">${$selectFrom.val()}</span>
            <span>=</span>
            <span id="results">${results.toFixed(2)}</span>
            <span id="currency">${$selectTo.val()}</span>
        `);
            $(".form-text-content").empty().append($newText);
        }

        addResultText();
    }




    // tworzy tabelę popularnych walut
    function tablePopular(rate) {
        var $popular = $(`
            
            <tr>
                <td>${rate[0].code}</td>
                <td>${rate[0].ask}</td>
            </tr>
            <tr>
                <td>${rate[3].code}</td>
                <td>${rate[3].ask}</td>
            </tr>
            <tr>
                <td>${rate[6].code}</td>
                <td>${rate[6].ask}</td>
            </tr>
            <tr>
                <td>${rate[5].code}</td>
                <td>${rate[5].ask}</td>
            </tr>
        `);
        $('.tablePopular').append($popular);    // dodanie do html
    }

    // tworzy tabele (europa)
    function tableEurope(rate) {
        console.log(rate[0].ask);
        var $europe = $(`
            
            <tr>
                <td>${rate[10].code}</td>
                <td>${rate[10].ask}</td>
            </tr>
            <tr>
                <td>${rate[11].code}</td>
                <td>${rate[11].ask}</td>
            </tr>
            <tr>
                <td>${rate[9].code}</td>
                <td>${rate[9].ask}</td>
            </tr>
            <tr>
                <td>${rate[8].code}</td>
                <td>${rate[8].ask}</td>
            </tr>
        `);
        $('.tableEu').append($europe);
    }


    // tworzy tabele (reszta świata)
    function tableRest(rate) {
        console.log(rate[0].ask);
        var $rest = $(`
            
            <tr>
                <td>${rate[7].code}</td>
                <td>${rate[7].ask}</td>
            </tr>
            <tr>
                <td>${rate[2].code}</td>
                <td>${rate[2].ask}</td>
            </tr>
            <tr>
                <td>${rate[1].code}</td>
                <td>${rate[1].ask}</td>
            </tr>
            <tr>
                <td>${rate[4].code}</td>
                <td>${rate[4].ask}</td>
            </tr>
        `);
        $('.tableRest').append($rest);
    }

    // dodaje date aktualizacji danych NBP
    function addDate() {
        var $today = $(`
            <p>* Według średniego kursu NBP z dnia ${day}</p>   
        `);
        $('.form-text').append($today);
    }

    // płynne przesuwanie po kliknięciu w link
    $currencyLink.on("click", function () {
        window.scrollTo({left: "0", top:document.querySelector("#table").getBoundingClientRect().top, behavior: "smooth"})
    });

    $exchangerLink.on("click", function () {
        window.scrollTo({left: "0", top:document.querySelector(".exchange").getBoundingClientRect().top, behavior: "smooth"})
    });

    // event odpalający funkcję liczącą wynik
    $button.on("click", function () {
        if ($selectFrom.val() === "PLN - Polska"){
            convertCurrencyFromPl();
        } else {
            convertCurrencyToPl();
        }
    });

    // pobieranie danych z url i odpala wszystkie funkcję
    function loadData() {
        $.ajax({
            url: $url,
            dataType: "json"
        }).done(function (res) {
            rate = res[0].rates;
            day = res[0].effectiveDate;
            tableRest(rate);
            tableEurope(rate);
            tablePopular(rate);
            addDate();
        })
    }
    loadData();
});