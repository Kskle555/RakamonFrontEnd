import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "./axiosConfig";
function Login() {
  const [tcKimlikNo, setTcKimlikNo] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await api.post("https://localhost:7124/api/auth/login", {
        tcKimlikNo,
        password,
      });
  
      console.log("API Yanıtı:", response);  // Yanıtı detaylı olarak log'la
  
      const { message, user, token } = response.data;
  
      if (!user || !token) {
        setErrorMessage("Kullanıcı bilgileri veya token alınamadı.");
        return;
      }
  
      // Token'ı localStorage'a kaydedin
      localStorage.setItem("authToken", token);
      console.log("Kaydedilen Token:", token);

  
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Token'ı çöz
      const userRole = decodedToken.role;
  
      if (userRole === "admin") {
        navigate("/tasks");
      } else {
        navigate("/tasks");
      }
    } catch (error) {
      console.error("API Hatası:", error.response || error);
      setErrorMessage(error.response?.data?.message || "Giriş başarısız. Sunucu hatası!");
    }
  };
  
  

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-96 p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Görev Yönetim Uygulaması</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">TC Kimlik No</label>
            <input
              type="text"
              value={tcKimlikNo}
              onChange={(e) => setTcKimlikNo(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
