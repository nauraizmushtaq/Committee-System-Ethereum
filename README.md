## How to run the Committee-System
Guide for running the committee system on local machine
### Installations
* Ganache
* Node JS
* React JS
* Metamask Chrome Extension
* Truffle

### Pre Setup Requirements
* Install Node
  * npm install truffle -g
* Install Ganache
  *  Create workspace for project running
* MetaMask
  * Add extension in chrome
  * Import Account by placing any account (from Ganache) private key.

### Setup Project
* Clone the Code from Github Repo Committee-System
  a. https://github.com/nauraizmushtaq/Committee-System-Ethereum/
* Move to Directory Committee-System
* Deploy Contract
  a. Move to truffle folder
  b. Open CMD in that directory
  c. Run following commands for deploying the contract
    i. “truffle compile”
    ii. “truffle migrate”
* Integrate Deployed Contract with Application
  a. Open Commitee-System/src/config.js
  b. Place deployed contract address in COMMITTEE_ADDRESS variable.
  c. Copy the abi from truffle/build/contract/Commitee.json and paste it in the variable
    name COMMITTEE_ABI.
* Open Committee-System Folder in CMD
  a. Run following commands
    i. npm install
    ii. npm start
* Connect the app with metamask.
* Browse localhost:3000 and utilize Ethereum base Committee System.
