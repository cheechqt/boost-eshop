import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import {
  selectProducts,
  STORE_PRODUCTS,
} from "../../../redux/slice/productSlice";
import {
  CALC_TOTAL_ORDER_AMOUNT,
  selectOrderHistory,
  selectTotalOrderAmount,
  STORE_ORDERS,
} from "../../../redux/slice/orderSlice";
import useFetchCollection from "../../../hooks/useFetchCollection";
import InfoBox from "../../infoBox/InfoBox";
import styles from "./Home.module.scss";

const earningIcon = <AiFillDollarCircle size={30} color="#b624ff" />;
const productIcon = <BsCart4 size={30} color="#1f93ff" />;
const orderIcon = <FaCartArrowDown size={30} color="orangered" />;

function Home() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const orders = useSelector(selectOrderHistory);
  const totalOrderAmount = useSelector(selectTotalOrderAmount);

  const fbProducts = useFetchCollection("products");
  const fbOrders = useFetchCollection("orders");

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: fbProducts.data,
      })
    );
    dispatch(STORE_ORDERS(fbOrders.data));
    dispatch(CALC_TOTAL_ORDER_AMOUNT());
  }, [dispatch, fbProducts, fbOrders]);

  return (
    <div className={styles.home}>
      <h2>Admin Home</h2>
      <div className={styles["info-box"]}>
        <InfoBox
          cardClass={`${styles.card} ${styles.card1}`}
          title={"Earnings"}
          count={`$${totalOrderAmount}`}
          icon={earningIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card2}`}
          title={"Products"}
          count={products.length}
          icon={productIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card3}`}
          title={"Orders"}
          count={orders.length}
          icon={orderIcon}
        />
      </div>
    </div>
  );
}

export default Home;
