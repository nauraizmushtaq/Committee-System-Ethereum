import React from "react";
import "./NewPool.css";
import Web3 from "web3";
import { COMMITTEE_ADDRESS, COMMITTEE_ABI } from "../config.js";

import { toast } from "react-toastify";
class NewPool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      poolName: "",
      amount: "",
      limit: "",
      duration: "",
      commiteeContract: [],
      currentUserAccount: [],
    };
    this.onModalBoxHide = this.onModalBoxHide.bind(this);
    this.myChangeHandler = this.myChangeHandler.bind(this);
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;

    this.setState({ [nam]: val });
  };
  componentDidMount() {
    this.loadBlockchainData();
  }

  makepool = async () => {
    if (
      this.state.poolName &&
      this.state.username &&
      this.state.amount &&
      this.state.duration &&
      this.state.limit
    ) {
      alert("Pool Created Successfully");
      //if all fields are available then call contract make pool function
      console.log("Make Pool");
      //if all fields are available then call contract make pool function
      await this.state.commiteeContract.methods
        .makepool(
          Number(this.state.amount),
          Number(this.state.duration),
          Number(this.state.limit)
        )
        .call();
      //Toast for successful creation of Pool
      toast.success("Pool have been created Successfully", {
        autoClose: 1000,
        hideProgressBar: true,
      });
    } else {
      //if all fields are not availabe
      toast.success("All Fields are require for creating Pool", {
        autoClose: 1000,
        hideProgressBar: true,
      });
      alert("All Fields are require for creating Pool");
    }

    // await this.state.commiteeContract.methods.makepool().call();
  };
  //This function loads the contract from ABI defined in
  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");

    // Modern dapp browsers...
    if (window.ethereum) {
      try {
        // Request account access if needed
        // Acccounts now exposed
        await window.ethereum.enable();
        //web3.eth.sendTransaction({/* ... */});
        const accounts = await web3.eth.getAccounts();
        // Getting the deployeed Contract and saving in state variable
        const contract = new web3.eth.Contract(
          COMMITTEE_ABI,
          COMMITTEE_ADDRESS
        );
        // console.log(contract);
        //Saing in state here
        this.setState({
          commiteeContract: contract,
          currentUserAccount: accounts[0],
        });
        console.log(this.state);
      } catch (error) {
        // User denied account access...
      }
    }
  }
  //this function deals with navigaton between Screens
  onModalBoxHide() {
    var modal = document.getElementById("myModal");
    //managing Screens
    if (this.props.ModalDisplay === "false") {
      modal.style.display = "block";
    } else {
      modal.style.display = "none";
    }
  }

  render() {
    return (
      <React.Fragment>
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={this.onModalBoxHide}>
              &times;
            </span>
            <form>
              <p>Enter Pool Name:</p>
              <input
                type="text"
                name="poolName"
                onChange={this.myChangeHandler}
              />

              <p>Enter your name:</p>
              <input
                type="text"
                name="username"
                onChange={this.myChangeHandler}
              />

              <p>Pool Limit:</p>
              <input type="text" name="limit" onChange={this.myChangeHandler} />
              <p>Pool Total amount:</p>
              <input
                type="text"
                name="amount"
                onChange={this.myChangeHandler}
              />
              <p>Enter Committe Duration(# of Cycles):</p>
              <input
                type="text"
                name="duration"
                onChange={this.myChangeHandler}
              />
              <button
                className="button button3"
                onClick={this.makepool}
                style={{ float: "right" }}
              >
                Create Pool
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default NewPool;
