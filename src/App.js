import {Route,Routes} from "react-router-dom";
import Dashboard from "./Routes/Dashboard";
import Navbar from "./components/Navbar"; 
import { useLocation } from "react-router-dom";
import Login from "./Routes/login";
import Signup from "./Routes/signup";
import ForgotPass from "./Routes/ForgotPass";
import ResetPassword from "./Routes/ResetPassword";
import VerifyEmail from "./Routes/VerifyEmail";
import Error from "./Routes/Error";
import Cart from "./Routes/cart";

function App() {
  const location = useLocation();
  if(location.pathname === '/'){
    document.title = 'PizzaSwift - Dashboard'
  }
  else if(location.pathname === '/about'){
    document.title = 'PizzaSwift - About'
  }
  else if(location.pathname === '/login'){
    document.title = 'PizzaSwift - Login'
  }
  else if(location.pathname === '/signup'){
    document.title = 'PizzaSwift - Signup'
  }
  else if(location.pathname === '/forgot-password'){
    document.title = 'PizzaSwift - Forgot Password'
  }
  else if(location.pathname.startsWith('/reset-password/')){
    document.title = 'PizzaSwift - Reset Password'
  }
  else if(location.pathname.startsWith('/verify/')){
    document.title = 'PizzaSwift - Verify Email'
  }
  else if(location.pathname === '/errorpage'){
    document.title = 'PizzaSwift - Error Page'
  }
  else if(location.pathname === '/cart'){
    document.title = 'PizzaSwift - cart'
  }
  else{
    document.title = 'PizzaSwift - Error Page'
  }
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
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );  
}
 
export default App;
