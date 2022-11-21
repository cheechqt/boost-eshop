import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StarsRating from "react-star-rate";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALC_TOTAL_QUANTITY,
  DECREASE_CART,
  selectCartItems,
} from "../../../redux/slice/cartSlice";
import useFetchDocument from "../../../hooks/useFetchDocument";
import useFetchCollection from "../../../hooks/useFetchCollection";
import Card from "../../card/Card";
import spinnerImg from "../../../assets/spinner.jpg";
import styles from "./ProductDetails.module.scss";

function ProductDetails() {
  const [product, setProduct] = useState(null);

  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { document } = useFetchDocument("products", id);
  const { data } = useFetchCollection("reviews");
  const filteredReviews = data.filter((review) => review.productID === id);

  const curItem = cartItems.find((item) => item.id === id);
  const quantityInCart = cartItems.findIndex((item) => item.id === id);

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
  console.log(cartItems, quantityInCart);

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
                <p style={{ whiteSpace: "pre-wrap" }}>{product.desc}</p>
                <p>
                  <b>SKU</b> {product.id}
                </p>
                {/* <p>
                  <b>Brand</b> {product.brand}
                </p> */}

                {quantityInCart > 0 ? (
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
                ) : (
                  <button
                    className="--btn --btn-danger"
                    onClick={() => addToCart(product)}
                  >
                    ADD TO CART
                  </button>
                )}
              </div>
            </div>
          </>
        )}
        <Card cardClass={styles.card}>
          <h3>Product Reviews</h3>
          {filteredReviews.length === 0 ? (
            <p>There are no reviews for this product yet.</p>
          ) : (
            <>
              {filteredReviews.map((item, index) => {
                const { rate, review, reviewDate, userName } = item;
                return (
                  <div key={index} className={styles.review}>
                    <StarsRating value={rate} />
                    <p>{review}</p>
                    <span>
                      <b>{reviewDate}</b>
                    </span>
                    <br />
                    <span>
                      <b>by: {userName}</b>
                    </span>
                  </div>
                );
              })}
            </>
          )}
        </Card>
      </div>
    </section>
  );
}

export default ProductDetails;
