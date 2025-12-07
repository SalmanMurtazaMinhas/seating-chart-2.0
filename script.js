document.addEventListener("DOMContentLoaded", () => {
    const seats = document.querySelectorAll(".seat");

    const classSelector = document.getElementById("classSelector");
    const classNameInput = document.getElementById("classNameInput");
    const saveClassBtn = document.getElementById("saveClassBtn");
    const newClassBtn = document.getElementById("newClassBtn");
    const deleteClassBtn = document.getElementById("deleteClassBtn");

    // seatClasses = { "SEB-BH-7": { "1-1": "Safa", ... }, ... }
    // use a unique key so it does not clash with your grid app
    let seatClasses = JSON.parse(localStorage.getItem("seatAllClasses")) || {};
    let currentClass = null;

    function saveAllClasses() {
        localStorage.setItem("seatAllClasses", JSON.stringify(seatClasses));
    }

    function clearSeats() {
        seats.forEach(seat => {
            seat.value = "";
        });
    }

    function loadClass(className) {
        if (!className || !seatClasses[className]) {
            clearSeats();
            return;
        }

        const seatData = seatClasses[className];
        seats.forEach(seat => {
            const id = seat.dataset.id;
            seat.value = seatData[id] || "";
        });
    }

    function renderClassOptions() {
        classSelector.innerHTML = "";

        Object.keys(seatClasses).forEach(name => {
            const opt = document.createElement("option");
            opt.value = name;
            opt.textContent = name;
            classSelector.appendChild(opt);
        });

        if (currentClass && seatClasses[currentClass]) {
            classSelector.value = currentClass;
        } else {
            const names = Object.keys(seatClasses);
            if (names.length > 0) {
                currentClass = names[0];
                classSelector.value = currentClass;
            } else {
                currentClass = null;
            }
        }

        classNameInput.value = currentClass || "";
        loadClass(currentClass);
    }

    // If no classes yet, create one default
    if (Object.keys(seatClasses).length === 0) {
        currentClass = "Class 1";
        seatClasses[currentClass] = {};
        saveAllClasses();
    } else {
        currentClass = Object.keys(seatClasses)[0];
    }

    renderClassOptions();

    // Save or rename current class
    saveClassBtn.addEventListener("click", () => {
        const name = classNameInput.value.trim();
        if (!name) {
            alert("Enter a class name first.");
            return;
        }

        const seatData = {};
        seats.forEach(seat => {
            let val = seat.value.trim();
            if (val === "") val = "";
            seat.value = val;
            seatData[seat.dataset.id] = val;
        });

        // handle rename: remove old key if changed
        if (currentClass && name !== currentClass && seatClasses[currentClass]) {
            delete seatClasses[currentClass];
        }

        currentClass = name;
        seatClasses[currentClass] = seatData;
        saveAllClasses();
        renderClassOptions();
        showToast("Class saved", "success");
    });

    // Start a fresh unsaved seating chart
    newClassBtn.addEventListener("click", () => {
        currentClass = null;
        classNameInput.value = "";
        classSelector.value = "";
        clearSeats();
    });

    // Delete currently selected class
    deleteClassBtn.addEventListener("click", () => {
    if (!currentClass) return;

    delete seatClasses[currentClass];
    saveAllClasses();

    const remaining = Object.keys(seatClasses);

    if (remaining.length === 0) {
        currentClass = null;
        classNameInput.value = "";
        classSelector.innerHTML = "";
        clearSeats();
        showToast("Class deleted", "delete");
        return;
    }

    currentClass = remaining[0];
    renderClassOptions();

    showToast("Class deleted", "delete");
});


    // Change class from dropdown
    classSelector.addEventListener("change", () => {
        currentClass = classSelector.value;
        classNameInput.value = currentClass;
        loadClass(currentClass);
    });

    // Per-seat behaviors
    seats.forEach(seat => {
        seat.addEventListener("focus", event => {
            event.target.select();
        });

        seat.addEventListener("blur", event => {
            let value = event.target.value.trim();
            if (value === "") {
                value = "";
                event.target.value = value;
            }

            if (!currentClass) return; // only autosave if some class is active

            if (!seatClasses[currentClass]) {
                seatClasses[currentClass] = {};
            }
            seatClasses[currentClass][event.target.dataset.id] = value;
            saveAllClasses();
        });
    });
});

function showToast(message, type = "success") {
    const toast = document.getElementById("toast");

    toast.innerHTML = `
        <span class="${type === 'success' ? 'toast-success' : 'toast-delete'}">
            ${type === "success" ? "✔" : "✖"}
        </span>
        ${message}
    `;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 1800);
}
