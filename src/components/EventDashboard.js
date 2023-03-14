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
const shippingAddress = "0x7a51d9E5baDec2322916557F617b10209827a48f";
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
const receivedAddress = "0x5e724c7269AB1799013F9Eb76E13a26A54eC38aa";

const purchaseAddress = "0xbF0633a469D077FFB50E15e090709510A54B6f46";
let purchaseInstance = new web3.eth.Contract(purchaseAbi,purchaseAddress);
let shippingInstance = new web3.eth.Contract(shippingABI, shippingAddress);
let receivedInstance = new web3.eth.Contract(receivedABI, receivedAddress);
var pastOrderEvents,pastReceivingEvents,pastShippingEvents;
let order_ids = [];
let shipping_ids = [];
let bill_ids = [];

class EventDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order_events: [],
            shipping_events: [],
            receiving_events: [],
            buyer_account: '',
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
            </>
        );
    }
}

export default EventDashboard;