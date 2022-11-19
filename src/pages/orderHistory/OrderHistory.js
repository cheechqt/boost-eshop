import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectOrderHistory, STORE_ORDERS } from "../../redux/slice/orderSlice";
import useFetchCollection from "../../hooks/useFetchCollection";
import { selectUserID } from "../../redux/slice/authSlice";
import Loader from "../../components/loader/Loader";
import styles from "./OrderHistory.module.scss";

function OrderHistory() {
  const { data, isLoading } = useFetchCollection("orders");
  const orders = useSelector(selectOrderHistory);
  const userID = useSelector(selectUserID);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);

  const handleClick = (id) => {
    navigate(`/order-details/${id}`);
  };

  const filteredOrders = orders.filter((order) => order.userID === userID);

  return (
    <section>
      <div className={`container ${styles.order}`}>
        <h2>Your Order History</h2>
        <p>
          Open an order to leave a <b>Product Review</b>
        </p>
        <br />
        {isLoading && <Loader />}
        <div className={styles.table}>
          {orders.length === 0 ? (
            <p>No order found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Date</th>
                  <th>Order ID</th>
                  <th>Order Amount</th>
                  <th>Order Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => {
                  const { id, orderDate, orderTime, orderAmount, orderStatus } =
                    order;
                  return (
                    <tr key={id} onClick={() => handleClick(id)}>
                      <td>{index + 1}</td>
                      <td>
                        {orderDate} at {orderTime}
                      </td>
                      <td>{id}</td>
                      <td>
                        {"$"}
                        {orderAmount}
                      </td>
                      <td>
                        <p
                          className={
                            orderStatus !== "Delivered"
                              ? `${styles.pending}`
                              : `${styles.delivered}`
                          }
                        >
                          {orderStatus}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}

export default OrderHistory;
