import React, {Component} from "react";
import Web3 from "web3";
import { Link, Redirect } from "react-router-dom";

const web3 = new Web3("http://127.0.0.1:8545");

class Loan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loan_form: {
                finance_provider: '',
                finance_provider_address: '',
                loan_amt: 0,
                interest_rate: 0,
            },
            finance_providers: [
                { provider: 'ICICI', address:'0x71fD8848E137329Fee64C8a58572301d8451e3AF', interest_rate: 20},
                { provider: 'SBI', address:'0x3b8b721FFb01920cDC0F7C0B5E5655C25FC33Bb0', interest_rate: 12}
            ]
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        if(name === "finance_provider") {
            let provider = this.state.finance_providers.filter(obj => obj.provider === value);
            this.setState({loan_form: { ...this.state.loan_form, [name]: value, interest_rate: provider[0].interest_rate, finance_provider_address: provider[0].address } },()=> {
                console.log(this.state.loan_form);
            });
        }
        if(name === "loan_amt") {
            this.setState({loan_form: {...this.state.loan_form, [name]:value}},() => {
                console.log(this.state.loan_form);
            });
        }
      }

    submitForm = async() => {
        console.log(this.state.loan_form);
        if(this.state.loan_form.finance_provider==='') {
            alert("Enter a finance provider");
            return;
        }
        if(this.state.loan_form.loan_amt===0) {
            alert("Enter a valid loan amount");
            return;
        }

        const loanABI = [
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "borrower",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "provider",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "enum LoanStatus",
                  "name": "status",
                  "type": "uint8"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "interest_rate",
                  "type": "uint256"
                }
              ],
              "name": "NewLoanPlaced",
              "type": "event"
            },
            {
              "stateMutability": "payable",
              "type": "fallback",
              "payable": true
            },
            {
              "inputs": [],
              "name": "loan",
              "outputs": [
                {
                  "internalType": "address payable",
                  "name": "borrower",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "provider",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                },
                {
                  "internalType": "enum LoanStatus",
                  "name": "status",
                  "type": "uint8"
                },
                {
                  "internalType": "bool",
                  "name": "approved",
                  "type": "bool"
                },
                {
                  "internalType": "uint256",
                  "name": "interest_rate",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function",
              "constant": true
            },
            {
              "stateMutability": "payable",
              "type": "receive",
              "payable": true
            },
            {
              "inputs": [],
              "name": "getBalance",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function",
              "constant": true
            },
            {
              "inputs": [
                {
                  "internalType": "address payable",
                  "name": "_borrower",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "_provider",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "_interest_rate",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "_amount",
                  "type": "uint256"
                }
              ],
              "name": "approve_loan",
              "outputs": [],
              "stateMutability": "payable",
              "type": "function",
              "payable": true
            }
          ];
          const loanAddress="0xdD47398fD214Fb2875B335BF32f31dC0305EaB37";
          const loanInstance = new web3.eth.Contract(loanABI,loanAddress);
          console.log(loanInstance);
          const accounts = await web3.eth.getAccounts();
          const user = accounts[0];
          console.log(user);
          loanInstance.methods.approve_loan(
            user,
            this.state.loan_form.finance_provider_address,
            this.state.loan_form.loan_amt,
            this.state.loan_form.interest_rate
            )
            .send({
                from:this.state.loan_form.finance_provider_address, 
                value: web3.utils.toWei(this.state.loan_form.loan_amt.toString(),"ether"),
                gas:200000
            })
            .then((res) => {
                console.log(res);
                alert("Loan made");
                <Redirect to="/dashboard" />
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <>
             <br></br>
             <Link to="/" className="m-3 text-decoration-underline">Go Back</Link>
            <br></br>
            <div className="container m-3 p-3">
                <div className="flex w-screen h-screen justify-center text-center">
                    <h4>Loan Form</h4>
                    <hr></hr>
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="finance_provider">
                                Finance Provider
                            </label>
                            <br></br>
                            {/* <input name="finance_provider" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={this.state.loan_form.finance_provider} onChange={this.handleChange} id="vendor" type="text" placeholder="Finance Provider" /> */}
                            <select name="finance_provider" onChange={this.handleChange}>
                                <option>ICICI</option>
                                <option>SBI</option>
                            </select>
                        </div>
                        <br></br>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="loan_amt" onChange={this.handleChange}>
                                Loan Amount in ETH
                            </label>
                            <br></br>
                            <input name="loan_amt" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="product" value={this.state.loan_form.loan_amt} onChange={this.handleChange} type="text" placeholder="Type of Product" />
                        </div>
                        <br></br>
                        
                        <div className="flex items-center justify-between">
                            <button className="btn btn-primary" onClick={this.submitForm}>
                                Request Loan
                            </button>
                        </div>
                        <hr></hr>
                        <p className="text-danger">Amount to repay: {this.state.loan_form.loan_amt *((100+this.state.loan_form.interest_rate)/100)} ETH</p>
                    </div>
                </div>
            </div>
            </>
        );
      }
}

export default Loan;