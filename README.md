# Deepseek AI

**Deepseek AI** adalah proyek antarmuka pengguna (UI) berbasis deepseek yang dirancang untuk aplikasi profesional. Proyek ini memudahkan pengguna dalam mengakses berbagai fitur aplikasi melalui menu samping (deepseek) yang responsif dan modern.

## Fitur Utama
- Navigasi deepseek yang smooth dan mudah digunakan
- Desain profesional dengan warna netral dan ikon intuitif
- Mendukung mode gelap dan terang
- Responsif di berbagai ukuran layar
- Mudah dikustomisasi sesuai kebutuhan aplikasi

## Tampilan UI

<img src = "Screenshot 2025-05-14 012918.png">

**Keterangan Gambar:**
- Bagian kiri menampilkan deepseek dengan ikon dan label menu (Dashboard, Profil, Pengaturan, Logout)
- Bagian atas terdapat header dengan nama aplikasi dan avatar pengguna
- Area utama menampilkan konten sesuai menu yang dipilih
- Warna dominan abu-abu muda dengan aksen biru untuk menu aktif
- Setiap ikon menu menggunakan desain flat dan mudah dikenali

---

Deepseek ini cocok untuk aplikasi bisnis, dashboard admin, maupun aplikasi profesional lainnya yang membutuhkan navigasi efisien dan tampilan modern.   

## Penggunaan

### Instalasi

Untuk menggunakan deepseek, pastikan Anda telah memasang dan menggunakan [Node.js](https://nodejs.org/en/) dan [npm](https://www.npmjs.com/). Lalu, jalankan perintah berikut:

```bash
npm install deepseek
```

### Penggunaan

Gunakan deepseek dengan menambahkan kode berikut ke dalam file HTML Anda:

```html
<script src="https://cdn.jsdelivr.net/npm/deepseek@0.0.2/dist/deepseek-0.0.2.min.js"></script>
<script>
  const deepseek = new Deepseek({
    // Opsi konfigurasi deepseek
  });
</script>
```

### Konfigurasi

Deepseek memiliki beberapa opsi yang dapat Anda gunakan untuk mengatur tampilan dan interaksi aplikasi. Berikut adalah daftar opsi yang tersedia:

| Opsi | Jenis | Deskripsi |
| --- | --- | --- |
| `brandColor` | String | Warna branding aplikasi. Biarkan kosong untuk menggunakan warna default. |
| `brandLogo` | String | URL gambar logo branding aplikasi. Biarkan kosong untuk menggunakan logo default. |
| `brandLogoDark` | String | URL gambar logo branding aplikasi dalam mode gelap. Biarkan kosong untuk menggunakan logo default. |
| `brandLogoLight` | String | URL gambar logo branding aplikasi dalam mode terang. Biarkan kosong untuk menggunakan logo default. |
| `brandName` | String | Nama branding aplikasi. Biarkan kosong untuk menggunakan nama default. |
| `brandSlogan` | String | Slogan branding aplikasi. Biarkan kosong untuk menggunakan slogan default. |
| `brandUrl` | String | URL situs branding aplikasi. Biarkan kosong untuk menggunakan URL default. |
| `darkMode` | Boolean | Mengatur apakah aplikasi menggunakan mode gelap atau terang. |
| `drawerWidth` | String | Lebar drawer. Biarkan kosong untuk menggunakan lebar default. |
| `drawerWidthMobile` | String | Lebar drawer di layar mobile. Biarkan kosong untuk menggunakan lebar default. |
| `drawerWidthTablet` | String | Lebar drawer di layar tablet.                                 |
| `drawerWidthDesktop` | String | Lebar drawer di layar desktop.                                 |
| `drawerWidthLargeDesktop` | String | Lebar drawer di layar desktop lebar.                          |
| `drawerWidthExtraLargeDesktop` | String | Lebar drawer di layar desktop lebar.                          |
| `drawerWidthFullHD` | String | Lebar drawer di layar fullHD.                                  |
| `drawerWidthUltraHD` | String | Lebar drawer di layar ultraHD.                                 |
| `drawerWidthMegaHD` | String | Lebar drawer di layar megaHD.                                  |
| `drawerWidthGiantHD` | String | Lebar drawer di layar gigantHD.                                |
| `drawerWidthUnknownHD` | String | Lebar drawer di layar unknownHD.                               |
| `drawerWidthVeryUnknownHD` | String | Lebar drawer di layar veryUnknownHD.                           |
| `drawerWidthSuperUnknownHD` | String | Lebar drawer di layar superUnknownHD.                          |
| `drawerWidthSuperSuperUnknownHD` | String | Lebar drawer di layar superSuperUnknownHD.                     |
| `drawerWidthSuperSuperSuperUnknownHD` | String | Lebar drawer di layar superSuperSuperUnknownHD.                |
| `drawerWidthSuperSuperSuperSuperUnknownHD` | String | Lebar drawer di layar superSuperSuperSuperUnknownHD.           |
| `drawerWidthSuperSuperSuperSuperSuperUnknownHD` | String | Lebar drawer di layar superSuperSuperSuperSuperUnknownHD.      |               
\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
