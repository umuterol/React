import React from "react";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const params = useParams();

  return (
    <div>
      <h1>Product Detail</h1>
      <p>{params.productId}</p>
    </div>
  );
}

export default ProductDetail;
