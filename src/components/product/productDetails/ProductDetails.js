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

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const curItem = cartItems.find((item) => item.id === id);
  const quantityInCart = cartItems.findIndex((item) => item.id === id);

  const getProduct = async () => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setProduct({
        id: id,
        ...docSnap.data(),
      });
    } else {
      toast.error("Product not found");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

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
                <img src={product.imageUrl} alt={product.name} />
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
