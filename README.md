# KnockoutList
Web forms user control to collect user submitted list of strings with custom validation and duplication checks. Using knockout and jQuery with support for IE8+.

Sample includes implementation for email address submissions. Multiple email address may be separated by a semi-colon.

### The script/control satisfies the following criteria:
-	Any items captured must be unique - duplicates are filtered on capture
-	Invalid inputs must show a relevant error message on validation failure
-	A single input can be split into multiple results i.e. A semi-colon delimited list of email addresses can be validated and added to the result set individually
-	Items can be removed from the list individually
-	Items can be added on both the server and the client. Data is passed between the client and server via a JSON encoded object in a hidden field
-	The control supports IE8+ (Below is untested)
-	Multiple instances of the control may be included on a page
- HTML design is completely separate from logic (MVVM)

### Dependencies:
-	jQuery 1.9.1 or above
-	Knockout JS 3.3.0
-	jQuery UI 1.11.4 (Used for CSS only)
-	Newtonsoft.Json 9.0.1
-	TypeScript
- .net 4.6.2
