import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { STORE_PRODUCTS } from "../../../redux/slice/productSlice";
import { toast } from "react-toastify";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../../../firebase/config";
import { Confirm } from "notiflix/build/notiflix-confirm-aio";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Loader from "../../loader/Loader";
import styles from "./ViewProducts.module.scss";

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = () => {
    setIsLoading(true);
    try {
      const colRef = collection(db, "products");
      const q = query(colRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(allProducts);
        setIsLoading(false);
        dispatch(STORE_PRODUCTS({ products: allProducts }));
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const deleteProduct = async (id, imageUrl) => {
    try {
      await deleteDoc(doc(db, "products", id));
      deleteObject(ref(storage, imageUrl));
      toast.success("Product deleted successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const confirmDelete = (id, imageUrl) => {
    Confirm.show(
      "Delete Product",
      "You are about to delete this product",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProduct(id, imageUrl);
      },
      function cancelCb() {
        console.log("Delete Canceled");
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      }
    );
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <h2>All Products</h2>

        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                const { id, name, price, imageUrl, category } = product;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageUrl}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{`$${price}`}</td>
                    <td className={styles.icons}>
                      <Link to={`/admin/add-product/${id}`}>
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        size={18}
                        color="red"
                        onClick={() => confirmDelete(id, imageUrl)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default ViewProducts;
