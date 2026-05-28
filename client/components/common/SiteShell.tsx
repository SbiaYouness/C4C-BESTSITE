import clsx from 'clsx'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'

type SiteShellProps = {
  children: React.ReactNode
  className?: string
}

export default function SiteShell({ children, className }: SiteShellProps) {
  return (
    <div className="min-h-screen text-white">
      <SiteHeader />
      <main className={clsx('pt-24', className)}>{children}</main>
      <SiteFooter />
    </div>
  )
}
