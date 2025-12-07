

# **Group Seating Chart Manager**

A lightweight, browser-based seating arrangement tool built with HTML, CSS, and JavaScript.
It allows instructors to visually manage classroom seating, save multiple seating charts, switch between classes, and auto-save changes — all stored locally in the browser using `localStorage`.

This app includes a clean grid-based layout, a top control menu, and smooth toast notifications for user feedback.

---

## **✔ Features**

### **Seating Management**

* Add or edit student names directly in the seating grid
* Auto-save seat values when an input loses focus

### **Multi-Class Support**

* Create new seating charts for different classes
* Save classes with custom names
* Load any saved class from a dropdown menu
* Delete classes instantly
* All seating charts persist in the browser using `localStorage`

### **Visual Feedback**

* Smooth toast notifications for:

  * ✔ Class Saved
  * ✖ Class Deleted
  * ✔ New Class Started
* No pop-ups, no alerts, no interruptions

---

## **🗂 Project Structure**

```
/seating-chart
│
├── index.html      # App layout and seating grid
├── style.css       # Styling for layout, menu, grid, and toast UI
└── script.js       # Logic for saving, loading, deleting, and toasts
```

---

## **🚀 How It Works**

### **1. Seating Grid**

Each seat is an `<input>` with a `data-id` such as `"2-14"` that uniquely identifies its location.
Values are stored in `localStorage` under the currently selected class.

### **2. Class Controls**

The top menu contains:

* **Class Selector** – choose from saved classes
* **Class Name Input** – name/rename the class
* **Save Class** – save or update the current layout
* **New Class** – clear the grid and prepare a fresh layout
* **Delete Class** – remove the selected class entirely

### **3. Storage Structure**

All classes are stored in:

```
localStorage["gridAllClasses"] = {
    "Class Name": {
        "1-1": "Student A",
        "1-2": "Student B",
        ...
    },
    ...
}
```

Everything is stored locally — no backend required.

---

## **📦 Installation & Setup**

👉 **Use it online (no installation needed):**
**[Deployed Site](https://salmanmurtazaminhas.github.io/seating-chart-2.0/)**

---


This app runs entirely in the browser. No build tools, no frameworks.

### **Steps**

1. Download the three project files:

   * `index.html`
   * `style.css`
   * `script.js`
2. Place them in the same folder.
3. Open `index.html` in any modern browser.

That’s it.

---

## **🖱 Usage**

### **Create a new seating chart**

1. Click **New Class**
2. Enter a name in the text box
3. Fill student names in the grid
4. Click **Save Class**

### **Switch between saved classes**

* Use the dropdown to instantly load any saved layout

### **Rename a class**

1. Select the class
2. Change the class name text
3. Click **Save Class**

### **Delete a class**

* Select the class and click **Delete Class**
  A red toast (✖) will confirm the deletion.

---

## **💾 Data Persistence**

All seating charts are saved in the browser’s `localStorage`.
This means:

* Data stays even if you refresh the page
* Data stays even if you close and reopen the browser
* Data is unique per device/browser

---

## **🛠 Technology Used**

* **HTML** – Structure & layout
* **CSS** – Grid layout, menu styling, toast animations
* **JavaScript** – Class management, auto-saving, UI logic
* **localStorage** – Persistent data without a backend

---

## **✨ Future Improvements (Optional Features)**

You can extend this app with:

* Export / import seating charts (JSON backup)
* Print layout (print-friendly mode)
* Highlight/search for a student’s name
* Duplicate class button
* Drag-and-drop seat rearrangement
* Dark/light themes

---

## **📄 License**

This project is free to use and modify.

---
