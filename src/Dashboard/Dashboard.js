import React from "react";
import "./Dashboard.css";
import Web3 from "web3";
import { COMMITTEE_ADDRESS, COMMITTEE_ABI } from "../config.js";
import App from "../App";
class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.w3_open = this.w3_open.bind();
    this.onClick = this.onClick.bind();
  }

  state = {
    //State Varibales for manipulating Component and render diffrent information
    commiteeContract: [],
    currentUserAccount: [],
    back: false,
    poolAmount: 0,
    poolSec: 0,
    poolActiveStatus: "Closed",
    poolLimit: 3,
    showDetails: false,
    headingContent: "Welcome to Commitee System",
    commiteeDetails: [],
    members: ["Haris", "Shahrukh", "Nauraiz"],
  };

  w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
  }

  componentDidMount() {
    //only called once the compoenet have been completely loaded
    this.loadBlockchainData();
  }

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

  moveBack = () => {
    this.setState({ back: true });
  };

  //This function calls the deployee contract function leave commitee which remove this address person from commitee
  leaveCommitee = async () => {
    console.log("Leave Commitee");
    await this.state.commiteeContract.methods
      .leaveCommitee(this.state.currentUserAccount)
      .call();
  };

  //This function consist of mutiple access varibale of contract and get the information for pool form deployeed contract
  commiteeDetails = async () => {
    this.setState({ showDetails: true });
    console.log("Pool Details");
    this.setState({ headingContent: "Commitee Details" });
    let tempArr = [];
    //get quorum or limited number members that can join the pool
    let candidatesCount = await this.state.commiteeContract.methods
      .quorum()
      .call();
    for (let i = 1; i <= candidatesCount; i++) {
      //get members from contract
      var candidate = await this.state.commiteeContract.methods
        .members(i)
        .call();
      tempArr.push(candidate[0]);
    }
    this.setState({ members: tempArr });
    //get status of Contract either active or in active
    let activeStatus = await this.state.commiteeContract.methods
      .isActive()
      .call();
    let activemyStatus = "Open";
    if (activeStatus) {
      activemyStatus = "Closed";
    }
    this.setState({
      poolActiveStatus: activemyStatus,
      poolAmount:
        (await this.state.commiteeContract.methods.amount().call()) /
        1000000000000000000,
      poolSec:
        (await this.state.commiteeContract.methods.security_amount().call()) /
        1000000000000000000,
      poolLimit: await this.state.commiteeContract.methods.quorum().call(),
    });
  };

  //This function add the member to the exsiting pool by calling contract function addMember which take the address of member o be added
  addMember = async () => {
    console.log("Join Pool");
    let tempArr = await this.state.commiteeContract.methods
      .addMember(this.state.currentUserAccount, "Dummy")
      .call();
  };

  // this function calling requires certain amount in ether while calling it .. it add the amount ot commitee
  payCommitee = async () => {
    console.log("Pay Commitee");

    await this.state.commiteeContract.methods
      .payCommittee(this.state.currentUserAccount)
      .call();
  };

  // if one cycle have been completed ...  user can call this withdraw commitee function which will give the commitee to the person in seq fashion
  withdrawCommitee = async () => {
    console.log("Commitee WithDrawn");
    await this.state.commiteeContract.methods.withdrawCommitee().call();
  };

  // Modal Image Gallery
  onClick(element) {
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
    var captionText = document.getElementById("caption");
    captionText.innerHTML = element.alt;
  }

  render() {
    //renders on the basis of buttons
    if (this.state.back) {
      this.state.back = false;
      return <App />;
    } else {
      return (
        <React.Fragment>
          <nav
            className="w3-sidebar w3-red w3-collapse w3-top w3-large w3-padding"
            style={{ zIndex: "3", width: "300px", fontWeight: "bold" }}
            id="mySidebar"
          >
            <div
              className="w3-container"
              style={{ backgroundColor: "crimson" }}
            >
              <h3 className="w3-padding-32">
                <b>Menu</b>
              </h3>
            </div>
            <h3> Commitee</h3>

            <div
              style={{ backgroundColor: "crimson" }}
              className="w3-bar-block"
            >
              <a
                onClick={this.commiteeDetails}
                className="w3-bar-item w3-button w3-hover-white"
              >
                Pool Details
              </a>
            </div>
            <h3> Want To</h3>
            <div
              style={{ backgroundColor: "crimson" }}
              className="w3-bar-block"
            >
              <a
                href="#services"
                onClick={this.addMember}
                className="w3-bar-item w3-button w3-hover-white"
              >
                Join Pool
              </a>
              <a
                href="#services"
                // Functon call once user press on Pay Committee button
                onClick={this.payCommitee}
                className="w3-bar-item w3-button w3-hover-white"
              >
                Pay Commitee
              </a>
              <a
                href="#designers"
                // Functon call once user press on WithDraw Committee

                onClick={this.withdrawCommitee}
                className="w3-bar-item w3-button w3-hover-white"
              >
                Withdraw Commitee
              </a>
              <a
                href="#packages"
                // Functon call once user press on Leave Pool
                onClick={this.leaveCommitee}
                className="w3-bar-item w3-button w3-hover-white"
              >
                Leave Pool
              </a>
              <a
                href="#contact"
                onClick={this.moveBack}
                className="w3-bar-item w3-button w3-hover-white"
              >
                Back
              </a>
            </div>
          </nav>

          <h2 style={{ paddingLeft: "350px" }}>{this.state.headingContent}</h2>

          {this.state.showDetails && (
            <React.Fragment>
              <br />
              <div></div>
              <br />
              <h4 style={{ paddingLeft: "350px" }}>
                <strong>Members</strong>
              </h4>

              <ul style={{ paddingLeft: "420px" }}>
                {this.state.members.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div />
              <h4 style={{ paddingLeft: "350px" }}>
                <strong>Amount</strong>
              </h4>
              <ul style={{ paddingLeft: "420px" }}>
                <li key={this.state.poolAmount}>{this.state.poolAmount}</li>
              </ul>
              <div />
              <h4 style={{ paddingLeft: "350px" }}>
                <strong>Security</strong>
              </h4>
              <ul style={{ paddingLeft: "420px" }}>
                <li key={this.state.poolSec}>{this.state.poolSec}</li>
              </ul>
              <div />
              <h4 style={{ paddingLeft: "350px" }}>
                <strong>Active Status</strong>
              </h4>
              <ul style={{ paddingLeft: "420px" }}>
                <li key={this.state.poolActiveStatus}>
                  {this.state.poolActiveStatus}
                </li>
              </ul>
              <div />
              <h4 style={{ paddingLeft: "350px" }}>
                <strong>Pool Limit</strong>
              </h4>
              <ul style={{ paddingLeft: "420px" }}>
                <li key={this.state.poolLimit}>{this.state.poolLimit}</li>
              </ul>
              <div />
            </React.Fragment>
          )}
        </React.Fragment>
      );
    }
  }
}

export default Dashboard;
