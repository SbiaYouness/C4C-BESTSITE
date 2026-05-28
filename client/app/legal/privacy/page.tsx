import SiteShell from '../../../components/common/SiteShell'
import PageHero from '../../../components/common/PageHero'

export default function PrivacyPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="We respect your data. This is a placeholder policy to be customized with your legal counsel."
      />

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-dark-200">
          <p>
            Coders4Coders collects minimal information required to deliver services. We do not sell personal data and we
            protect it with industry-standard security practices.
          </p>
          <p>
            This placeholder will be replaced with a full privacy policy covering data collection, storage, cookies, and
            user rights.
          </p>
        </div>
      </section>
    </SiteShell>
  )
}
