import React from "react";

const Product = (props) => {
  const { product } = props;
  return (
    <div className="item" data-categories="new glitch">
      <a
        className="thumb project-thumb thumb-fade ajax-link"
        data-nav-container="#music-items"
      >
        <img src="images/release01.jpg" alt="Release image" />
        <span className="badge new">NEW</span>
        <div className="desc-layer">
          <h2 className="text-fx-word">{product.name}</h2>
          <h3 className="text-fx-word">Meloo</h3>
        </div>
        <span className="thumb-icon trans-40">
          <svg
            className="circle-svg"
            width="80"
            height="80"
            viewBox="0 0 50 50"
          >
            <circle
              className="circle"
              cx="25"
              cy="25"
              r="23"
              stroke="#fff"
              strokeWidth="1"
              fill="none"
            ></circle>
          </svg>
        </span>
      </a>
      <button
        className="buy-button snipcart-add-item sell-button"
        data-item-id={product.id}
        data-item-price={product.price}
        data-item-url={product.url}
        data-item-name={product.name}
      >
        Add to cart {product.price}
      </button>{" "}
    </div>
  );
};

export default Product;
