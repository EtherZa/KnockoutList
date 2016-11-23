/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="typings/knockout/knockout.d.ts" />
/// <reference path="ko.bindingHandlers.ts" />
var Controls;
(function (Controls) {
    var ListModel = (function () {
        function ListModel(settings) {
            var _this = this;
            var defaultSettings = {
                isUnique: true,
                isUniqueErrorMessage: "* Duplicate",
                requiredErrorMessage: "* Required",
                validation: null
            };
            this.settings = jQuery.extend(defaultSettings, settings);
            this.addValue = ko.observable();
            this.data = ko.observable();
            this.items = ko.observableArray();
            this.isValid = ko.observable(true);
            this.validationErrorMessage = ko.observable();
            var subscription = this.data.subscribe(function () {
                var d = _this.loadFromDataField();
                _this.items(d);
                subscription.dispose();
            });
            this.addItem = function () {
                var result = _this.validate();
                _this.isValid(result.valid);
                _this.validationErrorMessage(!result.valid ? result.message || "" : "");
                if (!result.valid) {
                    return;
                }
                for (var i = 0, len = result.values.length; i < len; i++) {
                    _this.items.push(result.values[i]);
                }
                _this.save();
                _this.addValue("");
                _this.isValid(true);
            };
            this.clearItems = function () {
                _this.items.removeAll();
                _this.save();
            };
            this.removeItem = function (item) {
                _this.items.remove(item);
                _this.save();
            };
        }
        ListModel.prototype.validate = function () {
            var value = (this.addValue() || "").trim();
            if (value === "") {
                return {
                    valid: false,
                    message: this.settings.requiredErrorMessage,
                    values: null
                };
            }
            var values;
            if (this.settings.validation !== null) {
                var result = this.settings.validation(value);
                if (!result.valid) {
                    return {
                        valid: false,
                        message: result.message || "* Invalid",
                        values: null
                    };
                }
                values = $.grep(result.values, function (el) {
                    return el !== null && el !== undefined && el !== "";
                });
            }
            if (values === null || values === undefined) {
                values = [value];
            }
            if (this.settings.isUnique) {
                values = this.removeItemsAlreadyCaptured(this.distinct(values));
            }
            return {
                valid: true,
                message: "",
                values: values
            };
        };
        ListModel.prototype.distinct = function (arr) {
            return $.grep(arr, function (el, index) {
                return index === $.inArray(el, arr);
            });
        };
        ListModel.prototype.removeItemsAlreadyCaptured = function (arr) {
            var inArray = this.items();
            return $.grep(arr, function (el) {
                return $.inArray(el, inArray) < 0;
            });
        };
        ListModel.prototype.save = function () {
            var names = new Array();
            ko.utils.arrayForEach(this.items(), function (item) {
                names.push(Common.Util.htmlEncode(item));
            });
            this.data(ko.toJSON(names));
        };
        ListModel.prototype.loadFromDataField = function () {
            return $.map(JSON.parse(this.data()), function (name) { return Common.Util.htmlDecode(name); });
        };
        return ListModel;
    }());
    Controls.ListModel = ListModel;
})(Controls || (Controls = {}));
