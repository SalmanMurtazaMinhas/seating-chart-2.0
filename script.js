document.addEventListener("DOMContentLoaded", () => {
    const seats = document.querySelectorAll(".seat");

    const classSelector = document.getElementById("classSelector");
    const classNameInput = document.getElementById("classNameInput");
    const saveClassBtn = document.getElementById("saveClassBtn");
    const newClassBtn = document.getElementById("newClassBtn");

    // allClasses = { "SEB-BH-7": { "1-1": "Safa", ... }, ... }
    let classes = JSON.parse(localStorage.getItem("allClasses")) || {};
    let currentClass = null;

    function saveAllClasses() {
        localStorage.setItem("allClasses", JSON.stringify(classes));
    }

    function clearSeats() {
        seats.forEach(seat => seat.value = "");
    }

    function loadClass(className) {
        if (!className || !classes[className]) {
            clearSeats();
            return;
        }
        const seatData = classes[className];
        seats.forEach(seat => {
            const id = seat.dataset.id;
            seat.value = seatData[id] || "";
        });
    }

    function renderClassOptions() {
        classSelector.innerHTML = "";

        Object.keys(classes).forEach(name => {
            const opt = document.createElement("option");
            opt.value = name;
            opt.textContent = name;
            classSelector.appendChild(opt);
        });

        if (currentClass && classes[currentClass]) {
            classSelector.value = currentClass;
        } else {
            const names = Object.keys(classes);
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

    // If no classes at all, create one default
    if (Object.keys(classes).length === 0) {
        currentClass = "Class 1";
        classes[currentClass] = {};
        saveAllClasses();
    } else {
        currentClass = Object.keys(classes)[0];
    }

    renderClassOptions();

    // Save / rename current class with current seat values
    saveClassBtn.addEventListener("click", () => {
        const name = classNameInput.value.trim();
        if (!name) {
            alert("Enter a class name first.");
            return;
        }

        // collect seat data
        const seatData = {};
        seats.forEach(seat => {
            const val = seat.value.trim();
            seatData[seat.dataset.id] = val === "" ? "Unnamed" : val;
            if (val === "") seat.value = "Unnamed";
        });

        // if renaming an existing class
        if (currentClass && name !== currentClass && classes[currentClass]) {
            delete classes[currentClass];
        }

        currentClass = name;
        classes[currentClass] = seatData;
        saveAllClasses();
        renderClassOptions();
        alert("Class saved!");
    });

    // Start a fresh (unsaved) seating chart
    newClassBtn.addEventListener("click", () => {
        currentClass = null;
        classNameInput.value = "";
        classSelector.value = "";
        clearSeats();
    });

    // Change class from dropdown
    classSelector.addEventListener("change", () => {
        currentClass = classSelector.value;
        classNameInput.value = currentClass;
        loadClass(currentClass);
    });

    // Optional: auto-update current class on blur (if currentClass exists)
    seats.forEach(seat => {
        seat.addEventListener("blur", (event) => {
            let value = event.target.value.trim();
            if (value === "") {
                value = "Unnamed";
                event.target.value = value;
            }

            if (!currentClass) return; // only autosave when a class is selected/saved

            if (!classes[currentClass]) {
                classes[currentClass] = {};
            }
            classes[currentClass][event.target.dataset.id] = value;
            saveAllClasses();
        });

        seat.addEventListener("focus", (event) => {
            event.target.select();
        });
    });
});
