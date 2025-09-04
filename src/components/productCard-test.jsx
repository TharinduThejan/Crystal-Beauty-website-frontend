import React from "react";

export default function ProductCardtest(props) {
  return (
    <div className="productCard">
      <img className="productImage" src={props.picture} alt="Product" />
      <h1>{props.name}</h1>
      <p>{props.description}</p>
      <h2>Price : ${props.price} </h2>
      <button className="addToCart">Add to Cart</button>
      <button className="buyNow">Buy Now</button>
    </div>
  );
}
