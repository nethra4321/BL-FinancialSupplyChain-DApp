/* eslint-disable */
import React, {Component} from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import NewEvent from "./NewEvent";
import PurchaseJSON from "../build/contracts/Purchase.json";
import ShippingJSON from "../build/contracts/Shipping.json";
import ReceivedJSON from "../build/contracts/Received.json";
import LoanJSON from "../build/contracts/Loan.json";
import LoanApprovedJSON from "../build/contracts/LoanApproved.json";
import { receivedAddress, shippingAddress, purchaseAddress, loanAddress, loanApprovedAddress } from "../constants";
const web3 = new Web3('ws://localhost:7545');

const purchaseABI = PurchaseJSON["abi"];
const loanABI = LoanJSON["abi"];
const shippingABI = ShippingJSON["abi"];
const receivedABI = ReceivedJSON["abi"];
const loanApprovedABI = LoanApprovedJSON["abi"];

let loanInstance = new web3.eth.Contract(loanABI,loanAddress);
let loanApprovedInstance = new web3.eth.Contract(loanApprovedABI,loanApprovedAddress);
let purchaseInstance = new web3.eth.Contract(purchaseABI,purchaseAddress);
let shippingInstance = new web3.eth.Contract(shippingABI, shippingAddress);
let receivedInstance = new web3.eth.Contract(receivedABI, receivedAddress);

var pastOrderEvents,pastReceivingEvents,pastShippingEvents, pastLoanEvents, pastLoanApprovedEvents;
let order_ids = [];
let shipping_ids = [];
let bill_ids = [];
let loan_ids = [];
let loan_approved_ids = [];

class EventDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order_events: [],
            shipping_events: [],
            receiving_events: [],
            loan_events: [],
            loan_approved_events: []
        }
    }

    listenEvent = async() => {
        // function to get past events
          //console.log(this.state.buyer_account);
          pastOrderEvents = await purchaseInstance.getPastEvents('NewOrderPlaced', {
              fromBlock: 0,
              toBlock: 'latest',
              address: window.localStorage.getItem("buyer_account")
          });
          console.log(pastOrderEvents);
          pastShippingEvents = await shippingInstance.getPastEvents('ProductShipped', {
            fromBlock: 0,
            toBlock: 'latest',
            address: window.localStorage.getItem("buyer_account")
          });
          console.log(pastShippingEvents);
          pastReceivingEvents = await receivedInstance.getPastEvents('ProductReceived', {
            fromBlock: 0,
            toBlock: 'latest',
            address: window.localStorage.getItem("buyer_account")
          });
          console.log(pastReceivingEvents);
          pastLoanEvents = await loanInstance.getPastEvents('NewLoanPlaced', {
            fromBlock: 0,
            toBlock: 'latest',
            address: window.localStorage.getItem("buyer_account")
          })
          console.log(pastLoanEvents);
          pastLoanApprovedEvents = await loanApprovedInstance.getPastEvents('LoanApprovedEvent', {
            fromBlock: 0,
            toBlock: 'latest',
            address: window.localStorage.getItem("buyer_account")
          })
          console.log(pastLoanApprovedEvents);
      }

    componentDidMount = async() => {
      //componentDidMount rendered twice so order_ids got instantiated to empty array again and didn't register that its processed
      //moved order ids to outside the lifecycle method
        // this.setState(prevState => ({...prevState, buyer_account: window.localStorage.getItem("buyer_account")}));
        await this.listenEvent();
       
        //console.log(pastOrderEvents);
        for(let item of pastOrderEvents) {
            //console.log(item);   
            if(!order_ids.includes(item.returnValues.orderId)) {
                this.setState(prevState => ({
                    ...prevState,
                    order_events: [...prevState.order_events, item]}));
                    order_ids.push(item.returnValues.orderId);
                };
            }
        //console.log(this.state.order_events);
        //console.log(order_ids);

        console.log("first fn done");
        console.log(order_ids);
        for(let item of pastShippingEvents) {
          
            if(!shipping_ids.includes(item.returnValues.shipID)) {
                this.setState(prevState => ({
                  ...prevState,
                  shipping_events: [...prevState.shipping_events,item]
                }));
                shipping_ids.push(item.returnValues.shipID);
            }
        }
        console.log("second fn done");
        console.log(shipping_ids);
        //console.log(this.state.shipping_events);

        for(let item of pastReceivingEvents) {

            if(!bill_ids.includes(item.returnValues.billID)) {
                this.setState(prevState => ({
                  ...prevState,
                  receiving_events: [...prevState.receiving_events, item]
                }));
                bill_ids.push(item.returnValues.billID);
             }
        }
        console.log("third fn done");
        console.log(bill_ids);
        //console.log(this.state.receiving_events);
        for(let item of pastLoanEvents) {

          if(!loan_ids.includes(item.returnValues.loanID)) {
              this.setState(prevState => ({
                ...prevState,
                receiving_events: [...prevState.loan_events, item]
              }));
              loan_ids.push(item.returnValues.loanID);
           }
        } 
        console.log("fourth fn done");
        console.log(loan_ids);
        for(let item of pastLoanApprovedEvents) {

          if(!loan_approved_ids.includes(item.returnValues.receiptID)) {
              this.setState(prevState => ({
                ...prevState,
                receiving_events: [...prevState.loan_approved_events, item]
              }));
              loan_approved_ids.push(item.returnValues.receiptID);
           }
        }
        console.log("fifth fn done");
        console.log(loan_approved_ids); 
    }

    render() {
        console.log(this.state);
        const render_order_events = this.state.order_events.map((order_event,key) => { 
          return <ul key={key} className="list-group">
             <li className="list-group-item"><NewEvent key={key} event={order_event} /> </li>
          </ul>
         });
         const render_ship_events = this.state.shipping_events.map((shipping_event,key) => { 
          return <ul key={key} className="list-group">
             <li className="list-group-item"><NewEvent key={key} event={shipping_event} /> </li>
          </ul>
         });
         const render_received_events = this.state.receiving_events.map((receiving_event,key) => { 
          return <ul key={key} className="list-group">
             <li className="list-group-item"><NewEvent key={key} event={receiving_event} /> </li>
          </ul>
         });
         const render_loan_events = this.state.loan_events.map((loan_event,key) => { 
          return <ul key={key} className="list-group">
             <li className="list-group-item"><NewEvent key={key} event={loan_event} /> </li>
          </ul>
         });
         const render_loan_approved_events = this.state.loan_approved_events.map((loan_approved_event,key) => { 
          return <ul key={key} className="list-group">
             <li className="list-group-item"><NewEvent key={key} event={loan_approved_event} /> </li>
          </ul>
         });
        return (
            <>
             <br></br>
            <Link to="/" className="m-3 text-decoration-underline">Go Back</Link>
            <br></br>
            <div className="container m-3 p-3">
            {render_order_events}
            </div>
            <div className="container m-3 p-3">
            {render_ship_events}
            </div>
            <div className="container m-3 p-3">
            {render_received_events}
            </div>
            <div className="container m-3 p-3">
            {render_loan_events}
            </div>
            <div className="container m-3 p-3">
            {render_loan_approved_events}
            </div>
            </>
        );
    }
}

export default EventDashboard;