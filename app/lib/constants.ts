// Shared constants for the portfolio

export const FULL_NAME = "João Correia";
// The J is already the first char; we type the rest after
export const TYPE_REST = FULL_NAME.slice(1); // "oão Correia"

// Technology data for Skills section
export interface Technology {
  name: string;
  colorIcon: string;
  greyIcon: string;
}

export interface TechnologyCategory {
  name: string;
  technologies: Technology[];
}

export const TECHNOLOGY_CATEGORIES: TechnologyCategory[] = [
  {
    name: "Frontend",
    technologies: [
      { name: "JavaScript", colorIcon: "/Javascript.avif", greyIcon: "/Javascript_grey.avif" },
      { name: "TypeScript", colorIcon: "/Typescript.avif", greyIcon: "/Typescript_grey.avif" },
      { name: "Vue.js", colorIcon: "/Vue.avif", greyIcon: "/Vue_grey.avif" },
      { name: "React", colorIcon: "/React.avif", greyIcon: "/React_grey.avif" },
      { name: "Angular", colorIcon: "/Angular.avif", greyIcon: "/Angular_grey.avif" },
      { name: "Next.js", colorIcon: "/Nextjs.avif", greyIcon: "/Nextjs_grey.avif" },
      { name: "React Native", colorIcon: "/React.avif", greyIcon: "/React_grey.avif" },
      { name: "HTML", colorIcon: "/Html.avif", greyIcon: "/Html_grey.avif" },
      { name: "CSS", colorIcon: "/Css.avif", greyIcon: "/Css_grey.avif" },
      { name: "jQuery", colorIcon: "/jQuery.avif", greyIcon: "/jQuery_grey.avif" },
      { name: "TailwindCSS", colorIcon: "/TailwindCSS.avif", greyIcon: "/TailwindCSS_grey.avif" },
      { name: "Bootstrap", colorIcon: "/Bootstrap.avif", greyIcon: "/Bootstrap_grey.avif" },
    ],
  },
  {
    name: "Backend",
    technologies: [
      { name: "PHP", colorIcon: "/Php.avif", greyIcon: "/Php_grey.avif" },
      { name: "Node.js", colorIcon: "/Node.avif", greyIcon: "/Node_grey.avif" },
      { name: "Laminas", colorIcon: "/Laminas.avif", greyIcon: "/Laminas_grey.avif" },
      { name: "Zend", colorIcon: "/Zend.avif", greyIcon: "/Zend_grey.avif" },
      { name: "Kotlin", colorIcon: "/Kotlin.avif", greyIcon: "/Kotlin_grey.avif" },
      { name: "Ruby", colorIcon: "/Ruby.avif", greyIcon: "/Ruby_grey.avif" },
      { name: "C#", colorIcon: "/C.avif", greyIcon: "/C_grey.avif" },
      { name: "C++", colorIcon: "/C++.avif", greyIcon: "/C++_grey.avif" },
    ],
  },
  {
    name: "Databases",
    technologies: [
      { name: "SQL", colorIcon: "/Sql.avif", greyIcon: "/Sql_grey.avif" },
      { name: "MySQL", colorIcon: "/MySql.avif", greyIcon: "/MySql_grey.avif" },
      { name: "PostgreSQL", colorIcon: "/Postgresql.avif", greyIcon: "/Postgresql_grey.avif" },
      { name: "XML", colorIcon: "/XML.avif", greyIcon: "/XML_grey.avif" },
      { name: "Json", colorIcon: "/Json.avif", greyIcon: "/Json_grey.avif" },
      { name: "YAML", colorIcon: "/YAML.avif", greyIcon: "/YAML_grey.avif" },
      { name: "Firebase", colorIcon: "/Firebase.avif", greyIcon: "/Firebase_grey.avif" },
    ],
  },
  {
    name: "DevOps & Cloud",
    technologies: [
      { name: "Git", colorIcon: "/Git.avif", greyIcon: "/Git_grey.avif" },
      { name: "GitHub", colorIcon: "/GitHub.avif", greyIcon: "/GitHub_grey.avif" },
      { name: "GitHub Actions", colorIcon: "/GitHubActions.avif", greyIcon: "/GitHubActions_grey.avif" },
      { name: "BitBucket", colorIcon: "/BitBucket.avif", greyIcon: "/BitBucket_grey.avif" },
      { name: "GitLab", colorIcon: "/GitLab.avif", greyIcon: "/GitLab_grey.avif" },
      { name: "Docker", colorIcon: "/Docker.avif", greyIcon: "/Docker_grey.avif" },
      { name: "Jenkins", colorIcon: "/Jenkins.avif", greyIcon: "/Jenkins_grey.avif" },
    ],
  },
  {
    name: "Testing & Tools",
    technologies: [
      { name: "Jest", colorIcon: "/Jest.avif", greyIcon: "/Jest_grey.avif" },
      { name: "Postman", colorIcon: "/Postman.avif", greyIcon: "/Postman_grey.avif" },
      { name: "ESLint", colorIcon: "/Eslint.avif", greyIcon: "/Eslint_grey.avif" },
      { name: "Vite", colorIcon: "/Vite.avif", greyIcon: "/Vite_grey.avif" },
      { name: "JUnit", colorIcon: "/JUnit.avif", greyIcon: "/JUnit_grey.avif" },
      { name: "Figma", colorIcon: "/Figma.avif", greyIcon: "/Figma_grey.avif" },
    ],
  },
];

// Navigation items
export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

// Type for active section
export type SectionId = "home" | "about" | "skills" | "projects" | "contact";

// Project data for Projects section
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  screenshots: string[];
  liveUrl?: string;
  githubUrlFrontend?: string;
  githubUrlBackend?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "LusoTourism",
    description: "A Portugal-focused tourism platform that integrates official government APIs to explore accommodations and entertainment venues. Built with Vue and TypeScript, featuring filtering, pagination, responsive design, and performance optimizations like caching.",
    technologies: ["Vue.js", "TypeScript", "Vite", "GitHub", "Postman"],
    screenshots: ["/LusoTourism_1.avif", "/LusoTourism_2.avif", "/LusoTourism_3.avif", "/LusoTourism_4.avif"],
    liveUrl: "https://joaocorreia00.github.io/LusoTourism/",
    githubUrlFrontend: "https://github.com/JoaoCorreia00/LusoTourism",
  },
  {
    id: "2",
    title: "Cat Breed Android App",
    description: "A native Android app for exploring and saving cat breeds, built with Kotlin and Jetpack Compose. Features include breed search, detailed views, local favorites with Room, and tested MVVM architecture.",
    technologies: ["Kotlin", "Android", "Jetpack Compose", "Room Database", "JUnit", "GitHub"],
    screenshots: ["/Cat_breed_1.avif", "/Cat_breed_2.avif", "/Cat_breed_3.avif"],
    githubUrlFrontend: "https://github.com/JoaoCorreia00/Cat_Breed_Android",
  },
  {
    id: "3",
    title: "Mago Login",
    description: "An enterprise authentication platform with 2FA, RBAC, and REST APIs, built with Laminas and MySQL. Focused on security, modular architecture, and scalable user management.",
    technologies: ["JavaScript" ,"PHP", "Laminas", "MySQL", "PostgreSQL", "BitBucket", "jQuery", "Bootstrap"],
    screenshots: ["/MagoLogin_1.avif", "/MagoLogin_2.avif", "/MagoLogin_3.avif", "/MagoLogin_4.avif", "/MagoLogin_5.avif"],
  },
  {
    id: "4",
    title: "Grey File Manager",
    description: "A cloud-style file manager with file sharing, folder organization, and JWT authentication. Built with Node.js and Express, with strong focus on testing and fullstack architecture.",
    technologies: ["JavaScript" ,"Node.js", "Knex.js", "Jest", "PostgreSQL", "Eslint", "Docker", "GitLab", "Postman", "Figma"],
    screenshots: ["/Grey_File_1.avif", "/Grey_File_2.avif", "/Grey_File_3.avif", "/Grey_File_4.avif"],
    githubUrlFrontend: "https://github.com/JoaoCorreia00/File-Manager-Frontend",
    githubUrlBackend: "https://github.com/JoaoCorreia00/File-Manager-API",
  },
  {
    id: "5",
    title: "Minesweeper",
    description: "A Minesweeper web app built with Angular, featuring authentication, score tracking, and customizable difficulty. Includes recursive game logic and dynamic grid generation.",
    technologies: ["Angular", "TypeScript", "Firebase", "Karma"],
    screenshots: ["/Minesweeper_1.avif", "/Minesweeper_2.avif", "/Minesweeper_3.avif"],
    githubUrlFrontend: "https://github.com/JoaoCorreia00/Minesweeper",
  },
  {
    id: "6",
    title: "Quiz App",
    description: "A trivia quiz app using an external API, featuring category selection, timed gameplay, and a local high score system. Built with JavaScript and jQuery.",
    technologies: ["JavaScript", "jQuery"],
    screenshots: ["/Quiz_1.avif", "/Quiz_2.avif", "/Quiz_3.avif"],
    githubUrlFrontend: "https://github.com/JoaoCorreia00/Quiz",
  },
  {
    id: "7",
    title: "Terminal-To-Do-List-App",
    description: "A CLI-based task manager built in Ruby, featuring task CRUD operations, priority levels, and JSON-based persistence.",
    technologies: ["Ruby", "Json", "GitHub"],
    screenshots: ["/Terminal_To_Do_List_1.avif", "/Terminal_To_Do_List_2.avif"],
    githubUrlBackend: "https://github.com/JoaoCorreia00/Terminal-To-Do-List-App",
  },
];
  