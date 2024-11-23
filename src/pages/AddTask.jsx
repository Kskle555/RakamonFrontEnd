import { useNavigate } from 'react-router-dom';

function AddTask() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Yeni Görev Eklendi');
    navigate('/tasks'); // Ekledikten sonra Görev Listesi'ne yönlendirme
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 shadow rounded">
        <h1 className="text-2xl font-bold mb-4">Yeni Görev Ekle</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Başlık</label>
            <input
              type="text"
              placeholder="Görev Başlığı"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Açıklama</label>
            <textarea
              placeholder="Görev Açıklaması"
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
