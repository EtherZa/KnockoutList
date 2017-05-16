<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="EmailRecipients.ascx.cs" Inherits="KnockoutList.EmailRecipients" %>

<script runat="server">
    protected void InputBinding(object sender, EventArgs e)
    {
        var optional = !string.IsNullOrWhiteSpace(this.ValidationErrorCssClass)
            ? $", css: {{ {this.ValidationErrorCssClass} : !isValid() }}"
            : string.Empty;

        var target = (WebControl)sender;
        target.Attributes["data-bind"] = $"value: addValue, valueUpdate: 'afterkeydown', enterPressed: addItem{optional}";
    }
</script>

<asp:ScriptManagerProxy runat="server" ID="SMP">
    <Scripts>
        <asp:ScriptReference Path="~/Scripts/jquery-1.9.1.js" />
        <asp:ScriptReference Path="~/Scripts/jquery-ui-1.11.4.js" />
        <asp:ScriptReference Path="~/Scripts/knockout-3.3.0.js" />
        <asp:ScriptReference Path="~/Scripts/Util.js" />
        <asp:ScriptReference Path="~/Scripts/ko.bindingHandlers.js" />
        <asp:ScriptReference Path="~/Scripts/List.js" />
    </Scripts>
</asp:ScriptManagerProxy>

<asp:Panel runat="server" ID="Selection" CssClass="selection">
    
    <asp:TextBox runat="server" Id="Input" OnPreRender="InputBinding" autocomplete="off" />
    <input id="input-button" type="button" value="Add" data-bind="click: addItem" />
    <span data-bind="text: validationErrorMessage"></span>
    <ul data-bind="foreach: items">
        <li>
            <a href="#" data-bind="click: $root.removeItem" title="Remove"><span class="ui-icon ui-icon-closethick">X</span></a>
            <span data-bind="text: $data, attr: {title: $data}"></span>
        </li>
    </ul>

    <input runat="server" type="hidden" id="Value" onprerender="ValueOnPreRender" data-bind="valueWithInit: data" />
</asp:Panel>

<script type="text/javascript">
    ko.applyBindings(new Controls.ListModel({
        validation: function (value) {
            var values = value.split(";");
            var len = values.length;

            for (var i = 0; i < len; i++) {
                var v = values[i].trim();
                var match = v.match(/^([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$|^.*<([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})>$/i);
                if (match != null) {
                    values[i] = match[1] || match[2];
                } else {
                    return {
                        values: null,
                        message: "* Invalid",
                        valid: false
                    };
                }
            }

            return {
                values: values,
                valid: true
            };
        }
    }), document.getElementById("<%= this.Selection.ClientID %>"));
</script>
