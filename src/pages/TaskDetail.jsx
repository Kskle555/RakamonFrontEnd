import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from './axiosConfig';

function TaskDetail() {

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
  
  



  const { id } = useParams();
  const navigate = useNavigate();

  // State'ler ile form verilerini tutuyoruz
  const [task, setTask] = useState({
    title: '',
    description: '',
    isCompleted: false, // true ya da false olacak  
  });

  // ID'ye göre görevi alıyoruz
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get(`/tasks/${id}`);
        setTask(response.data); // Alınan veriyi state'e kaydediyoruz
      } catch (error) {
        console.error('Görev alınırken bir hata oluştu:', error);
      }
    };

    fetchTask();
  }, [id]);

  // Güncelleme işlemi
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {

      const userId = getUserFromToken(); // Kullanıcı bilgisi alınıyor
   
    //  if (!userId) {
    //  console.error('Kullanıcı ID alınamadı!');
    //     return;
    //     }
      if (!task.title || !task.description) {
        alert('Lütfen tüm alanları doldurunuz!');
        return;
      }

      if (task.title.length < 3) {
        alert('Başlık en az 3 karakter olmalıdır!');
        return;
      }
      if (task.description.length < 10) {
        alert('Açıklama en az 10 karakter olmalıdır!');
        return;
      }
      
      const updatedTask = {
        id, // URL'deki görev ID'si
        title: task.title,
        description: task.description,
        isCompleted: task.isCompleted,
        userId: userId, // Kullanıcı ID'sini ekle
      };
  
      console.log("Gönderilen veri:", updatedTask);
      

      // PUT isteği gönderiyoruz
      await api.put(`/tasks/${id}`, updatedTask);
      alert('Görev başarıyla güncellendi!');
      navigate('/tasks'); // Güncellemeyi tamamladıktan sonra görev listesine yönlendiriyoruz
    } catch (error) {
      if (error.response && error.response.data.errors) {
        console.log('Validasyon hatası:', error.response.data.errors);
        alert(JSON.stringify(error.response.data.errors));
      } else {
        console.error('Görev güncellenirken bir hata oluştu:', error);
      }
    }
  };

  // Silme işlemi
  const handleDelete = async () => {
    try {
      await api.delete(`/tasks/${id}`);
      alert('Görev başarıyla silindi!');
      navigate('/tasks'); // Silme işlemi sonrası görev listesine yönlendiriyoruz
    } catch (error) {
      console.error('Görev silinirken bir hata oluştu:', error);
    }
  };

  // Formu render ediyoruz
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 shadow rounded">
        <h1 className="text-2xl font-bold mb-4">Görev Detayı</h1>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block text-gray-700">Başlık</label>
            <input
              type="text"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Açıklama</label>
            <textarea
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Durum</label>
            <select
              value={task.isCompleted ? 'Tamamlandı' : 'Tamamlanmadı'} // boolean değeri string'e çeviriyoruz
              onChange={(e) =>
                setTask({
                  ...task,
                  isCompleted: e.target.value === 'Tamamlandı', // true/false dönüşümü
                })
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Tamamlanmadı">Tamamlanmadı</option>
              <option value="Tamamlandı">Tamamlandı</option>
            </select>
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Güncelle
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Sil
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskDetail;