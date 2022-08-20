# Decentralized Dropbox

## General Information

This repo contains the backend APIs of Decentralized Dropbox. Anyone can upload a file using the API and the file will be stored into IPFS and a email will be sent to the user who have uploaded the file with a email address. The file can be viewed by anyone using the ipfs id.

## Tools and Technologies:
  * <a href="https://nodejs.org/en/">Node.Js</a>
  * NPM (it is automatically installed with node) / <a href="https://yarnpkg.com/">Yarn</a>
  * <a href="https://expressjs.com/">ExpressJs</a>
  * <a href="https://ipfs.tech/">IPFS</a>
  * <a href="https://moralis.io/">Moralis-Dapp</a>

## Database
  * <a href="https://v1docs.moralis.io/moralis-dapp/database">Moralis-Dapp Database</a>
  
## Live URL
  * <a href="https://decentralized-dropbox-backend.herokuapp.com">Decentralized Dropbox</a>
  
## Endpoints:
  * GET API: /v1/ipfs/file - it will return all the file informations which have been uploaded.
  * POST API: /v1/ipfs/file - use this api to post any file.
  </br>
  Here is the demo:
  ![postman file](https://user-images.githubusercontent.com/69357704/185756948-a572f56f-a844-46ba-9efa-21dec192b44c.png)

## Quick Start
You can get started by using the following commands:</br>

**Step 1: Clone this repo by:** </br>
```https://github.com/mdmuhtasimfuadfahim/decentralizer-dropbox-backend```
</br>

**Step 2: Change PORT according to your preference or leave it as it is.**

**Step 3: From the root directory, run the commands:**</br>
  ```yarn install``` </br>
  ```yarn dev```</br>
</br>**The API will start and you can send request and get response.**</br>

> Note: Please use ```yarn add dependency_name or npm install dependency_name``` if something went wrong or couldn't install any package with ```yarn install```

## License:
  * MIT
 
###### Thank you
