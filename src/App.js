import {Route,Routes} from "react-router-dom";
import Dashboard from "./Routes/dashboard";
import Navbar from "./components/Navbar"; 
import { useLocation } from "react-router-dom";
import Login from "./Routes/login";
import Signup from "./Routes/signup";
import ForgotPass from "./Routes/ForgotPass";
import ResetPassword from "./Routes/ResetPassword";
import VerifyEmail from "./Routes/VerifyEmail";
import Error from "./Routes/Error";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== '/errorpage' &&  !location.pathname.startsWith('/reset-password/') && !location.pathname.startsWith('/verify/') && <Navbar/>}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="/verify/:id/:token" element={<VerifyEmail />} />
        <Route path="/errorpage" element={<Error />} />
      </Routes>
    </div>
  );  
}
 
export default App;
