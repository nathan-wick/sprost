# Introduction
Sprost is a tool that makes it easy for anyone to create an application.

# Documentation

## Database Structure (NoSQL)
- users [{
  - id,
  - name,
  - email,
  - image,
  - apps [{
    - id,
    - name,
    - colors [{
      - primary,
      - secondary,
      - background,
    - }],
    - views [{
      - id,
      - name,
      - components [{
        - id,
        - type,
        - type specific variables...
      - }],
    - }],
  - }],
- }],

## Editor Views
- Landing
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

## User App Components
- Navbar
- Footer
- Heading
- Header
- Paragraph
- Button
- Image
