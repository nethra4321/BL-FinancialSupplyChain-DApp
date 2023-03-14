import React, {Component} from "react";
import Web3 from "web3";
import { Link, Navigate } from "react-router-dom";

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
const receivedAddress = "0x5e724c7269AB1799013F9Eb76E13a26A54eC38aa";
const shippingAddress = "0x7a51d9E5baDec2322916557F617b10209827a48f";
const purchaseAddress = "0x45379A0feCE4FEB9E4f857FBdA3c2555eD193464";
let purchaseInstance = new web3.eth.Contract(purchaseAbi,purchaseAddress);
let shippingInstance = new web3.eth.Contract(shippingABI, shippingAddress);
let receivedInstance = new web3.eth.Contract(receivedABI, receivedAddress);
class Purchase extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buyer_account: this.props.buyer_account,
            eth_balance: this.props.eth_balance,
            purchase_form: {
                vendor:'Vendor A',
                vendor_address: '',
                product:'Product A',
                qty:0,
                amount: 0
            },
            vendors: [
                {
                    name:'Vendor A', 
                    address:'0x19584378D47C295728BdD79027104C9714D03A48',
                    products: [ 
                    { product_name: 'Product A', cost: 2 },
                    { product_name: 'Product B', cost: 6 },
                    ]
                },
                {
                    name:'Vendor B',
                    address:'0x97F014c59d8D5c70E2b5C30b2d9bC4138c2894D2', 
                    products: [ 
                    { product_name: 'Product A', cost: 3 },
                    { product_name: 'Product B', cost: 5 },
                    ]
                },
            ]
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({purchase_form: { ...this.state.purchase_form, [name]: value } },()=> {
            // console.log(this.state.purchase_form);
            // let amount = this.state.purchase_form.amount;
            let vendor = this.state.vendors.filter(obj => obj.name === this.state.purchase_form.vendor);
            //console.log(vendor[0]);
            this.setState({purchase_form: {...this.state.purchase_form, vendor_address:vendor[0].address}},()=>{
                //console.log(this.state.purchase_form);
                let product = vendor[0].products.filter(obj => obj.product_name === this.state.purchase_form.product);
                this.setState({purchase_form: {...this.state.purchase_form, amount:this.state.purchase_form.qty * product[0].cost}}, () => {
                    console.log(this.state.buyer_account);
                    console.log(this.state.purchase_form);
                });  
            });
                   
        });
  
      }
        
    submitForm = async() => {
        console.log(this.state.purchase_form);
    
        const userAccounts = await web3.eth.getAccounts();
        const account = userAccounts[0];
        //console.log(account);
        
       // const purchaseInstance = new web3.eth.Contract(purchaseAbi, purchaseAddress);
        console.log(purchaseInstance);
        console.log(typeof(this.state.buyer_account));
        const buyer_address = web3.utils.toChecksumAddress(this.state.buyer_account);
        const vendor_address = web3.utils.toChecksumAddress(this.state.purchase_form.vendor_address);
        purchaseInstance.methods.placePurchaseOrder
        (
            buyer_address,
            vendor_address,
            this.state.purchase_form.product,
            parseInt(this.state.purchase_form.qty),
            this.state.purchase_form.amount
        )
            .send({from:buyer_address,value:web3.utils.toWei(this.state.purchase_form.amount.toString(), "ether"), gas:200000})
            .then((result) => {
                console.log(result);
                alert("Purchase made");
                <Navigate to="/dashboard" />
            })
            .catch((error) => {
                console.error("Transaction error:", error);
            });
        console.log(purchaseInstance);
        console.log(buyer_address);
        console.log(typeof(buyer_address));
        console.log(vendor_address);
        
}

    get_account = async() => {
        const userAccounts = await web3.eth.getAccounts();
        const account = userAccounts[0];
        //console.log(account);
        let accountBalance = await web3.eth.getBalance(account);
        //console.log(accountBalance);
        this.setState({buyer_account: account, eth_balance: accountBalance},()=>{});
    }

    componentDidMount = async() => {
        this.get_account();
        purchaseInstance.events.NewOrderPlaced()
        .on("data",(event) => {
            console.log("data received");
            console.log(event);
            let ret_values = event.returnValues;
            //WORKS - SET UP THE EVENT LISTENER BEFORE THE EVENT TAKES PLACE FOR IT TO WORK
            shippingInstance.methods.ship(
              ret_values.orderId,
              ret_values.buyer,
              ret_values.vendor,
              ret_values.product,
              ret_values.quantity,
              ret_values.amount).send({"from":this.state.buyer_account,"gas":300000},(res) => {
              console.log(res);
            }) 
        })
        .on("error",((error,receipt) => {
            console.log(error);
        }))
        console.log(purchaseInstance);

        shippingInstance.events.ProductShipped()
        .on("data", (event) => {
          console.log("after product shipped event");
          console.log(event);
          let ret_values = event.returnValues;
          receivedInstance.methods.receive_product(ret_values.shipID,ret_values.orderID,ret_values.buyer,ret_values.vendor,
            ret_values.product,ret_values.num_days,ret_values.qty,ret_values.amount)
            .send(
              {"from":this.state.buyer_account,"gas":300000},
              (res) => {
            console.log(res);
            console.log("bill generated");
          })
        })

    }

    render() {
        //console.log(this.state);
        return (
            <>
                {/* <button
                    className="button icon-left"
                    onClick={this.props.history.goBack}>
                    Back
                </button> */}
            <br></br>
            <Link to="/" className="m-3 text-decoration-underline">Go Back</Link>
            <br></br>
            <div className="container m-3 p-3">
                <div className="flex w-screen h-screen justify-center text-center">
                    <h4>Purchase Order</h4>
                    <hr></hr>
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" >
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vendor">
                                Vendor
                            </label>
                            <br></br>
                            {/* <input name="vendor" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={this.state.purchase_form.vendor} onChange={this.handleChange} id="vendor" type="text" placeholder="Vendor" /> */}
                            <select name="vendor" onChange={this.handleChange}>
                                <option>Vendor A</option>
                                <option>Vendor B</option>
                            </select>
                        </div>
                        <br></br>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product">
                                Type of Product
                            </label>
                            <br></br>
                            {/* <input name="product" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="product" value={this.state.purchase_form.product} onChange={this.handleChange} type="text" placeholder="Type of Product" /> */}
                            <select name="product" onChange={this.handleChange}>
                                <option>Product A</option>
                                <option>Product B</option>
                            </select>
                        </div>
                        <br></br>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amtprod">
                                Quantity
                            </label>
                            <br></br>
                            <input name="qty" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-70 leading-tight focus:outline-none focus:shadow-outline" id="amtprod" type="text" value={this.state.purchase_form.qty} onChange={this.handleChange} placeholder="Amount" />
                        </div>
                        <br></br>
                        
                        <div className="flex items-center justify-between">
                            <button className="btn btn-primary" onClick={this.submitForm}>
                                Order
                            </button>
                        </div>
                        <br></br>
                        <div className="flex items-center justify-between">
                            <button className="btn btn-primary" onClick={this.listenEvent}>
                                View Past Events
                            </button>
                        </div>
                        <hr></hr>
                        <p className="text-danger">Your amount in ETH is: {this.state.purchase_form.amount}</p>
                    </div>
                </div>
            </div>
        </>
        );
      }
}

export default Purchase;