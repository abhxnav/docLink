import clsx from 'clsx'
import { LuCalendarCheck2, LuHourglass, LuXOctagon } from 'react-icons/lu'

const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={clsx('status-badge', {
        'bg-appointment': status === 'scheduled',
        'bg-pending': status === 'pending',
        'bg-cancelled': status === 'cancelled',
      })}
    >
      {status === 'scheduled' ? (
        <LuCalendarCheck2 />
      ) : status === 'pending' ? (
        <LuHourglass />
      ) : (
        <LuXOctagon />
      )}
      <p
        className={clsx('text-12-semibold capitalize', {
          'text-appointment': status === 'scheduled',
          'text-pending': status === 'pending',
          'text-cancelled': status === 'cancelled',
        })}
      >
        {status}
      </p>
    </div>
  )
}

export default StatusBadge
