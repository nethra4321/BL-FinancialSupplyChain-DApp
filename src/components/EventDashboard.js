/* eslint-disable */
import React, {Component} from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import NewEvent from "./NewEvent";

const web3 = new Web3('ws://localhost:7545');
const purchaseAbi= [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "orderId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "vendor",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "product",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "quantity",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "NewOrderPlaced",
      "type": "event"
    },
    {
      "stateMutability": "payable",
      "type": "fallback",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "orders",
      "outputs": [
        {
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "vendor",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "product",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "qty",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount",
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
          "internalType": "address",
          "name": "_buyer",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_vendor",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_product",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_quantity",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "placePurchaseOrder",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    }
  ];

const shippingABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "shipID",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "num_days",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "orderID",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "vendor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "product",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "qty",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "ProductShipped",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "ship_orders",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "orderID",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "vendor",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "product",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "qty",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "generateRandomNumber",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_orderID",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "_buyer",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_vendor",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_product",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_qty",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "ship",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const receivedABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "billID",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "shipID",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "orderID",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "vendor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "product",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "num_days",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "qty",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "ProductReceived",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "receipts",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "shipID",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "orderID",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "vendor",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "product",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "num_days",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "qty",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
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
        "internalType": "bytes32",
        "name": "_shipID",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "_orderID",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "_buyer",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_vendor",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_product",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "_num_days",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "_qty",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "receive_product",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
const loanABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "loanID",
        "type": "bytes32"
      },
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
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "LoanRequestAddresses",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "LoanRequestList",
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
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "LoanRequestMapping",
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
    "name": "loan_request",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  }
];
const loanApprovedABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "receiptID",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "loanID",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "finance_provider",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "qty",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "LoanApprovedEvent",
    "type": "event"
  },
  {
    "stateMutability": "payable",
    "type": "fallback",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "LoanReceiptAddresses",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "LoanReceiptMapping",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "loanID",
        "type": "bytes32"
      },
      {
        "internalType": "address",
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
        "name": "interest_rate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
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
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "LoanReceipts",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "loanID",
        "type": "bytes32"
      },
      {
        "internalType": "address",
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
        "name": "interest_rate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
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
        "internalType": "bytes32",
        "name": "_loanID",
        "type": "bytes32"
      },
      {
        "internalType": "address",
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
    "name": "loan_approve",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  }
];
const receivedAddress = "0x1C57eE2cB9d8ecF5B528f149798c452B3D443670";
const shippingAddress = "0xFB3FF7Cb9466201a90609bbA97a14676e3C930F6";
const purchaseAddress = "0x767240cba30b563dDC659eDE0a8f641818c8001B";
const loanAddress="0x826244f01084887570f3E67Be95aa43cB8F81788";
const LoanApprovedAddress = "0x041a9889eAeFA244fA5A0540aa143c77985212da";

let loanInstance = new web3.eth.Contract(loanABI,loanAddress);
let loanApprovedInstance = new web3.eth.Contract(loanApprovedABI,LoanApprovedAddress);
let purchaseInstance = new web3.eth.Contract(purchaseAbi,purchaseAddress);
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
  
          pastShippingEvents = await shippingInstance.getPastEvents('ProductShipped', {
            fromBlock: 0,
            toBlock: 'latest',
            address: window.localStorage.getItem("buyer_account")
          });
  
          pastReceivingEvents = await receivedInstance.getPastEvents('ProductReceived', {
            fromBlock: 0,
            toBlock: 'latest',
            address: window.localStorage.getItem("buyer_account")
          });

          pastLoanEvents = await loanInstance.getPastEvents('NewLoanPlaced', {
            fromBlock: 0,
            toBlock: 'latest',
            address: window.localStorage.getItem("buyer_account")
          })

          pastLoanApprovedEvents = await loanApprovedInstance.getPastEvents('LoanApprovedEvent', {
            fromBlock: 0,
            toBlock: 'latest',
            address: window.localStorage.getItem("buyer_account")
          })
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