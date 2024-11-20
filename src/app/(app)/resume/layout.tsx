import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Software Engineer with expertise in AI, cybersecurity, and full-stack development. M.S.E. in Cybersecurity Engineering and B.S.E. in Computer Science from Auburn University.',
  openGraph: {
    title: 'James Courson | Resume',
    description: 'Software Engineer specializing in AI, cybersecurity, and full-stack development',
    type: 'profile',
    images: [
      {
        url: '/resume-og.png',
        width: 2324,
        height: 1602,
        alt: 'James Courson - Software Engineer',
      },
    ],
  },
  alternates: {
    canonical: 'https://james-courson.vercel.app/resume',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-video-preview': -1,
    'max-snippet': -1,
  },
  other: {
    'application-name': 'James Courson Portfolio',
    'og:type': 'profile',
    'profile:first_name': 'James',
    'profile:last_name': 'Courson',
    'profile:username': 'jcourson8',
  },
}

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 
