import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Shops from "./components/Shops";
import PrivateRoute from "./utils/private-route";
import { AuthProvider } from "./context/auth-context";
import Dashboard from "./components/Dashboard";
import { RegisterForm } from "./components/ui/register-form";
import { LoginForm } from "./components/ui/login-form";
import DashboardPage from "./components/pages/dashboard-page";
import TransactionsPage from "./components/pages/transactions-page";
import SettingsPage from "./components/pages/settings-page";
import Layout from "./components/layout/layout";
import ShopsPage from "./components/pages/shops-page";

function App() {
  return (
    <AuthProvider >
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/shops" element={<Shops />} />
          </Route>

          {/* <Route path="/test/" element={<DashboardPage />} />
          <Route path="/test/transactions" element={<TransactionsPage />} />
          <Route path="/test/settings" element={<SettingsPage />} /> */}
          {/* Routes with the common NavBar */}
          <Route path="/test" element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="shops" element={<ShopsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          <Route path="/test/register" element={<RegisterForm />} />
          <Route path="/test/login" element={<LoginForm />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
