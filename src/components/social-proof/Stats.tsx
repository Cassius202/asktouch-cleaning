"use client"

import CountUp from "react-countup"
import { useInView } from "react-intersection-observer"

const stats = [
  { label: "Projects Completed", value: 220, suffix: "+" },
  { label: "Happy Clients",       value: 800, suffix: "+" },
  { label: "Years of Experience", value: 10,  suffix: "+" },
  { label: "Awards Won",          value: 5,   suffix: ""  },
]

const Stats = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section ref={ref} className="w-full py-20 px-6 md:px-16 bg-white">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-widest text-zinc-400 font-medium mb-2">
            By the numbers
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900 tracking-tight">
            Trusted by clients across Nigeria
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-100 rounded-2xl overflow-hidden shadow-sm border border-zinc-100">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white flex flex-col items-center justify-center py-10 px-6 text-center group hover:bg-zinc-50 transition-colors"
            >
              <span className="text-4xl md:text-5xl font-bold text-zinc-900 tabular-nums">
                {inView ? (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2}
                    delay={i * 0.15}
                    suffix={stat.suffix}
                  />
                ) : (
                  `0${stat.suffix}`
                )}
              </span>
              <span className="mt-2 text-sm text-zinc-500 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Stats