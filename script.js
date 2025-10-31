// ===== LOCAL STORAGE =====
const STORAGE_KEY = "budget_planner_data";

function saveData() {
  const data = {
    banks: getBanks(),
    workdays: document.getElementById("workdays")?.value || "",
    workdayItems: Array.from(
      document.querySelectorAll("#workday-items .row")
    ).map((row) => ({
      name: row.children[0].children[0].value,
      price: row.children[1].children[0].value,
      bank: row.children[2].querySelector("select").value,
    })),
    customItems: Array.from(document.querySelectorAll(".custom-day-items")).map(
      (container) =>
        Array.from(container.querySelectorAll(".row")).map((row) => ({
          name: row.children[0].children[0].value,
          days: row.children[1].children[0].value,
          price: row.children[2].children[0].value,
          bank: row.children[3].querySelector("select").value,
        }))
    ),
    fixedItems: Array.from(document.querySelectorAll("#fixed-items .row")).map(
      (row) => ({
        name: row.children[0].children[0].value,
        price: row.children[1].children[0].value,
        bank: row.children[2].querySelector("select").value,
      })
    ),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  const data = JSON.parse(raw);

  // Restore banks
  document.getElementById("bank-list").innerHTML = "";
  data.banks.forEach((b) => addBank(b));

  // Restore workdays
  document.getElementById("workdays").value = data.workdays || "";

  // Restore workday items
  document.getElementById("workday-items").innerHTML = "";
  data.workdayItems.forEach((item) => {
    addWorkdayItem();
    const row = document.querySelector("#workday-items .row:last-child");
    row.children[0].children[0].value = item.name;
    row.children[1].children[0].value = item.price;
    row.children[2].querySelector("select").value = item.bank;
  });

  // Restore custom items
  document.getElementById("custom-cards").innerHTML = "";
  data.customItems.forEach((card) => {
    addCustomCard();
    const container = document.querySelector(
      "#custom-cards .custom-day-items:last-child"
    );
    card.forEach((item) => {
      addCustomDayItem(container.parentElement.querySelector("button"));
      const row = container.querySelector(".row:last-child");
      row.children[0].children[0].value = item.name;
      row.children[1].children[0].value = item.days;
      row.children[2].children[0].value = item.price;
      row.children[3].querySelector("select").value = item.bank;
    });
  });

  // Restore fixed items
  document.getElementById("fixed-items").innerHTML = "";
  data.fixedItems.forEach((item) => {
    addFixedItem();
    const row = document.querySelector("#fixed-items .row:last-child");
    row.children[0].children[0].value = item.name;
    row.children[1].children[0].value = item.price;
    row.children[2].querySelector("select").value = item.bank;
  });
}

// ===== BANK LIST =====
function addBank(name = "") {
  const div = document.createElement("div");
  div.classList.add("input-group", "mb-2");
  div.innerHTML = `
    <input type="text" class="form-control bank-input" placeholder="Nama Bank" value="${name}">
    <button class="btn btn-outline-danger" onclick="this.parentElement.remove(); saveData();">❌</button>
  `;
  document.getElementById("bank-list").appendChild(div);
}

function getBanks() {
  return Array.from(document.querySelectorAll(".bank-input"))
    .map((input) => input.value.trim())
    .filter((v) => v !== "");
}

function createBankSelect() {
  const banks = getBanks();
  let options = `<option value="">- Pilih Bank -</option>`;
  banks.forEach((b) => {
    options += `<option value="${b}">${b}</option>`;
  });
  return `<select class="form-select bank-select">${options}</select>`;
}

// ===== WORKDAY =====
function addWorkdayItem() {
  const div = document.createElement("div");
  div.classList.add("row", "mb-2");
  div.innerHTML = `
    <div class="col"><input type="text" class="form-control" placeholder="Nama item"></div>
    <div class="col"><input type="number" class="form-control" placeholder="Biaya per hari"></div>
    <div class="col">${createBankSelect()}</div>
    <div class="col-auto d-flex align-items-center">
      <span class="remove-btn" onclick="this.parentElement.parentElement.remove(); saveData();">❌</span>
    </div>
  `;
  document.getElementById("workday-items").appendChild(div);
}

// ===== CUSTOM =====
function addCustomCard() {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <div class="card-header d-flex justify-content-between align-items-center">
      🎉 Kegiatan Khusus
      <span class="remove-btn" onclick="this.closest('.card').remove(); saveData();">Hapus</span>
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
    <div class="col"><input type="text" class="form-control" placeholder="Nama aktivitas"></div>
    <div class="col"><input type="number" class="form-control" placeholder="Jumlah pembayaran/bulan"></div>
    <div class="col"><input type="number" class="form-control" placeholder="Biaya per pembayaran"></div>
    <div class="col">${createBankSelect()}</div>
    <div class="col-auto d-flex align-items-center">
      <span class="remove-btn" onclick="this.parentElement.parentElement.remove(); saveData();">❌</span>
    </div>
  `;
  container.appendChild(div);
}

// ===== FIXED =====
function addFixedItem() {
  const div = document.createElement("div");
  div.classList.add("row", "mb-2");
  div.innerHTML = `
    <div class="col"><input type="text" class="form-control" placeholder="Nama tagihan"></div>
    <div class="col"><input type="number" class="form-control" placeholder="Biaya total"></div>
    <div class="col">${createBankSelect()}</div>
    <div class="col-auto d-flex align-items-center">
      <span class="remove-btn" onclick="this.parentElement.parentElement.remove(); saveData();">❌</span>
    </div>
  `;
  document.getElementById("fixed-items").appendChild(div);
}

// ===== CALCULATE =====
function calculateTotal() {
  const banks = getBanks();
  const bankTotals = {};
  banks.forEach((b) => (bankTotals[b] = 0));

  const workdays = parseInt(document.getElementById("workdays").value) || 0;

  // Workdays
  let totalWorkdays = 0;
  let workdayDetails = `<h6>🚆 Transport & Makan (${workdays} hari)</h6><ul>`;
  document.querySelectorAll("#workday-items .row").forEach((row) => {
    const name = row.children[0].children[0].value || "Item";
    const price = parseInt(row.children[1].children[0].value) || 0;
    const bank = row.children[2].querySelector("select").value;
    const subtotal = price * workdays;
    totalWorkdays += subtotal;
    if (bank) bankTotals[bank] += subtotal;
    workdayDetails += `<li>${name} (Rp${price.toLocaleString()} × ${workdays}) = <b>Rp${subtotal.toLocaleString()}</b> ${
      bank ? "→ " + bank : ""
    }</li>`;
  });
  workdayDetails += `</ul><p><b>Subtotal: Rp${totalWorkdays.toLocaleString()}</b></p>`;

  // Custom
  let totalCustom = 0;
  let customDetails = `<h6>🎉 Kegiatan Khusus</h6>`;
  document.querySelectorAll(".custom-day-items").forEach((container) => {
    let subtotalCustom = 0;
    let detail = `<ul>`;
    container.querySelectorAll(".row").forEach((row) => {
      const name = row.children[0].children[0].value || "Aktivitas";
      const days = parseInt(row.children[1].children[0].value) || 0;
      const price = parseInt(row.children[2].children[0].value) || 0;
      const bank = row.children[3].querySelector("select").value;
      const subtotal = days * price;
      subtotalCustom += subtotal;
      if (bank) bankTotals[bank] += subtotal;
      detail += `<li>${name} (Rp${price.toLocaleString()} × ${days}) = <b>Rp${subtotal.toLocaleString()}</b> ${
        bank ? "→ " + bank : ""
      }</li>`;
    });
    detail += `</ul><p><b>Subtotal: Rp${subtotalCustom.toLocaleString()}</b></p>`;
    customDetails += detail;
    totalCustom += subtotalCustom;
  });

  // Fixed
  let totalFixed = 0;
  let fixedDetails = `<h6>📦 Tagihan Bulanan</h6><ul>`;
  document.querySelectorAll("#fixed-items .row").forEach((row) => {
    const name = row.children[0].children[0].value || "Tagihan";
    const price = parseInt(row.children[1].children[0].value) || 0;
    const bank = row.children[2].querySelector("select").value;
    totalFixed += price;
    if (bank) bankTotals[bank] += price;
    fixedDetails += `<li>${name} = <b>Rp${price.toLocaleString()}</b> ${
      bank ? "→ " + bank : ""
    }</li>`;
  });
  fixedDetails += `</ul><p><b>Subtotal: Rp${totalFixed.toLocaleString()}</b></p>`;

  const grandTotal = totalWorkdays + totalCustom + totalFixed;

  // Bank allocation
  let bankDetails = `<h6>🏦 Alokasi Bank</h6><ul>`;
  for (const [bank, total] of Object.entries(bankTotals)) {
    bankDetails += `<li>${bank}: <b>Rp${total.toLocaleString()}</b></li>`;
  }
  bankDetails += `</ul>`;

  document.getElementById("result").innerHTML = `
    ${workdayDetails}
    ${customDetails}
    ${fixedDetails}
    <hr />
    <h5 class="text-success">Grand Total: Rp${grandTotal.toLocaleString()}</h5>
    <hr />
    ${bankDetails}
  `;

  saveData();
}

// ===== INIT =====
window.addEventListener("DOMContentLoaded", () => {
  loadData();

  // Autosave tiap input berubah
  document.body.addEventListener("input", saveData);
  document.body.addEventListener("change", saveData);
});

// ===== INIT SAMPLE BANKS (jika kosong) =====
if (!localStorage.getItem(STORAGE_KEY)) {
  addBank("BCA");
  addBank("OCBC");
  addBank("Mandiri");
  addBank("BSI");
  addBank("Jago");
}
