import React from "react";
import { Navigate, Outlet } from "react-router-dom"; // Outlet'i burada ekleyin
const PrivateRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem("authToken");
  
    // Token yoksa login sayfasına yönlendir
    if (!token) {
      return <Navigate to="/" />;
    }
  
    try {
      // Token'ı çöz
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      console.log("Decoded Token:", decodedToken);
  
      // Kullanıcı rolünü alın
      const userRole = decodedToken["https://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      console.log("User Role:", userRole);
  
      // Kullanıcının rolü izin verilen rollerde değilse, login sayfasına yönlendir
      // if (!allowedRoles.includes(userRole)) {
      //   alert("Bu sayfaya erişim izniniz yok.");
      //   return <Navigate to="/" />;
      // }
    } catch (error) {
      console.error("Token çözümleme hatası:", error);
      return <Navigate to="/" />;
    }
  
    // Kullanıcı yetkiliyse rota içeriklerini göster
    return <Outlet />;
  };
  
  export default PrivateRoute;
  