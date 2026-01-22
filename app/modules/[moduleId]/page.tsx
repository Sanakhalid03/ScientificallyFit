'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Brain,
  Heart,
  Leaf,
  Users,
  Target,
  Activity,
  Moon,
  CheckCircle,
  ArrowRight
} from 'lucide-react'

/* ------------------ */
/* Module Data Object */
/* ------------------ */
const modules = {
  mental: {
    title: 'Mental Fitness',
    description:
      'Master your focus, stress response, and cognitive clarity with science‑driven practices.',
    icon: Brain,
    color: 'indigo',
    problems: [
      'Difficulty focusing in distraction‑rich environments',
      'Stress negatively affecting sleep and energy',
      'Mental fog or burnout symptoms',
    ],
    outcomes: [
      { title: 'Sharp Focus', description: 'Unlock deep attention and sustained concentration' },
      { title: 'Stress Mastery', description: 'Reframe stress for better resilience' },
      { title: 'Clarity & Calm', description: 'Regain mental clarity and emotional balance' },
    ],
    programs: [
      {
        title: 'Focus Rebuild',
        description: 'Rebuild deep work capacity and consistent focus',
        duration: '6 weeks',
        href: '/programs/focus-rebuild',
      },
      {
        title: 'Burnout Reset',
        description: 'Systematic recovery from chronic stress',
        duration: '8 weeks',
        href: '/programs/burnout-reset',
      },
    ],
    tools: [
      { title: 'Stress Score', description: 'Track stress & HRV trends', icon: Activity },
      { title: 'Focus Tracker', description: 'Measure deep attention sessions', icon: Target },
    ],
  },
  social: {
    title: 'Social & Relationship Fitness',
    description:
      'Develop the emotional intelligence to connect deeply and communicate confidently.',
    icon: Heart,
    color: 'rose',
    problems: [
      'Persistent feelings of social disconnection',
      'Difficulty with difficult conversations',
      'Lack of meaningful relational habits',
    ],
    outcomes: [
      { title: 'Deep Connection', description: 'Build relationships that thrive' },
      { title: 'Communication Mastery', description: 'Navigate tough talks with ease' },
      { title: 'Healthy Boundaries', description: 'Protect energy while fostering connection' },
    ],
    programs: [
      {
        title: 'Communication Fitness',
        description: 'Master relational conversations',
        duration: '6 weeks',
        href: '/programs/communication-fitness',
      },
    ],
    tools: [
      { title: 'Connection Score', description: 'Track relationship health', icon: Heart },
    ],
  },
  environmental: {
    title: 'Environmental Fitness',
    description: 'Transform your spaces to support focus and recovery.',
    icon: Leaf,
    color: 'green',
    problems: [
      'Overstimulating environments hindering focus',
      'Digital overwhelm from constant notifications',
      'Poor sleep spaces affecting recovery',
    ],
    outcomes: [
      { title: 'Space Optimization', description: 'Create efficient, calm spaces' },
      { title: 'Digital Calm', description: 'Reduce digital noise and clutter' },
      { title: 'Urban Resilience', description: 'Thrive even in busy environments' },
    ],
    programs: [
      {
        title: 'Sleep Reset',
        description: 'Optimize your sleep environment for recovery',
        duration: '4 weeks',
        href: '/programs/sleep-reset',
      },
    ],
    tools: [
      { title: 'Circadian Tool', description: 'Track light & sleep rhythms', icon: Moon },
      { title: 'Space Audit', description: 'Evaluate your physical environment', icon: Leaf },
    ],
  },
  family: {
    title: 'Family Fitness',
    description: 'Build routines that bring harmony and reduce chaos.',
    icon: Users,
    color: 'yellow',
    problems: [
      'Household routines falling apart',
      'Parenting stress tipping into exhaustion',
      'Lack of quality family time',
    ],
    outcomes: [
      { title: 'Smooth Routines', description: 'Build routines that work for everyone' },
      { title: 'Quality Time', description: 'Make family time more meaningful' },
      { title: 'Reduced Stress', description: 'Eliminate chaos cycles' },
    ],
    programs: [
      {
        title: 'Morning Routine Mastery',
        description: 'Transform chaotic mornings',
        duration: '3 weeks',
        href: '/programs/morning-routine',
      },
    ],
    tools: [
      { title: 'Routine Tracker', description: 'Measure habit consistency', icon: CheckCircle },
    ],
  },
}

/* ------------------ */
/* UI Components */
/* ------------------ */

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gray-50 text-gray-900">{children}</div>
)

const AnimatedButton = ({
  children,
  href,
  variant = 'primary',
}: {
  children: React.ReactNode
  href: string
  variant?: 'primary' | 'secondary'
}) => {
  const base =
    'inline-flex items-center px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 hover:shadow-lg'
  const styles =
    variant === 'primary'
      ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white'
      : 'border border-gray-300 text-gray-800 hover:bg-gray-100'
  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  )
}

const SectionHeader = ({
  label,
  title,
}: {
  label: string
  title: string
}) => (
  <div className="mb-8">
    <span className="text-sm font-semibold text-indigo-500 uppercase">{label}</span>
    <h3 className="text-3xl font-bold text-gray-900">{title}</h3>
  </div>
)

const CardWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 hover:shadow-xl hover:scale-105 transition-all duration-300"
  >
    {children}
  </motion.div>
)

/* ------------------ */
/* Page Logic */
/* ------------------ */

export default function ModulePage() {
  const params = useParams()
  const module = modules[params.moduleId as keyof typeof modules]

  if (!module) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center text-xl font-semibold">
          Module not found
        </div>
      </Layout>
    )
  }

  const Icon = module.icon

  return (
    <Layout>
      {/* Hero with Gradient + Scale Animation */}
      <section className="py-24 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto space-y-4 px-6"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-indigo-100">
            <Icon className="w-6 h-6 text-indigo-600" />
            <span className="text-indigo-700 font-bold uppercase">Module</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900">{module.title}</h1>
          <p className="text-lg text-gray-700">{module.description}</p>
          <div className="flex justify-center gap-4 pt-4">
            <AnimatedButton href="/assessment" variant="primary">
              Start Assessment <ArrowRight className="ml-2 h-5 w-5" />
            </AnimatedButton>
            <AnimatedButton href="/modules" variant="secondary">
              Explore Other Modules
            </AnimatedButton>
          </div>
        </motion.div>
      </section>

      {/* Problems */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <SectionHeader label="Problem" title="What this module solves" />
        <div className="grid md:grid-cols-2 gap-6">
          {module.problems.map((p, idx) => (
            <CardWrapper key={idx}>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-red-500 rounded-full mt-1"></span>
                <p className="text-gray-800">{p}</p>
              </div>
            </CardWrapper>
          ))}
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-16 px-6 max-w-6xl mx-auto bg-gradient-to-r from-indigo-50 to-white">
        <SectionHeader label="Outcome" title="What you'll achieve" />
        <div className="grid md:grid-cols-3 gap-6">
          {module.outcomes.map((o, idx) => (
            <CardWrapper key={idx}>
              <div className="text-center">
                <CheckCircle className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
                <h4 className="font-semibold text-xl">{o.title}</h4>
                <p className="text-gray-700 text-sm">{o.description}</p>
              </div>
            </CardWrapper>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <SectionHeader label="Programs" title="Featured Programs" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {module.programs.map((prg, idx) => (
            <CardWrapper key={idx}>
              <h5 className="text-xl font-semibold">{prg.title}</h5>
              <p className="text-gray-700">{prg.description}</p>
              <div className="mt-3 text-sm text-gray-500">{prg.duration}</div>
              <Link href={prg.href}>
                <span className="mt-4 inline-block text-indigo-600 hover:underline">
                  View Details →
                </span>
              </Link>
            </CardWrapper>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section className="py-16 px-6 max-w-6xl mx-auto bg-gradient-to-r from-white via-indigo-50 to-white">
        <SectionHeader label="Tools" title="Helpful Tools & Trackers" />
        <div className="grid md:grid-cols-2 gap-6">
          {module.tools.map((tool, idx) => (
            <CardWrapper key={idx}>
              <div className="flex items-center gap-3">
                <tool.icon className="w-8 h-8 text-indigo-600" />
                <div>
                  <h5 className="font-semibold">{tool.title}</h5>
                  <p className="text-gray-700 text-sm">{tool.description}</p>
                </div>
              </div>
            </CardWrapper>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-3">
            Ready to level up your {module.title.toLowerCase()}?
          </h2>
          <p className="text-gray-100 mb-6">
            Get personalized guidance with our assessment.
          </p>
          <AnimatedButton href="/assessment" variant="primary">
            Start Assessment
          </AnimatedButton>
        </motion.div>
      </section>
    </Layout>
  )
}
