type SectionProps = {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  enablePadding?: boolean
}

export default function Section({
  children,
  className = '',
  containerClassName = '',
  enablePadding = true,
}: SectionProps) {
  return (
    <section className={`relative z-0 ${className}`}>
      <div
        className={`max-w-7xl mx-auto ${enablePadding ? 'px-4 sm:px-6 lg:px-8' : ''} ${containerClassName}`}
      >
        {children}
      </div>
    </section>
  )
}
