import React, {Component} from "react";
import Web3 from "web3";
import { Link, Navigate } from "react-router-dom";
import LoanJSON from "../build/contracts/Loan.json";
import LoanApprovedJSON from "../build/contracts/LoanApproved.json"
const web3 = new Web3("ws://127.0.0.1:7545");
const loanABI = LoanJSON["abi"];
const loanApprovedABI = LoanApprovedJSON["abi"];

let loanAddress="0x78fFE93CD2eeca516785BAf0c53b8B7F9E6E30A7";
let LoanApprovedAddress = "0x2AdE045C375B692177826b06b901cFd67117766e";
let loanInstance = new web3.eth.Contract(loanABI,loanAddress);
let loanApprovedInstance = new web3.eth.Contract(loanApprovedABI,LoanApprovedAddress);
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
                { provider: 'ICICI', address:'0x58ad76d7b2a6E83CAb4b1122bfAbf42fc2abe28d', interest_rate: 20},
                { provider: 'SBI', address:'0x46B1542FDa2cD96272690aEA1fEe9eC9E35Db806', interest_rate: 12}
            ]
        }
    }

    componentDidMount = async() => {
      loanInstance.events.NewLoanPlaced()
        .on("data",(event) => {
            console.log("data received");
            console.log(event);
            let ret_values = event.returnValues;
            //WORKS - SET UP THE EVENT LISTENER BEFORE THE EVENT TAKES PLACE FOR IT TO WORK
            console.log(ret_values);
            loanApprovedInstance.methods.loan_approve(
              ret_values.loanID,
              ret_values.borrower,
              ret_values.provider,
              ret_values.interest_rate,
              ret_values.amount).send({from:ret_values.provider,value:web3.utils.toWei((ret_values.amount/2).toString(),"ether"),gas:500000},(res) => {
              console.log(res);
            }) //sending half the amount in loan as two times the componentdidmount is triggered
          })
        .on("error",((error,receipt) => {
            console.log(error);
        }))
        //console.log(purchaseInstance);

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

          
          console.log(loanInstance);
          const accounts = await web3.eth.getAccounts();
          const user = accounts[0];
          console.log(user);
          loanInstance.methods.loan_request(
            user,
            this.state.loan_form.finance_provider_address,
            this.state.loan_form.loan_amt,
            this.state.loan_form.interest_rate
            )
            .send({
                from:this.state.loan_form.finance_provider_address, 
                value: web3.utils.toWei(this.state.loan_form.loan_amt.toString(),"ether"),
                gas:300000
            })
            .then((res) => {
                console.log(res);
                alert("Loan made");
                <Navigate to="/dashboard" />
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