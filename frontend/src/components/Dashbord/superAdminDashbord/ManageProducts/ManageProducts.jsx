// ManageProducts.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageProducts.css';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: '',
    price: '',
    stock: '',
    imageFile: null,
    description: '',
    category: '',
    brand: '',
    isFeatured: false,
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories');
      setCategories(res.data);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  const handleChange = e => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setForm(prev => ({
        ...prev,
        imageFile: files[0],
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      // 1. رفع الصورة
      let imageUrl = '';
      if (form.imageFile) {
        const formData = new FormData();
        formData.append('image', form.imageFile);
        const uploadRes = await axios.post('http://localhost:5000/api/products/upload', formData);
        imageUrl = uploadRes.data.imageUrl; // يفترض يرجع مثل /ImgProducts/xyz.png
      }

      // 2. إرسال باقي البيانات
      const newProduct = {
        name: form.name,
        price: form.price,
        stock: form.stock,
        imageUrl,
        description: form.description,
        category: form.category,
        brand: form.brand,
        isFeatured: form.isFeatured,
      };

      await axios.post('http://localhost:5000/api/products', newProduct);
      alert('Product added successfully');
      setForm({
        name: '',
        price: '',
        stock: '',
        imageFile: null,
        description: '',
        category: '',
        brand: '',
        isFeatured: false,
      });
      fetchProducts();
    } catch (error) {
      console.error('Error adding product', error);
      alert('Failed to add product');
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product', error);
      alert('Failed to delete product');
    }
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
          required
        />

        <select name="category" value={form.category} onChange={handleChange} required>
          <option value="">-- Select Category --</option>
          {categories.map(cat => (
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

        <button type="submit">Add Product</button>
      </form>

      <div className="products-list">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map(prod => (
            <div key={prod._id} className="product-card">
              <img src={`http://localhost:5000${prod.imageUrl}`} alt={prod.name} />
              <div className="product-info">
                <h3>{prod.name}</h3>
                <p><b>Price:</b> ${prod.price}</p>
                <p><b>Stock:</b> {prod.stock}</p>
                <p><b>Brand:</b> {prod.brand}</p>
                <p><b>Category:</b> {prod.category?.name}</p>
                <p className="desc">{prod.description}</p>
                <p><b>Featured:</b> {prod.isFeatured ? 'Yes' : 'No'}</p>
                <button className="btn-delete" onClick={() => handleDelete(prod._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
