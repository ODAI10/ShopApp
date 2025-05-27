import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admins.css'; // نفس ملف CSS للستايل الأساسي

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role:"admins"
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admins/admins', {
        withCredentials: true,
      });
      setAdmins(res.data.admins);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

const handleAddOrUpdate = async (e) => {
  e.preventDefault();
  try {
    const dataToSend = { ...formData };
    if (editingAdmin && !dataToSend.password) {
      delete dataToSend.password; // لا ترسل كلمة المرور إذا لم يتم تعديلها
    }

    if (editingAdmin) {
      await axios.put(`http://localhost:5000/api/admins/${editingAdmin._id}`, dataToSend, { withCredentials: true });
    } else {
      await axios.post('http://localhost:5000/api/admins/create', dataToSend, { withCredentials: true });
    }
    setShowForm(false);
    setEditingAdmin(null);
    setFormData({ name: '', email: '', phone: '', password: '', role: "admins" });
    fetchAdmins();
  } catch (error) {
    console.error('Error saving admin:', error);
  }
};

  const handleEdit = (admin) => {
    setEditingAdmin(admin);
    setFormData({name: admin.name, email: admin.email, phone: admin.phone});
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admins/${id}`, {withCredentials: true});
        fetchAdmins();
      } catch (error) {
        console.error('Error deleting admin:', error);
      }
    }
  };

  return (
    <div className="superadmin-main">
      <div className="superadmin-content container">
        <h2 className="mb-4">Admins Management</h2>

        <button
          className="btn btn-primary mb-4"
          onClick={() => {
            setShowForm(true);
            setEditingAdmin(null);
            setFormData({name: '', email: '', phone: ''});
          }}
        >
          Add New Admin
        </button>

        <div className="row">
          {admins.map((admin) => (
            <div key={admin._id} className="col-md-4 mb-3">
              <div className="card superadmin-card bg-white border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-primary">{admin.name}</h5>
                  <p><strong>Email:</strong> {admin.email}</p>
                  
                  <p><strong>Phone:</strong> {admin.phone}</p>
                  <div className="d-flex justify-content-end gap-2">
                    <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(admin)}>
                      Edit
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(admin._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Form */}
        {showForm && (
          <div className="modal d-block" tabIndex="-1" role="dialog" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <form onSubmit={handleAddOrUpdate}>
                  <div className="modal-header">
                    <h5 className="modal-title">{editingAdmin ? 'Edit Admin' : 'Add New Admin'}</h5>
                    <button type="button" className="btn-close" onClick={() => setShowForm(false)}></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Full Name</label>
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
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
  <label className="form-label">Password</label>
  <input
    type="password"
    name="password"
    className="form-control"
    value={formData.password}
    onChange={handleInputChange}
    required={!editingAdmin}  // مطلوب فقط للإضافة
  />
</div>

<div className="mb-3">
  <label className="form-label">Role</label>
  <select
    name="role"
    className="form-select"
    value={formData.role}
    onChange={handleInputChange}
  >
    <option value="admins">Admin</option>
    <option value="superadmin">Super Admin</option>
  </select>
</div>

                    <div className="mb-3">
                      <label className="form-label">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">{editingAdmin ? 'Update' : 'Add'}</button>
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

export default Admins;
