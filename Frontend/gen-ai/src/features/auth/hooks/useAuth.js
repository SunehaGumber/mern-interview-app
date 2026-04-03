import { useContext,useEffect } from "react";
import { AuthContext } from "../auth.context"
import { login, register, logout, getMe } from '../services/auth.api.js'

export const useAuth = () => {

    const context = useContext(AuthContext);

    const { user, setUser, loading, setLoading } = context;

    const handlelogin = async ({ email, password })=>{
        setLoading(true);
        try {
            const data = await login({ email, password });
    
            setUser(data.user);
        } catch (err) {
            
        } finally {
            setLoading(false);  
        }
    }

    const handleRegister = async({username,email,password  
    }) => {
        setLoading(true);
        try {
            const data = await register({ username, email, password });
            setUser(data.user); 
        }
        catch (err) {
            
        }
        finally {
            setLoading(false);   
        }
    }

    const handleLogout = async () => {
        setLoading(true);
        try {
            const data = await logout();
            setUser(null);
        }
        catch (err) {
            
        } finally {
            setLoading(false);     
        }
    }

   useEffect(() => {
    let isMounted = true;

    const getAndSetUser = async () => {
        const data = await getMe();
        if (isMounted) {
            setUser(data?.user);
            setLoading(false);
        }
    };

    getAndSetUser();

    return () => {
        isMounted = false;
    };
}, []);
    
    return {user,loading,handlelogin,handleRegister, handleLogout}
}