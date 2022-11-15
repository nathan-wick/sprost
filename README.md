# Introduction

Sprost is a tool that makes it easy for anyone to create an application.

# Project Management

## Prerequisites

- Download and install: Google Chrome
- Download and install: Visual Studio Code
- Download and install: Github Desktop

## Clone The Repository

1. Open: Github Desktop
2. Navigate to: Current Repository > Add > Clone Repository > URL
3. Paste: https://github.com/nathan-wick/sprost.git
4. Click: Clone

## Start Work On An Issue

Projects are broken up into sections called issues. Each issue is worked on separately. Then, issues are combined together.

1. Open: Google Chrome
2. Paste: https://github.com/nathan-wick/sprost/projects
3. Click: Sprost
4. Assign yourself to the issue you'll work on from the Sprint column
  1. Notice there's a description of the issue, you will need this later
5. Pickup the issue you will work on and drag it from the Sprint column to the In Progress column
6. Open: Github Desktop
7. Navigate to: Current Branch > New Branch
8. Name the new branch after the issue you're working on's number
  1. For example, if the issue you're working on is #42, you would give the new branch the following name: 42
9. Click: Create Branch
10. Click: Open in Visual Studio Code

You are now ready to work on the issue :)

## Submit A Pull Request

Once work on an issue is complete, a pull request is needed. Pull requests enable other developers to review the code and request changes and merge the code to the Dev branch.

1. Open: Google Chrome
2. Paste: https://github.com/nathan-wick/sprost/pulls
3. Click: New pull request
4. Under the Base dropdown menu, select: Dev
5. Under the Compare dropdown menu, select the branch you've been working on
6. Double check the changes shown look correct
  1. If the changes shown do not look correct, please correct the changes and repeat instructions 1-6 before creating a pull request
7. Click: Create pull request
8. Enter a title and description for the changes you've made
9. Within the description, mention the issue the pull request closes
  1. For example, if your pull request closes issue #42, you would mention the following in your pull request's description: Closes #42
10. Request at least one person including the project owner (Nathan Wick) as a reviewer
11. Assign yourself to the pull request
12. Link the Sprost project to the pull request
13. Click: Create pull request
14. Navigate to: Projects > Sprost
15. Pickup the issue your pull request closed and drag it from the In Progress column to the Review column

Your pull request is now ready to be reviewed :)
- If your pull request passes review, your branch will be merged into Dev, pull request closed, and issue moved to Ready
- If your pull request does not pass review, you will need to commit the reviewer's requested changes to your branch and re-request review

## Release A New Version

Once changes on the Dev branch are ready to be shown to users, a new release needs to be made. This is typically done by the project owner (Nathan Wick) after meeting with the development team.

### Merge Dev To Main

1. Open: Google Chrome
2. Paste: https://github.com/nathan-wick/sprost/compare/main...Dev
3. Click: Create pull request
4. Enter a title and description for the new release
5. Assign yourself to the pull request
6. Link the Sprost project to the pull request
7. Click: Create pull request
8. Click: Squash and merge
9. Navigate to: Projects > Sprost
10. Close all Ready issues

### Enter The Main Branch

1. Open: Github Desktop
2. Navigate to: Current Branch > main

### Build And Deploy

1. Open: Visual Studio Code
2. Navigate to: Terminal > New Terminal
3. Run the following commands:
  1. cd sprost
  2. npm run build
  3. firebase deploy

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
