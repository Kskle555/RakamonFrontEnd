Görev Yönetim Uygulaması (Frontend)
Bu proje, Görev Yönetim Uygulaması için geliştirilmiş React tabanlı frontend uygulamasıdır. Kullanıcılar, giriş yaparak görevlerini yönetebilir, rollerine göre farklı yetkilere sahip olabilirler (Admin veya Kullanıcı). Uygulama, modern teknolojiler kullanılarak geliştirilmiştir ve performans odaklı bir yapıya sahiptir.


🚀 Özellikler
Kullanıcı Girişi ve Yetkilendirme
Kullanıcılar, TC Kimlik Numarası ve şifreleriyle giriş yapabilir. Rol bazlı yetkilendirme sistemi (Admin ve Kullanıcı) entegre edilmiştir.

Görev Yönetimi

Adminler tüm görevleri görüntüleyebilir ve düzenleyebilir.
Normal kullanıcılar yalnızca kendi görevlerini görebilir.
Yeni Kullanıcı Kaydı
Kullanıcılar, sistemde kendilerini kaydedebilir ve rollerini seçebilir (Admin veya Kullanıcı).

Modern UI
React, TailwindCSS ve Vite kullanılarak oluşturulmuş modern ve kullanıcı dostu bir arayüz.


🛠️ Kullanılan Teknolojiler
React.js
Kullanıcı arayüzü için modern JavaScript kütüphanesi.

Vite
Hızlı geliştirme ve derleme için modern bir araç.

TailwindCSS
Esnek ve hızlı stil oluşturmak için yardımcı CSS framework'ü.

Axios
Backend API ile iletişim için kullanılan HTTP istemcisi.

React Router
Sayfa geçişleri ve yönlendirme işlemleri için kullanılan router kütüphanesi.


📂 Proje Yapısı
bash
Kodu kopyala
📦 src
├── 📁 components      # React bileşenleri
│   ├── AddTask.jsx    # Görev ekleme bileşeni
│   ├── TaskList.jsx   # Görevleri listeleme bileşeni
│   ├── Login.jsx      # Kullanıcı giriş bileşeni
│   ├── Register.jsx   # Yeni kullanıcı kaydı bileşeni
├── 📁 pages           # Sayfa yapıları
│   ├── Dashboard.jsx  # Ana yönetim paneli
├── 📁 utils           # Yardımcı dosyalar
│   ├── axiosConfig.js # API yapılandırması
│   ├── constants.js   # Sabit değerler
├── App.jsx            # Uygulama ana yapısı
└── index.jsx          # Proje giriş noktası


🔧 Kurulum ve Çalıştırma
Bu uygulamayı yerel makinenizde çalıştırmak için aşağıdaki adımları takip edin:

1️⃣ Gerekli Bağımlılıkları Kurun
npm install
2️⃣ Çevre Değişkenlerini Yapılandırın
Bir .env dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:

VITE_API_BASE_URL=https://localhost:7124/api
3️⃣ Projeyi Çalıştırın

npm run dev
4️⃣ Uygulamaya Erişim
Tarayıcınızı açın ve http://localhost:5173 adresine gidin.


🖥️ Ekran Görüntüleri
1️⃣ Giriş Sayfası
Kullanıcıların giriş yapabildiği modern ve minimal bir arayüz.


2️⃣ Kayıt Sayfası
Kullanıcılar, TC Kimlik No, şifre ve rollerini seçerek sisteme kayıt olabilir.


3️⃣ Görev Yönetim Paneli
Kullanıcılar rollerine göre görevlerini görüntüleyebilir veya düzenleyebilir.






📝 Katkıda Bulunma
Katkıda bulunmak isterseniz lütfen bir Pull Request gönderin. Daha fazla bilgi için CONTRIBUTING.md dosyasına göz atabilirsiniz.

📄 Lisans
Bu proje MIT Lisansı ile lisanslanmıştır.
