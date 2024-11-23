import { useParams, useNavigate } from 'react-router-dom';

function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const task = {
    id,
    title: 'Frontend Task',
    description: 'React ve TailwindCSS kullanılarak görev yönetim uygulaması geliştirilecek.',
    status: 'Tamamlanmadı',
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log('Görev Güncellendi');
    navigate('/tasks'); // Güncellemeden sonra Görev Listesi'ne yönlendirme
  };

  const handleDelete = () => {
    console.log('Görev Silindi');
    navigate('/tasks'); // Silmeden sonra Görev Listesi'ne yönlendirme
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 shadow rounded">
        <h1 className="text-2xl font-bold mb-4">Görev Detayı</h1>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block text-gray-700">Başlık</label>
            <input
              type="text"
              defaultValue={task.title}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Açıklama</label>
            <textarea
              defaultValue={task.description}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Durum</label>
            <select
              defaultValue={task.status}
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
