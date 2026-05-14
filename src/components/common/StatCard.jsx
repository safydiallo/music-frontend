const StatCard = ({ title, value, change, icon: Icon, color }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {change && (
            <p className={`text-xs mt-2 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? `+${change}%` : `${change}%`} depuis hier
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`w-5 h-5 text-${color}-600`} />
        </div>
      </div>
    </div>
  )
}

export default StatCard