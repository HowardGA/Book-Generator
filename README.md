# Seed-Based Book Generator

---

This project is a web application designed to generate and display a continuous stream of mock book data. Utilizing **`@faker-js/faker`**, it produces randomized book titles, authors, publishers, publication years, and covers. A key feature is its **seed-based generation**, which ensures that the core details of a book remain stable and reproducible whenever the same seed is used, even if other generated attributes, like likes or reviews, are adjusted.

## Key Features

* **Customizable Data Generation:** Users can specify the **language** of the generated book data, provide a **seed** for deterministic results, and set average values for **likes** and **reviews**.
* **Infinite Scrolling with Virtualization:** The application efficiently handles large datasets by employing **virtualization** via **`@tanstack/react-virtual`**. Books are loaded in batches (20 initially, then 10 at a time) as the user scrolls, providing a smooth and browse experience without rendering thousands of elements at once.
* **Dynamic Layout Options:** Users can easily toggle between a **table view** and a **cover grid layout** to explore the generated books, adapting to their preferred visual style.

---