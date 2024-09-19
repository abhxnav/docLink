'use server'

import { ID, Query } from 'node-appwrite'
import { appwriteEnv, databases } from './appwrite.config'
import { parseStringify } from '../utils'
import { Appointment } from '@/types/appwrite.types'
import { revalidatePath } from 'next/cache'

export const createAppointment = async (
  appointmentData: CreateAppointmentParams
) => {
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

    // TODO: SMS notification

    revalidatePath('/admin')
    return parseStringify(updatedAppointment)
  } catch (error) {
    console.error(error)
  }
}

export const getAppointment = async (appointmentId: string) => {
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
      documents: appointments.documents,
    }

    return parseStringify(data)
  } catch (error) {
    console.error(error)
  }
}
