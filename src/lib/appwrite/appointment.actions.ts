'use server'

import { ID } from 'node-appwrite'
import { appwriteEnv, databases } from './appwrite.config'
import { parseStringify } from '../utils'

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
