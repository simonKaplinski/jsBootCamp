var MyApp = MyApp || {}

MyApp.Validate = (function () {
    "use strict";

    return {
        checkIfInputEmpty: checkIfInputEmpty,
    }

    //clean spaces and check if input not empty;
    function checkIfInputEmpty(input) {
        return input.trim().length > 0
    }

})();









