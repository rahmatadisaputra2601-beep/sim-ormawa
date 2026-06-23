
// ================= LOGIN =================
function login() {
    let pass = document.getElementById("password");

    if (!pass) return;

    if (pass.value === "admin123") {
        showToast("Login berhasil 🚀");
        window.location.href = "dashboard.html";
    } else {
        showToast("Password salah ❌");
        document.getElementById("error").innerText = "Password salah";
    }
}

// ================= LOGOUT =================
function logout() {
    window.location.href = "login.html";
}

// ================= SECTION DASHBOARD =================
function showSection(id, event) {

    document.querySelectorAll(".section").forEach(sec => {
        sec.style.display = "none";
    });

    let target = document.getElementById(id);
    if (target) target.style.display = "block";

    document.querySelectorAll(".menu").forEach(menu => {
        menu.classList.remove("active");
    });

    if (event) event.currentTarget.classList.add("active");
}

// ================= DATA =================
function getData() {
    return JSON.parse(localStorage.getItem("anggota")) || [];
}

function saveData(data) {
    localStorage.setItem("anggota", JSON.stringify(data));
}

function loadData() {
    let list = document.getElementById("list");
    let total = document.getElementById("total");

    if (!list || !total) return;

    let data = getData();

    list.innerHTML = "";

    data.forEach((nama, i) => {
        let li = document.createElement("li");
        li.textContent = (i + 1) + ". " + nama;

        let btn = document.createElement("button");
        btn.textContent = "Hapus";

        btn.onclick = () => hapus(i);

        li.appendChild(btn);
        list.appendChild(li);
    });

    total.innerText = data.length;
}

// ================= TAMBAH =================
function tambah() {
    let nama = document.getElementById("nama");
    if (!nama) return;

    if (nama.value.trim() === "") {
        showToast("Nama tidak boleh kosong");
        return;
    }

    let data = getData();
    data.push(nama.value.trim());

    saveData(data);

    nama.value = "";
    loadData();

    showToast("Anggota ditambah ✅");
}

// ================= HAPUS =================
function hapus(i) {
    let data = getData();

    data.splice(i, 1);

    saveData(data);
    loadData();

    showToast("Anggota dihapus 🗑️");
}

// ================= TOAST =================
function showToast(msg) {
    let t = document.getElementById("toast");
    if (!t) return;

    t.innerText = msg;
    t.classList.add("show");

    setTimeout(() => {
        t.classList.remove("show");
    }, 2000);
}

// ================= INIT =================
window.onload = function () {
    loadData();
};

// ================= ENTER LOGIN =================
document.addEventListener("DOMContentLoaded", () => {
    let passwordInput = document.getElementById("password");

    if (passwordInput) {
        passwordInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                login();
            }
        });
    }
});