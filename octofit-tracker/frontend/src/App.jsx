import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { label: 'Members', path: '/users', marker: '01' },
  { label: 'Activities', path: '/activities', marker: '02' },
  { label: 'Teams', path: '/teams', marker: '03' },
  { label: 'Leaderboard', path: '/leaderboard', marker: '04' },
  { label: 'Workouts', path: '/workouts', marker: '05' },
]

function App() {
  return (
    <div className="tracker-shell">
      <aside className="tracker-sidebar">
        <NavLink className="brand-lockup" to="/users" aria-label="OctoFit Tracker home">
          <img src="/octofitapp-small.png" alt="" />
          <span>
            <strong>OctoFit</strong>
            <small>TRACKER</small>
          </span>
        </NavLink>

        <div className="sidebar-caption">TRAINING CLUB</div>
        <nav className="sidebar-navigation" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink
              className={({ isActive }) =>
                `sidebar-link${isActive ? ' is-active' : ''}`
              }
              key={item.path}
              to={item.path}
            >
              <span className="nav-marker">{item.marker}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span className="sidebar-footer-mark" aria-hidden="true">O</span>
          <span>OCTOFIT / CLUB</span>
        </div>
      </aside>

      <main className="tracker-main">
        <header className="topbar">
          <span className="topbar-kicker">OCTOFIT MEMBER SERVICES</span>
        </header>
        <div className="page-container">
          <Routes>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/users" element={<Users />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Navigate to="/users" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default App
