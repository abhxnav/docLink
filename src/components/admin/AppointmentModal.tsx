'use client'

import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui'
import { AppointmentForm } from '@/components'
import { Appointment } from '@/types/appwrite.types'

const AppointmentModal = ({
  type,
  patientId,
  userId,
  appointment,
  disabled = false,
}: {
  type: 'schedule' | 'cancel'
  patientId: string
  userId: string
  appointment?: Appointment
  disabled?: boolean
}) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`capitalize ${
            type === 'schedule' ? 'text-appointment' : 'text-cancelled'
          }`}
          disabled={disabled}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">{type} Appointment</DialogTitle>
          <DialogDescription>
            Please fill in the following details to {type} an appointment.
          </DialogDescription>
        </DialogHeader>
        <AppointmentForm
          patientId={patientId}
          userId={userId}
          type={type}
          appointment={appointment}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  )
}

export default AppointmentModal
