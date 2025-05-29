import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManageProducts.css";
import { useNavigate } from "react-router-dom";

// داخل المكون
const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

const [activeProductId, setActiveProductId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    imageFile: null,
    description: "",
    category: "",
    brand: "",
    isFeatured: false,
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
     
       const res = await axios.get('http://localhost:5000/api/products', {
      withCredentials: true, 
    });
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const fetchCategories = async () => {
    try {
 const res = await axios.get("http://localhost:5000/api/categories", {
      withCredentials: true, // هذا مهم جدًا لإرسال الكوكيز
    });      setCategories(res.data);
    } catch (error) { 
      console.error("Error fetching categories", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setForm((prev) => ({ ...prev, imageFile: files[0] }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";
      if (form.imageFile) {
        const formData = new FormData();
        formData.append("image", form.imageFile);
       const uploadRes = await axios.post(
  "http://localhost:5000/api/products/upload",
  formData,
  {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);

        imageUrl = uploadRes.data.imageUrl;
      }

      const productData = {
        name: form.name,
        price: form.price,
        stock: form.stock,
        description: form.description,
        category: form.category,
        brand: form.brand,
        isFeatured: form.isFeatured,
      };

      if (imageUrl) {
        productData.imageUrl = imageUrl;
      }

      if (editingProductId) {
        await axios.patch(
          `http://localhost:5000/api/products/${editingProductId}`,
          productData,
          { withCredentials: true }
        );
        alert("Product updated successfully");
      } else {
        await axios.post(
          "http://localhost:5000/api/products",
          productData,
          { withCredentials: true }
        );
        alert("Product added successfully");
      }

      setForm({
        name: "",
        price: "",
        stock: "",
        imageFile: null,
        description: "",
        category: "",
        brand: "",
        isFeatured: false,
      });
      setEditingProductId(null);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product", error);
      alert("Failed to save product");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
  await axios.delete(`http://localhost:5000/api/products/${id}`, {
    withCredentials: true
  });      fetchProducts();
    } catch (error) {
            console.log(id)

      console.error("Error deleting product", error);
      alert("Failed to delete product");
    }
  };



  const handleEdit = (product) => {
    setEditingProductId(product._id);
    setForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
      imageFile: null,
      description: product.description,
      category: product.category?._id || "",
      brand: product.brand,
      isFeatured: product.isFeatured,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingProductId(null);
    setForm({
      name: "",
      price: "",
      stock: "",
      imageFile: null,
      description: "",
      category: "",
      brand: "",
      isFeatured: false,
    });
  };

  return (
    <div className="manage-products">
      <h2>Manage Products</h2>

      <form className="product-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          step="0.01"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          name="imageFile"
          accept="image/*"
          onChange={handleChange}
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={form.brand}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="isFeatured"
            checked={form.isFeatured}
            onChange={handleChange}
          />
          Featured Product
        </label>

        <button type="submit">
          {editingProductId ? "Update Product" : "Add Product"}
        </button>
        {editingProductId && (
          <button type="button" className="btn-cancel" onClick={cancelEdit}>
            Cancel Edit
          </button>
        )}
      </form>

      <div className="products-list">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((prod) => (
            <div key={prod._id} className="product-cardManage">
              <img
                src={
                  prod.imageUrl
                    ? `http://localhost:5000${prod.imageUrl}`
                    : "https://via.placeholder.com/150"
                }
                alt={prod.name}
              />
              <div className="product-info">
                <h3>{prod.name}</h3>
                <p>
                  <b>Price:</b> ${prod.price}
                </p>
                <p>
                  <b>Stock:</b> {prod.stock}
                </p>
                <p>
                  <b>Brand:</b> {prod.brand}
                </p>
                <p>
                  <b>Category:</b> {prod.category?.name}
                </p>
                <p className="desc">{prod.description}</p>
                <p>
                  <b>Featured:</b> {prod.isFeatured ? "Yes" : "No"}
                </p>
                <div className="button-group">
                  <button
                    className="btn-action btn-edit"
                    onClick={() => handleEdit(prod)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-action btn-delete"
                    onClick={() => handleDelete(prod._id)}
                  >
                    Delete
                  </button>
                  <button
  className="btn-action btn btn-success"
  onClick={() =>  {   navigate(`/dashboard/superadmin/manage-comments/${prod._id}`)}}
> 
  Comments
</button>

                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
