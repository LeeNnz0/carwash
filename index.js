// ✅ FULL UPDATED index.js with Service Section (predefined + manual), alerts, sorting, export, etc.

const carPrices = {
  "CRV": 200,
  "Vios": 250,
  "Montero": 150
};

let selectedModel = "";
let selectedBoy = "";
let selectedStatus = "Unpaid";
let selectedService = "";
let total = 0;
let boyCounts = {
  "Joven": 0,
  "Pipoy": 0,
  "Richard": 0,
  "Avatar": 0,
  "Obet": 0,
  "Willie": 0
};

const modelDisplay = document.getElementById("selectedModel");
const priceDisplay = document.getElementById("selectedPrice");
const boyDisplay = document.getElementById("selectedBoy");
const statusDisplay = document.getElementById("selectedStatus");
const serviceDisplay = document.getElementById("selectedService");
const totalDisplay = document.getElementById("totalAmount");
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

// Uppercase the plate number input
plateInput.addEventListener("input", () => {
  plateInput.value = plateInput.value.toUpperCase();
});

// Show/hide "other" model input
useOtherModel.addEventListener("change", (e) => {
  document.getElementById("otherModelInputs").style.display = e.target.checked ? "flex" : "none";
});

// Show/hide "other" carwash boy input
useOtherBoy.addEventListener("change", (e) => {
  document.getElementById("otherBoyInputWrapper").style.display = e.target.checked ? "block" : "none";
});

// Show/hide "other" service input
useOtherService.addEventListener("change", (e) => {
  document.getElementById("otherServiceInputWrapper").style.display = e.target.checked ? "block" : "none";
});

// ✅ Toggle Model Selection
document.querySelectorAll(".model-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const isSelected = btn.classList.contains("selected");

    document.querySelectorAll(".model-btn").forEach(b => b.classList.remove("selected"));
    if (!isSelected) {
      btn.classList.add("selected");
      selectedModel = btn.dataset.model;
      priceDisplay.textContent = `₱${carPrices[selectedModel]}`;
      modelDisplay.textContent = selectedModel;
      useOtherModel.checked = false;
      document.getElementById("otherModelInputs").style.display = "none";
      otherModelInput.value = "";
      otherPriceInput.value = "";
    } else {
      selectedModel = "";
      priceDisplay.textContent = "";
      modelDisplay.textContent = "";
    }
  });
});

// ✅ Toggle Carwash Boy Selection
document.querySelectorAll(".boy-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const isSelected = btn.classList.contains("selected");

    document.querySelectorAll(".boy-btn").forEach(b => b.classList.remove("selected"));
    if (!isSelected) {
      btn.classList.add("selected");
      selectedBoy = btn.dataset.boy;
      boyDisplay.textContent = selectedBoy;
      useOtherBoy.checked = false;
      document.getElementById("otherBoyInputWrapper").style.display = "none";
      otherBoyInput.value = "";
    } else {
      selectedBoy = "";
      boyDisplay.textContent = "";
    }
  });
});

// ✅ Toggle Status Selection
document.querySelectorAll(".status-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const isSelected = btn.classList.contains("selected");

    document.querySelectorAll(".status-btn").forEach(b => b.classList.remove("selected"));
    if (!isSelected) {
      btn.classList.add("selected");
      selectedStatus = btn.dataset.status;
      statusDisplay.textContent = selectedStatus;
    } else {
      selectedStatus = "";
      statusDisplay.textContent = "";
    }
  });
});

// ✅ Toggle Service Selection
document.querySelectorAll(".service-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const isSelected = btn.classList.contains("selected");

    document.querySelectorAll(".service-btn").forEach(b => b.classList.remove("selected"));
    if (!isSelected) {
      btn.classList.add("selected");
      selectedService = btn.dataset.service;
      serviceDisplay.textContent = selectedService;
      useOtherService.checked = false;
      document.getElementById("otherServiceInputWrapper").style.display = "none";
      otherServiceInput.value = "";
    } else {
      selectedService = "";
      serviceDisplay.textContent = "";
    }
  });
});

function updateBoyCountDisplay() {
  Object.keys(boyCounts).forEach(boy => {
    const el = document.getElementById(`count-${boy}`);
    if (el) el.textContent = boyCounts[boy];
  });
}
function getCurrentDateTime() {
  const now = new Date();
  return now.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

function saveToLocalStorage() {
  const records = [];
  document.querySelectorAll("#recordList .card").forEach(card => {
    records.push({ html: card.innerHTML, paid: card.dataset.paid });
  });
  localStorage.setItem("carwashRecords", JSON.stringify(records));
  localStorage.setItem("totalAmount", total);
  localStorage.setItem("boyCounts", JSON.stringify(boyCounts));
}

function sortCardsByStatus() {
  const cards = Array.from(recordList.children);
  cards.sort((a, b) => a.dataset.paid.localeCompare(b.dataset.paid));
  cards.forEach(card => recordList.appendChild(card));
}

function attachCardEvents(card, boyName, price) {
  const paidBtn = card.querySelector(".mark-paid");
  const unpaidBtn = card.querySelector(".mark-unpaid");
  const statusLabel = card.querySelector(".status-label");

  paidBtn.onclick = () => {
    if (card.dataset.paid === "false") {
      card.dataset.paid = "true";
      total += price;
      totalDisplay.textContent = `₱${total}`;
      statusLabel.textContent = "Paid";
      statusLabel.className = "status-label text-success fw-bold";
      saveToLocalStorage();
      sortCardsByStatus();

      alert(`Marked as PAID\nPlate: ${card.innerText.match(/Plate:\s(.+?)\s\|/)[1]}\nAmount: ₱${price}`);
    }
  };

  unpaidBtn.onclick = () => {
    if (card.dataset.paid === "true") {
      card.dataset.paid = "false";
      total -= price;
      totalDisplay.textContent = `₱${total}`;
      statusLabel.textContent = "Unpaid";
      statusLabel.className = "status-label text-danger fw-bold";
      saveToLocalStorage();
      sortCardsByStatus();

      alert(`Marked as UNPAID\nPlate: ${card.innerText.match(/Plate:\s(.+?)\s\|/)[1]}\nAmount Removed: ₱${price}`);
    }
  };

  // ✅ Always recreate the delete button
  const existingDelete = card.querySelector(".delete-btn");
  if (existingDelete) existingDelete.remove();

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️ Delete";
  deleteBtn.className = "btn btn-sm btn-outline-danger ms-2 delete-btn";
  deleteBtn.onclick = () => {
    if (confirm("Are you sure you want to delete this record?")) {
      if (card.dataset.paid === "true") total -= price;
      if (boyName && boyCounts[boyName] !== undefined)
        boyCounts[boyName] = Math.max(0, boyCounts[boyName] - 1);
      card.remove();
      updateBoyCountDisplay();
      totalDisplay.textContent = `₱${total}`;
      saveToLocalStorage();
      alert("Record deleted successfully.");
    }
  };

  const buttonGroup = card.querySelector(".mt-2");
  if (buttonGroup) {
    buttonGroup.appendChild(deleteBtn);
  }
}



function loadFromLocalStorage() {
  const records = JSON.parse(localStorage.getItem("carwashRecords") || "[]");
  total = parseInt(localStorage.getItem("totalAmount") || "0");

  // ✅ Update default boyCounts with your current boys
  boyCounts = JSON.parse(
    localStorage.getItem("boyCounts") ||
    JSON.stringify({
      "Joven": 0,
      "Pipoy": 0,
      "Richard": 0,
      "Avatar": 0,
      "Obet": 0,
      "Willie": 0
    })
  );

  totalDisplay.textContent = `₱${total}`;
  recordList.innerHTML = "";
  updateBoyCountDisplay();

  records.forEach(record => {
    const card = document.createElement("div");
    card.className = "card mb-2";
    card.dataset.paid = record.paid;
    card.innerHTML = record.html;

    const boyMatch = record.html.match(/Carwash Boy:\s(.+?)\s\|/);
    const boyName = boyMatch ? boyMatch[1] : null;
    const priceMatch = record.html.match(/₱(\d+)/);
    const price = priceMatch ? parseInt(priceMatch[1]) : 0;

    attachCardEvents(card, boyName, price);
    recordList.appendChild(card);
  });

  sortCardsByStatus();
}

addBtn.addEventListener("click", () => {
  const plate = plateInput.value.trim().toUpperCase();
  const model = useOtherModel.checked ? otherModelInput.value.trim() : selectedModel;
  const boy = useOtherBoy.checked ? otherBoyInput.value.trim() : selectedBoy;
  const service = useOtherService.checked ? otherServiceInput.value.trim() : selectedService;
  const price = useOtherModel.checked ? parseInt(otherPriceInput.value) : carPrices[selectedModel];

  if (!model || !boy || !service || isNaN(price) || plate === "") {
    alert("Please complete all required fields.");
    return;
  }

  const datetime = getCurrentDateTime();
  const isInitiallyPaid = selectedStatus === "Paid";

  const card = document.createElement("div");
  card.className = "card mb-2";
  card.dataset.paid = isInitiallyPaid;
  card.innerHTML = `
    <div class="card-body">
      <strong>Plate:</strong> ${plate} |
      <strong>Model:</strong> ${model} |
      <strong>Price:</strong> ₱${price} |
      <strong>Service:</strong> ${service} |
      <strong>Carwash Boy:</strong> ${boy} |
      <strong>Status:</strong> <span class="status-label ${isInitiallyPaid ? 'text-success fw-bold' : 'text-danger fw-bold'}">${selectedStatus}</span><br>
      <small class="text-muted">Date: ${datetime}</small>
      <div class="mt-2">
        <button class="btn btn-sm btn-outline-success mark-paid">Mark as Paid</button>
        <button class="btn btn-sm btn-outline-danger mark-unpaid">Mark as Unpaid</button>
      </div>
    </div>`;

  recordList.appendChild(card);
  if (boyCounts[boy] !== undefined) boyCounts[boy]++;
  updateBoyCountDisplay();
  if (isInitiallyPaid) {
    total += price;
    totalDisplay.textContent = `₱${total}`;
  }

  saveToLocalStorage();
  sortCardsByStatus();
  attachCardEvents(card, boy, price);

  alert(
    `Record added successfully!\n` +
    `Plate: ${plate}\n` +
    `Model: ${model}\n` +
    `Price: ₱${price}\n` +
    `Service: ${service}\n` +
    `Carwash Boy: ${boy}\n` +
    `Status: ${selectedStatus}`
  );

  selectedModel = "";
  selectedBoy = "";
  selectedService = "";
  selectedStatus = "Unpaid";
  plateInput.value = "";
  modelDisplay.textContent = "None";
  priceDisplay.textContent = "₱0";
  boyDisplay.textContent = "None";
  serviceDisplay.textContent = "None";
  statusDisplay.textContent = "Unpaid";

  document.querySelectorAll(".model-btn, .boy-btn, .status-btn, .service-btn").forEach(b => b.classList.remove("selected"));

  useOtherModel.checked = false;
  useOtherBoy.checked = false;
  useOtherService.checked = false;
  document.getElementById("otherModelInputs").style.display = "none";
  document.getElementById("otherBoyInput").style.display = "none";
  document.getElementById("otherServiceInputWrapper").style.display = "none";
  otherModelInput.value = "";
  otherPriceInput.value = "";
  otherBoyInput.value = "";
  otherServiceInput.value = "";
});

window.addEventListener("DOMContentLoaded", loadFromLocalStorage);

document.getElementById("exportPDF").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const rows = [];
  let pdfTotal = 0;

  document.querySelectorAll("#recordList .card").forEach(card => {
    try {
      const text = card.innerText.split("\n");
      const plate = text[0].match(/Plate:\s(.+?)\s\|/)[1];
      const model = text[0].match(/Model:\s(.+?)\s\|/)[1];
      const price = parseInt(text[0].match(/Price:\s₱?(\d+)/)[1]);
      const service = text[0].match(/Service:\s(.+?)\s\|/)[1];
      const boy = text[0].match(/Carwash Boy:\s(.+?)\s\|/)[1];
      const status = text[0].includes("Paid") ? "Paid" : "Unpaid";
      const date = text[1].replace("Date: ", "");

      pdfTotal += price;
      rows.push([plate, model, `${price}`, service, boy, status, date]);
    } catch (e) {
      console.warn("Skipping record due to parse error:", e);
    }
  });

  doc.text("Carwash Records", 14, 10);
  doc.autoTable({
    startY: 20,
    head: [["Plate", "Model", "Price", "Service", "Boy", "Status", "Date"]],
    body: rows
  });

  doc.text(`Total Amount: ${pdfTotal}`, 14, doc.lastAutoTable.finalY + 10);
  doc.save("carwash-records.pdf");
});



document.getElementById("clearAll").addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all records? This cannot be undone.")) {
    localStorage.removeItem("carwashRecords");
    localStorage.removeItem("totalAmount");
    localStorage.removeItem("boyCounts");
    recordList.innerHTML = "";
    total = 0;
    totalDisplay.textContent = "₱0";
    boyCounts = {
      "Joven": 0,
      "Pipoy": 0,
      "Richard": 0,
      "Avatar": 0,
      "Obet": 0,
      "Willie": 0
    };
    updateBoyCountDisplay();
    alert("All records have been cleared.");
  }
});


