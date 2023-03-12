import React, {Component} from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";


class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_address: ''
        }
    }


    render() {
        return (
        <>
        <div className="container m-3 p-3">
            Dashboard
        </div>
        </>
        );
    }
}


export default Dashboard;