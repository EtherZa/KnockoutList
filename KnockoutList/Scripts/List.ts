/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="typings/knockout/knockout.d.ts" />
/// <reference path="ko.bindingHandlers.ts" />

namespace Controls {

    export interface IValidationResult {
        message: string;
        valid: boolean;
        values: string[];
    }

    export interface IValidate {
        (value: string): IValidationResult;
    }

    export interface IListSettings {
        isUnique: boolean;
        isUniqueErrorMessage: string;
        requiredErrorMessage: string;
        validation: IValidate;
    }

    export class ListModel {
        data: KnockoutObservable<string>;
        items: KnockoutObservableArray<string>;

        addValue: KnockoutObservable<string>;
        isValid: KnockoutObservable<boolean>;
        validationErrorMessage: KnockoutObservable<string>;

        private settings: IListSettings;

        addItem: () => void;
        clearItems: () => void;
        removeItem: (item: string) => void;

        constructor(settings: IListSettings) {
            const defaultSettings: IListSettings = {
                isUnique: true,
                isUniqueErrorMessage: "* Duplicate",
                requiredErrorMessage: "* Required",
                validation: null
            };

            this.settings = jQuery.extend(defaultSettings, settings);

            this.addValue = ko.observable<string>();
            this.data = ko.observable<string>();
            this.items = ko.observableArray<string>();
            this.isValid = ko.observable<boolean>(true);
            this.validationErrorMessage = ko.observable<string>();

            var subscription = this.data.subscribe(() => {
                var d = this.loadFromDataField();
                this.items(d);
                subscription.dispose();
            });

            this.addItem = () => {
                var result = this.validate();
                this.isValid(result.valid);
                this.validationErrorMessage(!result.valid ? result.message || "" : "");

                if (!result.valid) {
                    return;
                }

                for (var i = 0, len = result.values.length; i < len; i++) {
                    this.items.push(result.values[i]);
                }

                this.save();

                this.addValue("");
                this.isValid(true);
            }

            this.clearItems = () => {
                this.items.removeAll();
                this.save();
            }

            this.removeItem = (item: string) => {
                this.items.remove(item);
                this.save();
            }
        }

        private validate(): IValidationResult {
            const value = (this.addValue() || "").trim();
            if (value === "") {
                return {
                    valid: false,
                    message: this.settings.requiredErrorMessage,
                    values: null
                };
            }

            let values: string[];

            if (this.settings.validation !== null) {
                const result = this.settings.validation(value);
                if (!result.valid) {
                    return {
                        valid: false,
                        message: result.message || "* Invalid",
                        values: null
                    };
                }

                values = $.grep(result.values, (el) => {
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
        }

        private distinct(arr: string[]): string[] {
            return $.grep(arr, (el, index) => {
                return index === $.inArray(el, arr);
            });
        }

        private removeItemsAlreadyCaptured(arr: string[]) {
            const inArray = this.items();
            return $.grep(arr, el => {
                return $.inArray(el, inArray) < 0;
            });
        }

        private save(): void {
            var names = new Array<string>();
            ko.utils.arrayForEach<string>(this.items(), (item: string) => {
                names.push(Common.Util.htmlEncode(item));
            });

            this.data(ko.toJSON(names));
        }

        private loadFromDataField(): string[] {
            return $.map(JSON.parse(this.data()), (name: string): string => Common.Util.htmlDecode(name));
        }
    }
}