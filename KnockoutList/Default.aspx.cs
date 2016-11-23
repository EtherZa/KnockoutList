namespace KnockoutList
{
    using System;

    public partial class Default : System.Web.UI.Page
    {
        protected void OutputSelectionClick(object sender, EventArgs e)
        {
            this.Output.DataSource = this.Recipients.Values;
            this.Output.DataBind();

            this.Output2.DataSource = this.Recipients2.Values;
            this.Output2.DataBind();
        }

        protected void AddProgrammaticallyOnClick(object sender, EventArgs e)
        {
            this.Recipients.Add($"{DateTime.Now.Ticks}@domain.com");
        }
    }
}