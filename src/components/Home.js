import React, {Component} from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import WhitelistJSON from "../build/contracts/Whitelist.json";


const whitelistABI = WhitelistJSON["abi"];
const whitelistAddress = "0x83887b8C4614b1dF823e7bA0D771F79F49979402";
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isConnected: false,
            buyer_account: '',
            ethBalance: '',
            value: 10,
            admin: false
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
            let admin = false;
            let accountBalance = await web3.eth.getBalance(account); 
            console.log(accountBalance);
            if(account === "0x42dCD7eDc82ab6671b51886B638243eCFeFcbBbC") {
                admin = true;
            }
            this.setState({isConnected:true, buyer_account: account, ethBalance:accountBalance, admin: admin}, () => {
              console.log(this.state.isConnected);
              console.log(this.state.ethBalance);
              console.log(this.state.buyer_account);
              window.localStorage.setItem("buyer_acc;ount",this.state.buyer_account);
              window.localStorage.setItem("admin",this.state.admin);
              //gets updated
            })
        }
      }
      
      disconnect = () => {
        this.setState({isConnected:false});
        window.localStorage.removeItem("buyer_account");
        window.localStorage.removeItem("admin");
      }

      whitelistReq = async() => {
        //create instance of whitelist req contract - add it to whitelistreqarray
        //in admin requested addresses should show - on approval - add it to whitelist array, rejection means delete
        //if already added to whitelist, get alert saying already added to whitelist
        //create instance of whitelist, get the addresses. if already there then above msg
        const web3 = new Web3("ws://127.0.0.1:7545");
        const whitelistInstance = new web3.eth.Contract(whitelistABI,whitelistAddress);
        console.log(whitelistInstance);
  
        const allowedAddresses = await whitelistInstance.methods.getAddresses().call();
        console.log(allowedAddresses);
        if(allowedAddresses.includes(window.localStorage.getItem("buyer_account"))) {
          alert("Already added to the whitelist");
        }
        else {
          whitelistInstance.methods.addAddress(window.localStorage.getItem("buyer_account"))
          .send({from:window.localStorage.getItem("buyer_account"),gas:300000})
          .then((res) => {
            console.log(res);
            alert("Added to the whitelist");
          })
        }
      }

      componentDidMount = async() => {
        let buyer_account = window.localStorage.getItem("buyer_account");
        if(buyer_account !== null) {
          const web3 = new Web3("http://127.0.0.1:7545");
          let account_balance = await web3.eth.getBalance(buyer_account);
          this.setState({...this.state, buyer_account:buyer_account, ethBalance: account_balance},()=>{})
        }
      }
    
      render() {
        let displayed_balance = this.state.ethBalance/1e18;
        console.log(this.state.buyer_account);
        console.log(this.state.eth_balance);
        console.log(window.localStorage.getItem("buyer_account"));
        return (
          <div className="container m-3 p-3">
          
          <div className="container m-3">
            {(window.localStorage.getItem("buyer_account")===null && !this.state.isConnected) && (
            <button className="btn btn-primary" onClick={this.connect}>
              Login via metamask
              </button>
            )}
            </div>
            <div className="container m-3">
            { (window.localStorage.getItem("buyer_account") !== null || this.state.isConnected ) && (
                <React.Fragment>
                  <p className="display-4 text-success">BL DApp</p>
                  <br></br>
                  <p className="display-4">Balance is: {displayed_balance} ETH</p>
                  <br></br>
                  <div className="text-center">
                    {/* <button className="btn btn-outline-primary">Place order</button> */}
                    <Link to={{pathname:"/purchase"}} state={{ buyer_account: this.state.buyer_account, ethBalance: this.state.ethBalance}} className="btn btn-danger">Place order</Link>
                  </div>
                  <br></br><br></br>
                  <div className="text-center">
                    {/* <button className="btn btn-outline-primary">Place loan</button> */}
                    <Link to="/loan" className="btn btn-danger">Place loan</Link>
                  </div>
                  <br></br><br></br>
                  <div className="text-center">
                  <Link to="/dashboard" className="btn btn-danger">View Transaction History</Link>
                  </div>
                  <br></br><br></br>
                  <div className="text-center">
                  <Link to="/event-dashboard" className="btn btn-danger">View Event History</Link>
                  </div>
                  <br></br><br></br>
                  <div className="text-center">
                  <button className="btn btn-danger" onClick={this.whitelistReq}>Request to add to whitelist</button>
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