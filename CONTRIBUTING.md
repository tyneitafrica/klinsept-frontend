# Klinsept Contribution Guide

Thank you for taking the time to contribute to the Klinsept website! 🎉

This document covers project setup steps and guidelines for contributing to Klinsept website content.

## Getting Started

### Prerequisite Knowledge
- Familiarity with the [Git-flow workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) for branching.
- Intermediate knowledge of JavaScript (`JS`) and `React`.
- Proficiency with `Git` and `GitHub` integration.

## Contributing to Klinsept

1. **Fork the Repository and Initialize Git-flow**
   - Fork the repository on GitHub and clone it locally.
   - Install Git-flow and initialize it in your forked repository:
     ```bash
     git flow init
     ```

2. **Start a New Feature or Bug-Fix Branch**
   - Use Git-flow to create a new branch for your feature or bug-fix:
     ```bash
     git flow feature start feature-branch-name
     ```

3. **Make Changes and Commit**
   - Work on your feature branch and commit your changes as usual. Follow commit message conventions if any exist.
   - Once complete, close the feature branch and merge it into the `develop` branch:
     ```bash
     git flow feature finish feature-branch-name
     ```
   - *This command merges your feature branch with the `develop` branch and then deletes the feature branch.*

4. **Submit a Pull Request**
   - Push your `develop` branch to your fork on GitHub.
   - Open a pull request to merge your changes from your `develop` branch to the main `develop` branch of the repository.
   - Resolve any merge conflicts between your `develop` branch and the main `develop` branch before submitting the pull request.

---

Thank you for helping us improve Klinsept!
