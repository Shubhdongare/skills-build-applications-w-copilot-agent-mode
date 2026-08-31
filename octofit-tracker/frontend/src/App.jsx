import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function App() {
  return (
    <>
      <div className="app-shell">
        <header className="topbar">
          <NavLink className="brand" to="/activities"><span className="brand-mark">O</span><span>OctoFit</span></NavLink>
          <span className="status-dot">Tracker online</span>
        </header>
        <div className="app-layout">
          <aside className="sidebar" aria-label="Primary navigation">
            <p className="nav-label">Workspace</p>
            <NavItem to="/activities" label="Activities" icon="↗" />
            <NavItem to="/workouts" label="Workouts" icon="◒" />
            <NavItem to="/leaderboard" label="Leaderboard" icon="#" />
            <NavItem to="/teams" label="Teams" icon="◎" />
            <NavItem to="/users" label="Members" icon="○" />
          </aside>
          <main className="main-content">
            <Routes>
              <Route path="/activities" element={<Activities />} />
              <Route path="/workouts" element={<Workouts />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/users" element={<Users />} />
              <Route path="*" element={<Navigate to="/activities" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
    )
}

function NavItem({ to, label, icon }) {
  return <NavLink className="nav-item" to={to}><span className="nav-icon">{icon}</span>{label}</NavLink>
}

export default App
