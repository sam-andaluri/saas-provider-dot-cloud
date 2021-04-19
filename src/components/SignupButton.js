import React, { Component } from "react";


class ProductDetails extends Component {
    render() {
        return (
            <div>
                <h1>Product Details - {this.props.match.params.id} </h1>
            </div>
        );
    }
}

export default ProductDetails;
