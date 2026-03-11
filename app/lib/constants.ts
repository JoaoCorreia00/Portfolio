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
      { name: "JavaScript", colorIcon: "/Javascript.png", greyIcon: "/Javascript_grey.png" },
      { name: "TypeScript", colorIcon: "/Typescript.png", greyIcon: "/Typescript_grey.png" },
      { name: "Vue.js", colorIcon: "/Vue.png", greyIcon: "/Vue_grey.png" },
      { name: "React", colorIcon: "/React.png", greyIcon: "/React_grey.png" },
      { name: "Angular", colorIcon: "/Angular.png", greyIcon: "/Angular_grey.png" },
      { name: "Next.js", colorIcon: "/Nextjs.png", greyIcon: "/Nextjs_grey.png" },
      { name: "React Native", colorIcon: "/React.png", greyIcon: "/React_grey.png" },
      { name: "HTML", colorIcon: "/Html.png", greyIcon: "/Html_grey.png" },
      { name: "CSS", colorIcon: "/Css.png", greyIcon: "/Css_grey.png" },
      { name: "jQuery", colorIcon: "/jQuery.png", greyIcon: "/jQuery_grey.png" },
      { name: "TailwindCSS", colorIcon: "/TailwindCSS.png", greyIcon: "/TailwindCSS_grey.png" },
      { name: "Bootstrap", colorIcon: "/Bootstrap.png", greyIcon: "/Bootstrap_grey.png" },
    ],
  },
  {
    name: "Backend",
    technologies: [
      { name: "PHP", colorIcon: "/Php.png", greyIcon: "/Php_grey.png" },
      { name: "Node.js", colorIcon: "/Node.png", greyIcon: "/Node_grey.png" },
      { name: "Laminas", colorIcon: "/Laminas.png", greyIcon: "/Laminas_grey.png" },
      { name: "Zend", colorIcon: "/Zend.png", greyIcon: "/Zend_grey.png" },
      { name: "Kotlin", colorIcon: "/Kotlin.png", greyIcon: "/Kotlin_grey.png" },
      { name: "Ruby", colorIcon: "/Ruby.png", greyIcon: "/Ruby_grey.png" },
      { name: "C#", colorIcon: "/C.png", greyIcon: "/C_grey.png" },
      { name: "C++", colorIcon: "/C++.png", greyIcon: "/C++_grey.png" },
    ],
  },
  {
    name: "Databases",
    technologies: [
      { name: "SQL", colorIcon: "/Sql.png", greyIcon: "/Sql_grey.png" },
      { name: "MySQL", colorIcon: "/MySql.png", greyIcon: "/MySql_grey.png" },
      { name: "PostgreSQL", colorIcon: "/Postgresql.png", greyIcon: "/Postgresql_grey.png" },
      { name: "XML", colorIcon: "/XML.png", greyIcon: "/XML_grey.png" },
      { name: "Json", colorIcon: "/Json.png", greyIcon: "/Json_grey.png" },
      { name: "Firebase", colorIcon: "/Firebase.png", greyIcon: "/Firebase_grey.png" },
    ],
  },
  {
    name: "DevOps & Cloud",
    technologies: [
      { name: "Git", colorIcon: "/Git.png", greyIcon: "/Git_grey.png" },
      { name: "GitHub", colorIcon: "/GitHub.png", greyIcon: "/GitHub_grey.png" },
      { name: "GitHub Actions", colorIcon: "/GitHubActions.png", greyIcon: "/GitHubActions_grey.png" },
      { name: "BitBucket", colorIcon: "/BitBucket.png", greyIcon: "/BitBucket_grey.png" },
      { name: "GitLab", colorIcon: "/GitLab.png", greyIcon: "/GitLab_grey.png" },
      { name: "Docker", colorIcon: "/Docker.png", greyIcon: "/Docker_grey.png" },
      { name: "Jenkins", colorIcon: "/Jenkins.png", greyIcon: "/Jenkins_grey.png" },
    ],
  },
  {
    name: "Testing & Tools",
    technologies: [
      { name: "Jest", colorIcon: "/Jest.png", greyIcon: "/Jest_grey.png" },
      { name: "Postman", colorIcon: "/Postman.png", greyIcon: "/Postman_grey.png" },
      { name: "ESLint", colorIcon: "/Eslint.png", greyIcon: "/Eslint_grey.png" },
      { name: "Vite", colorIcon: "/Vite.png", greyIcon: "/Vite_grey.png" },
      { name: "Figma", colorIcon: "/Figma.png", greyIcon: "/Figma_grey.png" },
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
