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

  // --- Workdays ---
  let totalWorkdays = 0;
  let workdayDetails = `<h6>🚆 Transport & Makan (${workdays} hari)</h6><ul>`;
  document.querySelectorAll("#workday-items .row").forEach((row) => {
    const name = row.children[0].children[0].value || "Item";
    const price = parseInt(row.children[1].children[0].value) || 0;
    const subtotal = price * workdays;
    totalWorkdays += subtotal;
    workdayDetails += `<li>${name} (Rp${price.toLocaleString()} × ${workdays}) = <b>Rp${subtotal.toLocaleString()}</b></li>`;
  });
  workdayDetails += `</ul><p><b>Subtotal: Rp${totalWorkdays.toLocaleString()}</b></p>`;

  // --- Custom activities ---
  let totalCustom = 0;
  let customDetails = `<h6>🎉 Kegiatan Khusus</h6>`;
  document.querySelectorAll(".custom-day-items").forEach((container) => {
    let subtotalCustom = 0;
    let detail = `<ul>`;
    container.querySelectorAll(".row").forEach((row) => {
      const name = row.children[0].children[0].value || "Aktivitas";
      const days = parseInt(row.children[1].children[0].value) || 0;
      const price = parseInt(row.children[2].children[0].value) || 0;
      const subtotal = days * price;
      subtotalCustom += subtotal;
      detail += `<li>${name} (Rp${price.toLocaleString()} × ${days}) = <b>Rp${subtotal.toLocaleString()}</b></li>`;
    });
    detail += `</ul><p><b>Subtotal: Rp${subtotalCustom.toLocaleString()}</b></p>`;
    customDetails += detail;
    totalCustom += subtotalCustom;
  });

  // --- Fixed monthly ---
  let totalFixed = 0;
  let fixedDetails = `<h6>📦 Tagihan Bulanan</h6><ul>`;
  document.querySelectorAll("#fixed-items .row").forEach((row) => {
    const name = row.children[0].children[0].value || "Tagihan";
    const price = parseInt(row.children[1].children[0].value) || 0;
    totalFixed += price;
    fixedDetails += `<li>${name} = <b>Rp${price.toLocaleString()}</b></li>`;
  });
  fixedDetails += `</ul><p><b>Subtotal: Rp${totalFixed.toLocaleString()}</b></p>`;

  // --- Grand total ---
  const grandTotal = totalWorkdays + totalCustom + totalFixed;

  document.getElementById("result-details").innerHTML = `
    ${workdayDetails}
    ${customDetails}
    ${fixedDetails}
    <hr />
    <h5 class="text-success">Grand Total: Rp${grandTotal.toLocaleString()}</h5>
  `;
}
