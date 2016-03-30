var MyApp = MyApp || {}

MyApp.domHelpers = (function () {

    return {
        changeViewFromTo: changeViewFromTo,
        clearInputs: clearInputs,
    }

    //change view from first argument to second argument;
    function changeViewFromTo(from, to) {
        from.removeClass("show").addClass("invisible");
        to.removeClass("invisible").addClass("show");
    }

    //get inputs and clear the value;
    function clearInputs() {
        for (var i = 0; i < arguments.length; i++) {
            arguments[i].val("");
        }
    }

})();













