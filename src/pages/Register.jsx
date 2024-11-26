import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./axiosConfig";

function Register() {
  const [name, setName] = useState(""); // Kullanıcı adı
  const [email, setEmail] = useState(""); // Kullanıcı email
  const [tcKimlikNo, setTcKimlikNo] = useState(""); // TC Kimlik Numarası
  const [password, setPassword] = useState(""); // Şifre
  const [role, setRole] = useState(""); // Kullanıcı rolü
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // API'ye kullanıcı kaydı için istek gönderiyoruz
      const response = await api.post("https://oguzhanbilgi.com/api/Users", {
        id: 0, // Yeni kullanıcı için id'yi 0 olarak gönderiyoruz (API bunu  otomatik olarak atacak)
        name, // Kullanıcı adı
        email, // Kullanıcı email
        tcKimlikNo, // TC Kimlik Numarası
        role, // Kullanıcı rolü
        password, // Şifre
      });

      console.log("Kayıt Başarılı:", response); // Yanıtı log'la

      setSuccessMessage("Kayıt başarılı! Giriş yapmak için login sayfasına yönlendiriliyorsunuz.");
      setErrorMessage(""); // Hata mesajını sıfırlıyoruz

      // Başarıyla kayıt olduktan sonra login sayfasına yönlendir
      setTimeout(() => {
        navigate("/");
      }, 2000); // 2 saniye sonra login sayfasına yönlendirme yapılacak
    } catch (error) {
      console.error("Kayıt Hatası:", error.response || error);
      setErrorMessage(error.response?.data?.message || "Kayıt sırasında bir hata oluştu.");
      setSuccessMessage(""); // Başarı mesajını sıfırlıyoruz
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-96 p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Yeni Kullanıcı Kaydı</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700">Ad</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">TC Kimlik No</label>
            <input
              type="text"
              value={tcKimlikNo}
              onChange={(e) => setTcKimlikNo(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Rol Seç</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Rol Seçin</option>
              <option value="admin">Admin</option>
              <option value="user">Kullanıcı</option>
            </select>
          </div>

          {/* Başarı mesajı */}
          {successMessage && (
            <p className="text-green-500 text-sm mb-4">{successMessage}</p>
          )}

          {/* Hata mesajı */}
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Kayıt Ol
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
