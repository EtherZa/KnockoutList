<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="KnockoutList.Default" %>

<%@ Register Src="~/EmailRecipients.ascx" TagPrefix="user" TagName="EmailRecipients" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" href="Content/themes/base/all.css">
    <style type="text/css">
        .selection ul {
            width: 205px;
            list-style-type: none;
            padding: 0;
            margin: 0;
        }

            .selection ul li {
                margin: 2px 0 0 0;
                padding: 3px 5px 3px 5px;
                border: 1px #BBD8FB solid;
                border-radius: 3px;
                background: #F3F7FD;
            }

                .selection ul li > span {
                    display: block;
                    overflow: hidden;
                }

                .selection ul li a {
                    float: right;
                }

        .validationError {
            background-color: #fcc;
            border: 1px solid red;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:ScriptManager runat="server" />

            <p>Submit one or more email addreses separated by a semi-colon.</p>

            <asp:Label runat="server" ID="RecipientsTag" AssociatedControlID="Recipients" Text="Recipients:" />
            <user:EmailRecipients runat="server" ID="Recipients" ValidationErrorCssClass="validationError" />

            <hr />

            <asp:Button runat="server" ID="AddProgrammatically" Text="Add" OnClick="AddProgrammaticallyOnClick" />
            <asp:Button runat="server" ID="OutputSelection" Text="Dump" OnClick="OutputSelectionClick" />

            <asp:ListView runat="server" ID="Output" ItemType="System.String">
                <ItemTemplate>
                    <li>
                        <asp:Literal runat="server" Text="<%# Item %>" Mode="Encode" />
                    </li>
                </ItemTemplate>
                <LayoutTemplate>
                    <ul class="output">
                        <asp:PlaceHolder runat="server" ID="itemPlaceholder" />
                    </ul>
                </LayoutTemplate>
            </asp:ListView>

            <hr />
            <user:EmailRecipients runat="server" ID="Recipients2" />

            <asp:ListView runat="server" ID="Output2" ItemType="System.String">
                <ItemTemplate>
                    <li>
                        <asp:Literal runat="server" Text="<%# Item %>" Mode="Encode" />
                    </li>
                </ItemTemplate>
                <LayoutTemplate>
                    <ul class="output">
                        <asp:PlaceHolder runat="server" ID="itemPlaceholder" />
                    </ul>
                </LayoutTemplate>
            </asp:ListView>
        </div>
    </form>
</body>
</html>
