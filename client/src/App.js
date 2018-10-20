import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HackathonVotingContract from "./contracts/HackathonVoting.json";
import getWeb3 from "./utils/getWeb3";
import truffleContract from "truffle-contract";
import MainLayout from "./layouts/MainLayout";
import Teams from "./routes/Teams";
import SubmitTeam from './routes/SubmitTeam'
import Vote from "./routes/Vote";
import Sponsors from "./routes/Sponsors";
import Activity from "./routes/Activity";
import "./App.css";

class App extends Component {
  state = { web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const Contract = truffleContract(HackathonVotingContract);
      Contract.setProvider(web3.currentProvider);
      const instance = await Contract.deployed();

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      // this.setState({ web3, accounts, contract: instance }, this.runExample);
      this.setState({ web3, accounts, contract: instance }, this.getTeams);
    } catch (error) {
      // Catch any errors for any of the above operations.
      console.error(error);
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
    }
  };

  renderTeams = () => <Teams {...this.state} />
  renderSubmitTeam = () => <SubmitTeam {...this.state} />
  renderSponsors = () => <Sponsors {...this.state} />
  renderActivity = () => <Activity {...this.state} />

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <Router>
        <MainLayout>
          <Route exact path="/" render={this.renderTeams} />
          <Route path="/submit-team" render={this.renderSubmitTeam} />
          <Route path="/sponsors" render={this.renderSponsors} />
          <Route path="/activity" render={this.renderActivity} />
        </MainLayout>
      </Router>
    );
  }
}

export default App;
