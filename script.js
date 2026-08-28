const skillsData = [
    { name: "Python", category: "ML" },
    { name: "Sklearn", category: "ML" },
    { name: "Pandas", category: "ML" },
    { name: "NumPy", category: "ML" },
    { name: "Matplotlib", category: "ML" },
    { name: "Seaborn", category: "ML" },
    { name: "Imblearn", category: "ML" },

    { name: "C++", category: "desktop-dev" },
    { name: "C#", category: "desktop-dev" },
    { name: "Raylib", category: "desktop-dev" },
    { name: "Python", category: "desktop-dev" },
    { name: "JavaScript", category: "desktop-dev" },
    { name: "Avalonia-UI", category: "desktop-dev" },
    { name: "WPF", category: "desktop-dev" },
    { name: "Flet", category: "desktop-dev" },
    { name: "Electron", category: "desktop-dev" },

    { name: "HTML", category: "frontend" },
    { name: "CSS", category: "frontend" },
    { name: "JavaScript", category: "frontend" },
    { name: "React", category: "frontend" },

    { name: "Python", category: "backend" },
    { name: "Flask", category: "backend" },
    { name: "FastAPI", category: "backend" },
    { name: "Django", category: "backend" },
    { name: "SQLite", category: "backend" },
    { name: "SQL", category: "backend" },
    { name: "RabbitMQ", category: "backend" },

    { name: "Git", category: "tools" },
    { name: "GitHub", category: "tools" },
    { name: "Selenium", category: "tools" }
];

const filters = document.querySelectorAll(".filter");
const skillsContainer = document.getElementById("skills");
const search = document.getElementById("search");
const empty = document.getElementById("empty");
const themeButton = document.getElementById("themeButton");

let category = "all";

function renderSkills() {
    const searchText = search.value.toLowerCase().trim();

    const filteredSkills = skillsData.filter(skill => {
        const categoryMatch = category === "all" || skill.category === category;

        const searchMatch = skill.name.toLowerCase().includes(searchText);

        return categoryMatch && searchMatch;
    });

    const uniqueSkills = [];

    filteredSkills.forEach(skill => {
        const alreadyExists = uniqueSkills.some(item => item.name === skill.name);

        if (!alreadyExists) {
            uniqueSkills.push(skill);
        }
    });

    skillsContainer.innerHTML = "";

    uniqueSkills.forEach(skill => {
        const skillElement = document.createElement("article");

        skillElement.className = "skill";
        skillElement.textContent = skill.name;

        skillsContainer.appendChild(skillElement);
    });

    if (uniqueSkills.length === 0) {
        empty.style.display = "block";
    } else {
        empty.style.display = "none";
    }
}

filters.forEach(button => {
    button.addEventListener("click", () => {
        filters.forEach(filter => {
            filter.classList.remove("active");
        });

        button.classList.add("active");

        category = button.dataset.category;

        renderSkills();
    });
});

search.addEventListener("input", renderSkills);

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeButton.textContent = "☀️";
}

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark =
        document.body.classList.contains("dark");

    if (isDark) {
        localStorage.setItem("theme", "dark");
        themeButton.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        themeButton.textContent = "🌙";
    }
});

renderSkills();