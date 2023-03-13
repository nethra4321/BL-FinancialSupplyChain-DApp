/* eslint-disable */
import React, {Component} from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";

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


class EventDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // order_events: [],
            // shipping_events: [],
            // receiving_events: [],
            // loan_events: [],
        }
    }

    listenEvent = async() => {
        // contract to get past events
  
          //console.log(purchaseInstance);
          //get past events
          pastOrderEvents = await purchaseInstance.getPastEvents('NewOrderPlaced', {
              fromBlock: 0,
              toBlock: 'latest'
          });
  
          pastShippingEvents = await shippingInstance.getPastEvents('ProductShipped', {
            fromBlock: 0,
            toBlock: 'latest'
          });
  
          pastReceivingEvents = await receivedInstance.getPastEvents('ProductReceived', {
            fromBlock: 0,
            toBlock: 'latest'
          })
      }

    componentDidMount = async() => {
        await this.listenEvent();
        // console.log(pastOrderEvents);
        // console.log(pastShippingEvents);
        // console.log(pastReceivingEvents);
        let order_ids = [];
        let order_events = [];
        let shipping_ids = [];
        let shipping_events = [];
        let bill_ids = [];
        let bill_events = [];

        for(let item of pastOrderEvents) {
            console.log(item);   
            // if(!order_ids.includes(item.returnValues.orderId)) {
            //     this.setState({
            //         ...this.state, 
            //         order_events: [...this.state.order_events, item]},
            //         () => { console.log(this.state);});
            // }
            if(!order_ids.includes(item.returnValues.orderId)) {
                order_ids.push(item.returnValues.orderId);
                order_events.push(item);
            };
        }
        
        for(let item of pastShippingEvents) {
            // if(!this.state.shipping_ids.includes(item.returnValues.shipID)) {
            //     this.setState({
            //         ...this.state, 
            //         shipping_ids:[...this.state.shipping_ids,item.returnValues.shipID],
            //         shipping_events: [...this.state.shipping_events, item]},
            //         () => {});
            // }
            if(!shipping_ids.includes(item.returnValues.shipID)) {
                shipping_ids.push(item.returnValues.shipID);
                shipping_events.push(item);
            }
        }

        for(let item of pastReceivingEvents) {
            // if(!this.state.bill_ids.includes(item.returnValues.billID)) {
            //     this.setState({
            //         ...this.state, 
            //         bill_ids:[...this.state.bill_ids,item.returnValues.billID],
            //         receiving_events: [...this.state.receiving_events, item]},
            //         () => {});
            //     }
            if(!bill_ids.includes(item.returnValues.billID)) {
                bill_ids.push(item.returnValues.billID);
                bill_events.push(item);
             }
        }
        console.log(shipping_events);
        console.log(bill_events);
    }

    render() {
        console.log(this.state);
        console.log(shipping_events);
        // const bills = bill_events.map((bill,key) => {
        //     return <ul class="list-group">
        //         <h4>Event rendered</h4>
        //     </ul>
        // })
        return (
            <>
             <br></br>
            <Link to="/" className="m-3 text-decoration-underline">Go Back</Link>
            <br></br>
            <div className="container m-3 p-3">

            </div>
            </>
        );
    }
}

export default EventDashboard;