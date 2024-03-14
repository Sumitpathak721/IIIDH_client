import { BrowserRouter,Routes, Route} from "react-router-dom";
import { AuthProvider } from "./context/auth.js";
import PrivateRoute from './components/PrivateRoute.jsx';
import HomeLayout from './components/HomeLayout.jsx';
import Home from "./pages/Home.jsx"
import ChatRoom from "./pages/ChatRoom.jsx"
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import DashBoard from './pages/DashBoard.jsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route element={<PrivateRoute/>}>
            <Route element={<HomeLayout/>}>
              <Route path="/" element={<Home/>} />
              <Route path="/ChatRoom" element={<ChatRoom/>} />
              <Route path="/ChatRoom/:chatID" element={<ChatRoom/>} />
              <Route path="/dashboard" element={<DashBoard/>}/>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
