import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProducts } from "../../../redux/slice/productSlice";
import { toast } from "react-toastify";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import Loader from "../../loader/Loader";
import Card from "../../card/Card";
import styles from "./AddProduct.module.scss";

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
];

const initialState = {
  name: "",
  imageUrl: "",
  price: 0,
  category: "",
  brand: "",
  desc: "",
};

function AddProduct() {
  const { id } = useParams();
  const products = useSelector(selectProducts);
  const productEdit = products.find((item) => item.id === id);
  console.log(productEdit);

  const [product, setProduct] = useState(() => {
    return detectForm(id, { ...initialState }, productEdit);
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function detectForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    }
    return f2;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `images/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageUrl: downloadURL });
          toast.success("Image uploaded successfully.");
        });
      }
    );
  };

  const addProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      addDoc(collection(db, "products"), {
        name: product.name,
        imageUrl: product.imageUrl,
        price: +product.price,
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setUploadProgress(0);
      setProduct({ ...initialState });
      toast.success("Product uploaded successfully.");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <h2>{detectForm(id, "Add New Product", "Edit Product")}</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={detectForm(id, addProduct, editProduct)}>
            <label>Product Name:</label>
            <input
              type="text"
              placeholder="Product Name"
              required
              value={product.name}
              name="name"
              onChange={(e) => handleInputChange(e)}
            />
            <label>Product Image:</label>
            <Card cardClass={styles.group}>
              {uploadProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div
                    className={styles["progress-bar"]}
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? `Uploading ${uploadProgress}%`
                      : `Upload Complete ${uploadProgress}%`}
                  </div>
                </div>
              )}
              <input
                type="file"
                placeholder="Product Image"
                accept="image/*"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />
              {product.imageUrl === "" ? null : (
                <input
                  type="text"
                  required
                  placeholder="Image URL"
                  name="imageUrl"
                  disabled
                  value={product.imageUrl}
                />
              )}
            </Card>
            <label>Product Price:</label>
            <input
              type="number"
              placeholder="Product Price"
              required
              name="price"
              value={product.price}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Product Category:</label>
            <select
              required
              name="category"
              value={product.category}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled>
                --choose product category
              </option>
              {categories.map((category) => {
                return (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                );
              })}
            </select>
            <label>Product Company/Brand:</label>
            <input
              type="text"
              placeholder="Product Brand"
              required
              value={product.brand}
              name="brand"
              onChange={(e) => handleInputChange(e)}
            />
            <label>Product Description:</label>
            <textarea
              name="desc"
              value={product.desc}
              required
              cols="30"
              rows="10"
              onChange={(e) => handleInputChange(e)}
            ></textarea>
            <button className="--btn --btn-primary">Save Product</button>
          </form>
        </Card>
      </div>
    </>
  );
}

export default AddProduct;
