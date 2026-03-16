# Calculator

A fully functional, vanilla JavaScript calculator that supports chained operations, decimal handling, error detection, and real‑time display updates. The project focuses on DOM manipulation, state management, and input validation without relying on external libraries.

---

## Features

- Chained operations (e.g., `1 + 2 * 3 - 4 / 5`)
- Decimal support with validation to prevent invalid input
- Error handling for invalid sequences and division by zero
- Real‑time display of current input and full expression
- Clear/reset functionality
- Operator chaining after pressing equals
- Responsive layout and clean UI

---

## Tech Stack

- **HTML5**
- **CSS3 / SCSS**
- **JavaScript (ES6)**

---

## Project Structure

\`\`\`bash
ODINCALCULATOR/
│
├── index.html
│
├── css/
│   ├── main.css
│   ├── main.css.map
│   └── main.scss
│
├── js/
│   └── script.js
│
└── font/
\`\`\`

---

## How It Works

### State Model
The calculator tracks:
- **fn** — first number  
- **sn** — second number  
- **op** — current operator  
- **wholeFunc** — full expression shown on the top display  
- **currentNum** — number shown on the main display  
- **flags** — prevent invalid input (multiple decimals, repeated equals, etc.)

### Input Handling
- Event delegation captures all button clicks.
- Numbers and decimals are routed through `determineNumberFill()`.
- Operators and control symbols are routed through `determineSymbolFill()`.

### Operation Logic
The `equals()` function performs the correct arithmetic based on the current operator, formats decimals, and checks for overflow or invalid results.

---

## Challenges & Solutions

- **Preventing multiple decimals** — Used boolean flags (`fnDotCheck`, `snDotCheck`) to block invalid input sequences.
- **Chained operations** — Automatically computes the previous operation when a new operator is pressed.
- **Division by zero** — Displays a custom error state without breaking the calculator.
- **Post‑equals behavior** — Implemented `equalsJustCalled` to allow new operations immediately after pressing `=`.

---

## UI & Experience

- Two‑line display (current value + full expression)
- Responsive layout
- Clear visual separation between numbers, operators, and controls

---

## Live Demo

Add your Netlify link here once deployed:

\`\`\`
https://your-calculator.netlify.app
\`\`\`

---

## Future Improvements

- Keyboard support
- Animations for button presses
- Scientific mode (sin, cos, tan, etc.)
