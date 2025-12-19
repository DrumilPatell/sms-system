import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { 
  GraduationCap, Users, BookOpen, UserCheck, 
  ClipboardList, Award, LayoutDashboard, LogOut, Menu, X 
} from 'lucide-react'
import { useState } from 'react'

export default function DashboardLayout() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'faculty', 'student'] },
    { name: 'Users', href: '/users', icon: Users, roles: ['admin'] },
    { name: 'Students', href: '/students', icon: UserCheck, roles: ['admin', 'faculty'] },
    { name: 'Courses', href: '/courses', icon: BookOpen, roles: ['admin', 'faculty', 'student'] },
    { name: 'Enrollments', href: '/enrollments', icon: ClipboardList, roles: ['admin'] },
    { name: 'Attendance', href: '/attendance', icon: ClipboardList, roles: ['admin', 'faculty'] },
    { name: 'Grades', href: '/grades', icon: Award, roles: ['admin', 'faculty', 'student'] },
  ]

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(user?.role)
  )

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-slate-200
        transform transition-transform duration-200 ease-in-out lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-200">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-600 rounded-xl">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900">SMS</h1>
              <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {filteredNavigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`
                        flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                        transition-colors
                        ${isActive 
                          ? 'bg-primary-50 text-primary-700' 
                          : 'text-slate-700 hover:bg-slate-50'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* User info & logout */}
          <div className="p-4 border-t border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary-700">
                  {user?.full_name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">
                  {user?.full_name}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            
            <div className="flex-1 lg:flex-none">
              <h2 className="text-lg font-semibold text-slate-900">
                {navigation.find(item => item.href === location.pathname)?.name || 'Dashboard'}
              </h2>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
