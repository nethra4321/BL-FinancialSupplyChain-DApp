import React, {Component} from "react";
import Web3 from "web3";
import { Link, Navigate } from "react-router-dom";
import PurchaseJSON from "../build/contracts/Purchase.json";
import ShippingJSON from "../build/contracts/Shipping.json";
import ReceivedJSON from "../build/contracts/Received.json";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { purchaseAddress, shippingAddress, receivedAddress } from "../constants";
const web3 = new Web3('ws://localhost:7545');
const purchaseABI = PurchaseJSON["abi"];
const shippingABI = ShippingJSON["abi"];
const receivedABI = ReceivedJSON["abi"];

let purchaseInstance = new web3.eth.Contract(purchaseABI,purchaseAddress);
let shippingInstance = new web3.eth.Contract(shippingABI, shippingAddress);
let receivedInstance = new web3.eth.Contract(receivedABI, receivedAddress);
class Purchase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buyer_account: this.props.buyer_account,
            eth_balance: this.props.eth_balance,
            purchase_form: {
                vendor:'Apollo Hospital',
                vendor_address: '',
                product:'Gloves',
                qty:0,
                amount: 0
            },
            vendors: [
                {
                    name:'Apollo Hospital', 
                    address:'0x0ddc4c262010E44838c15F8AB2bF4fCBFEaA7695',
                    products: [ 
                    { product_name: 'Gloves', cost: 2 },
                    { product_name: 'Syringes', cost: 6 },
                    ]
                },
                {
                    name:'MGM Hospital',
                    address:'0x0B2bc2815CEc2C4a45cCbF9B36B5B3aFCbe51E0C', 
                    products: [ 
                    { product_name: 'Gloves', cost: 3 },
                    { product_name: 'Syringes', cost: 5 },
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
            .send({from:buyer_address,value:web3.utils.toWei(this.state.purchase_form.amount.toString(), "ether"), gas:500000})
            .then((result) => {
                console.log(result);
                alert("Purchase made");
                <Navigate to="/dashboard" />
            })
            .catch((error) => {
                console.error("Transaction error:", error);
                alert("Address not present in the whitelist");
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
              ret_values.amount).send({"from":this.state.buyer_account,"gas":500000},(res) => {
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
              {"from":this.state.buyer_account,"gas":500000},
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
            {/* <br></br> */}
            <Link to="/" className="custom-button" >
                <FontAwesomeIcon icon={faArrowLeft} /> Go Back
            </Link>

            {/* <br></br> */}
            <div className="container m-3 p-3">
                <div className="flex justify-center text-center tfw">
                    <h4>Purchase Order</h4>
                    {/* <hr></hr> */}
                    <div className="res">
                        <br></br>
                    {/* <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" > */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vendor">
                                Vendor
                            </label>
                            <br></br>
                            {/* <input name="vendor" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={this.state.purchase_form.vendor} onChange={this.handleChange} id="vendor" type="text" placeholder="Vendor" /> */}
                            <select name="vendor" onChange={this.handleChange}>
                                <option>Apollo Hospital</option>
                                <option>MGM Hospital</option>
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
                                <option>Gloves</option>
                                <option>Syringes</option>
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
                            <button className="btn btn-primary button-color" onClick={this.submitForm}>
                                Order
                            </button>
                        </div>
                        <br></br>
                        <div className="flex items-center justify-between">
                            <button className="btn btn-primary button-color" onClick={this.listenEvent}>
                                View Past Events
                            </button>
                        </div>
                        <br></br>
                        {/* <hr></hr> */}
                        <p>Your amount in ETH is: {this.state.purchase_form.amount}</p>
                    </div>
                </div> 
            </div> 
        </>
        );
      }
    
}

export default Purchase;