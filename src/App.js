import {Route,Routes} from "react-router-dom";
import Dashboard from "./Routes/dashboard";
import Navbar from "./components/Navbar"; 
import Login from "./Routes/login";
import Signup from "./Routes/signup";
import ForgotPass from "./Routes/ForgotPass";
import ResetPassword from "./Routes/ResetPassword";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
      </Routes>
    </div>
  );  
}
 
export default App;
