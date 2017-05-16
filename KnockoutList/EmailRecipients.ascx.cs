namespace KnockoutList
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.UI;
    using System.Web.UI.HtmlControls;

    using Newtonsoft.Json;

    public partial class EmailRecipients : UserControl
    {
        private readonly List<string> items;

        public EmailRecipients()
        {
            this.items = new List<string>();
            this.ValidationErrorCssClass = string.Empty;
        }

        public string[] Values => this.items.ToArray();

        public string ValidationErrorCssClass { get; set; }

        public override string ClientID => this.Input.ClientID;

        public void Add(string value)
        {
            // TODO: validate here
            this.items.Add(value);
        }

        protected override void OnLoad(EventArgs e)
        {
            base.OnLoad(e);

            if (this.IsPostBack)
            {
                var value = this.Value.Value;
                if (!string.IsNullOrWhiteSpace(value))
                {
                    var collection = JsonConvert.DeserializeObject<string[]>(value).Select(HttpUtility.HtmlDecode);

                    // TODO: server side validation here
                    this.items.AddRange(collection);
                }
            }
        }

        protected void ValueOnPreRender(object sender, EventArgs e)
        {
            var target = (HtmlInputHidden)sender;
            target.Value = JsonConvert.SerializeObject(this.items.Select(HttpUtility.HtmlEncode).ToArray(), Formatting.None);
        }
    }
}