# VTU 4th Sem Lab Code Repository 🚀

A centralized, aesthetic web portal designed for engineering students to quickly access, view, and one-click copy laboratory programs for their 4th-semester curriculum.

## ✨ Features
* **Three-Pane Layout:** A sleek sidebar for subjects, a middle pane for the program list, and a main code viewer.
* **Syntax Highlighting:** Uses Prism.js to beautifully format C++, SQL, and LaTeX codes.
* **One-Click Copy:** A dedicated copy button to instantly copy code to the clipboard.
* **Dynamic Rendering:** Pure Vanilla JavaScript dynamically injects HTML, keeping the `index.html` file clean and lightweight.
* **Modular Data:** Each subject's codes are stored in separate `.js` files for easy maintenance and scaling.

---

## 📂 File Structure

The project relies on a flat file structure for scripts to prevent CORS/MIME errors when running locally without a server.

```text
📦 SAIPU-Lab-Portal
 ┣ 📜 index.html        # The main UI structure (Tailwind + HTML)
 ┣ 📜 app.js            # Core logic (Loading subjects & displaying programs)
 ┣ 📜 copy.js           # Handles the clipboard/copy functionality
 ┣ 📜 ada.js            # Data file containing ADA_PROGRAMS array
 ┣ 📜 dbms.js           # Data file containing DBMS_PROGRAMS array
 ┣ 📜 latex.js          # Data file containing LATEX_PROGRAMS array
 ┣ 📜 mc.js             # Data file containing MC_PROGRAMS array
 ┣ 📜 README.md         # Project documentation
 ┗ 📂 assets
   ┗ 📂 css
     ┗ 📜 style.css     # Custom CSS classes (nav-btn, scrollbars, etc.)