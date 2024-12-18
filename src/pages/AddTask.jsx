import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from './axiosConfig';

function AddTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [role, setRole] = useState('');
  const [users, setUsers] = useState([]); // Kullanıcı listesi
  const [selectedUserId, setSelectedUserId] = useState(''); // Seçilen kullanıcı ID'si
  const navigate = useNavigate();


  const getUserFromToken = () => {
    const token = localStorage.getItem('authToken');
    if (!token) return null;
  
    try {
      // JWT'nin payload kısmını çözümle
      const payload = JSON.parse(atob(token.split('.')[1]));
  
      // Kullanıcı ID'sini doğru alandan oku
      const userId = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      console.log("Token'dan alınan kullanıcı ID'si:", userId);
  
      return userId;
    } catch (e) {
      console.error('Token çözümlemesi sırasında hata:', e);
      return null;
    }
  };

  useEffect(() => {
    // LocalStorage'den kullanıcı rolünü alıyoruz
    const userRole = localStorage.getItem('userRole');
    setRole(userRole || '');

    // Kullanıcıları backend'den çekiyoruz
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users'); // Kullanıcıları almak için API çağrısı
        setUsers(response.data); // Kullanıcıları state'e set ediyoruz
      } catch (error) {
        console.error('Kullanıcıları alırken bir hata oluştu:', error);
      }
    };

    fetchUsers();
  }, []);

  console.log(users);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!title || !description) {
        alert('Lütfen tüm alanları doldurunuz!');
        return;
      }

      if (title.length < 3) {
        alert('Başlık en az 3 karakter olmalıdır!');
        return;
      }

      if (description.length < 10) {
        alert('Açıklama en az 10 karakter olmalıdır!');
        return;
      }

      const newTask = { title, description, status: 'Tamamlanmadı' };
      const userId = getUserFromToken(); // Kullanıcı bilgisi alınıyor
      // Kullanıcı rolüne göre işlem yapma

      if (userId == null || userId == undefined) {
        console.error('Tokenden Kullanıcı ID alınamadı! işlem yaptirma');
        return;

      }
      if (role != null) {
        
        newTask.userId = selectedUserId; // Eğer normal kullanıcı ise, sadece kendi ID'sini atıyoruz
   
      } else {
        // Admin ise, seçilen kullanıcıyı görevle ilişkilendiriyoruz
        if (selectedUserId) {
          newTask.userId = selectedUserId; // Göreve seçilen kullanıcıyı atıyoruz
        
        }
      }

      await api.post('/tasks', newTask);
      alert('Yeni görev başarıyla eklendi!');

      //görev eklendi task sayfasina yonlendi
      navigate('/tasks');
      setTitle('');
      setDescription('');
      setSelectedUserId(''); // Seçilen kullanıcıyı sıfırlıyoruz
    } catch (error) {
      if (error.response && error.response.data.errors) {
        console.log('Validasyon hatası:', error.response.data.errors);
        alert(JSON.stringify(error.response.data.errors));
      } else {
        console.error('Görev güncellenirken bir hata oluştu:', error);
      }
    }
  };

  console.log(selectedUserId,"id");

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 shadow rounded">
        <h1 className="text-2xl font-bold mb-4">Yeni Görev Ekle</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Başlık</label>
            <input
              type="text"
              value={title}
              placeholder="Görev Başlığı"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Açıklama</label>
            <textarea
              placeholder="Görev Açıklaması"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Durum</label>
            <select
              defaultValue="Tamamlanmadı"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Tamamlanmadı">Tamamlanmadı</option>
              <option value="Tamamlandı">Tamamlandı</option>
            </select>
          </div>

          {users.filter(user => user.role !=null).length > 0 && (
  <div className="mb-4">
    <label className="block text-gray-700">Kullanıcı Seç</label>
    <select
      value={selectedUserId}
      onChange={(e) => setSelectedUserId(e.target.value)}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option value="">Bir kullanıcı seçin</option>
      {users.filter(user => user.role != null).map((user) => (
        <option key={user.id} value={user.id}>
          {user.name} 
        </option>
      ))}
    </select>
  </div>
)}
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            Görev Ekle
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
