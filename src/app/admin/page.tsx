import { columns, DataTable, Logo, StatCard } from '@/components'
import { getAppointmentList } from '@/lib/appwrite/appointment.actions'
import { Appointment } from '@/types/appwrite.types'
import Link from 'next/link'
import { LuCalendarCheck2, LuHourglass, LuXOctagon } from 'react-icons/lu'

interface AppointmentsList {
  totalCount: number
  scheduledCount: number
  pendingCount: number
  cancelledCount: number
  documents: Appointment[]
}

const Admin = async () => {
  const appointments: AppointmentsList = await getAppointmentList()

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Logo full className="h-10 w-fit" />
        </Link>
        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome, Admin</h1>
          <p className="text-dark-700">Manage appointments here.</p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Scheduled Appointments"
            icon={<LuCalendarCheck2 className="h-6 w-fit text-pink-500" />}
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pending Appointments"
            icon={<LuHourglass className="h-6 w-fit text-yellow-400" />}
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Cancelled Appointments"
            icon={<LuXOctagon className="h-6 w-fit text-red-500" />}
          />
        </section>

        <DataTable columns={columns} data={appointments.documents} />
      </main>
    </div>
  )
}

export default Admin
