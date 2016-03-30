var MyApp = MyApp || {}

MyApp.View = (function () {
    function View(element) {
        if (!element) {
            throw new Error("View.ctor.element is missing");
        }
        this.element = element;
    }

    View.prototype.getChildElement = function (selector) {
        var res = this.element.find(selector);
        if (!res.length) {
            throw new Error("Selector: " + selector + " was not found");
        }
        return res;
    }
    return View;
})();

