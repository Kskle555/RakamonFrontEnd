import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import api from './axiosConfig';
function TaskList() {

  const [tasks, setTasks] = useState([]);


    const navigate = useNavigate(); // Yönlendirme için hook
  
  
    useEffect(() => {
      // Görevleri çekme
      const fetchTasks = async () => {
        try {
          const response = await api.get('/tasks');
          setTasks(response.data);
        } catch (error) {
          console.error('Görevleri alırken bir hata oluştu:', error);
          
        }
      };
  
      fetchTasks();
    }, []);


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
                  <p className={`text-sm ${task.isCompleted ? 'text-green-500 underline' : 'text-red-500 underline'}`}>
                   {task.isCompleted ? 'Tamamlandı' : 'Tamamlanmadı'}
                 </p>
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
  