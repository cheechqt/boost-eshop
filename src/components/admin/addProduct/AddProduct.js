import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase/config";
import Card from "../../card/Card";
import styles from "./AddProduct.module.scss";

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
];

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    imageUrl: "",
    price: 0,
    category: "",
    brand: "",
    desc: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `images/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
  };

  const addProduct = (e) => {
    e.preventDefault();
    console.log(product);
  };

  return (
    <div className={styles.product}>
      <h1>Add New Product</h1>
      <Card cardClass={styles.card}>
        <form onSubmit={addProduct}>
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
            <div className={styles.progress}>
              <div className={styles["progress-bar"]} style={{ width: "50%" }}>
                Uploading 50%
              </div>
            </div>
            <input
              type="file"
              placeholder="Product Image"
              accept="image/*"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />
            <input
              type="text"
              required
              placeholder="Image URL"
              name="imageUrl"
              disabled
              value={product.imageUrl}
            />
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
  );
}

export default AddProduct;
