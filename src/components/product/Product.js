import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_PRICE_RANGE,
  selectProducts,
  STORE_PRODUCTS,
} from "../../redux/slice/productSlice";
import useFetchCollection from "../../hooks/useFetchCollection";
import { FaCogs } from "react-icons/fa";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import spinnerImg from "../../assets/spinner.jpg";
import styles from "./Product.module.scss";

function Product() {
  const [showFilters, setShowFilters] = useState(false);
  const { data, isLoading } = useFetchCollection("products");
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(STORE_PRODUCTS({ products: data }));
    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [dispatch, data]);
  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside
          className={showFilters ? `${styles.filter} ${styles.show}` : `${styles.filter}`}
        >
          {isLoading ? null : <ProductFilter />}
        </aside>
        <div className={styles.content}>
          {isLoading ? (
            <img
              src={spinnerImg}
              alt="Loading..."
              style={{ width: "50px" }}
              className="--center-all"
            />
          ) : (
            <ProductList products={products} />
          )}
          <div
            className={styles.icon}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaCogs size={20} color="orangered" />
            <p>
              <b>{showFilters ? "Hide Filters" : "Show Filters"}</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Product;
