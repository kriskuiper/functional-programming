# My awesome project
> This project is used to complete the 'Functional Programming' course from the Information Design Tech Track.

[![Netlify Status](https://api.netlify.com/api/v1/badges/439c69bb-da5a-4160-93e6-0b6f9f1322a7/deploy-status)](https://app.netlify.com/sites/functional-programming-kris-kuiper/deploys)

## Installation
Before installing the project for local development purposes you should have some sort of live server configured. In the future I will include `sirv-cli` to spin up a local dev server. For now I personally use the Live server extension for VSCode. Further steps are included below:

```bash
# 1. Clone this repo
git clone 

# 2. Install dependencies
npm install

# 3. Build for production
npm run build
```

## Visuals
Some cool visuals

## Deploying to production
Continuous Deployment is set up using Netlify. Netlify runs `npm run build` and serves out the `build` folder. You can see how the build script works by looking into `package.json`.
