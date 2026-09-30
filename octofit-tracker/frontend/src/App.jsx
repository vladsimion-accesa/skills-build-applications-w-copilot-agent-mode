import { Link, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <main className="container py-5">
      <header className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-5">
        <Link className="h4 mb-0 text-decoration-none text-dark" to="/">
          OctoFit Tracker
        </Link>
        <span className="text-secondary">Fitness, together.</span>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <section>
              <h1 className="display-5 fw-semibold">Your progress starts here.</h1>
              <p className="lead text-secondary">
                Track activity, join a team, and keep moving.
              </p>
            </section>
          }
        />
        <Route path="*" element={<h1 className="h3">Page not found</h1>} />
      </Routes>
    </main>
  )
}

export default App
