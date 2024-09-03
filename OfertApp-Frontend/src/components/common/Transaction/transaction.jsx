import React, { Component } from "react";
import { getExpirationFormatted } from "../../../utils/getTime";
import "./userLink.css";

// user: object
// base: boolean

class Transaction extends Component {

  // Creates a link to user's profile
  render() {
    const transaction = this.props.transaction;
    return (
      <tr>
        <td className="ofertapp-table-item">
          {getExpirationFormatted(transaction.timestamp)}
        </td>
        <td className="ofertapp-table-item">
          {getExpirationFormatted(transaction.type)}
        </td>
        <td className="ofertapp-table-item">
          {getExpirationFormatted(transaction.description)}
        </td>
        <td className="ofertapp-table-item">
          {getExpirationFormatted(transaction.amount)}
        </td>
      </tr>
    )
  };
}

export default Transaction;
