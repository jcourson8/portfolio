import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-background py-6 border-t border-border">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} James Courson. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer