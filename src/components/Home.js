import React, {Component} from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isConnected: false,
            buyer_account: '',
            ethBalance: '',
            value: 10
        }
      }
    
      detectCurrentProvider = () => {
        let provider;
        if(window.ethereum) {
          provider = window.ethereum;
        }
        else if(window.web3) {
          provider = window.web3;
        }
        else {
          alert("You need to set up Metamask to login");
        }
    
        return provider;
      }
      connect = async() => {
        // console.log("use effect works");
        const provider = this.detectCurrentProvider();
        if(provider !== undefined) {
            await provider.request({method:'eth_requestAccounts'}); //give access to user accounts on metamask
            const web3 = new Web3(provider); //create a web3 object
            const userAccount = await web3.eth.getAccounts(); //obtain the user accounts on metamask
            // console.log(userAccount);
            const account = userAccount[0]; //obtain current account
            console.log(account);
            let accountBalance = await web3.eth.getBalance(account); 
            console.log(accountBalance);
            this.setState({isConnected:true, buyer_account: account, ethBalance:accountBalance}, () => {
              console.log(this.state.isConnected);
              console.log(this.state.ethBalance);
              console.log(this.state.buyer_account);
              //gets updated
            })
            // ethBalance:accountBalance
            // console.log(this.state.ethBalance);
            // console.log(this.state.value); //here set state doesnt update
            //WORKS
        }
      }
      
      disconnect = () => {
        this.setState({isConnected:false});
      }
    
      render() {
        let displayed_balance = this.state.ethBalance/1e18;
        console.log(this.state.buyer_account);
        console.log(this.state.eth_balance);
        return (
          <div className="container m-3 p-3">
          
          <div className="container m-3">
            {!this.state.isConnected && (
            <button className="btn btn-primary" onClick={this.connect}>
              Login via metamask
              </button>
            )}
            </div>
            <div className="container m-3">
            {this.state.isConnected && (
                <React.Fragment>
                  <p className="display-4 text-success">You are connected to Metamask</p>
                  <br></br>
                  <p className="display-4">Balance is: {displayed_balance} ETH</p>
                  <br></br>
                  <div className="text-center">
                    {/* <button className="btn btn-outline-danger">Place order</button> */}
                    <Link to={{pathname:"/purchase"}} state={{ buyer_account: this.state.buyer_account, ethBalance: this.state.ethBalance}} className="btn btn-outline-danger">Place order</Link>
                  </div>
                  <br></br><br></br>
                  <div className="text-center">
                    {/* <button className="btn btn-outline-danger">Place loan</button> */}
                    <Link to="/loan" className="btn btn-outline-danger">Place loan</Link>
                  </div>
                  <br></br><br></br>
                  <div className="text-center">
                  <Link to="/dashboard" className="btn btn-outline-danger">View Dashboard</Link>
                  </div>
                  <br></br><br></br>
                  <div className="text-center">
                    <button className="btn btn-primary" onClick={this.disconnect}>
                      Logout
                    </button>
                  </div>
                </React.Fragment>
            )}
            </div>
            </div>
        );
      } 
}

export default Home;