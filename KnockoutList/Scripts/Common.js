var Common;
(function (Common) {
    var Util = (function () {
        function Util() {
        }
        Util.htmlEncode = function (value) {
            var node = document
                .createElement("div")
                .appendChild(document.createTextNode(value))
                .parentNode;
            return node.innerHTML;
        };
        return Util;
    }());
    Common.Util = Util;
})(Common || (Common = {}));
