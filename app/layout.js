import './globals.css'

export const metadata = {
  title: 'Pipeline — see which internship applications are still alive',
  description:
    'Pipeline helps third-year students see which internship applications are still alive, so none of them quietly dies.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
