# Introduction
Sprost is a tool that makes it easy for anyone to create an application.

# Project Management

## Prerequisites
- Download and install Visual Studio Code
- Download and install Github Desktop

## Clone The Repository
- Open Github Desktop
- Navigate to: Current Repository > Add > Clone Repository > URL
- Paste the following URL: https://github.com/nathan-wick/sprost.git
- Click: Clone

## Start Working On An Issue
- Open your browser
- Paste the following URL: https://github.com/nathan-wick/sprost/projects
- Click: Sprost
- Assign yourself to the issue you'll work on from the Sprint column
  - Notice there's a description of the issue, you will need this later
- Pickup the issue you will work on and drag it from the Sprint column into the In Progress column
- Open Github Desktop
- Navigate to: Current Branch > New Branch
- Name the new branch after the issue you're working on's number
  - For example, if the issue you're working on is #42, you would give the new branch the following name: 42
- Click: Create Branch
- Click: Open in Visual Studio Code
- You are now ready to work on the issue :)

## Submit a Pull Request
- Open your browser
- Paste the following URL: https://github.com/nathan-wick/sprost/pulls
- Click: New pull request
- Under the Base dropdown menu, select the Dev branch
- Under the Compare dropdown menu, select the branch you've been working on
- Double check the changes shown look correct
  - If the changes shown do not look correct, please correct the changes and repeat the previous instructions before creating a pull request
- Click: Create pull request
- Enter a title and description for the changes you've made
- Within the description, mention the issue the pull request closes
  - For example, if your pull request closes issue #42, you would mention the following in your pull request's description: Closes #42
- Request at least one person including Nathan Wick as a reviewer
- Assign yourself to the pull request
- Link the Sprost project to the pull request
- Click: Create pull request
- Navigate to: Projects > Sprost
- Pickup the issue your pull request closed and drag it from the In Progress column to the Review column
- Your pull request is now ready to be reviewed :)
  - If your pull request passes review, your branch will be merged into Dev, pull request closed, and issue moved to Ready
  - If your pull request does not pass review, you will need to commit the reviewer's requested changes to your branch and re-request review
