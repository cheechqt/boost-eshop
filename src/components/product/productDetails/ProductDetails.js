import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALC_TOTAL_QUANTITY,
  DECREASE_CART,
  selectCartItems,
} from "../../../redux/slice/cartSlice";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import spinnerImg from "../../../assets/spinner.jpg";
import styles from "./ProductDetails.module.scss";
import useFetchDocument from "../../../hooks/useFetchDocument";

function ProductDetails() {
  const [product, setProduct] = useState(null);
  
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const curItem = cartItems.find((item) => item.id === id);
  const quantityInCart = cartItems.findIndex((item) => item.id === id);

  const { document } = useFetchDocument("products", id);

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALC_TOTAL_QUANTITY());
  };

  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(CALC_TOTAL_QUANTITY());
  };

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <div>
          <Link to="/#products">&larr; Back To Products</Link>
        </div>
        {product === null ? (
          <img src={spinnerImg} alt="Loading" style={{ width: "50px" }} />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}>{`$${product.price}`}</p>
                <p>{product.desc}</p>
                <p>
                  <b>SKU</b> {product.id}
                </p>
                <p>
                  <b>Brand</b> {product.brand}
                </p>

                {quantityInCart > 0 && (
                  <div className={styles.count}>
                    <button
                      className="--btn"
                      onClick={() => decreaseCart(product)}
                    >
                      -
                    </button>
                    <p>
                      <b>{curItem.cartQuantity}</b>
                    </p>
                    <button
                      className="--btn"
                      onClick={() => addToCart(product)}
                    >
                      +
                    </button>
                  </div>
                )}

                <button
                  className="--btn --btn-danger"
                  onClick={() => addToCart(product)}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default ProductDetails;
