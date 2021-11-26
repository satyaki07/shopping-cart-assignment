import React, { useState, useEffect, createFactory } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import AllProducts from "../../server/products/index.get.json";
import Categories from "../../server/categories/index.get.json";
import { addToCart } from "../../redux/cart/cart-actions";
import "./products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const history = useHistory();
  const parm = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    let categorisedProducts = AllProducts;
    if (parm.id !== undefined) {
      let temp = categorisedProducts.filter(
        (product) => product.category === parm.id
      );
      setProducts(temp);
    } else {
      setProducts(AllProducts);
    }
  }, [parm.id]);

  return (
    <main className="products-page">
      <aside className="sidebar">
        {Categories.map((category) => {
          return (
            <li
              key={category.id}
              onClick={() => history.push(`/products/${category.id}`)}
              className="category-list"
            >
              {category.name}
            </li>
          );
        })}
      </aside>

      {products.length === 0 ? (
        <div style={{ fontSize: "2rem", color: "grey" }}>
          Sorry! No Products found of this category!
        </div>
      ) : (
        <section className="product-details">
          {products.map((product) => {
            return (
              <div className="product-container">
                <div
                  style={{
                    fontWeight: "bold",
                    marginBottom: "3px",
                    fontSize: "15px",
                    minHeight: "40px",
                  }}
                >
                  {product.name}
                </div>
                <div className="product-desc-container-mobile">
                  <div className="image-container-mobile">
                    <img
                      src={product.imageURL}
                      alt={product.name}
                      width="120"
                      height="140"
                    />
                  </div>
                  <div className="product-desc-mobile">
                    {product.description}
                  </div>
                </div>

                <div className="product-desc-container">
                  <div className="image-container">
                    <img
                      src={product.imageURL}
                      alt={product.name}
                      width="250"
                      height="250"
                    />
                  </div>
                  <div className="product-desc">{product.description}</div>
                </div>

                <div className="price-container">
                  <div>MRP Rs. {product.price}</div>
                  <button
                    className="cart-btn"
                    onClick={() =>
                      dispatch(
                        addToCart({
                          id: product.id,
                          price: product.price,
                          name: product.name,
                          imageURL: product.imageURL,
                        })
                      )
                    }
                  >
                    Buy Now
                  </button>
                </div>

                <div className="price-container-mobile">
                  <button
                    onClick={() =>
                      dispatch(
                        addToCart({
                          id: product.id,
                          price: product.price,
                          name: product.name,
                          imageURL: product.imageURL,
                        })
                      )
                    }
                    className="cart-btn-mobile"
                  >
                    Buy Now @ Rs. {product.price}
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      )}
    </main>
  );
}

export default Products;
