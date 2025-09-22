# Budgetin 📝💸

Aplikasi sederhana berbasis **HTML + Bootstrap + JavaScript** untuk membantu menghitung dan mengelola **pengeluaran bulanan**.  
Cocok untuk pekerja dengan kebutuhan rutin (transportasi, makan, kontrakan, dll.) serta pengeluaran custom (hiburan, belanja, dll.).

---

## ✨ Fitur

- **Pengeluaran Workdays**  
  Masukkan jumlah hari kerja, lalu isi biaya harian seperti transportasi (KRL, TJ, parkir) dan makan.  
  Total otomatis dihitung (`entitas × workdays`).

- **Pengeluaran Custom (dengan jumlah hari)**  
  Tambahkan kategori seperti hiburan, olahraga, dll.  
  Bisa menentukan jumlah hari × biaya per entitas.

- **Pengeluaran Sekali Keluar (bulanan)**  
  Untuk biaya tanpa faktor hari, misalnya kontrakan, listrik, bensin, dll.

- **Alokasi Bank**  
  Setiap entri pengeluaran bisa diarahkan ke bank tertentu (misalnya: BCA, OCBC, BSI, Mandiri, Jago).  
  Sehingga mempermudah untuk tahu **uang harus ditransfer ke mana**.

- **Ringkasan Pengeluaran**
  - Rincian total per kategori.
  - Rincian entitas (misalnya KRL total sekian).
  - Total per bank (alokasi transfer).
  - Grand total seluruh pengeluaran.

---

## 🚀 Cara Pakai

1. Clone repo ini:

   ```bash
   git clone https://github.com/segalih/budgetin.git
   cd budgetin
   ```

2. Buka file `index.html` langsung di browser
   _(karena ini proyek static, tidak butuh server backend)._

3. Input:

   - Jumlah **workdays**.
   - Tambahkan item transportasi & makan.
   - Tambahkan custom pengeluaran (misalnya hiburan).
   - Tambahkan pengeluaran bulanan (misalnya kontrakan, listrik).
   - Pilih bank alokasi untuk setiap entri.

4. Klik **Hitung Total** → hasil akan muncul di bagian _Ringkasan Pengeluaran_.

---

## 🌐 Deploy ke GitHub Pages

Proyek ini sudah siap untuk **GitHub Pages**.

1. Pastikan sudah push ke branch `master` (atau `main`).
2. Buka **Settings > Pages** di repository GitHub.
3. Atur:

   - Source → Deploy from branch
   - Branch → `master` → `/ (root)`

4. Simpan → GitHub akan memberikan URL halaman kamu.

---

## 📂 Struktur Proyek

```
budgetin/
├── index.html   # Halaman utama
├── script.js    # Logika perhitungan
├── style.css    # (opsional) styling tambahan
└── README.md    # Dokumentasi proyek
```

---

## 📸 Screenshot (contoh UI)

_(tambahkan screenshot setelah UI jalan di browser)_

---

## 🔮 Roadmap (Pengembangan Berikutnya)

- [ ] Export hasil ke Excel / PDF.
- [ ] Simpan data pengeluaran ke localStorage agar tidak hilang.
- [ ] Tambahkan grafik visualisasi pengeluaran.
- [ ] Tambah opsi kategori bank dinamis (bisa ditambah sendiri).

---

## 📜 Lisensi

MIT License © 2025
Dibuat dengan ❤️ oleh [segalih](https://github.com/segalih)
