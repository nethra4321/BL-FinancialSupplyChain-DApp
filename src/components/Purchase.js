import React, {Component} from "react";
import Web3 from "web3";
import { Link, Redirect } from "react-router-dom";

const web3 = new Web3('http://localhost:8545');

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
                    address:'0xA6eF4063C80E6E9b8Ecbed72D956842039375Ea6',
                    products: [ 
                    { product_name: 'Product A', cost: 2 },
                    { product_name: 'Product B', cost: 6 },
                    ]
                },
                {
                    name:'Vendor B',
                    address:'0xE7C8BB9f35A781432feC8CA12Dbae0fFDa4C9a84', 
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
        const purchaseAddress = "0x21247B1e29f834311949EEE89F97A7f5747d1460";
        const userAccounts = await web3.eth.getAccounts();
        const account = userAccounts[0];
        //console.log(account);
        
        const purchaseInstance = new web3.eth.Contract(purchaseAbi, purchaseAddress);
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
                <Redirect to="/dashboard" />
            })
            .catch((error) => {
                console.error("Transaction error:", error);
            });

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