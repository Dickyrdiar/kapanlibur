const Footer = () => {
  return (
    <footer className="flex justify-center item-center mb-8 pb-8">
      <typography color="gray">
        <p>Copyright © {new Date().getFullYear()} - <a href="https://github.com/Dickyrdiar/kapanlibur" className="no-underline hover:no-underline">GitHub</a> and API from <a href="https://api-harilibur.vercel.app/" className="no-underline hover:no-underline">api harilibur</a></p>
      </typography>
    </footer>
  )
}

export default Footer