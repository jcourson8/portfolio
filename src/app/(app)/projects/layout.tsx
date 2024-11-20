import RootLayout from '../../(app)/layout'
import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore my portfolio of software engineering projects, featuring AI, cybersecurity, and full-stack development work.',
  openGraph: {
    title: 'Projects | James Courson',
    description: 'Explore my portfolio of software engineering projects, featuring AI, cybersecurity, and full-stack development work.',
  }
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex-grow">{children}</main>
      <footer className="flex justify-center items-center w-full border-t border-border">
        <div className="text-center text-sm text-muted-foreground py-4">
          <p>&copy; {new Date().getFullYear()} James Courson.</p>
        </div>
      </footer>
    </>
  )
}
