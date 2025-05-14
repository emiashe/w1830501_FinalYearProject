import { useState, useEffect } from "react";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ email: "", username: "", password: "", role: "User" });
  const [editingId, setEditingId] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axiosPrivate.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update user
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axiosPrivate.put("/users", { ...form, id: editingId });
      } else {
        await axiosPrivate.post("/users", form);
      }

      setForm({ email: "", username: "", password: "", role: "User" });
      setEditingId(null);
      fetchUsers();
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  // Set user in edit mode
  const handleEdit = (user) => {
    setForm({
      email: user.email,
      username: user.username,
      password: "", // leave blank
      role: user.role,
    });
    setEditingId(user.id);
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axiosPrivate.delete("/users", { data: { id } });
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div>
      <h2>Users</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.email}</td>
              <td>{u.username}</td>
              <td>{u.role}</td>
              <td className="action-buttons">
                <button className="btn edit" onClick={() => handleEdit(u)}>Edit</button>
                <button className="btn delete" onClick={() => handleDelete(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="add-user-form">
        <h3>{editingId ? "Edit User" : "Add New User"}</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder={editingId ? "New Password (optional)" : "Password"}
            value={form.password}
            onChange={handleChange}
            required={!editingId}
          />
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="User">User</option>
            <option value="Editor">Editor</option>
            <option value="Admin">Admin</option>
          </select>
          <button type="submit">{editingId ? "Update User" : "Create User"}</button>
        </form>
      </div>
    </div>
  );
};

export default Users;
