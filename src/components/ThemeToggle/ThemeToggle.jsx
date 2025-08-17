// import React, { useEffect } from 'react';

// const ThemeToggle = () => {
//     const toggleTheme = () => {
//         if (document.documentElement.classList.contains("dark")) {
//             document.documentElement.classList.remove("dark");
//             localStorage.setItem("theme", "light");
//         } else {
//             document.documentElement.classList.add("dark");
//             localStorage.setItem("theme", "dark");
//         }
//     };
//     useEffect(() => {
//         const savedTheme = localStorage.getItem("theme");
//         if (savedTheme === "dark") {
//             document.documentElement.classList.add("dark");
//         }
//     }, []);
//     return (
//         <button
//             onClick={toggleTheme}
//             className="bg-background text-primary dark:bg-text dark:text-background px-3 py-2 rounded"
//         >
//             Toggle Theme
//         </button>
//     );
// };

// export default ThemeToggle;