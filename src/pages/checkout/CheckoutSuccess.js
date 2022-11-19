import { Link } from "react-router-dom";

function CheckoutSuccess() {
  return (
    <section>
      <div className="container">
        <h1>Checkout Success</h1>
        <p>Thank you for your purschase</p>

        <br />
        <Link to="/order-history">
          <button className="--btn --btn-primary">View Order Status</button>
        </Link>
      </div>
    </section>
  );
}

export default CheckoutSuccess;
