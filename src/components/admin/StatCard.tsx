import clsx from 'clsx'

interface StatCardProps {
  count?: number
  type: 'appointments' | 'pending' | 'cancelled'
  label: string
  icon?: React.ReactNode
}

const StatCard = ({ count = 0, type, label, icon }: StatCardProps) => {
  return (
    <div
      className={clsx('stat-card', {
        'bg-appointment': type === 'appointments',
        'bg-pending': type === 'pending',
        'bg-cancelled': type === 'cancelled',
      })}
    >
      <div className="flex items-center gap-4">
        {icon}
        <h2 className="text-32-bold text-white">{count}</h2>
      </div>
      <p className="text-14-regular">{label}</p>
    </div>
  )
}

export default StatCard
