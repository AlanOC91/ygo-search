import './globals.css'

function Footer() {
    return (
        <footer>
            <p className="footer-text mutedText">Created by <a href="https://ygoprodeck.com/">YGOPRODeck</a> ❤️ <a href="https://github.com/AlanOC91/ygo-search">Github</a></p>
        </footer>
    )
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
      <div id="page-container">
          {children}
          <Footer />
      </div>
      </body>
    </html>
  )
}
