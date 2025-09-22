function addWorkdayItem() {
  const div = document.createElement("div");
  div.classList.add("row", "mb-2");
  div.innerHTML = `
    <div class="col"><input type="text" class="form-control" placeholder="Nama item (misal: KRL, makan siang)"></div>
    <div class="col"><input type="number" class="form-control" placeholder="Biaya per hari"></div>
    <div class="col-auto d-flex align-items-center">
      <span class="remove-btn" onclick="this.parentElement.parentElement.remove()">❌</span>
    </div>
  `;
  document.getElementById("workday-items").appendChild(div);
}

function addCustomCard() {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <div class="card-header d-flex justify-content-between align-items-center">
      🎉 Kegiatan Khusus
      <span class="remove-btn" onclick="this.closest('.card').remove()">Hapus</span>
    </div>
    <div class="card-body">
      <div class="custom-day-items"></div>
      <button class="btn btn-sm btn-primary mt-2" onclick="addCustomDayItem(this)">+ Tambah Aktivitas</button>
    </div>
  `;

  document.getElementById("custom-cards").appendChild(card);
}

function addCustomDayItem(button) {
  const container = button.parentElement.querySelector(".custom-day-items");
  const div = document.createElement("div");
  div.classList.add("row", "mb-2");
  div.innerHTML = `
    <div class="col"><input type="text" class="form-control" placeholder="Nama aktivitas (misal: Bioskop)"></div>
    <div class="col"><input type="number" class="form-control" placeholder="Jumlah hari/x"></div>
    <div class="col"><input type="number" class="form-control" placeholder="Biaya per hari"></div>
    <div class="col-auto d-flex align-items-center">
      <span class="remove-btn" onclick="this.parentElement.parentElement.remove()">❌</span>
    </div>
  `;
  container.appendChild(div);
}

function addFixedItem() {
  const div = document.createElement("div");
  div.classList.add("row", "mb-2");
  div.innerHTML = `
    <div class="col"><input type="text" class="form-control" placeholder="Nama tagihan (misal: Kontrakan)"></div>
    <div class="col"><input type="number" class="form-control" placeholder="Biaya total"></div>
    <div class="col-auto d-flex align-items-center">
      <span class="remove-btn" onclick="this.parentElement.parentElement.remove()">❌</span>
    </div>
  `;
  document.getElementById("fixed-items").appendChild(div);
}

function calculateTotal() {
  const workdays = parseInt(document.getElementById("workdays").value) || 0;

  // Workdays
  let totalWorkdays = 0;
  document.querySelectorAll("#workday-items .row").forEach((row) => {
    const price = parseInt(row.children[1].children[0].value) || 0;
    totalWorkdays += price * workdays;
  });

  // Custom day (semua card)
  let totalCustom = 0;
  document.querySelectorAll(".custom-day-items").forEach((container) => {
    container.querySelectorAll(".row").forEach((row) => {
      const days = parseInt(row.children[1].children[0].value) || 0;
      const price = parseInt(row.children[2].children[0].value) || 0;
      totalCustom += days * price;
    });
  });

  // Fixed
  let totalFixed = 0;
  document.querySelectorAll("#fixed-items .row").forEach((row) => {
    const price = parseInt(row.children[1].children[0].value) || 0;
    totalFixed += price;
  });

  const grandTotal = totalWorkdays + totalCustom + totalFixed;

  document.getElementById("totalWorkdays").innerText =
    totalWorkdays.toLocaleString();
  document.getElementById("totalCustom").innerText =
    totalCustom.toLocaleString();
  document.getElementById("totalFixed").innerText = totalFixed.toLocaleString();
  document.getElementById("grandTotal").innerText = grandTotal.toLocaleString();
}
