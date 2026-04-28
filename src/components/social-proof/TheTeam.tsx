import Image from 'next/image'
import Link from 'next/link'
import { MotionDiv, MotionH2, MotionP } from '@/components/motion/MotionDiv'

const TEAM = [
  {
    name: 'Mr. Kelechi',
    role: 'CEO & Lead Engineer',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    badge: 'CEO',
  },
  {
    name: 'Emeka Okafor',
    role: 'Senior HVAC Technician',
    image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&q=80',
    badge: null,
  },
  {
    name: 'Chidi Nwosu',
    role: 'Solar Inverter Specialist',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    badge: null,
  },
  {
    name: 'Tunde Adeyemi',
    role: 'Refrigeration Engineer',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
    badge: null,
  },
  {
    name: 'Blessing Eze',
    role: 'Electrical & Contracting Lead',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    badge: null,
  },
]

const MeetTheTeam = () => {
  return (
    <section className="bg-white py-24 px-6 md:px-12">
      <div className="container mx-auto">

        {/* Header */}
        <div className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <MotionP
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500 mb-4"
            >
              Our Team
            </MotionP>
            <MotionH2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 leading-[1.1] tracking-tight"
            >
              Skilled Hands,{' '}
              <span className="italic font-light text-zinc-400">Built to Deliver.</span>
            </MotionH2>
          </div>
          <MotionP
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-500 text-sm md:text-base leading-relaxed md:max-w-sm md:ml-auto"
          >
            Our certified technicians bring years of hands-on experience across
            HVAC, refrigeration, solar, and electrical contracting — so every
            job is done right the first time.
          </MotionP>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
          {TEAM.map((member, i) => (
            <MotionDiv
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className="group flex flex-col items-center text-center gap-3"
            >
              {/* Portrait */}
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-100">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                {member.badge && (
                  <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {member.badge}
                  </div>
                )}
                <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Info */}
              <div>
                <p className="text-zinc-800 text-sm font-semibold leading-snug">{member.name}</p>
                <p className="text-zinc-400 text-xs mt-0.5 leading-relaxed">{member.role}</p>
              </div>
            </MotionDiv>
          ))}
        </div>

        {/* Bottom CTA */}
        <MotionDiv
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-zinc-100 pt-10"
        >
          <p className="text-zinc-500 text-sm text-center sm:text-left max-w-md">
            Every member of our team is trained, certified, and dedicated to delivering
            reliable technical services — on time, every time.
          </p>
          <Link
            href="/contact"
            className="flex-shrink-0 inline-flex items-center gap-3 bg-zinc-900 hover:bg-zinc-700 active:scale-95 transition-all text-white text-sm font-semibold px-6 py-3 rounded-full shadow-md"
          >
            Work with our team
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/20 text-xs">→</span>
          </Link>
        </MotionDiv>

      </div>
    </section>
  )
}

export default MeetTheTeam