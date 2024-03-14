import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [loading,setLoading] = useState(true);

  const resetToken = (token)=>{
    setAuthToken(token)
    setLoading(false)
    axios.defaults.headers.common['Authorization'] = token;
    localStorage.setItem("token",token)
    return <Navigate to="/" />
  }

  

  useEffect(() => {
    const func = async()=>{
      try{
        const token = localStorage.getItem("token");
        if (token) {
          // const parseData = await JSON.parse(data);
          setAuthToken(token);
          axios.defaults.headers.common['Authorization'] = token;
        }else{
          setAuthToken("");
        }
        setLoading(false);
      }catch(e){
        setAuthToken("");
        console.log("Error in AuthContext",e);
      }
    }
    func()
    //eslint-disable-next-line
  }, []);
  return (
    <AuthContext.Provider value={[authToken, resetToken]}>
      {loading ? (
        // Render a loading indicator while authentication data is being fetched
        <div>Loading...</div>
      ) : (
        // Render children once authentication data is available
        children
      )}
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };