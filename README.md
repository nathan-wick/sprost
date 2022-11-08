# Introduction
Easy App is a tool that makes it easy for anyone to create an application.

# Documentation
## Views
- Index
  - First view the user sees before being authenticated
  - Sells the tool
  - A link to Sign In
- Dashboard
  - First view the user sees after being authenticated
  - The user's analytics
- Editor
  - Inputs for the user to edit their application(s)
- Settings
  - A link to Sign Out
  - Inputs to update profile information
  - Inputs to select a plan and update payment information
- App
  - A published version of a user's application(s)

## Database Structure (NoSQL)
users [{<br />
&nbsp;&nbsp;&nbsp;&nbsp;id,<br />
&nbsp;&nbsp;&nbsp;&nbsp;email,<br />
&nbsp;&nbsp;&nbsp;&nbsp;image,<br />
&nbsp;&nbsp;&nbsp;&nbsp;apps [{<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id,<br />
&nbsp;&nbsp;&nbsp;&nbsp;}],<br />
}],<br />

apps [{<br />
&nbsp;&nbsp;&nbsp;&nbsp;id,<br />
&nbsp;&nbsp;&nbsp;&nbsp;userId,<br />
&nbsp;&nbsp;&nbsp;&nbsp;name,<br />
}],
