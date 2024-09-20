'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormFieldType } from '@/components/forms/PatientForm'
import { CustomFormField, SubmitButton } from '@/components'
import { SelectItem, Form } from '@/components/ui'
import { Doctors } from '@/constants'
import Image from 'next/image'
import {
  createAppointment,
  updateAppointment,
} from '@/lib/appwrite/appointment.actions'
import { getAppointmentSchema } from '@/lib/validations'
import { z } from 'zod'
import { Appointment } from '@/types/appwrite.types'

interface CustomProps {
  type: 'create' | 'cancel' | 'schedule'
  userId: string
  patientId: string
  appointment?: Appointment
  setOpen?: (open: boolean) => void
}

const AppointmentForm = ({
  type,
  userId,
  patientId,
  appointment,
  setOpen,
}: CustomProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const AppointmentFormValidation = getAppointmentSchema(type)

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment?.primaryPhysician : '',
      schedule: appointment
        ? new Date(appointment?.schedule)
        : new Date(Date.now()),
      appointmentReason: appointment?.appointmentReason || '',
      note: appointment?.note || '',
      cancellationReason: appointment?.cancellationReason || '',
    },
  })

  const onSubmit: SubmitHandler<
    z.infer<typeof AppointmentFormValidation>
  > = async (values) => {
    setIsLoading(true)

    let status
    switch (type) {
      case 'schedule':
        status = 'scheduled'
        break
      case 'cancel':
        status = 'cancelled'
        break
      default:
        status = 'pending'
        break
    }

    try {
      if (type === 'create' && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          appointmentReason: values.appointmentReason!,
          note: values.note,
          status: status as Status,
        }

        const appointment = await createAppointment(appointmentData)

        if (appointment) {
          form.reset()
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
          )
        }
      } else {
        if (appointment) {
          const appointmentToUpdate = {
            userId,
            appointmentId: appointment.$id!,
            appointment: {
              primaryPhysician: values?.primaryPhysician,
              schedule: new Date(values?.schedule),
              status: status as Status,
              cancellationReason: values?.cancellationReason,
            },
            type,
          }

          const updatedAppointment = await updateAppointment(
            appointmentToUpdate
          )

          if (updatedAppointment) {
            setOpen && setOpen(false)
            form.reset()
          }
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {type === 'create' && (
          <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">Request an appointment.</p>
          </section>
        )}

        {type !== 'cancel' && (
          <>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a doctor"
            >
              {Doctors?.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt={doctor.name}
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.DATE_PICKER}
              name="schedule"
              label="Expected appointment date"
              showTimeSelect
              dateFormat="dd/MM/yyyy - h:mm aa"
            />

            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                name="appointmentReason"
                label="Reason for appointment"
                placeholder="Enter reason for appointment"
              />
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                name="note"
                label="Notes"
                placeholder="Enter notes"
              />
            </div>
          </>
        )}

        {type === 'cancel' && (
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Enter reason for cancellation"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`w-full ${
            type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'
          }`}
        >
          {type === 'cancel'
            ? 'Request Cancellation'
            : type === 'create'
            ? 'Create Appointment'
            : 'Schedule Appointment'}
        </SubmitButton>
      </form>
    </Form>
  )
}

export default AppointmentForm
