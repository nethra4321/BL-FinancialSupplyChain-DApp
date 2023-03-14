import React, {Component} from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";

const web3 = new Web3("ws://127.0.0.1:7545");
class NewEvent extends Component {
    
    constructor(props) {
        super(props);
        this.state ={}
    }

    render() {
        console.log(this.props.event);
        return (
            <div className="container m-3 p-3">
                {this.props.event.event==="NewOrderPlaced" && (
                    <>
                    <h4>Order Event</h4>
                    <muted>Mined in block Number: {this.props.event.blockNumber}</muted><br></br>
                    <muted>Order ID: {this.props.event.returnValues.orderId}</muted><br></br>
                    <muted>Block Hash: {this.props.event.blockHash}</muted><br></br>
                    <muted>ID: {this.props.event.id}</muted>
                    <hr></hr>
                    <p>Buyer: {this.props.event.returnValues.buyer}</p>
                    <p>Vendor: {this.props.event.returnValues.vendor}</p>
                    <p>Product: {this.props.event.returnValues.product}</p>
                    <p>Quantity: {this.props.event.returnValues.quantity}</p>
                    <p>Amount: {this.props.event.returnValues.amount}</p>
                    </>
                )}
                {this.props.event.event==="ProductShipped" && (
                    <>
                    <h4>Shipped Event</h4>
                    <muted>Mined in block Number: {this.props.event.blockNumber}</muted><br></br>
                    <muted>Ship ID: {this.props.event.returnValues.shipID}</muted><br></br>
                    <muted>Block Hash: {this.props.event.blockHash}</muted><br></br>
                    <muted>ID: {this.props.event.id}</muted>
                    <hr></hr>
                    <p>Order ID: {this.props.event.returnValues.orderID}</p>
                    <p>Buyer: {this.props.event.returnValues.buyer}</p>
                    <p>Vendor: {this.props.event.returnValues.vendor}</p>
                    <p>Product: {this.props.event.returnValues.product}</p>
                    <p>Quantity: {this.props.event.returnValues.qty}</p>
                    <p>Amount: {this.props.event.returnValues.amount}</p>
                    </>
                )}
                {this.props.event.event==="ProductReceived" && (
                    <>
                    <h4>Received Event</h4>
                    <muted>Mined in block Number: {this.props.event.blockNumber}</muted><br></br>
                    <muted>Bill ID: {this.props.event.returnValues.billID}</muted><br></br>
                    <muted>Block Hash: {this.props.event.blockHash}</muted><br></br>
                    <muted>ID: {this.props.event.id}</muted>
                    <hr></hr>
                    <p>Ship ID: {this.props.event.returnValues.shipID}</p>
                    <p>Order ID: {this.props.event.returnValues.orderID}</p>
                    <p>Buyer: {this.props.event.returnValues.buyer}</p>
                    <p>Vendor: {this.props.event.returnValues.vendor}</p>
                    <p>Product: {this.props.event.returnValues.product}</p>
                    <p>Quantity: {this.props.event.returnValues.qty}</p>
                    <p>Amount: {this.props.event.returnValues.amount}</p>
                    </>
                )}
            </div>
        );
    }
}

export default NewEvent;