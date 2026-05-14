import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../common/Sidebar'
import Header from '../common/Header'

const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100">
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      <Sidebar
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
      />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header onMobileMenuOpen={() => setIsMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
