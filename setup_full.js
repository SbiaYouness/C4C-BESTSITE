const fs = require('fs');
const path = require('path');

const baseDir = __dirname;

function writeFile(filePath, content) {
  const fullPath = path.join(baseDir, filePath);
  const dir = path.dirname(fullPath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('  ✓', filePath);
}

console.log('🚀 C4C Platform - Full Source Generation');
console.log('=========================================\n');

// ============================================================
// CLIENT: LAYOUT & MAIN APP
// ============================================================
console.log('📁 Client App Structure...');

writeFile('client/app/layout.tsx', `import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Coders4Coders - Making Coding Fun',
  description: 'A multiplayer coding platform for learning, competing, and having fun with code.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
`);

// ============================================================
// CLIENT: LANDING PAGE
// ============================================================
writeFile('client/app/page.tsx', `'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Code2, Users, Zap, Trophy, Target, Sparkles, 
  ChevronRight, Play, Github, Twitter, ArrowRight,
  Swords, Bug, HelpCircle, Timer, Star
} from 'lucide-react'
import Link from 'next/link'

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Floating code snippets for background
const codeSnippets = [
  'const learn = () => grow();',
  'while(coding) { haveFun(); }',
  'function compete() { win(); }',
  'import { skills } from "practice";',
  'export default success;'
]

// Navbar Component
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-300 \${
        scrolled ? 'glass py-3' : 'py-5'
      }\`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold">Coders4Coders</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-dark-300 hover:text-white transition-colors">Features</a>
          <a href="#games" className="text-dark-300 hover:text-white transition-colors">Games</a>
          <a href="#how-it-works" className="text-dark-300 hover:text-white transition-colors">How it Works</a>
        </div>

        <Link 
          href="/lobby" 
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 
                     hover:from-primary-400 hover:to-primary-500 font-semibold transition-all 
                     hover:shadow-lg hover:shadow-primary-500/25 flex items-center gap-2"
        >
          Play Now <Play className="w-4 h-4" />
        </Link>
      </div>
    </motion.nav>
  )
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: \`radial-gradient(circle at 1px 1px, rgba(148,163,184,0.15) 1px, transparent 0)\`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      {/* Floating Code Snippets */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {codeSnippets.map((snippet, i) => (
          <motion.div
            key={i}
            className="absolute font-mono text-sm text-primary-500/20"
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: Math.random() * 100 + '%',
              opacity: 0 
            }}
            animate={{ 
              y: [null, '-100%'],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 2
            }}
          >
            {snippet}
          </motion.div>
        ))}
      </div>
      
      {/* Gradient Orbs */}
      <motion.div 
        className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="text-sm text-dark-200">Where coding meets competition</span>
          </motion.div>
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="block">Making Coding</span>
            <span className="gradient-text">Fun Together</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-dark-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Join the community where coders compete, collaborate, and grow together 
            through real-time multiplayer coding games.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/lobby"
              className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 
                         font-bold text-lg transition-all hover:shadow-xl hover:shadow-primary-500/25 
                         hover:scale-105 flex items-center gap-3"
            >
              Start Playing
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href="#games"
              className="px-8 py-4 rounded-2xl glass font-semibold text-lg hover:bg-dark-800/50 
                         transition-all flex items-center gap-3"
            >
              Explore Games
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {[
            { label: 'Active Players', value: '500+' },
            { label: 'Games Played', value: '10K+' },
            { label: 'Problems Solved', value: '50K+' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</div>
              <div className="text-dark-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-dark-500 flex items-start justify-center p-2">
          <motion.div 
            className="w-1.5 h-1.5 bg-primary-500 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: Users,
      title: 'Learn Together',
      description: 'Join coding sessions with others. Learning in groups accelerates your growth 3x faster than solo study.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Trophy,
      title: 'Compete & Win',
      description: 'Real-time competitions push you to code faster and smarter. Climb the leaderboard and earn recognition.',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Zap,
      title: 'Instant Feedback',
      description: 'Get immediate validation on your code. No waiting—know if your solution works in milliseconds.',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Target,
      title: 'Skill Building',
      description: 'Progress through challenges designed to build real coding skills used in the industry.',
      gradient: 'from-green-500 to-emerald-500'
    }
  ]

  return (
    <section id="features" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why <span className="gradient-text">Coders4Coders</span>?
          </h2>
          <p className="text-dark-300 text-xl max-w-2xl mx-auto">
            We believe coding is more fun when you're not alone. Here's why our community thrives.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="group p-6 rounded-2xl glass hover:bg-dark-800/50 transition-all duration-300 hover:-translate-y-2"
            >
              <div className={\`w-14 h-14 rounded-xl bg-gradient-to-br \${feature.gradient} 
                              flex items-center justify-center mb-5 group-hover:scale-110 transition-transform\`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-dark-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Games Showcase Section
function GamesSection() {
  const games = [
    {
      id: 'code-duel',
      title: 'Code Duel',
      icon: Swords,
      description: '1v1 real-time coding battles. Same problem, same timer. First correct solution wins!',
      color: 'from-red-500 to-orange-500',
      features: ['Real-time competition', 'Test case validation', 'Speed matters']
    },
    {
      id: 'bug-hunter',
      title: 'Bug Hunter',
      icon: Bug,
      description: 'Find and fix bugs in broken code. Race against opponents to squash more bugs!',
      color: 'from-green-500 to-emerald-500',
      features: ['Debug challenges', 'Multiple bugs per round', 'Accuracy scoring']
    },
    {
      id: 'guess-output',
      title: 'Guess the Output',
      icon: HelpCircle,
      description: 'Read the code, predict the output. Test your code reading skills under pressure!',
      color: 'from-purple-500 to-pink-500',
      features: ['Code comprehension', 'Quick thinking', 'Multiple choice']
    }
  ]

  return (
    <section id="games" className="py-32 relative bg-dark-950/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your <span className="gradient-text">Battle</span>
          </h2>
          <p className="text-dark-300 text-xl max-w-2xl mx-auto">
            Three unique game modes designed to challenge different coding skills.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {games.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 
                              rounded-3xl transition-opacity duration-500" 
                   style={{ backgroundImage: \`linear-gradient(to bottom right, var(--tw-gradient-stops))\` }} />
              
              <div className="relative p-8 rounded-3xl glass hover:border-dark-600 transition-all duration-300">
                {/* Icon */}
                <div className={\`w-16 h-16 rounded-2xl bg-gradient-to-br \${game.color} 
                                flex items-center justify-center mb-6 group-hover:scale-110 
                                group-hover:rotate-3 transition-all duration-300\`}>
                  <game.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold mb-3">{game.title}</h3>
                <p className="text-dark-400 mb-6 leading-relaxed">{game.description}</p>
                
                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {game.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-dark-300">
                      <div className={\`w-1.5 h-1.5 rounded-full bg-gradient-to-r \${game.color}\`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {/* Play Button */}
                <Link 
                  href={\`/lobby?game=\${game.id}\`}
                  className={\`w-full py-3 rounded-xl bg-gradient-to-r \${game.color} font-semibold 
                             flex items-center justify-center gap-2 opacity-90 hover:opacity-100 
                             transition-all hover:shadow-lg\`}
                >
                  Play Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// How It Works Section
function HowItWorksSection() {
  const steps = [
    { step: '01', title: 'Choose a Game', description: 'Pick from Code Duel, Bug Hunter, or Guess the Output' },
    { step: '02', title: 'Join the Queue', description: 'Get matched with players of similar skill level' },
    { step: '03', title: 'Compete in Real-Time', description: 'Code, debug, or answer—all synced live' },
    { step: '04', title: 'See Results', description: 'View detailed results and climb the leaderboard' }
  ]

  return (
    <section id="how-it-works" className="py-32 relative">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-dark-300 text-xl">
            From lobby to victory in four simple steps.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-accent-500 to-primary-500 hidden md:block" />
          
          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={\`flex items-center gap-8 \${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}\`}
              >
                <div className={\`flex-1 \${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}\`}>
                  <div className="text-6xl font-bold text-dark-800 mb-2">{step.step}</div>
                  <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                  <p className="text-dark-400">{step.description}</p>
                </div>
                
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 
                                flex items-center justify-center shadow-lg shadow-primary-500/25">
                  <span className="text-xl font-bold">{parseInt(step.step)}</span>
                </div>
                
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// CTA Section
function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/20 via-accent-900/20 to-primary-900/20" />
      
      <motion.div 
        className="max-w-4xl mx-auto px-6 text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Ready to <span className="gradient-text">Code</span>?
        </h2>
        <p className="text-xl text-dark-300 mb-10 max-w-2xl mx-auto">
          Join thousands of coders who are learning, competing, and having fun together.
          No signup required—just pick a name and start playing.
        </p>
        
        <Link 
          href="/lobby"
          className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r 
                     from-primary-500 to-accent-500 font-bold text-xl transition-all 
                     hover:shadow-2xl hover:shadow-primary-500/30 hover:scale-105"
        >
          Enter the Arena
          <ArrowRight className="w-6 h-6" />
        </Link>
      </motion.div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="py-12 border-t border-dark-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold">Coders4Coders</span>
          </div>
          
          <p className="text-dark-400 text-sm">
            © 2025 Coders4Coders. Making coding fun, together.
          </p>
          
          <div className="flex items-center gap-4">
            <a href="#" className="text-dark-400 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-dark-400 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main Page Component
export default function Home() {
  return (
    <main className="min-h-screen bg-dark-950">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <GamesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </main>
  )
}
`);

// ============================================================
// CLIENT: LOBBY PAGE
// ============================================================
console.log('📁 Lobby Page...');

writeFile('client/app/lobby/page.tsx', `'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  Code2, Users, Swords, Bug, HelpCircle, ArrowLeft, 
  Loader2, User, Play, Clock, Zap, Crown
} from 'lucide-react'
import Link from 'next/link'
import { useGameStore } from '@/store/gameStore'
import { useSocket } from '@/hooks/useSocket'

const games = [
  {
    id: 'code-duel',
    title: 'Code Duel',
    icon: Swords,
    description: '1v1 real-time coding battle',
    color: 'from-red-500 to-orange-500',
    players: '2 players'
  },
  {
    id: 'bug-hunter',
    title: 'Bug Hunter',
    icon: Bug,
    description: 'Find and fix bugs fastest',
    color: 'from-green-500 to-emerald-500',
    players: '2-4 players'
  },
  {
    id: 'guess-output',
    title: 'Guess the Output',
    icon: HelpCircle,
    description: 'Predict what the code prints',
    color: 'from-purple-500 to-pink-500',
    players: '2-8 players'
  }
]

export default function LobbyPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [username, setUsername] = useState('')
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [playersInQueue, setPlayersInQueue] = useState(0)
  
  const { socket, connected, joinQueue, leaveQueue } = useSocket()
  const { setPlayer, gameState } = useGameStore()

  // Check URL params for pre-selected game
  useEffect(() => {
    const gameParam = searchParams.get('game')
    if (gameParam && games.find(g => g.id === gameParam)) {
      setSelectedGame(gameParam)
    }
  }, [searchParams])

  // Handle socket events
  useEffect(() => {
    if (!socket) return

    socket.on('queue:update', (data: { count: number }) => {
      setPlayersInQueue(data.count)
    })

    socket.on('match:found', (data: { roomId: string; gameType: string }) => {
      setIsSearching(false)
      router.push(\`/game/\${data.gameType}?room=\${data.roomId}\`)
    })

    return () => {
      socket.off('queue:update')
      socket.off('match:found')
    }
  }, [socket, router])

  const handleJoinQueue = () => {
    if (!username.trim() || !selectedGame) return
    
    setPlayer({ id: socket?.id || '', name: username.trim() })
    joinQueue(selectedGame, username.trim())
    setIsSearching(true)
  }

  const handleLeaveQueue = () => {
    leaveQueue()
    setIsSearching(false)
  }

  return (
    <div className="min-h-screen bg-dark-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-dark-300 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold">C4C</span>
          </div>
          
          {connected ? (
            <div className="flex items-center gap-2 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm">Connected</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-yellow-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Connecting...</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Game Lobby</h1>
          <p className="text-dark-300 text-lg">Choose your game and find opponents</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isSearching ? (
            <motion.div
              key="selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Username Input */}
              <div className="max-w-md mx-auto mb-12">
                <label className="block text-sm text-dark-300 mb-2">Your Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your name..."
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-dark-800/50 border border-dark-700 
                               focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20
                               transition-all text-white placeholder:text-dark-500"
                    maxLength={20}
                  />
                </div>
              </div>

              {/* Game Selection */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {games.map((game) => (
                  <motion.button
                    key={game.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedGame(game.id)}
                    className={\`relative p-6 rounded-2xl glass text-left transition-all duration-300
                               \${selectedGame === game.id 
                                 ? 'ring-2 ring-primary-500 bg-dark-800/50' 
                                 : 'hover:bg-dark-800/30'}\`}
                  >
                    {selectedGame === game.id && (
                      <motion.div
                        layoutId="selected"
                        className="absolute inset-0 rounded-2xl ring-2 ring-primary-500"
                      />
                    )}
                    
                    <div className={\`w-14 h-14 rounded-xl bg-gradient-to-br \${game.color} 
                                    flex items-center justify-center mb-4\`}>
                      <game.icon className="w-7 h-7 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                    <p className="text-dark-400 text-sm mb-3">{game.description}</p>
                    <div className="flex items-center gap-2 text-dark-500 text-sm">
                      <Users className="w-4 h-4" />
                      {game.players}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Join Button */}
              <div className="text-center">
                <button
                  onClick={handleJoinQueue}
                  disabled={!username.trim() || !selectedGame || !connected}
                  className="px-12 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 
                             font-bold text-lg transition-all hover:shadow-xl hover:shadow-primary-500/25 
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none
                             flex items-center gap-3 mx-auto"
                >
                  <Play className="w-5 h-5" />
                  Find Match
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="searching"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-20"
            >
              <div className="relative w-32 h-32 mx-auto mb-8">
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-primary-500/30"
                  animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-primary-500/30"
                  animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-2">Finding Opponents...</h2>
              <p className="text-dark-400 mb-2">
                Playing as <span className="text-white font-semibold">{username}</span>
              </p>
              <p className="text-dark-500 text-sm mb-8">
                {playersInQueue} player{playersInQueue !== 1 ? 's' : ''} in queue
              </p>
              
              <button
                onClick={handleLeaveQueue}
                className="px-8 py-3 rounded-xl glass hover:bg-dark-800/50 transition-all"
              >
                Cancel
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
`);

// ============================================================
// CLIENT: STORE
// ============================================================
console.log('📁 State Management...');

writeFile('client/store/gameStore.ts', `import { create } from 'zustand'

export type GameType = 'code-duel' | 'bug-hunter' | 'guess-output'
export type GamePhase = 'waiting' | 'countdown' | 'playing' | 'judging' | 'results'

export interface Player {
  id: string
  name: string
  score?: number
  solved?: boolean
  progress?: number
}

export interface Problem {
  id: string
  title: string
  description: string
  examples: Array<{ input: string; output: string }>
  starterCode: string
  testCases: Array<{ input: string; expected: string }>
}

export interface BugProblem {
  id: string
  title: string
  description: string
  buggyCode: string
  bugs: Array<{ line: number; description: string }>
}

export interface OutputProblem {
  id: string
  code: string
  options: string[]
  correctIndex: number
}

export interface GameResult {
  winner: Player | null
  players: Array<Player & { time?: number; correct?: boolean }>
  draw?: boolean
}

interface GameState {
  // Connection
  connected: boolean
  roomId: string | null
  
  // Player
  player: Player | null
  opponents: Player[]
  
  // Game state
  gameType: GameType | null
  phase: GamePhase
  problem: Problem | BugProblem | OutputProblem | null
  
  // Timing
  timeLeft: number
  startTime: number | null
  
  // Code
  code: string
  
  // Results
  result: GameResult | null
  
  // Actions
  setConnected: (connected: boolean) => void
  setRoomId: (roomId: string | null) => void
  setPlayer: (player: Player) => void
  setOpponents: (opponents: Player[]) => void
  setGameType: (type: GameType) => void
  setPhase: (phase: GamePhase) => void
  setProblem: (problem: Problem | BugProblem | OutputProblem) => void
  setTimeLeft: (time: number) => void
  setStartTime: (time: number) => void
  setCode: (code: string) => void
  setResult: (result: GameResult) => void
  updateOpponent: (id: string, data: Partial<Player>) => void
  reset: () => void
}

const initialState = {
  connected: false,
  roomId: null,
  player: null,
  opponents: [],
  gameType: null,
  phase: 'waiting' as GamePhase,
  problem: null,
  timeLeft: 0,
  startTime: null,
  code: '',
  result: null,
}

export const useGameStore = create<GameState>((set) => ({
  ...initialState,
  
  setConnected: (connected) => set({ connected }),
  setRoomId: (roomId) => set({ roomId }),
  setPlayer: (player) => set({ player }),
  setOpponents: (opponents) => set({ opponents }),
  setGameType: (gameType) => set({ gameType }),
  setPhase: (phase) => set({ phase }),
  setProblem: (problem) => set({ problem }),
  setTimeLeft: (timeLeft) => set({ timeLeft }),
  setStartTime: (startTime) => set({ startTime }),
  setCode: (code) => set({ code }),
  setResult: (result) => set({ result }),
  
  updateOpponent: (id, data) => set((state) => ({
    opponents: state.opponents.map((o) => 
      o.id === id ? { ...o, ...data } : o
    )
  })),
  
  reset: () => set(initialState),
}))
`);

// ============================================================
// CLIENT: SOCKET HOOK
// ============================================================
writeFile('client/hooks/useSocket.ts', `import { useEffect, useRef, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'
import { useGameStore } from '@/store/gameStore'

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001'

export function useSocket() {
  const socketRef = useRef<Socket | null>(null)
  const { setConnected, setRoomId, setOpponents, setPhase, setProblem, setTimeLeft, setResult, updateOpponent } = useGameStore()

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })

    socketRef.current = socket

    socket.on('connect', () => {
      console.log('Connected to server')
      setConnected(true)
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from server')
      setConnected(false)
    })

    socket.on('game:start', (data) => {
      setRoomId(data.roomId)
      setOpponents(data.opponents)
      setProblem(data.problem)
      setPhase('countdown')
    })

    socket.on('game:countdown', (data) => {
      setTimeLeft(data.count)
    })

    socket.on('game:play', () => {
      setPhase('playing')
    })

    socket.on('game:timeUpdate', (data) => {
      setTimeLeft(data.timeLeft)
    })

    socket.on('game:opponentUpdate', (data) => {
      updateOpponent(data.playerId, data)
    })

    socket.on('game:end', (data) => {
      setPhase('results')
      setResult(data.result)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const joinQueue = useCallback((gameType: string, playerName: string) => {
    socketRef.current?.emit('queue:join', { gameType, playerName })
  }, [])

  const leaveQueue = useCallback(() => {
    socketRef.current?.emit('queue:leave')
  }, [])

  const submitCode = useCallback((code: string) => {
    socketRef.current?.emit('game:submit', { code })
  }, [])

  const submitAnswer = useCallback((answerIndex: number) => {
    socketRef.current?.emit('game:answer', { answerIndex })
  }, [])

  return {
    socket: socketRef.current,
    connected: useGameStore((s) => s.connected),
    joinQueue,
    leaveQueue,
    submitCode,
    submitAnswer,
  }
}
`);

// ============================================================
// CLIENT: UTILITY FUNCTIONS
// ============================================================
writeFile('client/lib/utils.ts', `import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return \`\${mins}:\${secs.toString().padStart(2, '0')}\`
}

export function formatTimeMs(ms: number): string {
  const seconds = Math.floor(ms / 1000)
  const millis = ms % 1000
  return \`\${seconds}.\${millis.toString().padStart(3, '0')}s\`
}
`);

// ============================================================
// CLIENT: CODE DUEL GAME
// ============================================================
console.log('📁 Code Duel Game...');

writeFile('client/app/game/code-duel/page.tsx', `'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import Editor from '@monaco-editor/react'
import { 
  Play, Send, Clock, User, Trophy, XCircle, CheckCircle,
  ArrowLeft, Loader2, Zap, Code2
} from 'lucide-react'
import Link from 'next/link'
import { useGameStore, Problem } from '@/store/gameStore'
import { useSocket } from '@/hooks/useSocket'
import { formatTime } from '@/lib/utils'

// Countdown Overlay
function CountdownOverlay({ count }: { count: number }) {
  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-dark-950/95 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        key={count}
        initial={{ scale: 2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        className="text-9xl font-bold gradient-text"
      >
        {count > 0 ? count : 'GO!'}
      </motion.div>
    </motion.div>
  )
}

// Results Overlay
function ResultsOverlay({ result, player, onPlayAgain }: { 
  result: any; 
  player: any;
  onPlayAgain: () => void;
}) {
  const isWinner = result.winner?.id === player?.id
  const isDraw = result.draw

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-dark-950/95 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-lg p-8 rounded-3xl glass text-center"
      >
        {isDraw ? (
          <>
            <div className="text-6xl mb-4">🤝</div>
            <h2 className="text-3xl font-bold mb-2">It's a Draw!</h2>
          </>
        ) : isWinner ? (
          <>
            <motion.div 
              className="text-6xl mb-4"
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5, repeat: 3 }}
            >
              🏆
            </motion.div>
            <h2 className="text-3xl font-bold text-green-400 mb-2">Victory!</h2>
          </>
        ) : (
          <>
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-3xl font-bold text-red-400 mb-2">Defeat</h2>
          </>
        )}

        <div className="mt-8 space-y-4">
          {result.players.map((p: any, i: number) => (
            <div 
              key={p.id}
              className={\`p-4 rounded-xl \${p.id === player?.id ? 'bg-primary-500/20' : 'bg-dark-800/50'}\`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {i === 0 && <Trophy className="w-5 h-5 text-yellow-400" />}
                  <span className="font-semibold">{p.name}</span>
                  {p.id === player?.id && <span className="text-xs text-primary-400">(You)</span>}
                </div>
                <div className="flex items-center gap-4">
                  {p.correct ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                  {p.time && <span className="text-dark-300">{(p.time / 1000).toFixed(2)}s</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-8">
          <Link
            href="/lobby"
            className="flex-1 py-3 rounded-xl glass hover:bg-dark-700/50 transition-all font-semibold"
          >
            Back to Lobby
          </Link>
          <button
            onClick={onPlayAgain}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 font-semibold"
          >
            Play Again
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function CodeDuelPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const roomId = searchParams.get('room')
  
  const { 
    player, opponents, phase, problem, timeLeft, code, result,
    setCode, setPhase
  } = useGameStore()
  const { socket, submitCode } = useSocket()
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [testResults, setTestResults] = useState<Array<{ passed: boolean; input: string; expected: string; got: string }>>([])
  const [countdown, setCountdown] = useState(3)

  // Handle countdown
  useEffect(() => {
    if (phase === 'countdown') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            setPhase('playing')
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [phase, setPhase])

  // Initialize with problem starter code
  useEffect(() => {
    if (problem && 'starterCode' in problem) {
      setCode(problem.starterCode)
    }
  }, [problem, setCode])

  const handleSubmit = useCallback(() => {
    if (isSubmitting || phase !== 'playing') return
    setIsSubmitting(true)
    submitCode(code)
    
    // Reset after a moment (server will send result)
    setTimeout(() => setIsSubmitting(false), 2000)
  }, [code, isSubmitting, phase, submitCode])

  const handlePlayAgain = () => {
    router.push('/lobby?game=code-duel')
  }

  // Keyboard shortcut for submit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        handleSubmit()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleSubmit])

  const typedProblem = problem as Problem | null

  return (
    <div className="h-screen bg-dark-950 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 px-6 py-4 border-b border-dark-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/lobby" className="text-dark-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-primary-500" />
            <span className="font-bold">Code Duel</span>
          </div>
        </div>

        {/* Timer */}
        <div className={\`flex items-center gap-2 px-4 py-2 rounded-xl \${
          timeLeft <= 30 ? 'bg-red-500/20 text-red-400' : 'bg-dark-800'
        }\`}>
          <Clock className="w-5 h-5" />
          <span className="font-mono text-xl font-bold">{formatTime(timeLeft)}</span>
        </div>

        {/* Players */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center">
              <User className="w-4 h-4 text-primary-400" />
            </div>
            <span className="font-semibold">{player?.name || 'You'}</span>
          </div>
          <span className="text-dark-500">vs</span>
          {opponents.map((opp) => (
            <div key={opp.id} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                <User className="w-4 h-4 text-red-400" />
              </div>
              <span className="font-semibold">{opp.name}</span>
              {opp.solved && <CheckCircle className="w-4 h-4 text-green-400" />}
            </div>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Problem Panel */}
        <div className="w-[400px] flex-shrink-0 border-r border-dark-800 overflow-y-auto p-6">
          {typedProblem ? (
            <>
              <h2 className="text-2xl font-bold mb-4">{typedProblem.title}</h2>
              <div className="prose prose-invert prose-sm">
                <p className="text-dark-300 whitespace-pre-wrap">{typedProblem.description}</p>
                
                <h3 className="text-lg font-semibold mt-6 mb-3">Examples</h3>
                {typedProblem.examples.map((ex, i) => (
                  <div key={i} className="bg-dark-800/50 rounded-lg p-4 mb-3 font-mono text-sm">
                    <div className="text-dark-400 mb-1">Input:</div>
                    <div className="text-white mb-2">{ex.input}</div>
                    <div className="text-dark-400 mb-1">Output:</div>
                    <div className="text-green-400">{ex.output}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
            </div>
          )}
        </div>

        {/* Editor Panel */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 relative">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                fontSize: 14,
                fontFamily: 'JetBrains Mono, monospace',
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                padding: { top: 16 },
                lineNumbers: 'on',
                glyphMargin: false,
                folding: true,
                lineDecorationsWidth: 0,
                lineNumbersMinChars: 3,
              }}
            />
          </div>

          {/* Submit Bar */}
          <div className="flex-shrink-0 p-4 border-t border-dark-800 flex items-center justify-between bg-dark-900">
            <div className="text-sm text-dark-400">
              Press <kbd className="px-2 py-1 rounded bg-dark-700 font-mono">Ctrl</kbd> + 
              <kbd className="px-2 py-1 rounded bg-dark-700 font-mono ml-1">Enter</kbd> to submit
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || phase !== 'playing'}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 
                         font-bold flex items-center gap-2 disabled:opacity-50 
                         hover:shadow-lg hover:shadow-green-500/25 transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Solution
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Overlays */}
      <AnimatePresence>
        {phase === 'countdown' && <CountdownOverlay count={countdown} />}
        {phase === 'results' && result && (
          <ResultsOverlay result={result} player={player} onPlayAgain={handlePlayAgain} />
        )}
      </AnimatePresence>
    </div>
  )
}
`);

// ============================================================
// CLIENT: BUG HUNTER GAME
// ============================================================
console.log('📁 Bug Hunter Game...');

writeFile('client/app/game/bug-hunter/page.tsx', `'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import Editor from '@monaco-editor/react'
import { 
  Bug, Send, Clock, User, Trophy, XCircle, CheckCircle,
  ArrowLeft, Loader2, AlertTriangle, Crosshair
} from 'lucide-react'
import Link from 'next/link'
import { useGameStore, BugProblem } from '@/store/gameStore'
import { useSocket } from '@/hooks/useSocket'
import { formatTime } from '@/lib/utils'

export default function BugHunterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const { 
    player, opponents, phase, problem, timeLeft, code, result,
    setCode, setPhase
  } = useGameStore()
  const { socket, submitCode } = useSocket()
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bugsFound, setBugsFound] = useState(0)
  const [countdown, setCountdown] = useState(3)

  const typedProblem = problem as BugProblem | null

  useEffect(() => {
    if (phase === 'countdown') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            setPhase('playing')
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [phase, setPhase])

  useEffect(() => {
    if (typedProblem) {
      setCode(typedProblem.buggyCode)
    }
  }, [typedProblem, setCode])

  const handleSubmit = useCallback(() => {
    if (isSubmitting || phase !== 'playing') return
    setIsSubmitting(true)
    submitCode(code)
    setTimeout(() => setIsSubmitting(false), 2000)
  }, [code, isSubmitting, phase, submitCode])

  return (
    <div className="h-screen bg-dark-950 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 px-6 py-4 border-b border-dark-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/lobby" className="text-dark-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <Bug className="w-5 h-5 text-green-500" />
            <span className="font-bold">Bug Hunter</span>
          </div>
        </div>

        <div className={\`flex items-center gap-2 px-4 py-2 rounded-xl \${
          timeLeft <= 30 ? 'bg-red-500/20 text-red-400' : 'bg-dark-800'
        }\`}>
          <Clock className="w-5 h-5" />
          <span className="font-mono text-xl font-bold">{formatTime(timeLeft)}</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-primary-400" />
            <span>{player?.name}</span>
          </div>
          <span className="text-dark-500">vs</span>
          {opponents.map((opp) => (
            <div key={opp.id} className="flex items-center gap-2">
              <User className="w-4 h-4 text-red-400" />
              <span>{opp.name}</span>
            </div>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Problem Panel */}
        <div className="w-[400px] flex-shrink-0 border-r border-dark-800 overflow-y-auto p-6">
          {typedProblem ? (
            <>
              <h2 className="text-2xl font-bold mb-4">{typedProblem.title}</h2>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 text-yellow-400 mb-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-semibold">Mission</span>
                </div>
                <p className="text-dark-300">{typedProblem.description}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dark-400">Bugs to find:</span>
                  <span className="font-bold text-red-400">{typedProblem.bugs.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dark-400">Bugs fixed:</span>
                  <span className="font-bold text-green-400">{bugsFound}/{typedProblem.bugs.length}</span>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-dark-800/50">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Crosshair className="w-4 h-4 text-primary-400" />
                  Tips
                </h3>
                <ul className="text-sm text-dark-400 space-y-1">
                  <li>• Look for syntax errors</li>
                  <li>• Check variable names</li>
                  <li>• Verify logic conditions</li>
                  <li>• Test edge cases mentally</li>
                </ul>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
            </div>
          )}
        </div>

        {/* Editor Panel */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                fontSize: 14,
                fontFamily: 'JetBrains Mono, monospace',
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                padding: { top: 16 },
              }}
            />
          </div>

          <div className="flex-shrink-0 p-4 border-t border-dark-800 flex items-center justify-between bg-dark-900">
            <div className="text-sm text-dark-400">
              Fix all bugs and submit your corrected code
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || phase !== 'playing'}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 
                         font-bold flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              Submit Fix
            </button>
          </div>
        </div>
      </div>

      {/* Countdown Overlay */}
      <AnimatePresence>
        {phase === 'countdown' && (
          <motion.div 
            className="fixed inset-0 z-50 bg-dark-950/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              key={countdown}
              initial={{ scale: 2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="text-9xl font-bold gradient-text"
            >
              {countdown > 0 ? countdown : 'HUNT!'}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
`);

// ============================================================
// CLIENT: GUESS THE OUTPUT GAME
// ============================================================
console.log('📁 Guess Output Game...');

writeFile('client/app/game/guess-output/page.tsx', `'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  HelpCircle, Clock, User, Trophy, XCircle, CheckCircle,
  ArrowLeft, Loader2, Zap
} from 'lucide-react'
import Link from 'next/link'
import { useGameStore, OutputProblem } from '@/store/gameStore'
import { useSocket } from '@/hooks/useSocket'
import { formatTime } from '@/lib/utils'

export default function GuessOutputPage() {
  const router = useRouter()
  
  const { 
    player, opponents, phase, problem, timeLeft, result,
    setPhase
  } = useGameStore()
  const { socket, submitAnswer } = useSocket()
  
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [hasAnswered, setHasAnswered] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const [roundNumber, setRoundNumber] = useState(1)
  const [scores, setScores] = useState<Record<string, number>>({})

  const typedProblem = problem as OutputProblem | null

  useEffect(() => {
    if (phase === 'countdown') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            setPhase('playing')
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [phase, setPhase])

  const handleAnswer = useCallback((index: number) => {
    if (hasAnswered || phase !== 'playing') return
    setSelectedAnswer(index)
    setHasAnswered(true)
    submitAnswer(index)
  }, [hasAnswered, phase, submitAnswer])

  return (
    <div className="h-screen bg-dark-950 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 px-6 py-4 border-b border-dark-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/lobby" className="text-dark-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-purple-500" />
            <span className="font-bold">Guess the Output</span>
          </div>
          <div className="px-3 py-1 rounded-full bg-dark-800 text-sm">
            Round {roundNumber}
          </div>
        </div>

        <div className={\`flex items-center gap-2 px-4 py-2 rounded-xl \${
          timeLeft <= 5 ? 'bg-red-500/20 text-red-400' : 'bg-dark-800'
        }\`}>
          <Clock className="w-5 h-5" />
          <span className="font-mono text-xl font-bold">{formatTime(timeLeft)}</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-primary-400" />
            <span>{player?.name}</span>
            <span className="text-primary-400 font-bold">{scores[player?.id || ''] || 0}</span>
          </div>
          {opponents.map((opp) => (
            <div key={opp.id} className="flex items-center gap-2">
              <User className="w-4 h-4 text-dark-400" />
              <span>{opp.name}</span>
              <span className="text-dark-400 font-bold">{scores[opp.id] || 0}</span>
            </div>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 overflow-y-auto">
        {typedProblem ? (
          <div className="w-full max-w-4xl">
            {/* Code Display */}
            <div className="mb-8">
              <h2 className="text-lg text-dark-300 mb-4 text-center">
                What will this code output?
              </h2>
              <div className="bg-dark-800 rounded-2xl p-6 font-mono text-sm overflow-x-auto">
                <pre className="text-dark-100 whitespace-pre-wrap">{typedProblem.code}</pre>
              </div>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-4">
              {typedProblem.options.map((option, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: hasAnswered ? 1 : 1.02 }}
                  whileTap={{ scale: hasAnswered ? 1 : 0.98 }}
                  onClick={() => handleAnswer(i)}
                  disabled={hasAnswered}
                  className={\`p-6 rounded-2xl text-left transition-all font-mono \${
                    hasAnswered
                      ? selectedAnswer === i
                        ? i === typedProblem.correctIndex
                          ? 'bg-green-500/20 border-2 border-green-500'
                          : 'bg-red-500/20 border-2 border-red-500'
                        : i === typedProblem.correctIndex
                          ? 'bg-green-500/20 border-2 border-green-500'
                          : 'bg-dark-800/50 opacity-50'
                      : 'bg-dark-800 hover:bg-dark-700 border-2 border-transparent'
                  }\`}
                >
                  <div className="flex items-center gap-4">
                    <div className={\`w-10 h-10 rounded-xl flex items-center justify-center font-bold \${
                      hasAnswered && i === typedProblem.correctIndex
                        ? 'bg-green-500 text-white'
                        : hasAnswered && selectedAnswer === i
                          ? 'bg-red-500 text-white'
                          : 'bg-dark-700 text-dark-300'
                    }\`}>
                      {String.fromCharCode(65 + i)}
                    </div>
                    <span className="text-lg">{option}</span>
                    {hasAnswered && i === typedProblem.correctIndex && (
                      <CheckCircle className="w-6 h-6 text-green-400 ml-auto" />
                    )}
                    {hasAnswered && selectedAnswer === i && i !== typedProblem.correctIndex && (
                      <XCircle className="w-6 h-6 text-red-400 ml-auto" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Answer Status */}
            {hasAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-center"
              >
                {selectedAnswer === typedProblem.correctIndex ? (
                  <div className="text-green-400 text-xl font-bold flex items-center justify-center gap-2">
                    <Zap className="w-6 h-6" />
                    Correct! +100 points
                  </div>
                ) : (
                  <div className="text-red-400 text-xl font-bold">
                    Wrong answer
                  </div>
                )}
              </motion.div>
            )}
          </div>
        ) : (
          <Loader2 className="w-12 h-12 animate-spin text-primary-500" />
        )}
      </div>

      {/* Countdown Overlay */}
      <AnimatePresence>
        {phase === 'countdown' && (
          <motion.div 
            className="fixed inset-0 z-50 bg-dark-950/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              key={countdown}
              initial={{ scale: 2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="text-9xl font-bold gradient-text"
            >
              {countdown > 0 ? countdown : 'GUESS!'}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
`);

console.log('\n✅ Client files generated!');
console.log('=========================================\n');

// ============================================================
// SERVER CODE
// ============================================================
console.log('📁 Server Files...');

writeFile('server/src/index.ts', `import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import { setupSocketHandlers } from './socket/index.js'

const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
})

app.use(cors())
app.use(express.json())

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Setup socket handlers
setupSocketHandlers(io)

const PORT = process.env.PORT || 3001

httpServer.listen(PORT, () => {
  console.log(\`
  🚀 C4C Server running on port \${PORT}
  
  Health: http://localhost:\${PORT}/health
  Socket: ws://localhost:\${PORT}
  \`)
})
`);

writeFile('server/src/socket/index.ts', `import { Server, Socket } from 'socket.io'
import { v4 as uuidv4 } from 'uuid'
import { problems, bugProblems, outputProblems } from '../game/problems.js'
import { validateCode, validateBugFix, validateAnswer } from '../game/validator.js'

interface Player {
  id: string
  socketId: string
  name: string
  score: number
  solved: boolean
  solveTime: number | null
}

interface GameRoom {
  id: string
  gameType: string
  players: Player[]
  problem: any
  phase: 'waiting' | 'countdown' | 'playing' | 'results'
  startTime: number | null
  timeLimit: number
  timer: NodeJS.Timeout | null
}

interface QueueEntry {
  socketId: string
  playerName: string
  gameType: string
  joinedAt: number
}

const queues: Map<string, QueueEntry[]> = new Map([
  ['code-duel', []],
  ['bug-hunter', []],
  ['guess-output', []]
])

const rooms: Map<string, GameRoom> = new Map()
const playerToRoom: Map<string, string> = new Map()

const GAME_SETTINGS = {
  'code-duel': { minPlayers: 2, maxPlayers: 2, timeLimit: 300 },
  'bug-hunter': { minPlayers: 2, maxPlayers: 4, timeLimit: 180 },
  'guess-output': { minPlayers: 2, maxPlayers: 8, timeLimit: 15 }
}

export function setupSocketHandlers(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log(\`Player connected: \${socket.id}\`)

    // Join queue
    socket.on('queue:join', ({ gameType, playerName }) => {
      const queue = queues.get(gameType)
      if (!queue) return

      // Remove from any existing queue
      queues.forEach((q, type) => {
        const idx = q.findIndex(e => e.socketId === socket.id)
        if (idx !== -1) q.splice(idx, 1)
      })

      // Add to queue
      queue.push({
        socketId: socket.id,
        playerName,
        gameType,
        joinedAt: Date.now()
      })

      // Broadcast queue update
      io.emit('queue:update', { count: queue.length })
      console.log(\`\${playerName} joined \${gameType} queue. Queue size: \${queue.length}\`)

      // Check for match
      checkForMatch(io, gameType)
    })

    // Leave queue
    socket.on('queue:leave', () => {
      queues.forEach((queue, type) => {
        const idx = queue.findIndex(e => e.socketId === socket.id)
        if (idx !== -1) {
          queue.splice(idx, 1)
          io.emit('queue:update', { count: queue.length })
        }
      })
    })

    // Submit code (Code Duel & Bug Hunter)
    socket.on('game:submit', ({ code }) => {
      const roomId = playerToRoom.get(socket.id)
      if (!roomId) return

      const room = rooms.get(roomId)
      if (!room || room.phase !== 'playing') return

      const player = room.players.find(p => p.socketId === socket.id)
      if (!player || player.solved) return

      const solveTime = Date.now() - (room.startTime || 0)

      // Validate submission
      let result
      if (room.gameType === 'code-duel') {
        result = validateCode(code, room.problem)
      } else if (room.gameType === 'bug-hunter') {
        result = validateBugFix(code, room.problem)
      }

      if (result?.correct) {
        player.solved = true
        player.solveTime = solveTime
        player.score = calculateScore(room.timeLimit * 1000, solveTime, true)

        // Notify all players
        io.to(roomId).emit('game:opponentUpdate', {
          playerId: player.id,
          solved: true,
          time: solveTime
        })

        // Check if game should end
        checkGameEnd(io, room)
      } else {
        socket.emit('game:submitResult', { 
          correct: false, 
          message: result?.message || 'Incorrect solution'
        })
      }
    })

    // Submit answer (Guess Output)
    socket.on('game:answer', ({ answerIndex }) => {
      const roomId = playerToRoom.get(socket.id)
      if (!roomId) return

      const room = rooms.get(roomId)
      if (!room || room.phase !== 'playing') return

      const player = room.players.find(p => p.socketId === socket.id)
      if (!player || player.solved) return

      const answerTime = Date.now() - (room.startTime || 0)
      const correct = validateAnswer(answerIndex, room.problem)

      player.solved = true
      player.solveTime = answerTime
      player.score += correct ? calculateScore(room.timeLimit * 1000, answerTime, true) : 0

      io.to(roomId).emit('game:opponentUpdate', {
        playerId: player.id,
        answered: true,
        correct
      })

      // Check if all answered
      if (room.players.every(p => p.solved)) {
        endGame(io, room)
      }
    })

    // Disconnect
    socket.on('disconnect', () => {
      console.log(\`Player disconnected: \${socket.id}\`)
      
      // Remove from queues
      queues.forEach((queue) => {
        const idx = queue.findIndex(e => e.socketId === socket.id)
        if (idx !== -1) queue.splice(idx, 1)
      })

      // Handle room disconnect
      const roomId = playerToRoom.get(socket.id)
      if (roomId) {
        const room = rooms.get(roomId)
        if (room && room.phase === 'playing') {
          // End game early if player disconnects
          endGame(io, room, socket.id)
        }
        playerToRoom.delete(socket.id)
      }
    })
  })
}

function checkForMatch(io: Server, gameType: string) {
  const queue = queues.get(gameType)
  const settings = GAME_SETTINGS[gameType as keyof typeof GAME_SETTINGS]
  
  if (!queue || !settings) return
  if (queue.length < settings.minPlayers) return

  // Take players for the match
  const matchPlayers = queue.splice(0, settings.minPlayers)
  
  // Create room
  const roomId = uuidv4()
  const problem = selectProblem(gameType)
  
  const room: GameRoom = {
    id: roomId,
    gameType,
    players: matchPlayers.map(p => ({
      id: uuidv4(),
      socketId: p.socketId,
      name: p.playerName,
      score: 0,
      solved: false,
      solveTime: null
    })),
    problem,
    phase: 'waiting',
    startTime: null,
    timeLimit: settings.timeLimit,
    timer: null
  }
  
  rooms.set(roomId, room)
  
  // Join room and map players
  matchPlayers.forEach(p => {
    const socket = io.sockets.sockets.get(p.socketId)
    if (socket) {
      socket.join(roomId)
      playerToRoom.set(p.socketId, roomId)
    }
  })

  // Notify players
  room.players.forEach(player => {
    const socket = io.sockets.sockets.get(player.socketId)
    if (socket) {
      socket.emit('match:found', { roomId, gameType })
      
      socket.emit('game:start', {
        roomId,
        opponents: room.players.filter(p => p.socketId !== player.socketId).map(p => ({
          id: p.id,
          name: p.name
        })),
        problem: sanitizeProblem(problem, gameType)
      })
    }
  })

  // Start countdown
  startCountdown(io, room)
}

function startCountdown(io: Server, room: GameRoom) {
  room.phase = 'countdown'
  let count = 3
  
  const countdownInterval = setInterval(() => {
    io.to(room.id).emit('game:countdown', { count })
    count--
    
    if (count < 0) {
      clearInterval(countdownInterval)
      startGame(io, room)
    }
  }, 1000)
}

function startGame(io: Server, room: GameRoom) {
  room.phase = 'playing'
  room.startTime = Date.now()
  
  io.to(room.id).emit('game:play')
  
  // Start game timer
  room.timer = setInterval(() => {
    const elapsed = Math.floor((Date.now() - (room.startTime || 0)) / 1000)
    const timeLeft = Math.max(0, room.timeLimit - elapsed)
    
    io.to(room.id).emit('game:timeUpdate', { timeLeft })
    
    if (timeLeft <= 0) {
      endGame(io, room)
    }
  }, 1000)
}

function checkGameEnd(io: Server, room: GameRoom) {
  // For Code Duel: end when one player solves
  if (room.gameType === 'code-duel') {
    if (room.players.some(p => p.solved)) {
      endGame(io, room)
    }
  }
  // For Bug Hunter: end when all solve or time up
  else if (room.gameType === 'bug-hunter') {
    if (room.players.every(p => p.solved)) {
      endGame(io, room)
    }
  }
}

function endGame(io: Server, room: GameRoom, disconnectedId?: string) {
  if (room.phase === 'results') return
  
  room.phase = 'results'
  if (room.timer) clearInterval(room.timer)

  // Determine winner
  const solvedPlayers = room.players.filter(p => p.solved && p.socketId !== disconnectedId)
  let winner: Player | null = null
  let draw = false

  if (solvedPlayers.length > 0) {
    solvedPlayers.sort((a, b) => (a.solveTime || Infinity) - (b.solveTime || Infinity))
    winner = solvedPlayers[0]
    
    // Check for draw (same time within 100ms)
    if (solvedPlayers.length > 1 && 
        Math.abs((solvedPlayers[0].solveTime || 0) - (solvedPlayers[1].solveTime || 0)) < 100) {
      draw = true
    }
  }

  const result = {
    winner: winner ? { id: winner.id, name: winner.name } : null,
    draw,
    players: room.players.map(p => ({
      id: p.id,
      name: p.name,
      score: p.score,
      correct: p.solved,
      time: p.solveTime,
      disconnected: p.socketId === disconnectedId
    }))
  }

  io.to(room.id).emit('game:end', { result })
  
  // Cleanup after delay
  setTimeout(() => {
    rooms.delete(room.id)
    room.players.forEach(p => playerToRoom.delete(p.socketId))
  }, 30000)
}

function calculateScore(maxTime: number, solveTime: number, correct: boolean): number {
  if (!correct) return 0
  const timeBonus = Math.floor((1 - solveTime / maxTime) * 500)
  return 500 + Math.max(0, timeBonus)
}

function selectProblem(gameType: string) {
  if (gameType === 'code-duel') {
    return problems[Math.floor(Math.random() * problems.length)]
  } else if (gameType === 'bug-hunter') {
    return bugProblems[Math.floor(Math.random() * bugProblems.length)]
  } else {
    return outputProblems[Math.floor(Math.random() * outputProblems.length)]
  }
}

function sanitizeProblem(problem: any, gameType: string) {
  if (gameType === 'code-duel') {
    // Don't send test case expected values to client
    return {
      ...problem,
      testCases: problem.testCases.map((tc: any) => ({ input: tc.input }))
    }
  } else if (gameType === 'bug-hunter') {
    // Don't send bug solutions
    return {
      ...problem,
      bugs: problem.bugs.map((b: any) => ({ line: b.line, description: b.description }))
    }
  }
  return problem
}
`);

writeFile('server/src/game/problems.ts', `// Code Duel Problems
export const problems = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    description: \`Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.\`,
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
      { input: 'nums = [3,3], target = 6', output: '[0,1]' }
    ],
    starterCode: \`function twoSum(nums, target) {
  // Your code here
  
}\`,
    testCases: [
      { input: [[2,7,11,15], 9], expected: [0,1] },
      { input: [[3,2,4], 6], expected: [1,2] },
      { input: [[3,3], 6], expected: [0,1] },
      { input: [[1,2,3,4,5], 9], expected: [3,4] }
    ],
    solution: \`function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}\`
  },
  {
    id: 'reverse-string',
    title: 'Reverse String',
    description: \`Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.\`,
    examples: [
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
      { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' }
    ],
    starterCode: \`function reverseString(s) {
  // Your code here
  
}\`,
    testCases: [
      { input: [["h","e","l","l","o"]], expected: ["o","l","l","e","h"] },
      { input: [["H","a","n","n","a","h"]], expected: ["h","a","n","n","a","H"] },
      { input: [["a"]], expected: ["a"] },
      { input: [["a","b"]], expected: ["b","a"] }
    ],
    solution: \`function reverseString(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
  return s;
}\`
  },
  {
    id: 'palindrome-number',
    title: 'Palindrome Number',
    description: \`Given an integer x, return true if x is a palindrome, and false otherwise.

An integer is a palindrome when it reads the same backward as forward.
For example, 121 is a palindrome while 123 is not.\`,
    examples: [
      { input: 'x = 121', output: 'true' },
      { input: 'x = -121', output: 'false' },
      { input: 'x = 10', output: 'false' }
    ],
    starterCode: \`function isPalindrome(x) {
  // Your code here
  
}\`,
    testCases: [
      { input: [121], expected: true },
      { input: [-121], expected: false },
      { input: [10], expected: false },
      { input: [12321], expected: true },
      { input: [0], expected: true }
    ],
    solution: \`function isPalindrome(x) {
  if (x < 0) return false;
  const str = x.toString();
  return str === str.split('').reverse().join('');
}\`
  },
  {
    id: 'fizzbuzz',
    title: 'FizzBuzz',
    description: \`Given an integer n, return a string array answer (1-indexed) where:
- answer[i] == "FizzBuzz" if i is divisible by 3 and 5.
- answer[i] == "Fizz" if i is divisible by 3.
- answer[i] == "Buzz" if i is divisible by 5.
- answer[i] == i (as a string) if none of the above conditions are true.\`,
    examples: [
      { input: 'n = 3', output: '["1","2","Fizz"]' },
      { input: 'n = 5', output: '["1","2","Fizz","4","Buzz"]' },
      { input: 'n = 15', output: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]' }
    ],
    starterCode: \`function fizzBuzz(n) {
  // Your code here
  
}\`,
    testCases: [
      { input: [3], expected: ["1","2","Fizz"] },
      { input: [5], expected: ["1","2","Fizz","4","Buzz"] },
      { input: [15], expected: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"] }
    ],
    solution: \`function fizzBuzz(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) result.push("FizzBuzz");
    else if (i % 3 === 0) result.push("Fizz");
    else if (i % 5 === 0) result.push("Buzz");
    else result.push(i.toString());
  }
  return result;
}\`
  }
]

// Bug Hunter Problems
export const bugProblems = [
  {
    id: 'sum-array-bug',
    title: 'Sum Array Bug',
    description: 'Fix the function that should return the sum of all numbers in an array.',
    buggyCode: \`function sumArray(arr) {
  let sum = 1;  // Bug 1: Should start at 0
  for (let i = 0; i <= arr.length; i++) {  // Bug 2: Should be < not <=
    sum += arr[i];
  }
  return sum;
}\`,
    bugs: [
      { line: 2, description: 'Initial sum value is wrong' },
      { line: 3, description: 'Loop condition causes out of bounds' }
    ],
    correctCode: \`function sumArray(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}\`,
    testCases: [
      { input: [[1,2,3]], expected: 6 },
      { input: [[10,20,30,40]], expected: 100 },
      { input: [[]], expected: 0 }
    ]
  },
  {
    id: 'find-max-bug',
    title: 'Find Maximum Bug',
    description: 'Fix the function that should find the maximum value in an array.',
    buggyCode: \`function findMax(arr) {
  let max = 0;  // Bug 1: Should be -Infinity or arr[0]
  for (let i = 1; i < arr.length; i++) {  // Bug 2: Should start from 0 if using -Infinity
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}\`,
    bugs: [
      { line: 2, description: 'Initial max value fails for negative numbers' },
      { line: 3, description: 'Loop may skip first element comparison' }
    ],
    correctCode: \`function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}\`,
    testCases: [
      { input: [[1,5,3,9,2]], expected: 9 },
      { input: [[-5,-1,-10]], expected: -1 },
      { input: [[42]], expected: 42 }
    ]
  },
  {
    id: 'factorial-bug',
    title: 'Factorial Bug',
    description: 'Fix the function that calculates factorial of a number.',
    buggyCode: \`function factorial(n) {
  if (n === 0) return 0;  // Bug 1: factorial(0) should be 1
  let result = 1;
  for (let i = 1; i < n; i++) {  // Bug 2: Should be <= n
    result *= i;
  }
  return result;
}\`,
    bugs: [
      { line: 2, description: 'Base case returns wrong value' },
      { line: 4, description: 'Loop does not include n in multiplication' }
    ],
    correctCode: \`function factorial(n) {
  if (n === 0) return 1;
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}\`,
    testCases: [
      { input: [5], expected: 120 },
      { input: [0], expected: 1 },
      { input: [1], expected: 1 },
      { input: [3], expected: 6 }
    ]
  }
]

// Guess the Output Problems
export const outputProblems = [
  {
    id: 'output-1',
    code: \`let x = 5;
let y = x++;
console.log(y);\`,
    options: ['4', '5', '6', 'undefined'],
    correctIndex: 1
  },
  {
    id: 'output-2',
    code: \`console.log(typeof null);\`,
    options: ['null', 'undefined', 'object', 'boolean'],
    correctIndex: 2
  },
  {
    id: 'output-3',
    code: \`const arr = [1, 2, 3];
arr.push(4);
console.log(arr.length);\`,
    options: ['3', '4', '5', 'Error'],
    correctIndex: 1
  },
  {
    id: 'output-4',
    code: \`console.log(0.1 + 0.2 === 0.3);\`,
    options: ['true', 'false', 'undefined', 'Error'],
    correctIndex: 1
  },
  {
    id: 'output-5',
    code: \`let a = [1, 2, 3];
let b = a;
b.push(4);
console.log(a.length);\`,
    options: ['3', '4', 'undefined', 'Error'],
    correctIndex: 1
  },
  {
    id: 'output-6',
    code: \`console.log("5" - 3);\`,
    options: ['2', '"2"', '"53"', 'NaN'],
    correctIndex: 0
  },
  {
    id: 'output-7',
    code: \`console.log("5" + 3);\`,
    options: ['8', '"8"', '"53"', 'NaN'],
    correctIndex: 2
  },
  {
    id: 'output-8',
    code: \`const x = [1, 2, 3].map(n => n * 2);
console.log(x[1]);\`,
    options: ['2', '4', '6', 'undefined'],
    correctIndex: 1
  },
  {
    id: 'output-9',
    code: \`let x = 10;
if (true) {
  let x = 20;
}
console.log(x);\`,
    options: ['10', '20', 'undefined', 'Error'],
    correctIndex: 0
  },
  {
    id: 'output-10',
    code: \`const obj = { a: 1 };
Object.freeze(obj);
obj.b = 2;
console.log(obj.b);\`,
    options: ['2', 'undefined', 'null', 'Error'],
    correctIndex: 1
  }
]
`);

writeFile('server/src/game/validator.ts', `// Code validator for Code Duel
export function validateCode(code: string, problem: any): { correct: boolean; message?: string } {
  try {
    // Create a sandboxed function from user code
    const userFunction = new Function(\`
      \${code}
      return \${problem.id === 'two-sum' ? 'twoSum' : 
               problem.id === 'reverse-string' ? 'reverseString' :
               problem.id === 'palindrome-number' ? 'isPalindrome' :
               problem.id === 'fizzbuzz' ? 'fizzBuzz' : 'solution'};
    \`)()

    // Run against all test cases
    for (const testCase of problem.testCases) {
      const input = JSON.parse(JSON.stringify(testCase.input)) // Deep copy
      const result = userFunction(...input)
      
      if (!deepEqual(result, testCase.expected)) {
        return { 
          correct: false, 
          message: \`Test failed: expected \${JSON.stringify(testCase.expected)}, got \${JSON.stringify(result)}\`
        }
      }
    }

    return { correct: true }
  } catch (error: any) {
    return { correct: false, message: \`Error: \${error.message}\` }
  }
}

// Validator for Bug Hunter
export function validateBugFix(code: string, problem: any): { correct: boolean; message?: string } {
  try {
    // Extract function from code
    const functionMatch = code.match(/function\\s+(\\w+)/)
    if (!functionMatch) {
      return { correct: false, message: 'Could not find function definition' }
    }
    
    const functionName = functionMatch[1]
    const userFunction = new Function(\`
      \${code}
      return \${functionName};
    \`)()

    // Run test cases
    for (const testCase of problem.testCases) {
      const input = JSON.parse(JSON.stringify(testCase.input))
      const result = userFunction(...input)
      
      if (!deepEqual(result, testCase.expected)) {
        return { 
          correct: false, 
          message: \`Test failed: expected \${JSON.stringify(testCase.expected)}, got \${JSON.stringify(result)}\`
        }
      }
    }

    return { correct: true }
  } catch (error: any) {
    return { correct: false, message: \`Error: \${error.message}\` }
  }
}

// Validator for Guess the Output
export function validateAnswer(answerIndex: number, problem: any): boolean {
  return answerIndex === problem.correctIndex
}

// Deep equality check
function deepEqual(a: any, b: any): boolean {
  if (a === b) return true
  
  if (typeof a !== typeof b) return false
  
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    // For arrays like [0,1] and [1,0] that should match in any order
    const sortedA = [...a].sort()
    const sortedB = [...b].sort()
    return sortedA.every((val, idx) => deepEqual(val, sortedB[idx]))
  }
  
  if (typeof a === 'object' && a !== null && b !== null) {
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)
    if (keysA.length !== keysB.length) return false
    return keysA.every(key => deepEqual(a[key], b[key]))
  }
  
  return false
}
`);

writeFile('server/src/types/index.ts', `export interface Player {
  id: string
  socketId: string
  name: string
  score: number
  solved: boolean
  solveTime: number | null
}

export interface GameRoom {
  id: string
  gameType: 'code-duel' | 'bug-hunter' | 'guess-output'
  players: Player[]
  problem: any
  phase: 'waiting' | 'countdown' | 'playing' | 'results'
  startTime: number | null
  timeLimit: number
  timer: NodeJS.Timeout | null
}

export interface QueueEntry {
  socketId: string
  playerName: string
  gameType: string
  joinedAt: number
}

export interface TestCase {
  input: any[]
  expected: any
}

export interface Problem {
  id: string
  title: string
  description: string
  examples: Array<{ input: string; output: string }>
  starterCode: string
  testCases: TestCase[]
  solution: string
}

export interface BugProblem {
  id: string
  title: string
  description: string
  buggyCode: string
  bugs: Array<{ line: number; description: string }>
  correctCode: string
  testCases: TestCase[]
}

export interface OutputProblem {
  id: string
  code: string
  options: string[]
  correctIndex: number
}
`);

// ============================================================
// ROOT FILES
// ============================================================
console.log('📁 Root Files...');

writeFile('README.md', `# Coders4Coders (C4C) Platform

A real-time multiplayer coding platform for learning, competing, and having fun with code.

## 🎮 Games

- **Code Duel**: 1v1 real-time coding battles
- **Bug Hunter**: Race to fix bugs in broken code  
- **Guess the Output**: Predict what the code will print

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

1. **Install dependencies**
\`\`\`bash
cd client && npm install
cd ../server && npm install
\`\`\`

2. **Start the server**
\`\`\`bash
cd server && npm run dev
\`\`\`

3. **Start the client** (in a new terminal)
\`\`\`bash
cd client && npm run dev
\`\`\`

4. **Open** http://localhost:3000

## 🏗️ Architecture

- **Frontend**: Next.js 14, React 18, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, Socket.io
- **Real-time**: WebSocket-based game synchronization

## 📁 Project Structure

\`\`\`
c4c/
├── client/           # Next.js frontend
│   ├── app/          # Pages (App Router)
│   ├── components/   # React components
│   ├── hooks/        # Custom hooks
│   ├── lib/          # Utilities
│   └── store/        # Zustand state
├── server/           # Node.js backend
│   └── src/
│       ├── socket/   # Socket.io handlers
│       ├── game/     # Game logic
│       └── types/    # TypeScript types
└── README.md
\`\`\`

## 🎯 Features

- ✅ Modern, responsive UI
- ✅ Real-time multiplayer
- ✅ Server-authoritative game logic
- ✅ Code validation with test cases
- ✅ Animated countdown and results
- ✅ Score system with time bonus

## 🛠️ Development

### Client
\`\`\`bash
cd client
npm run dev     # Development server
npm run build   # Production build
npm run lint    # Lint code
\`\`\`

### Server
\`\`\`bash
cd server
npm run dev     # Development server with hot reload
npm run build   # Compile TypeScript
npm start       # Production server
\`\`\`

---

Built with ❤️ by Coders4Coders
`);

writeFile('.gitignore', `# Dependencies
node_modules/
.pnp
.pnp.js

# Build
.next/
out/
dist/
build/

# Logs
*.log
npm-debug.log*

# Runtime
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.idea/
.vscode/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Testing
coverage/

# Misc
*.tsbuildinfo
next-env.d.ts
`);

writeFile('client/.env.local', `NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
`);

console.log('\n✅ All source files generated!');
console.log('=========================================');
console.log('\n📋 Next Steps:');
console.log('');
console.log('  1. Run the setup script:');
console.log('     node setup_dirs.js');
console.log('');
console.log('  2. Install client dependencies:');
console.log('     cd client && npm install');
console.log('');
console.log('  3. Install server dependencies:');
console.log('     cd ../server && npm install');
console.log('');
console.log('  4. Start the server:');
console.log('     cd server && npm run dev');
console.log('');
console.log('  5. Start the client (new terminal):');
console.log('     cd client && npm run dev');
console.log('');
console.log('  6. Open http://localhost:3000');
console.log('');
console.log('🎮 Have fun coding!');
