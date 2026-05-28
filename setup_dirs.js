const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const baseDir = __dirname;

// ===== DIRECTORIES =====
const directories = [
  'client/app/lobby',
  'client/app/game/code-duel',
  'client/app/game/bug-hunter',
  'client/app/game/guess-output',
  'client/components/landing',
  'client/components/game',
  'client/components/common',
  'client/components/ui',
  'client/hooks',
  'client/lib',
  'client/store',
  'client/public',
  'server/src/socket',
  'server/src/game',
  'server/src/types',
  'server/data'
];

console.log('🚀 C4C Platform Setup');
console.log('Creating directories...\n');

directories.forEach(dir => {
  const fullPath = path.join(baseDir, dir);
  fs.mkdirSync(fullPath, { recursive: true });
  console.log('  ✓', dir);
});

// ===== FILES =====
console.log('\nCreating files...\n');

const files = {
  // ===== CLIENT PACKAGE.JSON =====
  'client/package.json': JSON.stringify({
    name: "c4c-client",
    version: "1.0.0",
    private: true,
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start",
      lint: "next lint"
    },
    dependencies: {
      "next": "14.2.0",
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "socket.io-client": "^4.7.4",
      "zustand": "^4.5.0",
      "framer-motion": "^11.0.0",
      "@monaco-editor/react": "^4.6.0",
      "clsx": "^2.1.0",
      "tailwind-merge": "^2.2.0",
      "lucide-react": "^0.344.0"
    },
    devDependencies: {
      "@types/node": "^20.11.0",
      "@types/react": "^18.2.0",
      "@types/react-dom": "^18.2.0",
      "autoprefixer": "^10.4.17",
      "postcss": "^8.4.35",
      "tailwindcss": "^3.4.1",
      "typescript": "^5.3.0"
    }
  }, null, 2),

  // ===== SERVER PACKAGE.JSON =====
  'server/package.json': JSON.stringify({
    name: "c4c-server",
    version: "1.0.0",
    private: true,
    type: "module",
    scripts: {
      dev: "tsx watch src/index.ts",
      build: "tsc",
      start: "node dist/index.js"
    },
    dependencies: {
      "express": "^4.18.2",
      "socket.io": "^4.7.4",
      "cors": "^2.8.5",
      "uuid": "^9.0.1"
    },
    devDependencies: {
      "@types/express": "^4.17.21",
      "@types/cors": "^2.8.17",
      "@types/uuid": "^9.0.8",
      "@types/node": "^20.11.0",
      "tsx": "^4.7.0",
      "typescript": "^5.3.0"
    }
  }, null, 2),

  // ===== TSCONFIG CLIENT =====
  'client/tsconfig.json': JSON.stringify({
    compilerOptions: {
      lib: ["dom", "dom.iterable", "esnext"],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      noEmit: true,
      esModuleInterop: true,
      module: "esnext",
      moduleResolution: "bundler",
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: "preserve",
      incremental: true,
      plugins: [{ name: "next" }],
      paths: { "@/*": ["./*"] }
    },
    include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    exclude: ["node_modules"]
  }, null, 2),

  // ===== TSCONFIG SERVER =====
  'server/tsconfig.json': JSON.stringify({
    compilerOptions: {
      target: "ES2022",
      module: "NodeNext",
      moduleResolution: "NodeNext",
      outDir: "./dist",
      rootDir: "./src",
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true
    },
    include: ["src/**/*"],
    exclude: ["node_modules"]
  }, null, 2),

  // ===== TAILWIND CONFIG =====
  'client/tailwind.config.ts': `import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          950: '#4a044e',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(14, 165, 233, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(14, 165, 233, 0.6)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(to right bottom, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.95))',
      }
    },
  },
  plugins: [],
}
export default config`,

  // ===== POSTCSS CONFIG =====
  'client/postcss.config.js': `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`,

  // ===== NEXT CONFIG =====
  'client/next.config.js': `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
}

module.exports = nextConfig`,

  // ===== GLOBAL CSS =====
  'client/app/globals.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

:root {
  --foreground: #f8fafc;
  --background: #0f172a;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: 'Inter', system-ui, sans-serif;
  overflow-x: hidden;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.5);
}

::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.5);
}

/* Selection */
::selection {
  background: rgba(14, 165, 233, 0.3);
  color: #f8fafc;
}

/* Gradient text utility */
.gradient-text {
  background: linear-gradient(135deg, #0ea5e9 0%, #d946ef 50%, #f97316 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Glass effect */
.glass {
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(148, 163, 184, 0.1);
}

/* Animated gradient background */
.animated-gradient {
  background: linear-gradient(-45deg, #0ea5e9, #d946ef, #f97316, #10b981);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

/* Code editor styling */
.monaco-editor {
  border-radius: 8px;
  overflow: hidden;
}

/* Button hover glow */
.btn-glow {
  transition: all 0.3s ease;
}

.btn-glow:hover {
  box-shadow: 0 0 30px rgba(14, 165, 233, 0.4);
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}`,
};

// Write files
Object.entries(files).forEach(([filePath, content]) => {
  const fullPath = path.join(baseDir, filePath);
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('  ✓', filePath);
});

console.log('\n✨ Setup complete!');
console.log('\nNext steps:');
console.log('  1. cd client && npm install');
console.log('  2. cd ../server && npm install');
console.log('  3. Run "node setup_full.js" to generate all source files');
console.log('');
