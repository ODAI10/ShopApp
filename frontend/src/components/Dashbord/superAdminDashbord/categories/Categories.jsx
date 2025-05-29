import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Admins/Admins.css'; // نستخدم نفس ملف Admins.css لمطابقة التصميم

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', icon: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
        const res = await axios.get('http://localhost:5000/api/categories', {
      withCredentials: true, 
    });
      setCategories(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);

      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return alert('Name is required');
    try {
    if (editingId) {
  await axios.put(
    `http://localhost:5000/api/categories/${editingId}`,
    formData,
    { withCredentials: true }
  );
}
 else {
 await axios.post('http://localhost:5000/api/categories', formData, {
    withCredentials: true
  });      }
      setFormData({ name: '', icon: '' });
      setEditingId(null);
      setShowForm(false);
      fetchCategories();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving category');
    }
  };

  const handleEdit = (cat) => {
    setFormData({ name: cat.name, icon: cat.icon || '' });
    setEditingId(cat._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this category?')) {
      try {
    await axios.delete(`http://localhost:5000/api/categories/${id}`, {
      withCredentials: true
    });        fetchCategories();
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  return (
    <div className="superadmin-main">
      <div className="superadmin-content container">
        <h2 className="mb-4">Category Management</h2>
        <button
          className="btn btn-primary mb-4"
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setFormData({ name: '', icon: '' });
          }}
        >
          Add New Category
        </button>

        <div className="row">
          {categories.length === 0 ? (
            <p>No categories found.</p>
          ) : (
            categories.map((cat) => (
              <div key={cat._id} className="col-md-4 mb-3">
                <div className="card superadmin-card bg-white border-0 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-primary">{cat.name}</h5>
                    <p><strong>Icon:</strong> {cat.icon || '-'}</p>
                    <div className="d-flex justify-content-end gap-2">
                      <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(cat)}>Edit</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(cat._id)}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Form */}
        {showForm && (
          <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <form onSubmit={handleSubmit}>
                  <div className="modal-header">
                    <h5 className="modal-title">{editingId ? 'Edit Category' : 'Add New Category'}</h5>
                    <button type="button" className="btn-close" onClick={() => setShowForm(false)}></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Category Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Icon (optional)</label>
                      <input
                        type="text"
                        name="icon"
                        className="form-control"
                        value={formData.icon}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Add'}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Categories;
