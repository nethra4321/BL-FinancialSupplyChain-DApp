import React, {Component} from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import WhitelistJSON from "../build/contracts/Whitelist.json";
import WhiteListRequestJSON from "../build/contracts/WhitelistRequest.json";
import { whitelistAddress, whitelistRequestAddress } from "../constants";
let count = 1;
const whitelistABI = WhitelistJSON["abi"];
const whitelistRequestABI = WhiteListRequestJSON["abi"];
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isConnected: false,
            buyer_account: '',
            ethBalance: '',
            value: 10,
            admin: false,
            whitelistreq: []
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
            if(account === "0x9dAeDe189d022Dc96912284D31D6153c33d86bfF") {
                admin = true;
            }
            this.setState({isConnected:true, buyer_account: account, ethBalance:accountBalance, admin: admin}, () => {
              console.log(this.state.isConnected);
              console.log(this.state.ethBalance);
              console.log(this.state.buyer_account);
              window.localStorage.setItem("buyer_account",this.state.buyer_account);
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
          const whitelistRequestInstance = new web3.eth.Contract(whitelistRequestABI,whitelistRequestAddress);
          const allowedAddresses = await whitelistRequestInstance.methods.getRequestedAddresses().call();
          console.log(allowedAddresses);
          if(allowedAddresses.includes(window.localStorage.getItem("buyer_account"))) {
              alert("Already requested access previously. Wait for admin to approve");
          }
          else {
            whitelistRequestInstance.methods.addRequestedAddress(window.localStorage.getItem("buyer_account"))
            .send({from:window.localStorage.getItem("buyer_account"),gas:300000})
            .then((res) => {
              console.log(res);
              alert("Requested access successfully");
            })
          }
        }
      }

      componentDidMount = async() => {
        let buyer_account = window.localStorage.getItem("buyer_account");
        let admin = window.localStorage.getItem("admin");
        if(buyer_account !== null) {
          const web3 = new Web3("ws://127.0.0.1:7545");
          let account_balance = await web3.eth.getBalance(buyer_account);
          this.setState({...this.state, buyer_account:buyer_account, ethBalance: account_balance, admin:admin}, async ()=>{
              const whiteListRequestInstance = new web3.eth.Contract(whitelistRequestABI,whitelistRequestAddress);
              const allowedAddresses = await whiteListRequestInstance.methods.getRequestedAddresses().call();
              this.setState({...this.state, whitelistreq:[...this.state.whitelistreq,allowedAddresses]},() => {
                console.log(this.state);
              })
          })
        }
      }
    
      approveaddress = (address) => {
        const web3 = new Web3("ws://127.0.0.1:7545");
        const whitelistInstance = new web3.eth.Contract(whitelistABI,whitelistAddress);
        console.log(whitelistInstance);
        whitelistInstance.methods.addAddress(address)
            .send({from:window.localStorage.getItem("buyer_account"),gas:300000})
            .then((res) => {
              console.log(res);
              alert("Added to whitelist");
              this.setState((prevState) => ({
                ...prevState,
                whitelistreq: prevState.whitelistreq.filter((add) => add !== address)
              }))
            })
      }

      render() {
        let displayed_balance = this.state.ethBalance/1e18;
        console.log(this.state);
        const render_whitelist = this.state.whitelistreq.map((item,key) => {
          if(key<this.state.whitelistreq.length/2) {
            return (
            <tr key={key}>
            <td>{item}</td>
            <td><button className="btn btn-primary button-color" onClick={() => this.approveaddress(item[0])}>Approve</button></td>
            </tr>
            );
          }
       })
        console.log(window.localStorage.getItem("buyer_account"));
        return (
          <div>
            
              {(window.localStorage.getItem("buyer_account") === null && !this.state.isConnected) && (
                <div class="text-center">
                  <button className="btn btn-primary button-color" onClick={this.connect}
                    style={{
                      position: 'fixed',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    Login via metamask                  
                  </button>
                  <img src="https://tinyurl.com/ytbufh5k" style={{width:"300px",height:"300px"}}></img>
                </div>

             
              )}
        
            {((window.localStorage.getItem("buyer_account") !== null || this.state.isConnected) && this.state.admin === "true") && (
              <React.Fragment>
                <nav className="navbar navbar-expand-lg custom-navbar-bg ">
                  <ul className="nav justify-content-center">
                  <li className="nav-item">
                      <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link to={{ pathname: "/purchase" }} state={{ buyer_account: this.state.buyer_account, ethBalance: this.state.ethBalance }} className="nav-link">Place order</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/Loan" className="nav-link">Place loan</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/dashboard" className="nav-link">View Transaction History</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/event-dashboard" className="nav-link">View Event History</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" onClick={this.whitelistReq}>Request to add to whitelist</Link>
                    </li>
                    {/* <li className="nav-item">
                      <Link to="/whitelist" className="nav-link" onClick={this.whitelistReq}>Request to add to whitelist</Link>
                    </li> */}
                    <li className="nav-item">
                      <Link to="/" className="nav-link" onClick={this.disconnect}>Logout</Link>
                    </li>
                  </ul>
                </nav>
                <p className="display-4 text-white">Blockchain DApp</p>
                <br></br>
                <p className="display-4 text-white">Balance is: {displayed_balance} ETH</p>
                <br></br>
              </React.Fragment>
            )}
            {((window.localStorage.getItem("buyer_account") !== null || this.state.isConnected) && this.state.admin === "false") && (
              <>
                <p class="display-4" style={{color:"white"}}>Hello admin</p>
                <br></br>
                <p class="display-6" style={{color:"white"}}>Whitelist requests</p>
                <hr></hr>
                <div className="res" style={{background: 'linear-gradient(to right, rgba(255, 171, 82, 1), rgba(138, 42, 89, 1))',display:"block",maxWidth:"50%"}}>
                <table class="table  text-center  table-bordered">
                  <thead>
                    <tr>
                      <th>Addresses</th>
                      <th>Allow</th>
                    </tr>
                  </thead>
                  <tbody>
                    {render_whitelist}
                  </tbody>
                </table>
                </div>
                <br></br><br></br>
                <div className="text-center">
                  <button className="btn btn-primary button-color" onClick={this.disconnect}>
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        );
        
      } 
}

export default Home;