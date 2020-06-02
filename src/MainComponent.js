import React from 'react';
import Web3 from 'web3'
//import {ELECTION_ADDRESS, ELECTION_ABI} from './config.js'

import './App.css';


class MainComponent extends React.Component{

    constructor() {
        super()
        this.state = { 
        }

    }
   


    componentDidMount() {
        this.loadBlockchainData()
    }
   
    async loadBlockchainData() {
         const web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545")
        
        // Modern dapp browsers...
        if (window.ethereum) {
            console.log("Here at 1")
            try {
                // Request account access if needed
                // Acccounts now exposed
                await window.ethereum.enable()
                //web3.eth.sendTransaction({/* ... */});
                const accounts = await web3.eth.getAccounts()
                console.log("Accounts")
                console.log(accounts)
                const contract = new web3.eth.Contract(ELECTION_ABI,
                   ELECTION_ADDRESS);
                //example call
                //var candidatesCount = await election.methods.candidateCount().call();
                
            } catch (error) {
                // User denied account access...
            }
        }
    }


    render(){

        return (
            <div id='main-content'>
                hello
            </div>   
        );
    }
}

export default MainComponent;