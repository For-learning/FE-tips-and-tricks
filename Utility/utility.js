/**
 * A utility is built by myself for seloving the common issues.
 * Created at: Apr. 05th, 2018
 */
(function (window) {
    "use strict"

    window._c_ = {};

    /**
     * arg 1: Convert direction. [utb, btu]
     * arg 2: Actual data
     * [arg 3]: If make "" equal to null, defatlt is not equal
     */
    _c_.toggleConvertUIandBackend = function () {
        // Setting up
        if (arguments[0] === "utb" && arguments[0] !== "btu")
            return new Error("First argument should in correct format!");
        if (typeof arguments[1] !== "string")
            return new Error("Second argument should in correct format!");
        if (arguments[2] && typeof arguments[2] !== "boolean")
            return new Error("Third argument should in correct format!");

        var direction = arguments[0] || false;
        var valueToConvert = arguments[1];
        var isEmptyStrEqualToNULLFlag = arguments[2] || false;

        // Convert from UI to backend
        if (direction === "utb") {
            if (isEmptyStrEqualToNULLFlag) {
                return valueToConvert;
            } else return valueToConvert === "" ? null : valueToConvert;
        }
        // Convert from backend to UI
        if (direction === "btu") {
            return valueToConvert === null ? "" : valueToConvert;
        }
    };

})(window);