import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div className="p-1rem bg-yellow">
      <Outlet />
    </div>
  )
}

export default AppLayout
