function masukLogin() {
    let landing = document.getElementById("landing");

    if (landing) {
        landing.style.display = "none";
    }

    document.getElementById("loginBox").style.display = "block";
}

function login() {
    let pass = document.getElementById("password").value;

    if (pass === "1234") {
        showToast("Login berhasil 🚀");

        document.getElementById("loginBox").style.display = "none";
        document.getElementById("app").style.display = "flex";

        let landing = document.getElementById("landing");
        if (landing) {
            landing.style.display = "none";
        }

        document.getElementById("error").innerText = "";
    } else {
        showToast("Password salah ❌");
        document.getElementById("error").innerText = "Password salah bro";
    }
}

function logout() {
    document.getElementById("app").style.display = "none";
    document.getElementById("loginBox").style.display = "none";

    let landing = document.getElementById("landing");
    if (landing) {
        landing.style.display = "block";
    }
}

/* =========================
   SECTION SWITCH
========================= */

function showSection(id, event) {

    document.querySelectorAll(".section").forEach(sec => {
        sec.style.display = "none";
    });

    let target = document.getElementById(id);

    if (target) {
        target.style.display = "block";
    }

    document.querySelectorAll(".menu").forEach(menu => {
        menu.classList.remove("active");
    });

    if (event) {
        event.currentTarget.classList.add("active");
    }
}

/* =========================
   DATA STORAGE
========================= */

function getData() {
    return JSON.parse(localStorage.getItem("anggota")) || [];
}

function saveData(data) {
    localStorage.setItem("anggota", JSON.stringify(data));
}

/* =========================
   LOAD DATA
========================= */

function loadData() {
    let list = document.getElementById("list");

    if (!list) return;

    let data = getData();

    list.innerHTML = "";

    data.forEach((nama, i) => {

        let li = document.createElement("li");
        li.textContent = (i + 1) + ". " + nama;

        let btn = document.createElement("button");
        btn.textContent = "Hapus";

        btn.onclick = function () {
            hapus(i);
        };

        li.appendChild(btn);
        list.appendChild(li);
    });

    let total = document.getElementById("total");

    if (total) {
        total.innerText = data.length;
    }
}

/* =========================
   TAMBAH DATA
========================= */

function tambah() {
    let nama = document.getElementById("nama").value.trim();

    if (nama === "") {
        showToast("Nama tidak boleh kosong");
        return;
    }

    let data = getData();

    data.push(nama);

    saveData(data);

    document.getElementById("nama").value = "";

    loadData();

    showToast("Anggota ditambah ✅");
}

/* =========================
   HAPUS DATA
========================= */

function hapus(i) {

    let data = getData();

    data.splice(i, 1);

    saveData(data);

    loadData();

    showToast("Anggota dihapus 🗑️");
}

/* =========================
   TOAST
========================= */

function showToast(msg) {

    let t = document.getElementById("toast");

    if (!t) return;

    t.innerText = msg;
    t.classList.add("show");

    setTimeout(() => {
        t.classList.remove("show");
    }, 2000);
}

/* =========================
   ON LOAD
========================= */

window.onload = function () {
    loadData();
};

/* =========================
   ENTER LOGIN
========================= */

let passwordInput = document.getElementById("password");

if (passwordInput) {
    passwordInput.addEventListener("keypress", function (event) {

        if (event.key === "Enter") {
            login();
        }

    });
}