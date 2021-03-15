import React, { Component } from "react";
var request = require("request");


class ProductDetails extends Component {
    handleSave = () => {
    var options = { method: 'POST',
        url: 'https://saas-provider.us.auth0.com/oauth/token',
        headers: { 'content-type': 'application/json' },
        body: '{"client_id":"2PVHxUXCpiuRQvCtV4JbLGlCPDvk1MBF","client_secret":"QoaaXJvFzrwqTFntn3iGUlvjwmdBJWiiH2ChWtFSOp7CQYs6lfKx814hd9v_LEuq","audience":"https://tenant-api.saas-provider.cloud/","grant_type":"client_credentials"}' };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });
        this.props.history.push("/signup");
    };

    render() {
        return (
            <div>
                <h1>Product Details - {this.props.match.params.id} </h1>
                <button onClick={this.handleSave}>Save</button>

            </div>
        );
    }
}

export default ProductDetails;
