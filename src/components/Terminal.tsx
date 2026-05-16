import React, { useState, useEffect, useRef } from 'react'
import TypedOutput from './TypedOutput'
import ProfileImage from './ProfileImage'
import ContactForm from './ContactForm'
import emailjs from '@emailjs/browser'

const progressWidths = [
  'w-0',
  'w-[10%]',
  'w-[20%]',
  'w-[30%]',
  'w-[40%]',
  'w-[50%]',
  'w-[60%]',
  'w-[70%]',
  'w-[80%]',
  'w-[90%]',
  'w-full',
]

interface HistoryItem {
  type: 'system' | 'command'
  input?: string
  output: string
  animate?: boolean
  progress?: number
}

const commands: Record<string, string[]> = {
  help: [
    '┌──────────────────────────────────────────────┐',
    '│  Available Commands:                         │',
    '│──────────────────────────────────────────────│',
    '│  about      → Who is Bibek Kumar Sah?       │',
    '│  skills     → Technical arsenal              │',
    '│  projects   → Featured projects              │',
    '│  education  → Academic background            │',
    '│  resume     → View resume & download         │',
    '│  contact    → Get in touch                   │',
    '│  social     → Social media links             │',
    '│  clear      → Clear terminal                 │',
    '│  whoami     → Current user                   │',
    '│  date       → Current date/time              │',
    '│  uname      → System info                    │',
    '│  neofetch   → System fetch                   │',
    '│  help       → Show this menu                 │',
    '└──────────────────────────────────────────────┘',
  ],
  about: [
    '__PROFILE_IMAGE__',
    '',
    '  Name     : Bibek Kumar Sah',
    '  Role     : Full-Stack Developer / AI & ML Engineer',
    '  Location : Planet Earth',
    '',
    "  I'm a passionate developer who loves building",
    '  things that live on the internet. I specialize',
    '  in crafting elegant solutions to complex',
    '  problems with clean code.',
    '',
    "  > 'The quieter you become, the more you",
    '     can hear. - Kali Linux',
  ],
  skills: [
    '┌─── [ TECHNICAL SKILLS ] ──────────────────────┐',
    '│                                               │',
    '│  Languages:                                   │',
    '│    ► C / C++                    ██████░░░ 70% │',
    '│    ► Python                     ███████░░ 80% │',
    '│    ► JavaScript / TypeScript    ████░░░░░ 50% │',
    '│    ► Bash / Shell               █████░░░░ 60% │',
    '│                                               │',
    '│  Frameworks:                                  │',
    '│    ► React / Next.js            ███░░░░░░ 40% │',
    '│    ► Node.js / Express          ████░░░░░ 50% │',
    '│    ► Django                     ██████░░░ 70% │',
    '│                                               │',
    '│  Tools:                                       │',
    '│    ► Git, Docker, Linux, AWS                  │',
    '│    ► Kali Linux, Metasploit, Wireshark        │',
    '│                                               │',
    '└───────────────────────────────────────────────┘',
  ],
  projects: [
    '┌─── [ PROJECTS ] ─────────────────────────────┐',
    '│                                              │',
    '│  [01] ▸ CyberShield Security Scanner         │',
    '│         A penetration testing toolkit        │',
    '│         Tech: Python, Scapy, Nmap            │',
    '│                                              │',
    '│  [02] ▸ DarkNet Dashboard                    │',
    '│         Network monitoring & analytics       │',
    '│         Tech: React, Node.js, D3.js          │',
    '│                                              │',
    '│  [03] ▸ CryptoVault                          │',
    '│         End-to-end encrypted file storage    │',
    '│         Tech: TypeScript, AES-256, AWS S3    │',
    '│                                              │',
    '│  [04] ▸ Terminal Portfolio                   │',
    '│         This site you are looking at!        │',
    '│         Tech: React, TypeScript, Canvas      │',
    '│                                              │',
    '└──────────────────────────────────────────────┘',
  ],
  education: [
    '┌─── [ EDUCATION ] ────────────────────────────┐',
    '│                                              │',
    '│  🎓 Bachelor of Technology                   │',
    '│     Computer Science & Engineering           │',
    '│     ──────────────────────────────           │',
    '│     Status: In Progress                      │',
    '│                                              │',
    '│  📜 Certifications:                          │',
    '│     ► AWS Cloud Practitioner                 │',
    '│                                              │',
    '│  📚 Courses:                                 │',
    '│     ► Data Structures & Algorithms           │',
    '│     ► Artificial Intelligence                |',
    '|     ► Machine Learning                       │',
    '│     ► Full-Stack Development                 │',
    '│                                              │',
    '└──────────────────────────────────────────────┘',
  ],
  contact: [
    '┌─── [ CONTACT ] ──────────────────────────────────────────────────┐',
    '│                                                                  │',
    '│  ✉  Email    : bibek@example.com                                 │',
    '│  📱 Phone    : +91-9792245762 / +977-9807733780                  │',
    '│  🌐 Website  : bibeksah.dev                                      │',
    '│  💼 LinkedIn : linkedin.com/in/bibek-kumar-sah/                  │',
    '│  🐙 GitHub   : github.com/bibekksah                              │',
    '│                                                                  │',
    '│  > Feel free to reach out anytime!                               │',
    '│  > I am always open to collaborations.                           │',
    '│                                                                  │',
    '└──────────────────────────────────────────────────────────────────┘',
  ],
  social: [
    '┌─── [ SOCIAL LINKS ] ────────────────────────────────────┐',
    '│                                                         │',
    '│  🐙GitHub    → github.com/bibekksah                     │',
    '│  💼LinkedIn  → linkedin.com/in/bibek-kumar-sah/         │',
    '│  🐦Twitter   → twitter.com/bibeksah                     │',
    '│  📷Instagram → instagram.com/bibeksah                   │',
    '│                                                         │',
    '└─────────────────────────────────────────────────────────┘',
  ],
  resume: [
    '┌─── [ RESUME ] ─────────────────────────────────┐',
    '│                                                │',
    '│  ╔══════════════════════════════════════ ╗     │',
    '│  ║  BIBEK KUMAR SAH                      ║     │',
    '│  ║  Full-Stack Developer & ML Engineer   ║     │',
    '│  ╚══════════════════════════════════════ ╝     │',
    '│                                                │',
    '│  EXPERIENCE:                                   │',
    '│    ► Full-Stack Developer                      │',
    '│      Building scalable web applications        │',
    '│      with React, Node.js & cloud services      │',
    '│                                                │',
    '│    ► Security Researcher                       │',
    '│      Penetration testing, vulnerability        │',
    '│      assessment & security auditing            │',
    '│                                                │',
    '│  SKILLS:                                       │',
    '│    JS/TS • Python • React • Node.js            │',
    '│    Docker • AWS • Linux • Kali                 │',
    '│                                                │',
    '│  EDUCATION:                                    │',
    '│    B.Tech CSE (In Progress)                    │',
    '│                                                │',
    '│  CERTIFICATIONS:                               │',
    '│    CEH • AWS Cloud • CompTIA Security+         │',
    '│                                                │',
    '│  ──────────────────────────────────────────    │',
    '│  📥 Download: bibeksah.dev/resume.pdf          │',
    '│  ──────────────────────────────────────────    │',
    '│                                                │',
    '└────────────────────────────────────────────────┘',
  ],
  whoami: ['root@bibek-portfolio'],
  neofetch: [
    '        ,.........                root@bibek-portfolio',
    '      .:::::::::::.               ─────────────────────',
    '    .:::::::::::::::              OS: Kali GNU/Linux 2024.1',
    '   ::::::::::::::::::             Host: Portfolio Terminal v1.0',
    '  ::::::::::::::::::::.           Kernel: 6.1.0-kali9',
    '  :::::::::::::::::::::.          Shell: bibek-sh 1.0',
    '  ::::::::::::::::::::::          Terminal: Web-Terminal',
    '  ::::::::::::::::::::::          CPU: Brain @ 3.0GHz',
    '  ::::::::::::::::::::::          Memory: ∞ / ∞ MB',
    '  ::::::::::::::::::::::          Uptime: Since Birth',
    '  ::::::::::::::::::::::          Theme: Matrix [GTK3]',
    '      ::::::::                    Resolution: Unlimited',
    '        ::::::::::::',
  ],
  clear: [],
}

const dynamicCommands: Record<string, () => string[]> = {
  date: () => [new Date().toString()],
  uname: () => {
    const ua = navigator.userAgent
    const platform = navigator.platform || 'x86_64'
    const osName = /Linux|X11/.test(ua)
      ? 'Linux'
      : /Mac OS X|Macintosh/.test(ua)
      ? 'Darwin'
      : /Windows/.test(ua)
      ? 'Windows'
      : /Android/.test(ua)
      ? 'Android'
      : 'Unknown'
    const arch = /x86_64|Win64|WOW64|amd64|AMD64/i.test(ua)
      ? 'x86_64'
      : /arm|aarch64/i.test(ua)
      ? 'aarch64'
      : platform
    const kernel = osName === 'Linux' ? '6.1.0-kali9' : osName === 'Darwin' ? '20.6.0' : osName === 'Windows' ? '10.0.0' : '0.0.0'
    const distro = osName === 'Linux' ? 'GNU/Linux' : osName === 'Darwin' ? 'Darwin' : osName === 'Windows' ? 'MS Windows' : osName
    return [`${osName} bibek-portfolio ${kernel} #1 SMP ${arch} ${distro}`]
  },
}

const bootTextLines = [
  'BIOS v3.14.159 - Bibek Systems Inc.',
  'Copyright (C) 2024 BibekOS Foundation',
  '',
  'Performing POST checks...',
  'CPU: Quantum Core i9-13900X @ 5.8GHz ............. [ OK ]',
  'RAM: 64GB DDR5-6400 ECC ......................... [ OK ]',
  'GPU: Neural RTX 5090 Ti 24GB .................... [ OK ]',
  'NIC: Stealth Ethernet 10GbE ..................... [ OK ]',
  '',
  'Loading kernel modules...',
  '[LOAD] kernel/crypto/aes-256-gcm.ko',
  '[LOAD] kernel/net/tor-bridge.ko',
  '[LOAD] kernel/security/firewall-xt.ko',
  '[LOAD] kernel/drivers/matrix-display.ko',
  'Kernel modules loaded successfully ............ [ OK ]',
  '',
  'Initializing filesystem...',
  'Mounting /dev/sda1 on / (ext4) ................. [ OK ]',
  'Mounting /dev/sda2 on /home (encrypted) ....... [ OK ]',
  'Decrypting /home/bibek with AES-256 ............ [ OK ]',
  '',
  'Initializing network interfaces...',
  'eth0: link up, 10000 Mbps, full-duplex',
  'wlan0: scanning for secure networks...',
  'VPN tunnel established (WireGuard) ........... [ OK ]',
  'TOR circuit built (3 relays) ................ [ OK ]',
]

const Terminal: React.FC = () => {
  const [input, setInput] = useState('')
  const [bootHistory, setBootHistory] = useState<HistoryItem[]>([])
  const [terminalHistory, setTerminalHistory] = useState<HistoryItem[]>([])
  const [bootComplete, setBootComplete] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [contactStatus, setContactStatus] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const promptPrefix = '(root@bibek)-[~/portfolio]'
  const promptSymbol = '~$'

  useEffect(() => {
    const runBoot = async () => {
      for (const line of bootTextLines) {
        setBootHistory(prev => [...prev, { type: 'system', output: line }])
        await new Promise(resolve => setTimeout(resolve, 120))
      }

      setBootHistory(prev => [...prev, { type: 'system', output: '' }])
      await new Promise(resolve => setTimeout(resolve, 200))

      setBootHistory(prev => [...prev, { type: 'system', output: 'Establishing secure connection...', progress: 0 }])
      let progress = 0

      while (progress < 100) {
        await new Promise(resolve => setTimeout(resolve, 80))
        progress = Math.min(100, progress + Math.floor(Math.random() * 12 + 5))
        setBootHistory(prev => {
          const updated = [...prev]
          const lastIndex = updated.length - 1
          updated[lastIndex] = { ...updated[lastIndex], progress }
          return updated
        })
      }

      await new Promise(resolve => setTimeout(resolve, 300))
      setBootHistory(prev => [...prev, { type: 'system', output: 'SSL/TLS handshake complete ................ [ OK ]' }])
      await new Promise(resolve => setTimeout(resolve, 140))
      setBootHistory(prev => [...prev, { type: 'system', output: 'Firewall rules loaded (247 rules) ........... [ OK ]' }])
      await new Promise(resolve => setTimeout(resolve, 140))
      setBootHistory(prev => [...prev, { type: 'system', output: 'Intrusion detection system active .......... [ OK ]' }])
      await new Promise(resolve => setTimeout(resolve, 180))
      setBootHistory(prev => [...prev, { type: 'system', output: '' }])
      await new Promise(resolve => setTimeout(resolve, 140))
      setBootHistory(prev => [...prev, { type: 'system', output: 'Starting system services...' }])
      await new Promise(resolve => setTimeout(resolve, 260))
      setBootHistory(prev => [...prev, { type: 'system', output: '[START] sshd ................................. [ OK ]' }])

      await new Promise(resolve => setTimeout(resolve, 800))
      setBootComplete(true)
      setTerminalHistory([
        { type: 'system', output: 'ML ENGINEER' },
        {
          type: 'system',
          output:
            "Welcome to Bibek's Terminal Portfolio v3.0\nSystem initialized. All services running.\nType 'help' to see available commands.",
        },
        { type: 'system', output: '' },
        { type: 'system', output: '[SYSTEM] All connections encrypted • TOR enabled' },
      ])
    }

    runBoot().catch(console.error)
  }, [])

  const downloadResume = () => {
    const resumeText = `Bibek Kumar Sah - Resume

Full-Stack Developer | Ethical Hacker

Email: bibeksah98@gmail.com
LinkedIn: linkedin.com/in/bibek-kumar-sah
GitHub: github.com/bibeksah
Website: bibeksah.dev

Skills:
- JavaScript / TypeScript
- React / Next.js
- Node.js / Express
- Python / Django
- Linux / Kali
- Cybersecurity

Experience:
- Full-Stack Development
- Security Research
- Penetration Testing

Education:
- B.Tech Computer Science & Engineering

Certifications:
- CEH
- AWS Cloud Practitioner
- CompTIA Security+
`;
    const blob = new Blob([resumeText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'Bibek_Kumar_Sah_Resume.txt'
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    URL.revokeObjectURL(url)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cmd = input.toLowerCase().trim()
    if (!cmd) return

    if (cmd === 'clear') {
      setTerminalHistory([])
      setShowContactForm(false)
      setInput('')
      return
    }

    if (cmd === 'resume') {
      downloadResume()
      setTerminalHistory(prev => [
        ...prev,
        {
          type: 'command',
          input: cmd,
          output: 'Downloading resume...\nSaved as Bibek_Kumar_Sah_Resume.txt',
          animate: true,
        },
      ])
      setInput('')
      return
    }

    if (cmd === 'contact') {
      setShowContactForm(true)
      setContactStatus('')
      setTerminalHistory(prev => [
        ...prev,
        {
          type: 'command',
          input: cmd,
          output: 'Opening secure contact interface...\nFill in the form below to message me directly.',
          animate: true,
        },
      ])
      setInput('')
      return
    }

    const commandOutput = dynamicCommands[cmd]?.() || commands[cmd]
    const response = commandOutput
      ? commandOutput.join('\n')
      : `Command not found: ${cmd}\nType "help" for available commands`

    setTerminalHistory(prev => [...prev, { type: 'command', input: cmd, output: response, animate: true }])
    setInput('')
  }

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setContactStatus('Please complete every field before sending.')
      return
    }

    setContactStatus('Sending message...')

    const serviceId = 'service_eca79oe'
    const templateId = 'template_q70jbsl'
    const publicKey = 'p2pvLKDf1fHYmwtQf'

    if ([serviceId, templateId, publicKey].some(id => id.startsWith('YOUR_') || id === '')) {
      setContactStatus('EmailJS is not configured. Replace the placeholder IDs in Terminal.tsx with your EmailJS values.')
      return
    }

    try {
      const templateParams = {
        from_name: contactName,
        from_email: contactEmail,
        message: contactMessage,
      }

      await emailjs.send(serviceId, templateId, templateParams, publicKey)

      setContactStatus('Message sent successfully. Thank you!')
      setContactName('')
      setContactEmail('')
      setContactMessage('')
    } catch (err) {
      console.error('EmailJS error', err)
      setContactStatus('Failed to send message. Please check your EmailJS configuration and try again.')
    }
  }

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    if (bootComplete && inputRef.current) {
      inputRef.current.focus()
    }
  }, [bootComplete, terminalHistory])

  useEffect(() => {
    if (scrollContainerRef.current) {
      requestAnimationFrame(() => {
        scrollToBottom()
      })
    }
  }, [terminalHistory, bootComplete, showContactForm])

  const bootRootClass =
    'w-full h-full bg-black px-8 py-8 overflow-y-auto font-mono text-matrix text-[14px] leading-7'
  const mainRootClass =
    'w-full max-w-5xl h-[640px] bg-[#031106]/95 rounded-[32px] shadow-[0_0_120px_rgba(32,194,14,0.25)] overflow-hidden border-2 border-green-400/30 backdrop-blur-sm'

  return bootComplete ? (
    <div className={mainRootClass}>
      <div className="flex items-center justify-between px-5 py-3 border-b border-green-500/10 bg-[#021005]/90">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          <div className="text-[11px] text-green-300 uppercase tracking-[0.3em]">root@bibek-hackbox:~/portfolio -- bash</div>
        </div>
        <div className="font-mono text-[12px] uppercase text-green-300 tracking-[0.35em] glitch">
          BIBEK KUMAR SAH
        </div>
      </div>

      <div className="p-5 h-[calc(100%-60px)] flex flex-col font-mono text-matrix leading-6">
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto scroll-smooth no-scrollbar">
          <div className="min-h-full rounded-[28px] border border-green-500/20 bg-[#011006]/95 p-4 shadow-[inset_0_0_40px_rgba(11,57,13,0.35)]">
            {terminalHistory.map((item, index) => (
              <div key={index} className="mb-4 whitespace-pre text-sm">
              {item.type === 'command' && (
                <div className="mb-2 text-green-200">
                  <span className="text-green-300">{promptPrefix}</span>
                  <span className="text-green-400 ml-2">{promptSymbol}</span>
                  <span className="ml-2">{item.input}</span>
                </div>
              )}
              {item.type === 'command' ? (
                item.output.split('\n').map((line, lineIndex) =>
                  line === '__PROFILE_IMAGE__' ? (
                    <div key={`${index}-${lineIndex}`} className="mb-4 flex justify-center">
                      <div className="w-36 h-36 rounded-full border border-green-400/20 bg-[#051507]/90 p-2 shadow-[0_0_20px_rgba(16,248,94,0.12)]">
                        <ProfileImage />
                      </div>
                    </div>
                  ) : (
                    <TypedOutput key={`${index}-${lineIndex}`} text={line} animate />
                  )
                )
              ) : (
                <div className="whitespace-pre">{item.output}</div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
          </div>

          {showContactForm && (
            <ContactForm
              name={contactName}
              email={contactEmail}
              message={contactMessage}
              status={contactStatus}
              onNameChange={setContactName}
              onEmailChange={setContactEmail}
              onMessageChange={setContactMessage}
              onSubmit={handleContactSubmit}
              onClose={() => {
                setShowContactForm(false)
                setContactStatus('')
              }}
            />
          )}
        </div>

          <form onSubmit={handleSubmit} className="mt-4 text-[13px] text-green-300 whitespace-pre-line">
          <div className="flex items-center gap-2 mt-2 text-green-200">
            <span className="text-green-400">{promptSymbol}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              className="bg-transparent border-none outline-none text-green-200 w-full placeholder:text-green-500/50"
              placeholder="help"
              autoFocus
            />
          </div>
        </form>
      </div>
      <div className="w-full border-t border-green-500/10 bg-[#021005]/90 px-5 py-3 flex items-center justify-between text-[11px] text-green-300">
        <span>[SYSTEM] All connections encrypted • TOR enabled</span>
        <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-200">ONLINE</span>
      </div>
    </div>
  ) : (
    <div className={bootRootClass}>
      {bootHistory.map((item, index) => (
        <div key={index} className="whitespace-pre-line mb-1">
          {item.progress !== undefined ? (
            <>
              <div>{item.output}</div>
              <div className="mt-1 h-2 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r from-green-400 via-lime-300 to-green-600 ${progressWidths[Math.min(10, Math.floor((item.progress ?? 0) / 10))]}`}
                />
              </div>
            </>
          ) : (
            item.output
          )}
        </div>
      ))}
    </div>
  )
}

export default Terminal
