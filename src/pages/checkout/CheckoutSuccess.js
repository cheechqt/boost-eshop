import { Link } from "react-router-dom";

function CheckoutSuccess() {
  return (
    <section>
      <div className="container">
        <h1>Checkout Success</h1>
        <p>Thank you for your purschase</p>
        <br />
        <button className="--btn --btn-primary">
          <Link to="/order-history">View Order Status</Link>
        </button>
      </div>
    </section>
  );
}

export default CheckoutSuccess;
