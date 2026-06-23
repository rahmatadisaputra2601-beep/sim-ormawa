// ================= SESSION CHECK =================
function checkLogin() {
    if (sessionStorage.getItem("login") !== "true") {
        window.location.href = "login.html";
    }
}

// ================= LOGIN =================
function login() {
    const pass = document.getElementById("password");
    const error = document.getElementById("error");

    if (!pass) return;

    if (pass.value === "admin123") {
        sessionStorage.setItem("login", "true");
        showToast("Login berhasil 🚀");
        window.location.href = "dashboard.html";
    } else {
        showToast("Password salah ❌", "error");
        if (error) error.innerText = "Password salah";
    }
}

// ================= LOGOUT =================
function logout() {
    sessionStorage.removeItem("login");
    window.location.href = "login.html";
}

// ================= DASHBOARD INIT =================
window.addEventListener("load", () => {
    if (window.location.pathname.includes("dashboard")) {
        checkLogin();
        render();
        updateStats();
    }
});

// ================= NAV SECTION =================
function showSection(id, event) {
    checkLogin();

    document.querySelectorAll(".section").forEach(sec => {
        sec.style.display = "none";
    });

    const target = document.getElementById(id);
    if (target) target.style.display = "block";

    document.querySelectorAll(".menu").forEach(menu => {
        menu.classList.remove("active");
    });

    if (event) event.currentTarget.classList.add("active");
}

// ================= STORAGE =================
function getData() {
    const data = JSON.parse(localStorage.getItem("anggota")) || [];
    return Array.isArray(data) ? data : [];
}

function saveData(data) {
    localStorage.setItem("anggota", JSON.stringify(data));
}

// ================= TAMBAH =================
function tambah() {
    const nama = document.getElementById("nama")?.value;
    const nim = document.getElementById("nim")?.value;
    const prodi = document.getElementById("prodi")?.value;
    const ormawa = document.getElementById("ormawa")?.value;

    if (!nama || !nim) {
        showToast("Data belum lengkap", "error");
        return;
    }

    let data = getData();

    if (data.find(d => d.nim === nim)) {
        showToast("NIM sudah terdaftar ⚠️", "warning");
        return;
    }

    data.push({
        id: Date.now(),
        nama,
        nim,
        prodi,
        ormawa
    });

    saveData(data);
    render();
    updateStats();

    showToast("Anggota ditambah ✅");
}

// ================= HAPUS =================
function hapus(id) {
    if (!confirm("Yakin mau hapus data ini?")) return;

    const data = getData().filter(d => d.id !== id);

    saveData(data);
    render();
    updateStats();

    showToast("Data dihapus 🗑️");
}

// ================= SEARCH =================
document.addEventListener("input", (e) => {
    if (e.target.id === "search") {
        const keyword = e.target.value.toLowerCase();

        const filtered = getData().filter(d =>
            d.nama.toLowerCase().includes(keyword) ||
            d.nim.includes(keyword)
        );

        render(filtered);
    }
});

// ================= RENDER =================
function render(data = getData()) {
    const list = document.getElementById("list");
    const total = document.getElementById("total");

    if (!list || !total) return;

    list.innerHTML = "";

    if (data.length === 0) {
        list.innerHTML = `
            <li style="text-align:center;opacity:0.6;">
                📭 Belum ada data mahasiswa
            </li>
        `;
        total.innerText = "0";
        return;
    }

    data.forEach(d => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span>${d.nama} (${d.nim}) - ${d.ormawa}</span>
            <button onclick="hapus(${d.id})">Hapus</button>
        `;

        list.appendChild(li);
    });

    total.innerText = data.length;
}

// ================= STATS =================
function updateStats(data = getData()) {
    const count = (x) => data.filter(d => d.ormawa === x).length;

    const total = document.getElementById("total");
    const bem = document.getElementById("bemCount");
    const dpm = document.getElementById("dpmCount");
    const hma = document.getElementById("hmaCount");

    if (total) total.innerText = data.length;
    if (bem) bem.innerText = count("BEM");
    if (dpm) dpm.innerText = count("DPM");
    if (hma) hma.innerText = count("HMA");
}

// ================= TOAST =================
function showToast(msg, type = "success") {
    const t = document.getElementById("toast");
    if (!t) return;

    t.className = `toast ${type} show`;
    t.innerText = msg;

    setTimeout(() => t.classList.remove("show"), 2000);
}

// ================= EXPORT CSV =================
function exportCSV() {
    const data = getData();

    let csv = "Nama,NIM,Prodi,Ormawa\n";
    data.forEach(d => {
        csv += `${d.nama},${d.nim},${d.prodi},${d.ormawa}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `sim-ormawa.csv`;
    a.click();
}