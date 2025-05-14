//w1830501
// Admin page component that renders the user management interface

import './AdminPage.css';
import Users from '../../../../Users/Users';

const AdminPage = () => {
  return (
    <section className="admin-container">
      <h1>User Management</h1>
      <Users />
    </section>
  );
};

export default AdminPage;
