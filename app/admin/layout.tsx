export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <div className="bg-dark text-white p-4" style={{ width: '250px' }}>
        <h4>Admin Panel</h4>
        <ul className="nav flex-column mt-4">
          <li className="nav-item"><a href="/admin/dashboard" className="nav-link text-white">Dashboard</a></li>
          <li className="nav-item"><a href="/admin/contacts" className="nav-link text-white">Contacts</a></li>
          <li className="nav-item"><a href="/admin/quotes" className="nav-link text-white">Quotes</a></li>
          <li className="nav-item"><a href="/admin/users" className="nav-link text-white">Users</a></li>
        </ul>
      </div>
      <div className="flex-grow-1 p-4 bg-light">
        {children}
      </div>
    </div>
  );
}