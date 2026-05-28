import SiteShell from '../../../components/common/SiteShell'
import PageHero from '../../../components/common/PageHero'

export default function TermsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description="These placeholder terms outline the relationship between Coders4Coders and its users."
      />

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-dark-200">
          <p>
            This placeholder terms page will be replaced with formal service terms, including usage, liability, and
            payment guidelines.
          </p>
          <p>
            If you have questions, contact us and we will provide the latest policy details.
          </p>
        </div>
      </section>
    </SiteShell>
  )
}
