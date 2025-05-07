import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LoginForm from './components/common/LoginForm';
import SignUpForm from './components/common/SignUpForm';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLoginForm from './pages/admin/AdminLoginForm';
import FundraiserCard from './components/common/FundraiserCard';
import RescueTab from './components/user/RescueTab';

import LandingPage from './pages/LandingPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/login" element={<LoginForm />} />        */}
          <Route path="/signup" element={<SignUpForm />} />     
          <Route path="/dashboard" element={<AdminDashboard />} /> 
          <Route path="/admin/login" element={<AdminLoginForm />} />
          <Route path="/fundraising" element={<FundraiserCard />} />
          <Route path="/rescue" element={<RescueTab />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
