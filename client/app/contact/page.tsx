import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'
import SiteShell from '../../components/common/SiteShell'
import PageHero from '../../components/common/PageHero'
import ContactForm from './ContactForm'

export default function ContactPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Contact"
        title="Let's build your next breakthrough."
        description="Tell us about your product, workflow, or automation challenge and we will respond within 24 hours."
      />

      <section className="py-28 bg-[#05080f]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          
          <div className="mb-16 pb-12 border-b border-white/6 flex flex-col sm:flex-row gap-8 justify-between">
            <div>
              <p className="font-sans text-xs font-semibold tracking-[0.2em] text-white/30 uppercase mb-2">Direct</p>
              <Link href="mailto:hello@coders4coders.ai" className="text-lg text-white hover:text-white/70 transition-colors flex items-center gap-2">
                <Mail className="w-4 h-4 text-white/40" />
                hello@coders4coders.ai
              </Link>
            </div>
            <div>
              <p className="font-sans text-xs font-semibold tracking-[0.2em] text-white/30 uppercase mb-2">Phone</p>
              <Link href="tel:+15550142026" className="text-lg text-white hover:text-white/70 transition-colors flex items-center gap-2">
                <Phone className="w-4 h-4 text-white/40" />
                +1 (555) 014-2026
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-display font-semibold text-white mb-8">Project Inquiry</h2>
            <ContactForm />
          </div>

        </div>
      </section>
    </SiteShell>
  )
}
