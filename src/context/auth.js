import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token:"",
    loading:true
  });

  const resetAuth = (auth)=>{
    setAuth(auth)
    axios.defaults.headers.common['Authorization'] = auth.token;
    localStorage.setItem("auth",JSON.stringify(auth))
    return <Navigate to="/" />
  }

  

  useEffect(() => {
    const func = async()=>{
      try{
        const data = localStorage.getItem("auth");
        
        if (data!=null) {
          const parseData = await JSON.parse(data);
          setAuth({
            ...auth,
            user: parseData.user,
            token:parseData.token,
            loading:false
          });
          axios.defaults.headers.common['Authorization'] = parseData.token;
        }else{
          setAuth({
            ...auth,
            user:null,
            token:'',
            loading:false
          });
        }
      }catch(e){
        setAuth({
          ...auth,
          user:null,
          token:'',
          loading:false
        });
        console.log("Error in AuthContext",e);
      }
    }
    func()
    //eslint-disable-next-line
  }, []);
  return (
    <AuthContext.Provider value={[auth, resetAuth]}>
      {auth.loading ? (
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