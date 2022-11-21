import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectPrevURL } from "../../redux/slice/cartSlice";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/card/Card";
import loginImg from "../../assets/login.png";
import styles from "./auth.module.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const prevURL = useSelector(selectPrevURL);

  const redirectUser = () => {
    if (prevURL.includes("cart")) {
      navigate("/cart");
    } else {
      navigate("/");
    }
  };

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Login Successful... ");
        setIsLoading(false);
        redirectUser();
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = (e) => {
    setIsLoading(true);
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success("Login Successfully");
        setIsLoading(false);
        redirectUser();
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="Login" width="400" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Login</h2>

            <form onSubmit={loginUser}>
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="--btn --btn-primary --btn-block" type="submit">
                Login
              </button>
              <div className={styles.links}>
                <Link to="/reset" style={{ color: "orangered" }}>
                  Reset Password
                </Link>
              </div>
              <p>-- or --</p>
            </form>
            <button
              className="--btn --btn-danger --btn-block"
              onClick={signInWithGoogle}
            >
              <FaGoogle color="#fff" /> Login With Google
            </button>
            <span className={styles.register}>
              <p>Don't have an account?</p>
              <Link to="/register" style={{ color: "orangered" }}>
                Register
              </Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
}

export default Login;
