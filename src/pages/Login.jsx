function Login() {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="w-96 p-6 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Görev Yönetim Uygulaması</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">TC Kimlik No</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Şifre</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
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
  