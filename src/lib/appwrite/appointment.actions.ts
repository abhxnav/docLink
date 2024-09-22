'use server'

import { ID, Query } from 'node-appwrite'
import {
  appwriteEnv,
  createAdminClient,
  createSessionClient,
} from './appwrite.config'
import { formatDateTime, parseStringify } from '../utils'
import { Appointment } from '@/types/appwrite.types'
import { revalidatePath } from 'next/cache'

export const createAppointment = async (
  appointmentData: CreateAppointmentParams
) => {
  const { databases } = await createSessionClient()

  try {
    const newAppointment = await databases.createDocument(
      appwriteEnv.DB_ID!,
      appwriteEnv.APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointmentData
    )
    return parseStringify(newAppointment)
  } catch (error) {
    console.error(error)
  }
}

export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  const { databases } = await createSessionClient()

  try {
    const updatedAppointment = await databases.updateDocument(
      appwriteEnv.DB_ID!,
      appwriteEnv.APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    )

    if (!updateAppointment) {
      throw new Error('Appointment not found')
    }

    const message = `
    Hi! It's DocLink.
    ${
      type === 'schedule'
        ? `Your appointment with Dr. ${
            appointment.primaryPhysician
          } has been scheduled for ${
            formatDateTime(appointment.schedule).dateTime
          }.
          ${appointment.note && `Note: ${appointment?.note}`}
          `
        : `We regret to inform you that your appointment has been cancelled due to the following reason: 
        ${appointment.cancellationReason}
        `
    }
    `

    await sendSMSNotification(userId, message)

    revalidatePath('/admin')
    return parseStringify(updatedAppointment)
  } catch (error) {
    console.error(error)
  }
}

export const getAppointment = async (appointmentId: string) => {
  const { databases } = await createSessionClient()

  try {
    const appointment = await databases.getDocument(
      appwriteEnv.DB_ID!,
      appwriteEnv.APPOINTMENT_COLLECTION_ID!,
      appointmentId
    )
    return parseStringify(appointment)
  } catch (error) {
    console.error(error)
  }
}

export const getAppointmentList = async () => {
  const { databases } = await createSessionClient()

  try {
    const appointments = await databases.listDocuments(
      appwriteEnv.DB_ID!,
      appwriteEnv.APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc('$createdAt')]
    )

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    }

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        if (appointment.status === 'scheduled') {
          acc.scheduledCount += 1
        } else if (appointment.status === 'pending') {
          acc.pendingCount += 1
        } else if (appointment.status === 'cancelled') {
          acc.cancelledCount += 1
        }
        return acc
      },
      initialCounts
    )

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents as Appointment[],
    }

    return parseStringify(data)
  } catch (error) {
    console.error(error)
    return {
      totalCount: 0,
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
      documents: [],
    }
  }
}

export const sendSMSNotification = async (userId: string, content: string) => {
  const { messaging } = await createSessionClient()

  try {
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    )

    return parseStringify(message)
  } catch (error) {
    console.error(error)
  }
}
