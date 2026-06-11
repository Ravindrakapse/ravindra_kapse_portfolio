import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle'

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/Ravindra-kapse' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/ravindra-kapse' },
  { label: '+91 7999216582', href: 'tel:+917999216582' },
]

export default function Contact() {
  return (
    <section id="contact" className="bg-black py-24 md:py-40 px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-6">
          Get in touch
        </p>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[0.95] mb-10">
          <WordsPullUpMultiStyle
            segments={[
              { text: "Let's build", className: 'font-normal' },
              { text: 'something extraordinary', className: 'italic font-serif' },
              { text: 'together.', className: 'font-normal' },
            ]}
          />
        </h2>

        <motion.a
          href="mailto:ravindrakapse308@gmail.com"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="group inline-flex items-center gap-2 hover:gap-4 bg-primary rounded-full pl-6 pr-1.5 py-1.5 sm:pl-8 sm:pr-2 sm:py-2 transition-all"
        >
          <span className="text-black font-medium text-sm sm:text-lg">ravindrakapse308@gmail.com</span>
          <span className="bg-black rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center group-hover:scale-110 transition-transform">
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#E1E0CC' }} />
          </span>
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-10 flex justify-center gap-8"
        >
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 text-xs sm:text-sm hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
        </motion.div>

        <p className="mt-20 text-gray-600 text-[10px] tracking-widest uppercase">
          &copy; {new Date().getFullYear()} Ravindra Kapse
        </p>
      </div>
    </section>
  )
}
