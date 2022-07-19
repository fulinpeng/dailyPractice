define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var IsAcceptable = /** @class */ (function () {
        function IsAcceptable() {
        }
        IsAcceptable.prototype.isAcceptable = function (s) {
            return s.length === 5;
        };
        return IsAcceptable;
    }());
    exports.IsAcceptable = IsAcceptable;
});
