import { Headphones, DollarSign, Users, Music2 } from 'lucide-react'
import StatCard from '../components/common/StatCard'
import { useAuth } from '../contexts/AuthContext'

const Dashboard = () => {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Bienvenue, {user?.fullName}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Streams Totaux" value="—" icon={Headphones} color="forest" />
        <StatCard title="Revenus" value="—" icon={DollarSign} color="golden" />
        <StatCard title="Nouveaux Auditeurs" value="—" icon={Users} color="blue" />
        <StatCard title="Albums Ajoutés" value="—" icon={Music2} color="orange" />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-12 flex flex-col items-center justify-center text-center gap-4">
        <div className="w-16 h-16 bg-golden-50 rounded-full flex items-center justify-center">
          <Music2 className="w-8 h-8 text-golden-400" />
        </div>
        <div>
          <p className="text-lg font-medium text-gray-700">Aucune donnée disponible</p>
          <p className="text-sm text-gray-400 mt-1">
            Vos statistiques apparaîtront ici une fois des contenus publiés.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
