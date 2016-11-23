/// <reference path="typings/jquery/jquery.d.ts"/>
/// <reference path="Util.ts" />
var Knockout;
(function (Knockout) {
    var InitValue = (function () {
        function InitValue() {
        }
        InitValue.prototype.init = function (element, valueAccessor) {
            var value = valueAccessor();
            if (!ko.isWriteableObservable(value)) {
                throw new Error('Knockout "initValue" binding expects an observable.');
            }
            value(element.value);
        };
        return InitValue;
    }());
    Knockout.InitValue = InitValue;
    var ValueWithInit = (function () {
        function ValueWithInit() {
        }
        ValueWithInit.prototype.init = function (element, valueAccessor, allBindings, data, context) {
            ko.applyBindingsToNode(element, { initValue: valueAccessor() }, context);
            ko.applyBindingsToNode(element, { value: valueAccessor() }, context);
        };
        return ValueWithInit;
    }());
    Knockout.ValueWithInit = ValueWithInit;
    var EnterPressed = (function () {
        function EnterPressed() {
        }
        EnterPressed.prototype.init = function (element, valueAccessor, allBindings, data, context) {
            var callback = valueAccessor();
            $(element)
                .keypress(function (event) {
                var keyCode = (event.which ? event.which : event.keyCode);
                if (keyCode === 13) {
                    callback.call(data);
                    return false;
                }
                return true;
            });
        };
        return EnterPressed;
    }());
    Knockout.EnterPressed = EnterPressed;
})(Knockout || (Knockout = {}));
ko.bindingHandlers.valueWithInit = new Knockout.ValueWithInit();
ko.bindingHandlers.initValue = new Knockout.InitValue();
ko.bindingHandlers.enterPressed = new Knockout.EnterPressed();
//# sourceMappingURL=ko.bindingHandlers.js.map