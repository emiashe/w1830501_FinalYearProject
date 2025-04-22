
import { HiAcademicCap } from 'react-icons/hi';
import question1 from './../../LoginAssets/question1.png';
import question3 from './../../LoginAssets/question3.png';
import github from './DataAssets/github.png';
import html from './DataAssets/html.png';
import css from './DataAssets/css.png';
import javascript from './DataAssets/javascript.png';

export const navigationLinks = [
    { id: 1, title: 'Home', image: <HiAcademicCap />, path: '/homepage' },
    { id: 2, title: 'Courses', image:  <HiAcademicCap />, path: '/coursespage' },
    { id: 3, title: 'Group Projects', image: <HiAcademicCap />, path: '/groupprojectspage' },
    { id: 4, title: 'Forum', image: <HiAcademicCap />, path: '/forumpage'  },
  /*   { id: 5, title: 'Cheatsheets', image: <HiAcademicCap />, path: '/news'  }, */
    { id: 6, title: 'Feedback/Support', image: <HiAcademicCap />, path: '/supportpage'  },
    { id: 7, title: 'Admin Page', image: <HiAcademicCap />, path: '/adminpage'  },
    { id: 8, title: 'Settings', image: <HiAcademicCap />, path: '/news'  }
];

export const firstquizdata = [
    {
        question: "What will be logged to the console?",
        image: question1,
        option1: "15",
        option2: "'105'",
        option3: "NaN",
        option4: "undefined",
        answer: 2,
    },
    {
        question: "Which loop type ensures the code inside it runs at least once, even if the condition is false?",
        
        option1: "for loop",
        option2: "while loop",
        option3: "do...while loop",
        option4: "foreach",
        answer: 3,
    },
    {
        question: "What will be the output of this function?",
        image: question3,
        option1: "5 then 10",
        option2: "5 then an error",
        option3: "undefined then 10",
        option4: "undefined then an error",
        answer: 2,
    },
    {
        question: "What is the purpose of async and await in JavaScript?",
        
        option1: "To define and call a function immediately",
        option2: "To handle synchronous operations faster",
        option3: "To manage asynchronous operations in a readable way",
        option4: "To execute multiple functions at once ",
        answer: 3,
    }, 
];


export const forumPosts = [
    {
      category: "GitHub Introduction",
      title: "Getting Started with GitHub: A Beginner's Guide",
      author: "EMINA ASHERBEKOVA",
      image: github, // Ensure the image path is correct
      description: "Learn the basics of GitHub: creating repositories, managing branches, and collaborating with other developers.",
      link: '/forumposts',
    },
    {
      category: "HTML",
      title: "Mastering HTML: Building the Foundation of Web Development",
      author: "EMINA ASHERBEKOVA",
      image: html,
      description: "Discover how to structure your web pages with HTML and create semantically rich, accessible content.",
    },
    {
      category: "CSS",
      title: "Styling the Web: Understanding CSS Fundamentals",
      author: "EMINA ASHERBEKOVA",
      image: css,
      description: "Dive into CSS to bring your web pages to life with beautiful layouts, responsive design, and animations.",
    },
    {
      category: "JavaScript",
      title: "JavaScript Essentials: Programming for the Web",
      author: "EMINA ASHERBEKOVA",
      image: javascript,
      description: "Get started with JavaScript to add interactivity, handle events, and create dynamic user experiences.",
    },
  ];

  export const supportOptions = [
    {
      title: "Getting Started",
      description: "Learn how to navigate the platform and start your journey in web development.",
      icon: "🚀",
    },
    {
      title: "HTML Basics",
      description: "Find guides and support for learning HTML, including tutorials and troubleshooting.",
      icon: "📄",
    },
    {
      title: "Code Editor",
      description: "Learn how to use the built-in code editor and resolve common issues.",
      icon: "📝",
    },
    {
      title: "Projects and Challenges",
      description: "Get help with projects, challenges, and applying your skills to real-world scenarios.",
      icon: "📂",
    },
    {
      title: "Technical Support",
      description: "Resolve technical issues related to the platform, account, or progress tracking.",
      icon: "🛠️",
    },

  ];


  export const progressData = [
    { label: "Introduction to HTML/CSS", percentage: 100, color: "hsl(166, 52%, 55%)" },
    { label: "CSS Basics", percentage: 80, color: "hsl(166, 52%, 55%)" },
    { label: "Introduction to JavaScript", percentage: 19, color: "rgb(254, 30, 0, 0.79)" },
  ];

