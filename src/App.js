import React from "react";
import "./App.css";
import NewPool from "./New_Pool/NewPool";
import Dashboard from "./Dashboard/Dashboard";

class App extends React.Component {
  constructor(props) {
    super(props);
    //State Variable for manupulating
    this.state = {
      isModelBoxShowed: false,
      DashboardDisplayed: false,
    };
    this.onModalBoxValueChange = this.onModalBoxValueChange.bind(this);
    this.RedirectToDashboard = this.RedirectToDashboard.bind(this);
  }

  //This function manipulate the falg for navgating to home screen and for making pool screen
  onModalBoxValueChange() {
    if (this.state.isModelBoxShowed === true) {
      this.setState({
        isModelBoxShowed: false,
      });
    } else {
      this.setState({
        isModelBoxShowed: true,
      });
    }
  }

  //This function use for Showing the Dashboard Display Main Home Screen
  RedirectToDashboard() {
    this.setState({
      DashboardDisplayed: true,
    });
  }
  render() {
    return (
      <React.Fragment>
        <div style={{ backgroundColor: "white" }}>
          {this.state.DashboardDisplayed === false ? (
            <div className={"ParentLayout"}>
              <div className={"Column1"}>
                <button
                  className="button button1"
                  onClick={this.RedirectToDashboard}
                >
                  Join Existing Pool
                </button>
                <button
                  className="button button3"
                  onClick={this.onModalBoxValueChange}
                >
                  Create New Pool
                </button>
              </div>

              <div className={"Column2"}></div>
              {this.state.isModelBoxShowed === true ? (
                <NewPool
                  ModalDisplay={this.state.isModelBoxShowed.toString()}
                ></NewPool>
              ) : null}
            </div>
          ) : (
            <Dashboard
              onModalBoxValueChange={this.onModalBoxValueChange}
              redy={"Hello"}
            ></Dashboard>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
