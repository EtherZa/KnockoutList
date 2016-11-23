/// <reference path="typings/jquery/jquery.d.ts"/>
/// <reference path="Util.ts" />

namespace Knockout {
    import IHtmlNode = Common.IHtmlNode;

    export class InitValue implements KnockoutBindingHandler {
        init(element: IHtmlNode, valueAccessor) {
            const value = valueAccessor();
            if (!ko.isWriteableObservable(value)) {
                throw new Error('Knockout "initValue" binding expects an observable.');
            }

            value(element.value);
        }
    }

    export class ValueWithInit implements KnockoutBindingHandler {
        init(element: IHtmlNode, valueAccessor, allBindings, data, context) {
            ko.applyBindingsToNode(element, { initValue: valueAccessor() }, context);
            ko.applyBindingsToNode(element, { value: valueAccessor() }, context);
        }
    }

    export class EnterPressed implements KnockoutBindingHandler {
        init(element: IHtmlNode, valueAccessor, allBindings, data, context) {
            var callback = valueAccessor();
            $(element)
                .keypress((event) => {
                    var keyCode = (event.which ? event.which : event.keyCode);
                    if (keyCode === 13) {
                        callback.call(data);
                        return false;
                    }

                    return true;
                });
        }
    }
}

interface KnockoutBindingHandlers {
    initValue: Knockout.InitValue;
    valueWithInit: Knockout.ValueWithInit;
    enterPressed: Knockout.EnterPressed;
}

ko.bindingHandlers.valueWithInit = new Knockout.ValueWithInit();
ko.bindingHandlers.initValue = new Knockout.InitValue();
ko.bindingHandlers.enterPressed = new Knockout.EnterPressed();