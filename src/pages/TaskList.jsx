import { useNavigate } from 'react-router-dom';

function TaskList() {
    const navigate = useNavigate(); // Yönlendirme için hook
    const tasks = [
      { id: 1, title: 'Frontend Task', status: 'Tamamlanmadı' },
      { id: 2, title: 'Backend Task', status: 'Tamamlandı' },
    ];
  


    
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Görevlerim</h1>
          <div className="grid grid-cols-1 gap-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex justify-between items-center p-4 bg-white shadow rounded"
              >
                <div>
                  <h3 className="font-bold text-lg">{task.title}</h3>
                  <p className="text-gray-500">{task.status}</p>
                </div>
                <button
                onClick={()=>navigate (`/tasks/${task.id}`)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                  Detay
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 text-right">
            <button
            onClick={()=>navigate ('/add-task')}
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              Yeni Görev Ekle
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default TaskList;
  