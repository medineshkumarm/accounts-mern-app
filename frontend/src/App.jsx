import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/auth-context";
import { RegisterForm } from "./components/ui/register-form";
import { LoginForm } from "./components/ui/login-form";
import DashboardPage from "./components/pages/dashboard-page";
import TransactionsPage from "./components/pages/transactions-page";
import SettingsPage from "./components/pages/settings-page";
import Layout from "./components/layout/layout";
import ShopsPage from "./components/pages/shops-page";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Routes with the common NavBar */}
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="shops" element={<ShopsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
