import React, {Component} from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";

const web3 = new Web3("ws://127.0.0.1:7545");
class Transaction extends Component {
    
    constructor(props) {
        super(props);
        this.state ={}
    }

    render() {
        console.log(this.props.transaction);
        return (
            <div className="container m-3 p-3">
                <h4>Transaction {this.props.transaction.blockNumber}</h4>
                <muted>Tx Hash: {this.props.transaction.tx_hash}</muted><br></br>
                <muted>Block Hash: {this.props.transaction.blockHash} </muted>
                <hr></hr>
                <h5>From: {this.props.transaction.from}</h5>
                <br></br>
                <h5>To: {this.props.transaction.to} </h5>
                <br></br>
                <h5>Value: {this.props.transaction.value} </h5>
                <br></br>
                <h5>Gas: {this.props.transaction.gas} </h5>
                <br></br>
            </div>
        );
    }
}

export default Transaction;