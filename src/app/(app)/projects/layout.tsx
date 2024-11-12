import RootLayout from '../../(app)/layout'

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
