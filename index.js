// ✅ Car model default prices
const carPrices = {
  "Vios": 0, "Innova": 0, "Fortuner": 0, "Hilux": 0, "Corolla Altis": 0,
  "Avanza": 0, "Raize": 0, "Rush": 0, "Wigo": 0, "Camry": 0,
  "Montero Sport": 0, "Mirage / Mirage G4": 0, "Xpander": 0,
  "City": 0, "Civic": 0, "BR-V": 0, "CR-V": 0, "HR-V": 0,
  "Ranger": 0, "Everest": 0
};

let selectedModel = "", selectedBoy = "", selectedStatus = "Unpaid", selectedService = "";
let total = 0, totalExpenses = 0, showAllPaid = false;
let expenseArray = JSON.parse(localStorage.getItem("expenseArray") || "[]");
let boyCounts = {
  "Joven": 0, "Pipoy": 0, "Richard": 0, "Avatar": 0, "Obet": 0, "Willie": 0
};

// DOM Elements
const brandDropdown = document.getElementById("brandDropdown");
const modelDropdown = document.getElementById("modelDropdown");
const modelDisplay = document.getElementById("selectedModel");
const priceDisplay = document.getElementById("selectedPrice");
const boyDisplay = document.getElementById("selectedBoy");
const serviceDisplay = document.getElementById("selectedService");
const statusDisplay = document.getElementById("selectedStatus");
const totalDisplay = document.getElementById("totalAmount");
const expenseDisplay = document.getElementById("totalExpenses");
const recordList = document.getElementById("recordList");
const addBtn = document.getElementById("addRecordBtn");
const plateInput = document.getElementById("plateNumber");
const useOtherModel = document.getElementById("useOtherModel");
const otherModelInput = document.getElementById("otherModel");
const otherPriceInput = document.getElementById("otherPrice");
const useOtherBoy = document.getElementById("useOtherBoy");
const otherBoyInput = document.getElementById("otherBoy");
const useOtherService = document.getElementById("useOtherService");
const otherServiceInput = document.getElementById("otherService");
const addExpenseBtn = document.getElementById("addExpenseBtn");
const expenseDesc = document.getElementById("expenseDesc");
const expenseAmount = document.getElementById("expenseAmount");
const expenseList = document.getElementById("expenseList");
const togglePaidBtn = document.getElementById("togglePaidBtn");
const clearAllBtn = document.getElementById("clearAll");

// ✅ Brand → Model Mapping
const brandModels = {
  "Toyota": ["Vios", "Innova", "Fortuner", "Hilux", "Corolla Altis", "Avanza", "Raize", "Rush", "Wigo", "Camry"],
  "Mitsubishi": ["Mirage / Mirage G4", "Montero Sport", "L300", "Strada", "Xpander", "Adventure", "Pajero"],
  "Honda": ["City", "Civic", "BR-V", "CR-V", "HR-V", "Jazz", "Brio", "Mobilio"],
  "Nissan": ["Almera", "Navara", "Terra", "Patrol", "X-Trail", "Urvan / NV350", "Juke"],
  "Hyundai": ["Accent", "Tucson", "Santa Fe", "Starex", "Reina", "Venue", "Kona", "Stargazer", "Creta"],
  "Ford": ["Ranger", "Everest", "EcoSport", "Territory", "Explorer", "Mustang"],
  "Suzuki": ["Dzire", "Swift", "Celerio", "Ertiga", "XL7", "S-Presso", "Jimny", "Vitara"],
  "Chevrolet": ["Trailblazer", "Tracker", "Spark", "Suburban", "Colorado", "Captiva"],
  "Kia": ["Soluto", "Stonic", "Seltos", "Sportage", "Carnival", "Picanto", "Sorento"],
  "Mazda": ["Mazda2", "Mazda3", "CX-3", "CX-5", "CX-9", "BT-50"],
  "Isuzu": ["D-Max", "mu-X", "Crosswind", "Fuego"],
  "Chery": ["Tiggo 2", "Tiggo 5X", "Tiggo 7 Pro", "Tiggo 8"],
  "Geely": ["Coolray", "Okavango", "Emgrand", "Azkarra"]
};

document.addEventListener("DOMContentLoaded", function () {
  const brandDropdown = document.getElementById("brandDropdown");
  const modelDropdown = document.getElementById("modelDropdown");

  const brandModels = {
    "Toyota": ["Vios", "Innova", "Fortuner", "Hilux", "Corolla Altis", "Avanza", "Raize", "Rush", "Wigo", "Camry"],
    "Mitsubishi": ["Mirage / Mirage G4", "Montero Sport", "L300", "Strada", "Xpander", "Adventure", "Pajero"],
    "Honda": ["City", "Civic", "BR-V", "CR-V", "HR-V", "Jazz", "Brio", "Mobilio"],
    "Nissan": ["Almera", "Navara", "Terra", "Patrol", "X-Trail", "Urvan / NV350", "Juke"],
    "Hyundai": ["Accent", "Tucson", "Santa Fe", "Starex", "Reina", "Venue", "Kona", "Stargazer", "Creta"],
    "Ford": ["Ranger", "Everest", "EcoSport", "Territory", "Explorer", "Mustang"],
    "Suzuki": ["Dzire", "Swift", "Celerio", "Ertiga", "XL7", "S-Presso", "Jimny", "Vitara"],
    "Chevrolet": ["Trailblazer", "Tracker", "Spark", "Suburban", "Colorado", "Captiva"],
    "Kia": ["Soluto", "Stonic", "Seltos", "Sportage", "Carnival", "Picanto", "Sorento"],
    "Mazda": ["Mazda2", "Mazda3", "CX-3", "CX-5", "CX-9", "BT-50"],
    "Isuzu": ["D-Max", "mu-X", "Crosswind", "Fuego"],
    "Chery": ["Tiggo 2", "Tiggo 5X", "Tiggo 7 Pro", "Tiggo 8"],
    "Geely": ["Coolray", "Okavango", "Emgrand", "Azkarra"]
  };

// Brand → Model Dropdown
brandDropdown.addEventListener("change", () => {
  const brand = brandDropdown.value;
  modelDropdown.innerHTML = '<option value="">-- Select Model --</option>';
  modelDropdown.disabled = !brand;
  if (brandModels[brand]) {
    brandModels[brand].forEach(model => {
      const option = document.createElement("option");
      option.value = model;
      option.textContent = model;
      modelDropdown.appendChild(option);
    });
  }
});

modelDropdown.addEventListener("change", () => {
  const model = modelDropdown.value;
  if (model) {
    selectedModel = model;
    modelDisplay.textContent = model;
    const price = carPrices[model] || 0;
    priceDisplay.textContent = `₱${price}`;
    useOtherModel.checked = false;
    document.getElementById("otherModelInputs").style.display = "none";
    otherModelInput.value = "";
    otherPriceInput.value = "";
  }
});


  // Re-assign on load
  if (brandDropdown.value) {
    brandDropdown.dispatchEvent(new Event("change"));
  }
});

// Manual Model Inputs
useOtherModel.addEventListener("change", () => {
  const section = document.getElementById("otherModelInputs");
  if (useOtherModel.checked) {
    section.style.display = "flex";
    modelDropdown.value = "";
    selectedModel = "";
    modelDisplay.textContent = "None";
    priceDisplay.textContent = "₱0";
  } else {
    section.style.display = "none";
    otherModelInput.value = "";
    otherPriceInput.value = "";
  }
});




otherModelInput.addEventListener("input", () => {
  selectedModel = otherModelInput.value;
  modelDisplay.textContent = selectedModel || "None";
});

otherPriceInput.addEventListener("input", () => {
  const price = parseInt(otherPriceInput.value) || 0;
  priceDisplay.textContent = `₱${price}`;
});

// ✅ Price Buttons
document.querySelectorAll(".price-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".price-btn").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    const price = parseInt(btn.dataset.price);
    priceDisplay.textContent = `₱${price}`;
    if (useOtherModel.checked) otherPriceInput.value = price;
  });
});

// ✅ Carwash Boy Buttons
document.querySelectorAll(".boy-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".boy-btn").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    selectedBoy = btn.dataset.boy;
    boyDisplay.textContent = selectedBoy;
    useOtherBoy.checked = false;
    document.getElementById("otherBoyInputs").style.display = "none";
    otherBoyInput.value = "";
  });
});

useOtherBoy.addEventListener("change", () => {
  const section = document.getElementById("otherBoyInputs");
  section.style.display = useOtherBoy.checked ? "block" : "none";
  if (!useOtherBoy.checked) otherBoyInput.value = "";
});

otherBoyInput.addEventListener("input", () => {
  selectedBoy = otherBoyInput.value;
  boyDisplay.textContent = selectedBoy || "None";
});

// ✅ Service Buttons
document.querySelectorAll(".service-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".service-btn").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    selectedService = btn.dataset.service;
    serviceDisplay.textContent = selectedService;
    useOtherService.checked = false;
    document.getElementById("otherServiceInputs").style.display = "none";
    otherServiceInput.value = "";
  });
});

useOtherService.addEventListener("change", () => {
  const section = document.getElementById("otherServiceInputs");
  section.style.display = useOtherService.checked ? "block" : "none";
  if (!useOtherService.checked) otherServiceInput.value = "";
});

otherServiceInput.addEventListener("input", () => {
  selectedService = otherServiceInput.value;
  serviceDisplay.textContent = selectedService || "None";
});

// ✅ Status Buttons
document.querySelectorAll(".status-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".status-btn").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    selectedStatus = btn.dataset.status;
    statusDisplay.textContent = selectedStatus;
  });
});


addBtn.addEventListener("click", () => {
  const plate = plateInput.value.trim();
  const price = useOtherModel.checked
    ? parseInt(otherPriceInput.value) || 0
    : parseInt(priceDisplay.textContent.replace("₱", "")) || 0;
  const boy = useOtherBoy.checked ? otherBoyInput.value.trim() : selectedBoy;
  const service = useOtherService.checked ? otherServiceInput.value.trim() : selectedService;

  if (!plate || !selectedModel || !price || !boy || !service) {
    alert("Please fill all required fields before adding a record.");
    return;
  }

  const card = document.createElement("div");
  card.className = "card p-2 mb-2 shadow-sm";
  card.dataset.paid = selectedStatus === "Paid" ? "true" : "false";
  card.innerHTML = `
    <strong>Plate:</strong> ${plate} | <strong>Model:</strong> ${selectedModel} | <strong>Price:</strong> ₱${price}<br>
    <strong>Service:</strong> ${service} | <strong>Carwash Boy:</strong> ${boy} | 
    <strong>Status:</strong> <span class="status-label ${selectedStatus === "Paid" ? "text-success" : "text-danger"} fw-bold">${selectedStatus}</span><br>
    <strong>Date:</strong> ${getCurrentDateTime()}
    <div class="mt-2"></div>
  `;
  recordList.appendChild(card);
  attachCardEvents(card, boy, price);

  if (boyCounts[boy] !== undefined) boyCounts[boy]++;
  if (selectedStatus === "Paid") total += price;

  totalDisplay.textContent = `₱${total}`;
  updateBoyCountDisplay();
  saveToLocalStorage();
  alert(`${selectedStatus} record added.`);
  sortCardsByStatus();
  filterCards();

  // ✅ RESET SELECTIONS AFTER ADD
  plateInput.value = "";
  selectedModel = "";
  selectedBoy = "";
  selectedStatus = "Unpaid";
  selectedService = "";
  modelDisplay.textContent = "None";
  boyDisplay.textContent = "None";
  serviceDisplay.textContent = "None";
  statusDisplay.textContent = "Unpaid";
  priceDisplay.textContent = "₱0";
  modelDropdown.value = "";
  modelDropdown.disabled = true;
  brandDropdown.value = "";
  otherModelInput.value = "";
  otherPriceInput.value = "";
  otherBoyInput.value = "";
  otherServiceInput.value = "";
  useOtherModel.checked = false;
  useOtherBoy.checked = false;
  useOtherService.checked = false;
  document.getElementById("otherModelInputs").style.display = "none";
  document.getElementById("otherBoyInputs").style.display = "none";
  document.getElementById("otherServiceInputs").style.display = "none";
  document.querySelectorAll(".price-btn, .boy-btn, .service-btn, .status-btn").forEach(btn => {
    btn.classList.remove("selected");
  });
});


function attachCardEvents(card, boy, price) {
  // ✅ Remove any old buttons inside this card
  const oldBtns = card.querySelectorAll("button");
  oldBtns.forEach(btn => btn.remove());

  const btnWrapper = document.createElement("div");
  btnWrapper.className = "d-flex gap-2 mt-2";

  const markBtn = document.createElement("button");
  markBtn.className = "btn btn-sm btn-outline-success";
  markBtn.textContent = card.dataset.paid === "true" ? "Mark as Unpaid" : "Mark as Paid";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-sm btn-outline-danger";
  deleteBtn.textContent = "Delete";

  btnWrapper.appendChild(markBtn);
  btnWrapper.appendChild(deleteBtn);
  card.appendChild(btnWrapper);

  // ✅ Toggle Paid/Unpaid
  markBtn.addEventListener("click", () => {
    const isPaid = card.dataset.paid === "true";
    card.dataset.paid = !isPaid;

    const statusLabel = card.querySelector(".status-label");
    statusLabel.textContent = !isPaid ? "Paid" : "Unpaid";
    statusLabel.classList.toggle("text-success", !isPaid);
    statusLabel.classList.toggle("text-danger", isPaid);
    markBtn.textContent = !isPaid ? "Mark as Unpaid" : "Mark as Paid";

    if (!isPaid) {
      total += price;
    } else {
      total -= price;
    }

    totalDisplay.textContent = `₱${total}`;
    alert(`Record marked as ${!isPaid ? "Paid" : "Unpaid"}`);

    saveToLocalStorage();
    filterCards();
  });

  // ✅ Delete Record
  deleteBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this record?")) {
      const wasPaid = card.dataset.paid === "true";
      if (wasPaid) total -= price;
      recordList.removeChild(card);
      if (boyCounts[boy] !== undefined) boyCounts[boy]--;
      updateBoyCountDisplay();
      totalDisplay.textContent = `₱${total}`;
      saveToLocalStorage();
      alert("Record deleted.");
    }
  });
}



function getCurrentDateTime() {
  const now = new Date();
  return `${now.toLocaleDateString()} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}

function updateBoyCountDisplay() {
  for (const [boy, count] of Object.entries(boyCounts)) {
    const el = document.getElementById(`${boy}Count`);
    if (el) el.textContent = count;
  }
}

function saveToLocalStorage() {
  localStorage.setItem("recordsHTML", recordList.innerHTML);
  localStorage.setItem("totalAmount", total);
  localStorage.setItem("boyCounts", JSON.stringify(boyCounts));
  localStorage.setItem("expenseArray", JSON.stringify(expenseArray));
  localStorage.setItem("totalExpenses", totalExpenses);
}

function loadFromLocalStorage() {
  const storedHTML = localStorage.getItem("recordsHTML") || "";
  recordList.innerHTML = storedHTML;

  total = 0;
  boyCounts = {
    "Joven": 0, "Pipoy": 0, "Richard": 0, "Avatar": 0, "Obet": 0, "Willie": 0
  };
  // Parse expenses
  expenseArray = JSON.parse(localStorage.getItem("expenseArray") || "[]");
  totalExpenses = parseInt(localStorage.getItem("totalExpenses") || "0");
  expenseDisplay.textContent = `₱${totalExpenses}`;
  renderExpenses();

  // Loop through each restored card
recordList.querySelectorAll(".card").forEach(card => {
  const match = /<strong>Carwash Boy:<\/strong> ([^<]+)/.exec(card.innerHTML);
  const matchPrice = /<strong>Price:<\/strong> ₱(\d+)/.exec(card.innerHTML);
  const boy = match ? match[1] : "";
  const price = matchPrice ? parseInt(matchPrice[1]) : 0;

  if (boy && boyCounts[boy] !== undefined) {
    boyCounts[boy]++;
  }

  if (card.dataset.paid === "true") {
    total += price;
  }

  attachCardEvents(card, boy, price);
});

  totalDisplay.textContent = `₱${total}`;
  updateBoyCountDisplay();
  sortCardsByStatus();
  filterCards();


  // ✅ Re-trigger dropdown if brand already selected
  if (brandDropdown.value) {
    brandDropdown.dispatchEvent(new Event("change"));
  }
}


function sortCardsByStatus() {
  const cards = [...recordList.children];
  cards.sort((a, b) => a.dataset.paid === "true" ? 1 : -1);
  cards.forEach(card => recordList.appendChild(card));
}

function filterCards() {
  const cards = recordList.querySelectorAll(".card");
  let anyVisible = false;
  cards.forEach(card => {
    const isPaid = card.dataset.paid === "true";
    if (!showAllPaid && isPaid) {
      card.style.display = "none";
    } else {
      card.style.display = "block";
      anyVisible = true;
    }
  });

  const noRecordsMessage = document.getElementById("noRecordsMessage");
  if (noRecordsMessage) noRecordsMessage.style.display = anyVisible ? "none" : "block";
}

togglePaidBtn.addEventListener("click", () => {
  showAllPaid = !showAllPaid;
  togglePaidBtn.textContent = showAllPaid ? "Hide Paid" : "See All Paid";
  filterCards();
});


// ✅ Expense logic
addExpenseBtn.addEventListener("click", () => {
  const desc = expenseDesc.value.trim();
  const amount = parseInt(expenseAmount.value);
  if (!desc || isNaN(amount)) {
    alert("Please enter a valid expense description and amount.");
    return;
  }

  expenseArray.push({ desc, amount, date: getCurrentDateTime() });
  totalExpenses += amount;
  expenseDisplay.textContent = `₱${totalExpenses}`;
  saveToLocalStorage();
  renderExpenses();
  expenseDesc.value = "";
  expenseAmount.value = "";
});

function renderExpenses() {
  expenseList.innerHTML = "";
  expenseArray.forEach((e, i) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `${e.date} - ${e.desc} <span class="badge bg-danger rounded-pill">₱${e.amount}</span>`;

    const del = document.createElement("button");
    del.textContent = "×";
    del.className = "btn btn-sm btn-outline-danger ms-2";
    del.onclick = () => {
      if (confirm("Delete this expense?")) {
        totalExpenses -= e.amount;
        expenseArray.splice(i, 1);
        saveToLocalStorage();
        renderExpenses();
        expenseDisplay.textContent = `₱${totalExpenses}`;
      }
    };

    li.appendChild(del);
    expenseList.appendChild(li);
  });
}

// ✅ Clear all
clearAllBtn.addEventListener("click", () => {
  if (confirm("Clear all records and reset everything?")) {
    localStorage.clear();
    recordList.innerHTML = "";
    expenseList.innerHTML = "";
    plateInput.value = "";
    otherModelInput.value = "";
    otherPriceInput.value = "";
    otherBoyInput.value = "";
    otherServiceInput.value = "";
    expenseDesc.value = "";
    expenseAmount.value = "";
    total = 0;
    totalExpenses = 0;
    selectedModel = selectedBoy = selectedStatus = selectedService = "";
    totalDisplay.textContent = "₱0";
    expenseDisplay.textContent = "₱0";
    boyCounts = {
      "Joven": 0, "Pipoy": 0, "Richard": 0, "Avatar": 0, "Obet": 0, "Willie": 0
    };


    updateBoyCountDisplay();
    alert("All records cleared.");
    sortCardsByStatus();
    filterCards();
    
  }
});

// ✅ Export to PDF (Paid Only)
function exportToPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const rows = [];
  let pdfTotal = 0;
recordList.querySelectorAll(".card").forEach(card => {
  const text = card.innerText;
  const boyMatch = text.match(/Carwash Boy:\s(.+?)\s\|/);
  const priceMatch = text.match(/Price:\s₱(\d+)/);
  const boy = boyMatch ? boyMatch[1].trim() : "";
  const price = priceMatch ? parseInt(priceMatch[1]) : 0;

  if (boy && boyCounts[boy] !== undefined) {
    boyCounts[boy]++;
  }

  if (card.dataset.paid === "true") {
    total += price;
  }

  attachCardEvents(card, boy, price);
});

  doc.text("Carwash Records (Paid Only)", 14, 10);
  doc.autoTable({
    startY: 20,
    head: [["Plate", "Model", "Boy", "Price", "Status", "Date"]],
    body: rows
  });

  let nextY = doc.lastAutoTable.finalY + 10;
  doc.text(`Total Amount (Paid Only): ₱${pdfTotal}`, 14, nextY);
  doc.text(`Total Expenses: ₱${totalExpenses}`, 14, nextY + 10);
  doc.text(`Net Total: ₱${pdfTotal - totalExpenses}`, 14, nextY + 20);

  if (expenseArray.length) {
    doc.text("Expenses Breakdown:", 14, nextY + 35);
    expenseArray.forEach((exp, i) => {
      doc.text(`- ${exp.desc}: ₱${exp.amount}`, 14, nextY + 45 + i * 8);
    });
  }

  doc.save("carwash-records.pdf");
}

document.getElementById("exportPDF").addEventListener("click", exportToPDF);

// ✅ Initialize
loadFromLocalStorage();
