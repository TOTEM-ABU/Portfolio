import { useState, useEffect } from "react";
import "./App.css";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  image: string;
}

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [skillCategory, setSkillCategory] = useState("all");
  const [scrollProgress, setScrollProgress] = useState(0);

  const projects: Project[] = [
    {
      id: 1,
      title: "SearchLesson",
      description:
        "Advanced lesson and file search system with intelligent filtering and categorization. Features include real-time search, file management, and user authentication with role-based access control.",
      technologies: ["Node.js", "Express.js", "MongoDB", "JWT", "REST API"],
      githubUrl: "https://github.com/nuriddinmahmud/SearchLesson",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop&crop=center",
    },
    {
      id: 2,
      title: "ArbaitWorking",
      description:
        "Comprehensive work management platform for team collaboration and project tracking. Includes task management, time tracking, and real-time notifications with modern UI/UX design.",
      technologies: ["TypeScript", "React", "Node.js", "Express", "PostgreSQL"],
      githubUrl: "https://github.com/TOTEM-ABU/ArbaitWorking",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop&crop=center",
    },
    {
      id: 3,
      title: "FullAuthWithNest",
      description:
        "Complete authentication and authorization system built with NestJS. Features include JWT tokens, role-based access control, password encryption, and comprehensive security measures.",
      technologies: ["NestJS", "TypeScript", "JWT", "Passport", "bcrypt"],
      githubUrl: "https://github.com/TOTEM-ABU/FullAuthWithNest",
      image:
        "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=250&fit=crop&crop=center",
    },
    {
      id: 4,
      title: "OLX-backend",
      description:
        "Full-featured marketplace backend API similar to OLX. Includes user management, product listings, search functionality, messaging system, and payment integration.",
      technologies: [
        "TypeScript",
        "Node.js",
        "Express",
        "MongoDB",
        "Socket.io",
      ],
      githubUrl: "https://github.com/TOTEM-ABU/OLX-backend",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center",
    },
    {
      id: 5,
      title: "NornLightProject",
      description:
        "Lightweight project management tool with real-time collaboration features. Includes task boards, team management, file sharing, and progress tracking with intuitive interface.",
      technologies: [
        "JavaScript",
        "Node.js",
        "Express",
        "Socket.io",
        "MongoDB",
      ],
      githubUrl: "https://github.com/TOTEM-ABU/NornLightProject",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&crop=center",
    },
    {
      id: 6,
      title: "E-Commerce API",
      description:
        "Complete e-commerce backend API with product management, order processing, payment integration, and admin dashboard. Built with modern architecture and best practices.",
      technologies: ["TypeScript", "Node.js", "Express", "MySQL", "Stripe API"],
      githubUrl: "https://github.com/TOTEM-ABU/e-commerce-api",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center",
    },
    {
      id: 7,
      title: "Task Manager",
      description:
        "Advanced task management application with drag-and-drop interface, priority levels, deadline tracking, and team collaboration features. Built with React and Node.js.",
      technologies: ["React", "TypeScript", "Node.js", "Express", "MongoDB"],
      githubUrl: "https://github.com/TOTEM-ABU/task-manager",
      image:
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&h=250&fit=crop&crop=center",
    },
    {
      id: 8,
      title: "Blog API",
      description:
        "RESTful blog API with user authentication, content management, comment system, and search functionality. Features include markdown support and image upload.",
      technologies: ["NestJS", "TypeScript", "PostgreSQL", "JWT", "Multer"],
      githubUrl: "https://github.com/TOTEM-ABU/blog-api",
      image:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop&crop=center",
    },
  ];

  const skills = [
    // Backend Skills
    { name: "Node.js", level: 90, category: "backend" },
    { name: "Express.js", level: 85, category: "backend" },
    { name: "NestJS", level: 80, category: "backend" },
    { name: "TypeScript", level: 85, category: "backend" },
    { name: "JavaScript", level: 90, category: "backend" },
    { name: "MySQL", level: 80, category: "backend" },
    { name: "MongoDB", level: 75, category: "backend" },
    { name: "PostgreSQL", level: 70, category: "backend" },
    { name: "REST APIs", level: 85, category: "backend" },
    { name: "JWT", level: 80, category: "backend" },
    { name: "Socket.io", level: 75, category: "backend" },
    { name: "Git", level: 80, category: "backend" },
    // Frontend Skills
    { name: "React.js", level: 85, category: "frontend" },
    { name: "Next.js", level: 80, category: "frontend" },
    { name: "Redux", level: 75, category: "frontend" },
    { name: "HTML5", level: 90, category: "frontend" },
    { name: "CSS3", level: 85, category: "frontend" },
    { name: "Sass/SCSS", level: 80, category: "frontend" },
    { name: "Material-UI", level: 75, category: "frontend" },
    { name: "Ant Design", level: 70, category: "frontend" },
    // Database & Tools
    { name: "MongoDB", level: 75, category: "database" },
    { name: "PostgreSQL", level: 70, category: "database" },
    { name: "MySQL", level: 80, category: "database" },
    { name: "Redis", level: 65, category: "database" },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Cursor animation
  useEffect(() => {
    const cursor = document.createElement("div");
    const cursorFollower = document.createElement("div");
    cursor.className = "cursor";
    cursorFollower.className = "cursor-follower";
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";

      setTimeout(() => {
        cursorFollower.style.left = e.clientX + "px";
        cursorFollower.style.top = e.clientY + "px";
      }, 100);
    };

    document.addEventListener("mousemove", moveCursor);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.body.removeChild(cursor);
      document.body.removeChild(cursorFollower);
    };
  }, []);

  // Particle effects
  useEffect(() => {
    const particlesContainer = document.createElement("div");
    particlesContainer.className = "particles";
    document.body.appendChild(particlesContainer);

    const createParticle = () => {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = Math.random() * 100 + "vw";
      particle.style.animationDelay = Math.random() * 20 + "s";
      particle.style.animationDuration = Math.random() * 10 + 10 + "s";
      particlesContainer.appendChild(particle);

      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 20000);
    };

    const particleInterval = setInterval(createParticle, 2000);

    return () => {
      clearInterval(particleInterval);
      if (particlesContainer.parentNode) {
        particlesContainer.parentNode.removeChild(particlesContainer);
      }
    };
  }, []);

  // Scroll-triggered animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    // Observe all elements with scroll animation classes
    const animatedElements = document.querySelectorAll(
      ".scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-scale-in, .scroll-rotate-in"
    );

    animatedElements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      animatedElements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  // Parallax effect
  useEffect(() => {
    const handleParallax = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll(".parallax-element");
      
      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener("scroll", handleParallax);
    return () => window.removeEventListener("scroll", handleParallax);
  }, []);

  // Scroll progress indicator
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app">
      {/* Scroll Progress Indicator */}
      <div
        className="scroll-indicator"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">AbuCoder</span>
          </div>

          <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
            <a
              className={`nav-link ${activeSection === "home" ? "active" : ""}`}
              onClick={() => scrollToSection("home")}
            >
              Home
            </a>
            <a
              className={`nav-link ${
                activeSection === "about" ? "active" : ""
              }`}
              onClick={() => scrollToSection("about")}
            >
              About
            </a>
            <a
              className={`nav-link ${
                activeSection === "skills" ? "active" : ""
              }`}
              onClick={() => scrollToSection("skills")}
            >
              Skills
            </a>
            <a
              className={`nav-link ${
                activeSection === "projects" ? "active" : ""
              }`}
              onClick={() => scrollToSection("projects")}
            >
              Projects
            </a>
            <a
              className={`nav-link ${
                activeSection === "contact" ? "active" : ""
              }`}
              onClick={() => scrollToSection("contact")}
            >
              Contact
            </a>
          </div>

          <div
            className={`hamburger ${isMenuOpen ? "active" : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hi, I'm <span className="highlight">Abubakr</span>
            </h1>
            <h2 className="hero-subtitle">Full Stack Developer</h2>
            <p className="hero-description">
              Specializing in both frontend and backend development with
              expertise in React, Next.js, Node.js, and modern web technologies.
            </p>
            <div className="hero-buttons">
              <button
                className="btn btn-primary"
                onClick={() => scrollToSection("projects")}
              >
                View My Work
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => scrollToSection("contact")}
              >
                Get In Touch
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="code-animation">
              <div className="code-line">const developer = {`{`}</div>
              <div className="code-line"> name: "AbuCoder",</div>
              <div className="code-line"> skills: ["React", "Node.js"],</div>
              <div className="code-line">
                {" "}
                passion: "Full Stack Development"
              </div>
              <div className="code-line">{`}`}</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2 className="section-title scroll-fade-in">About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p className="scroll-slide-left">
                I'm a passionate full stack developer from Tashkent, Uzbekistan,
                with expertise in both frontend and backend development. My
                journey in software development has led me to master modern web
                technologies and create complete, scalable applications.
              </p>
              <p className="scroll-slide-right">
                Currently working at Najot Ta'lim, I bring expertise in building
                responsive user interfaces with React and Next.js, creating
                robust backend APIs with Node.js and NestJS, and designing
                efficient database architectures with MongoDB, PostgreSQL, and
                MySQL. I have experience in building e-commerce platforms, task
                management systems, authentication services, and real-time
                applications using Socket.io.
              </p>
              <div className="about-stats">
                <div className="stat scroll-scale-in">
                  <span className="stat-number">8+</span>
                  <span className="stat-label">Featured Projects</span>
                </div>
                <div className="stat scroll-scale-in">
                  <span className="stat-number">1+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat scroll-scale-in">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">Technologies</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="container">
          <h2 className="section-title scroll-fade-in">Skills & Technologies</h2>

          {/* Skill Category Filter */}
          <div className="skill-filters scroll-slide-left">
            <button
              className={`skill-filter ${
                skillCategory === "all" ? "active" : ""
              }`}
              onClick={() => setSkillCategory("all")}
            >
              All Skills
            </button>
            <button
              className={`skill-filter ${
                skillCategory === "frontend" ? "active" : ""
              }`}
              onClick={() => setSkillCategory("frontend")}
            >
              Frontend
            </button>
            <button
              className={`skill-filter ${
                skillCategory === "backend" ? "active" : ""
              }`}
              onClick={() => setSkillCategory("backend")}
            >
              Backend
            </button>
            <button
              className={`skill-filter ${
                skillCategory === "database" ? "active" : ""
              }`}
              onClick={() => setSkillCategory("database")}
            >
              Database
            </button>
          </div>

          <div className="skills-grid">
            {skills
              .filter(
                (skill) =>
                  skillCategory === "all" || skill.category === skillCategory
              )
              .map((skill, index) => (
                <div key={index} className={`skill-item scroll-fade-in`}>
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-progress"
                      style={
                        {
                          width: `${skill.level}%`,
                          "--skill-width": `${skill.level}%`,
                        } as React.CSSProperties
                      }
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <h2 className="section-title scroll-fade-in">Featured Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className={`project-card scroll-scale-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <i className="fab fa-github"></i>
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <i className="fas fa-external-link-alt"></i>
                      </a>
                    )}
                  </div>
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-technologies">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="project-buttons">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-btn"
                    >
                      <i className="fab fa-github"></i>
                      View Code
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-btn"
                      >
                        <i className="fas fa-external-link-alt"></i>
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title scroll-fade-in">Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3 className="scroll-slide-left">Let's work together!</h3>
              <p className="scroll-slide-right">
                I'm always interested in new opportunities and exciting
                projects. Whether you have a question or just want to say hi,
                feel free to reach out!
              </p>

              <div className="resume-download scroll-scale-in">
                <a
                  href="/resume.pdf"
                  download="AbuCoder_Resume.pdf"
                  className="resume-btn"
                >
                  <i className="fas fa-download"></i>
                  <span>Download Resume</span>
                </a>
              </div>

              <div className="contact-links">
                <a
                  href="https://github.com/TOTEM-ABU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link scroll-rotate-in"
                >
                  <i className="fab fa-github"></i>
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/aabdujalilov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link scroll-rotate-in"
                >
                  <i className="fab fa-linkedin"></i>
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://t.me/guidovanrossumm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link scroll-rotate-in"
                >
                  <i className="fab fa-telegram"></i>
                  <span>Telegram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 AbuCoder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
