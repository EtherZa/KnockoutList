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
    ;
})(Knockout || (Knockout = {}));
ko.bindingHandlers.valueWithInit = new Knockout.ValueWithInit();
ko.bindingHandlers.initValue = new Knockout.InitValue();
