import { jwtDecode } from "jwt-decode"

const authenticate = (token, cb) => {
    // console.log(token);
    if (typeof window !== "undefined") {
        sessionStorage.setItem("token", token);

        let payload = jwtDecode(token);
        sessionStorage.setItem("username", payload.username);
        if(payload.admin){
            sessionStorage.setItem("admin", "true");
        }else{
            sessionStorage.removeItem("admin");
        }
    }
    cb();
}

const getToken = () => {
    if (typeof window === "undefined") {
        return false;
    }
    return sessionStorage.getItem("token");
}

const getUsername = () => {
    if (typeof window === "undefined") {
        return false;
    }
    return sessionStorage.getItem("username");
}

const isAdmin = () => {
    if (typeof window === "undefined") {
        return false;
    }
    return sessionStorage.getItem("admin") === "true";
}

const isAuthenticated = () => {
    if (typeof window === "undefined") {
        return false;
    }
    return !!sessionStorage.getItem('token');
}

const clearJWT = ()=>{
  if (typeof window !== "undefined") {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('admin');
  }
}

export { authenticate, getToken, isAuthenticated, getUsername, clearJWT , isAdmin}