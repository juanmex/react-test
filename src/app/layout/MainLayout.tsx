import { Outlet, NavLink } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-black text-white px-4 py-3 flex justify-between">
        <h1 className="font-bold">My App</h1>
        <nav className="flex gap-4">
          <NavLink to="/invoices" className={({ isActive }) => isActive ? "underline" : ""}>
            Invoices
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "underline" : ""}>
            About
          </NavLink>
        </nav>
      </header>

      <main className="flex-1 p-4 bg-gray-50">
        <Outlet />
      </main>

      <footer className="bg-gray-200 text-center py-2">
        <p className="text-sm">&copy; 2025 Mi App</p>
      </footer>
    </div>
  );
}
