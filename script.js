function masukLogin() {
    document.getElementById("landing").style.display = "none";
    document.getElementById("loginBox").style.display = "block";
}

function login() {
    let pass = document.getElementById("password").value;

    if (pass === "1234") {
        showToast("Login berhasil");
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("app").style.display = "flex";
        document.getElementById("landing").style.display = "none";
        document.getElementById("error").innerText = "";
    } else {
        showToast("Password salah ❌");
    }
        document.getElementById("error").innerText = "Password salah bro";
    }


function logout() {
    document.getElementById("app").style.display = "none";
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("landing").style.display = "block";
}

/* SECTION SWITCH */
function showSection(id, event) {

    document.querySelectorAll(".section").forEach(sec => {
        sec.style.display = "none";
    });

    document.getElementById(id).style.display = "block";

    document.querySelectorAll(".menu").forEach(m => {
        m.classList.remove("active");
    });

    if (event) {
        event.currentTarget.classList.add("active");
    }
}

/* DATA STORAGE */
function getData() {
    return JSON.parse(localStorage.getItem("anggota")) || [];
}

function saveData(data) {
    localStorage.setItem("anggota", JSON.stringify(data));
}

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
        btn.onclick = () => hapus(i);

        li.appendChild(btn);
        list.appendChild(li);
    });

    let total = document.getElementById("total");
    if (total) total.innerText = data.length;
}

function tambah() {
    showToast("Data ditambah");
    let nama = document.getElementById("nama").value;
    if (!nama) return;

    let data = getData();
    data.push(nama);

    saveData(data);
    document.getElementById("nama").value = "";

    loadData();
}

function hapus(i) {
     showToast("Data dihapus");
}
    let data = getData();
    data.splice(i, 1);

    saveData(data);
    loadData();


window.onload = loadData;
function showToast(msg) {
    let t = document.getElementById("toast");
    t.innerText = msg;
    t.classList.add("show");

    setTimeout(() => {
        t.classList.remove("show");
    }, 2000);
}


