var Common;
(function (Common) {
    var Util = (function () {
        function Util() {
        }
        Util.htmlEncode = function (value) {
            var node = document
                .createElement("textarea")
                .appendChild(document.createTextNode(value))
                .parentNode;
            return node.innerHTML;
        };
        Util.htmlDecode = function (value) {
            var node = document
                .createElement("textarea");
            node.innerHTML = value;
            return node.value;
        };
        return Util;
    }());
    Common.Util = Util;
})(Common || (Common = {}));
//# sourceMappingURL=Util.js.map