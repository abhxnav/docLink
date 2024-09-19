'use client'

import { Appointment } from '@/types/appwrite.types'
import { ColumnDef } from '@tanstack/react-table'
import { AppointmentModal, StatusBadge } from '@/components'
import { formatDateTime } from '@/lib/utils'
import { Doctors } from '@/constants'
import Image from 'next/image'

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: 'ID',
    header: () => <p className="text-center">ID</p>,
    cell: ({ row }) => (
      <p className="text-14-medium text-center justify-center items-center">
        {row.index + 1}
      </p>
    ),
  },
  {
    accessorKey: 'patient',
    header: () => <p className="text-center">Patient</p>,
    cell: ({ row }) => (
      <p className="text-14-medium text-center">{row.original.patient.name}</p>
    ),
  },
  {
    accessorKey: 'status',
    header: () => <p className="text-center">Status</p>,
    cell: ({ row }) => (
      <div className="min-w-[115px] flex justify-center items-center">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: 'schedule',
    header: () => <p className="text-center">Appointment</p>,
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px] text-center">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: 'primaryPhysician',
    header: () => <p className="text-center">Doctor</p>,
    cell: ({ row }) => {
      const doctor = Doctors.find(
        (doc) => doc.name === row.original.primaryPhysician
      )

      return (
        <div className="flex items-center gap-3 justify-start">
          <Image
            src={doctor?.image!}
            alt={doctor?.name!}
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
        </div>
      )
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex justify-center">
          <AppointmentModal
            type="schedule"
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
            disabled={data.status === 'scheduled'}
          />
          <AppointmentModal
            type="cancel"
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
            disabled={data.status === 'cancelled'}
          />
        </div>
      )
    },
  },
]
