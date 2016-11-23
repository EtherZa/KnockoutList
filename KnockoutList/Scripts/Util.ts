namespace Common {
    export class Util {
        static htmlEncode(value: string): string {
            const node = document
                .createElement("textarea")
                .appendChild(document.createTextNode(value))
                .parentNode as IHtmlNode;

            return node.innerHTML;
        }

        static htmlDecode(value: string): string {
            const node = document
                .createElement("textarea") as IHtmlNode;

            node.innerHTML = value;

            return node.value;
        }
    }

    export interface IHtmlNode extends Node {
        // ReSharper disable once InconsistentNaming
        innerHTML: string;

        value: string;
    }
}