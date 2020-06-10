import React from 'react';
import Web3 from 'web3'
import {COMMITTEE_ADDRESS, COMMITTEE_ABI} from './config.js'

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
                const contract = new web3.eth.Contract(COMMITTEE_ABI,
                   COMMITTEE_ADDRESS);
                
               // var pool = await contract.methods.owner({from:accounts[0]});
                var pool = await contract.methods.makePool(1,2,3,4).call();
                //console.log(contract);
                console.log("hello");
                console.log(pool);
                console.log("h");
                //example call
                //var candidatesCount = await election.methods.candidateCount().call();
                var pool1 = await contract.methods.makePool(2,3,4,5).call();
                console.log(pool1);
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