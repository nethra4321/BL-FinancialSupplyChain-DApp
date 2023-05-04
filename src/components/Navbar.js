import React, {Component} from "react";
import { Link } from "react-router-dom";
          <div>
              <React.Fragment>
                <nav className="navbar navbar-expand-lg custom-navbar-bg ">
                  <ul className="nav justify-content-center">
                  <li className="nav-item">
                      <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link to={{ pathname: "/purchase" }} state={{ buyer_account: this.state.buyer_account, ethBalance: this.state.ethBalance }} className="nav-link">Place order</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/dashboard" className="nav-link">View Transaction History</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/event-dashboard" className="nav-link">View Event History</Link>
                    </li>
                    <div className="text-center">
                      <button className="btn btn-danger" onClick={this.whitelistReq}>Request to add to whitelist</button>
                    </div>
                    <li className="nav-item">
                      <Link to="/" className="nav-link" onClick={this.disconnect}>Logout</Link>
                    </li>
                  </ul>
                </nav>
                <br></br>
              </React.Fragment>
          </div>

export default navbar;