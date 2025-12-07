document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll(".seat");

    inputs.forEach(input => {
        const savedName = localStorage.getItem(input.dataset.id);

        if (savedName) {
            input.value = savedName;
        }

        input.addEventListener("focus", (event) => {
            event.target.select();
        });

        input.addEventListener("blur", (event) => {
            let value = event.target.value.trim();

            if (value === "") {
                value = "Unnamed";
                event.target.value = value;
            }

            localStorage.setItem(event.target.dataset.id, value);
        });
    });
});
