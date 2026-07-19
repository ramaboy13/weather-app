// Internationalization (i18n) translations for EN and ID
export type Locale = "en" | "id";

export const translations = {
  en: {
    // Navigation
    nav_home: "Home",
    nav_map: "Map",
    nav_forecast: "Forecast",
    nav_settings: "Settings",

    // Home
    today: "Today",
    tomorrow: "Tomorrow",
    next_7_days: "Next 7 days",
    hourly_forecast: "Hourly Forecast",
    chance_of_rain: "Chance of rain",
    other_large_cities: "Other large cities",
    show_all: "Show All",
    air_quality: "Air Quality",
    air_quality_desc: "Check AQI Near You",
    current_location: "Current Location",
    forecast_btn: "Forecast",
    air_quality_btn: "Air quality",

    // Weather conditions
    sunny: "Sunny",
    partly_cloudy: "Partly Cloudy",
    cloudy: "Cloudy",
    rainy: "Rainy",
    snowy: "Snowy",
    foggy: "Foggy",
    thunderstorm: "Thunderstorm",
    rain_showers: "Rain Showers",
    clear: "Clear",
    overcast: "Overcast",

    // Current Weather
    real_feel: "Real Feel",
    wind: "Wind",
    pressure: "Pressure",
    humidity: "Humidity",

    // Map
    weather_map: "Weather Map",
    live_radar: "Live Radar",
    precipitation: "Precipitation",
    temperature_layer: "Temperature",
    wind_layer: "Wind",
    clouds_layer: "Clouds",

    // Forecast
    seven_day_forecast: "7 Day Forecast",

    // Air Quality
    aqi_good: "Good",
    aqi_moderate: "Moderate",
    aqi_unhealthy_sensitive: "Unhealthy for Sensitive Groups",
    aqi_unhealthy: "Unhealthy",
    aqi_very_unhealthy: "Very Unhealthy",
    aqi_hazardous: "Hazardous",
    pm25: "PM 2.5",
    pm10: "PM 10",

    // Settings
    settings: "Settings",
    appearance: "Appearance",
    dark_mode: "Dark Mode",
    general: "General",
    language: "Language",
    about: "About",
    privacy_policy: "Privacy Policy",
    terms_of_service: "Terms of Service",
    about_app: "About App",
    version: "v1.0.0",

    // Location
    latitude: "Latitude",
    longitude: "Longitude",
    timezone: "Timezone",
    population: "Population",

    // Cities
    cities: "Cities",
    filter_cities: "Filter cities...",

    // Detail pages
    details: "Details",

    // Rain detail
    rain_forecast: "Rain Forecast",
    rain_chance: "Chance of Rain",
    no_rain: "No rain expected",
    light_rain: "Light rain",
    moderate_rain: "Moderate rain",
    heavy_rain: "Heavy rain",
    time: "Time",

    // General
    search_city: "Search city...",
    loading: "Loading...",
    error: "Error",
    back: "Back",
    save: "Save",
    cancel: "Cancel",
    now: "Now",
    location_permission: "Allow Location",
    location_permission_desc: "Enable location for accurate weather data",
    allow: "Allow",
    deny: "Deny",
    using_default: "Using default location",
    retry: "Retry",

    // Map page weather info
    feels_like: "Feels Like",
    uv_index: "UV Index",
    visibility: "Visibility",
    dew_point: "Dew Point",
    sunrise: "Sunrise",
    sunset: "Sunset",
    wind_speed: "Wind Speed",
    cloud_cover: "Cloud Cover",
    rain_probability: "Rain Probability",
    current_weather_info: "Current Weather",

    // Terms & Privacy
    tos_title: "Terms of Service",
    tos_last_updated: "Last updated: July 2026",
    tos_content: `Welcome to Weather Dashboard. By using our application, you agree to the following terms and conditions.

1. Acceptance of Terms
By accessing or using Weather Dashboard, you agree to be bound by these Terms of Service and all applicable laws and regulations.

2. Use of Service
Weather Dashboard provides weather information for informational purposes only. We do not guarantee the accuracy of weather data displayed. Users should not rely solely on this application for critical weather-related decisions.

3. Data Sources
Weather data is sourced from Open-Meteo API and other third-party providers. We are not responsible for any inaccuracies in the data provided by these sources.

4. User Responsibilities
You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.

5. Limitation of Liability
Weather Dashboard shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the service.

6. Changes to Terms
We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting.

7. Contact
For questions about these Terms, please contact us at support@weatherdashboard.app`,

    privacy_title: "Privacy Policy",
    privacy_last_updated: "Last updated: July 2026",
    privacy_content: `Your privacy is important to us. This Privacy Policy explains how Weather Dashboard collects, uses, and protects your personal information.

1. Information We Collect
- Location data (when you grant permission) to provide local weather information
- Search queries to improve search results
- Device information for optimal display

2. How We Use Your Information
- To provide accurate weather forecasts for your location
- To improve our services and user experience
- To display relevant weather data and air quality information

3. Data Storage
We do not store personal data on our servers. Location data is processed in real-time and is not persisted.

4. Third-Party Services
We use the following third-party services:
- Open-Meteo API for weather data
- OpenStreetMap for map rendering
- Geocoding services for location search

5. Data Security
We implement appropriate security measures to protect your information against unauthorized access, alteration, disclosure, or destruction.

6. Children's Privacy
Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children.

7. Changes to This Policy
We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.

8. Contact Us
If you have questions about this Privacy Policy, please contact us at privacy@weatherdashboard.app`,

    about_title: "About App",
    about_content: `Weather Dashboard is a modern weather application built with Next.js, React, and Clean Architecture principles.

Version: 1.0.0
Released: July 2026

Features:
• Real-time weather data from Open-Meteo API
• Air quality monitoring with AQI index
• Interactive weather map with Leaflet
• 7-day and hourly forecasts
• Rain probability charts
• Dark/Light theme support
• Multi-language support (English & Indonesian)
• Responsive design for all devices

Built with:
• Next.js 16
• React 19
• Tailwind CSS
• Framer Motion
• Leaflet Maps
• Clean Architecture

Developed with ❤️ for weather enthusiasts everywhere.`,
  },

  id: {
    // Navigation
    nav_home: "Beranda",
    nav_map: "Peta",
    nav_forecast: "Prakiraan",
    nav_settings: "Pengaturan",

    // Home
    today: "Hari Ini",
    tomorrow: "Besok",
    next_7_days: "7 Hari ke depan",
    hourly_forecast: "Prakiraan Per Jam",
    chance_of_rain: "Peluang hujan",
    other_large_cities: "Kota besar lainnya",
    show_all: "Lihat Semua",
    air_quality: "Kualitas Udara",
    air_quality_desc: "Cek AQI di Dekat Anda",
    current_location: "Lokasi Saat Ini",
    forecast_btn: "Prakiraan",
    air_quality_btn: "Kualitas udara",

    // Weather conditions
    sunny: "Cerah",
    partly_cloudy: "Berawan Sebagian",
    cloudy: "Berawan",
    rainy: "Hujan",
    snowy: "Bersalju",
    foggy: "Berkabut",
    thunderstorm: "Badai Petir",
    rain_showers: "Hujan Ringan",
    clear: "Cerah",
    overcast: "Mendung",

    // Current Weather
    real_feel: "Terasa Seperti",
    wind: "Angin",
    pressure: "Tekanan",
    humidity: "Kelembaban",

    // Map
    weather_map: "Peta Cuaca",
    live_radar: "Radar Langsung",
    precipitation: "Curah Hujan",
    temperature_layer: "Suhu",
    wind_layer: "Angin",
    clouds_layer: "Awan",

    // Forecast
    seven_day_forecast: "Prakiraan 7 Hari",

    // Air Quality
    aqi_good: "Baik",
    aqi_moderate: "Sedang",
    aqi_unhealthy_sensitive: "Tidak Sehat untuk Kelompok Sensitif",
    aqi_unhealthy: "Tidak Sehat",
    aqi_very_unhealthy: "Sangat Tidak Sehat",
    aqi_hazardous: "Berbahaya",
    pm25: "PM 2.5",
    pm10: "PM 10",

    // Settings
    settings: "Pengaturan",
    appearance: "Tampilan",
    dark_mode: "Mode Gelap",
    general: "Umum",
    language: "Bahasa",
    about: "Tentang",
    privacy_policy: "Kebijakan Privasi",
    terms_of_service: "Syarat dan Ketentuan",
    about_app: "Tentang Aplikasi",
    version: "v1.0.0",

    // Location
    latitude: "Garis Lintang",
    longitude: "Garis Bujur",
    timezone: "Zona Waktu",
    population: "Populasi",

    // Cities
    cities: "Kota-kota",
    filter_cities: "Cari kota...",

    // Detail pages
    details: "Detail",

    // Rain detail
    rain_forecast: "Prakiraan Hujan",
    rain_chance: "Peluang Hujan",
    no_rain: "Tidak ada hujan",
    light_rain: "Hujan ringan",
    moderate_rain: "Hujan sedang",
    heavy_rain: "Hujan lebat",
    time: "Waktu",

    // General
    search_city: "Cari kota...",
    loading: "Memuat...",
    error: "Kesalahan",
    back: "Kembali",
    save: "Simpan",
    cancel: "Batal",
    now: "Sekarang",
    location_permission: "Izinkan Lokasi",
    location_permission_desc: "Aktifkan lokasi untuk data cuaca yang akurat",
    allow: "Izinkan",
    deny: "Tolak",
    using_default: "Menggunakan lokasi default",
    retry: "Coba Lagi",

    // Map page weather info
    feels_like: "Terasa",
    uv_index: "Indeks UV",
    visibility: "Jarak Pandang",
    dew_point: "Titik Embun",
    sunrise: "Matahari Terbit",
    sunset: "Matahari Terbenam",
    wind_speed: "Kecepatan Angin",
    cloud_cover: "Tutupan Awan",
    rain_probability: "Probabilitas Hujan",
    current_weather_info: "Cuaca Saat Ini",

    // Terms & Privacy
    tos_title: "Syarat dan Ketentuan",
    tos_last_updated: "Terakhir diperbarui: Juli 2026",
    tos_content: `Selamat datang di Weather Dashboard. Dengan menggunakan aplikasi kami, Anda menyetujui syarat dan ketentuan berikut.

1. Penerimaan Syarat
Dengan mengakses atau menggunakan Weather Dashboard, Anda setuju untuk terikat oleh Syarat dan Ketentuan ini dan semua hukum serta peraturan yang berlaku.

2. Penggunaan Layanan
Weather Dashboard menyediakan informasi cuaca untuk tujuan informasi saja. Kami tidak menjamin keakuratan data cuaca yang ditampilkan. Pengguna tidak boleh hanya mengandalkan aplikasi ini untuk keputusan penting terkait cuaca.

3. Sumber Data
Data cuaca bersumber dari API Open-Meteo dan penyedia pihak ketiga lainnya. Kami tidak bertanggung jawab atas ketidakakuratan dalam data yang disediakan oleh sumber-sumber ini.

4. Tanggung Jawab Pengguna
Anda bertanggung jawab untuk menjaga kerahasiaan akun Anda dan untuk semua aktivitas yang terjadi di bawah akun Anda.

5. Batasan Tanggung Jawab
Weather Dashboard tidak akan bertanggung jawab atas kerusakan langsung, tidak langsung, insidental, khusus, atau konsekuensial yang diakibatkan oleh penggunaan atau ketidakmampuan menggunakan layanan.

6. Perubahan Syarat
Kami berhak untuk mengubah syarat ini kapan saja. Perubahan akan berlaku segera setelah dipublikasikan.

7. Kontak
Untuk pertanyaan tentang Syarat ini, silakan hubungi kami di support@weatherdashboard.app`,

    privacy_title: "Kebijakan Privasi",
    privacy_last_updated: "Terakhir diperbarui: Juli 2026",
    privacy_content: `Privasi Anda penting bagi kami. Kebijakan Privasi ini menjelaskan bagaimana Weather Dashboard mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda.

1. Informasi yang Kami Kumpulkan
- Data lokasi (ketika Anda memberikan izin) untuk menyediakan informasi cuaca lokal
- Pencarian query untuk meningkatkan hasil pencarian
- Informasi perangkat untuk tampilan optimal

2. Cara Kami Menggunakan Informasi Anda
- Untuk memberikan prakiraan cuaca yang akurat untuk lokasi Anda
- Untuk meningkatkan layanan dan pengalaman pengguna kami
- Untuk menampilkan data cuaca dan informasi kualitas udara yang relevan

3. Penyimpanan Data
Kami tidak menyimpan data pribadi di server kami. Data lokasi diproses secara real-time dan tidak disimpan.

4. Layanan Pihak Ketiga
Kami menggunakan layanan pihak ketiga berikut:
- API Open-Meteo untuk data cuaca
- OpenStreetMap untuk rendering peta
- Layanan geocoding untuk pencarian lokasi

5. Keamanan Data
Kami menerapkan langkah-langkah keamanan yang tepat untuk melindungi informasi Anda dari akses, perubahan, pengungkapan, atau penghancuran yang tidak sah.

6. Privasi Anak-anak
Layanan kami tidak ditujukan untuk anak di bawah 13 tahun. Kami tidak dengan sengaja mengumpulkan informasi pribadi dari anak-anak.

7. Perubahan Kebijakan Ini
Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Kami akan memberitahu Anda tentang perubahan dengan mempublikasikan kebijakan baru di halaman ini.

8. Hubungi Kami
Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami di privacy@weatherdashboard.app`,

    about_title: "Tentang Aplikasi",
    about_content: `Weather Dashboard adalah aplikasi cuaca modern yang dibangun dengan Next.js, React, dan prinsip Clean Architecture.

Versi: 1.0.0
Dirilis: Juli 2026

Fitur:
• Data cuaca real-time dari API Open-Meteo
• Pemantauan kualitas udara dengan indeks AQI
• Peta cuaca interaktif dengan Leaflet
• Prakiraan 7 hari dan per jam
• Grafik probabilitas hujan
• Dukungan tema gelap/terang
• Dukungan multi bahasa (Inggris & Indonesia)
• Desain responsif untuk semua perangkat

Dibangun dengan:
• Next.js 16
• React 19
• Tailwind CSS
• Framer Motion
• Leaflet Maps
• Clean Architecture

Dikembangkan dengan ❤️ untuk para penggemar cuaca di mana saja.`,
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];

export function t(key: TranslationKey, locale: Locale = "en"): string {
  return translations[locale][key] || translations["en"][key] || key;
}
