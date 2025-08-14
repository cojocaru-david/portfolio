---
name: 'TailCI'
description: 'TailCI is a lightweight, fast, and modern web application built with CodeIgniter and styled with Tailwind CSS. It combines the simplicity of CodeIgniter’s PHP framework with the utility-first power of Tailwind CSS for rapid development and clean design.'
tags: ['codeigniter', 'tailwindcss', 'php']
image: '../../../public/static/tailci.webp'
link: 'https://tailci.cojocarudavid.me'
startDate: '2025-03-30'
---
# TailCI - CodeIgniter with Tailwind CSS

TailCI is a powerful, developer-friendly web application framework that seamlessly integrates CodeIgniter 4's robust PHP backend with Tailwind CSS's utility-first approach to styling. This combination delivers an optimal development experience for creating modern, responsive web applications with minimal effort.

## ✨ Key Features

### Lightning Fast

- Built on CodeIgniter's lightweight framework for optimal performance and speed
- Minimized build sizes and efficient resource loading
- Smart caching mechanisms for enhanced response times

### Modern Design

- Styled with Tailwind CSS v4 for a clean, responsive, and customizable interface
- Dark mode support out of the box
- Accessibility-focused components and layouts

### Developer Friendly

- Intuitive architecture and well-documented codebase for rapid development
- Hot module replacement during development
- Simplified workflow with npm scripts for common tasks

## 📋 Requirements

- PHP 8.1 or higher
- Composer for PHP dependency management
- Node.js v20+ and npm for frontend tooling
- Web server (Apache, Nginx, or built-in PHP server for development)
- MySQL 5.7+ / MariaDB 10.3+ (or other compatible database)
- Modern browser support (Chrome, Firefox, Safari, Edge)

## 🚀 Installation

### Quick Start

1. Clone the repository:

   ```bash
   git clone https://github.com/cojocaru-david/tailCi.git
   cd tailCi
   ```

2. Install backend dependencies:

   ```bash
   composer install
   ```

3. Set up your environment:

   ```bash
   cp env.example .env
   ```

   Then edit `.env` to configure your database and application settings.

4. Run database migrations:

   ```bash
   php spark migrate
   ```

5. Install frontend dependencies and build assets:
   ```bash
   npm install
   npm run build
   ```

### Development Workflow

Start the development server with hot reloading:

```bash
npm run dev
```

In a separate terminal, run the CodeIgniter server:

```bash
php spark serve
```

Visit `http://localhost:8080` to see your application.

## 🤝 Contributing

We welcome contributions to improve TailCI! Here's how you can help:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Please ensure your code follows our coding standards and includes appropriate tests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [CodeIgniter](https://codeigniter.com/) - The powerful PHP framework
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Node.js](https://nodejs.org/) - JavaScript runtime
- Built with ❤️ by [Cojocaru David](https://github.com/cojocaru-david)

## 📊 Project Status

TailCI is under active development. We're constantly working to improve and add new features.

---

If you find TailCI helpful, please consider giving it a star on GitHub! ⭐
