/* eslint-disable */
import React, {Component} from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import Transaction from "./Transaction";

const web3 = new Web3("http://127.0.0.1:8545");
let transaction_list = [];
let tx_hash_list = [];

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_address: '',
            transactions: []
        }
    }

    componentDidMount = async() => {
        const user = window.localStorage.getItem("buyer_account");
        const latest_block = await web3.eth.getBlockNumber();
        this.getTransactionsByAccount(user, 0, latest_block);
        // console.log(transaction_list); 
        // console.log(tx_hash_list);
        this.setState({...this.state, user_address:window.localStorage.getItem("buyer_account")},() => {
        //     setTimeout(() => {
        //         this.state.transactions.map((transaction,key) => {
        //             // console.log(key);
        //             // console.log(transaction);
        //             <Transaction key={key} transaction={transaction} />
        //         });
        // },1500);
        console.log(this.state);
        this.componentD
        });
    }

    // componentDidUpdate = async() => {
    //     const user = window.localStorage.getItem("buyer_account");
    //     const latest_block = await web3.eth.getBlockNumber();
    //     console.log(user);
    //     console.log(latest_block);
    //     this.getTransactionsByAccount(user, 0, latest_block);
    //     this.setState({...this.state, user_address:window.localStorage.getItem("buyer_account")},() => {    
    //     });
    // }

    getTransactionsByAccount = async(myaccount, startBlockNumber, endBlockNumber)  => {
       console.log("in fn");
        if (endBlockNumber == null) {
          endBlockNumber = await web3.eth.blockNumber;
        //   console.log("Using endBlockNumber: " + endBlockNumber);
        }
        if (startBlockNumber == null) {
          startBlockNumber = endBlockNumber - 1000;
        //   console.log("Using startBlockNumber: " + startBlockNumber);
        }
        // console.log("Searching for transactions to/from account \"" + myaccount + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);
      
        for (var i = startBlockNumber; i <= endBlockNumber; i++) {
          if (i % 1000 === 0) {
            // console.log("Searching block " + i);
          }
          
          var block = await web3.eth.getBlock(i, true);
          //console.log(block);
          if (block != null && block.transactions != null) {
            block.transactions.forEach((e) => {
              if (!tx_hash_list.includes(e.hash) && (myaccount == e.from || myaccount == e.to) && e.to !== null && e.value>"0") {

                 tx_hash_list.push(e.hash);

                  transaction_list.push({
                  "tx_hash":e.hash,
                  "nonce":e.nonce,
                  "blockHash": e.blockHash,
                  "blockNumber": e.blockNumber,
                  "transactionIndex": e.transactionIndex,
                  "from": e.from,
                  "to": e.to,
                  "value": e.value,
                  "time":block.timestamp + " " + new Date(block.timestamp*1000).toGMTString(),
                  "gasPrice": e.gasPrice,
                  "gas": e.gas,
                  "input": e.input
                })

                this.setState({...this.state, transactions:[...this.state.transactions,transaction_list[transaction_list.length-1]]},()=>{})
              }
            })
          }
        }
    }

    render() {
       //console.log(this.state.transactions.length);
       const render_transactions = this.state.transactions.map((transaction,key) => { 
        return <ul key={key} className="list-group">
           <li className="list-group-item"><Transaction key={key} transaction={transaction} /> </li>
        </ul>
       });
       
      // console.log(render_transactions);
        return (
        <>
         <br></br>
             <Link to="/" className="m-3 text-decoration-underline">Go Back</Link>
            <br></br>
            <div className="container m-3 p-3">
            <h4 className="text-center">Dashboard</h4>
            <br></br>
            {render_transactions}
        </div>
        </>
        );
    }
}

export default Dashboard;