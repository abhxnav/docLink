import { cookies } from 'next/headers'
import {
  Client,
  Account,
  Databases,
  Storage,
  Messaging,
  Users,
} from 'node-appwrite'

export const appwriteEnv = {
  PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
  API_KEY: process.env.NEXT_PUBLIC_API_KEY,
  DB_ID: process.env.NEXT_PUBLIC_DB_ID,
  PATIENT_COLLECTION_ID: process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID: process.env.NEXT_PUBLIC_DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID: process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID,
  BUCKET_ID: process.env.NEXT_PUBLIC_BUCKET_ID,
  ENDPOINT: process.env.NEXT_PUBLIC_ENDPOINT,
}

const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteEnv.ENDPOINT!)
    .setProject(appwriteEnv.PROJECT_ID!)
    .setKey(appwriteEnv.API_KEY!)

  return {
    get account() {
      return new Account(client)
    },
    get users() {
      return new Users(client)
    },
  }
}

const createSessionClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteEnv.ENDPOINT!)
    .setProject(appwriteEnv.PROJECT_ID!)

  const session = cookies().get('session')
  if (!session || !session.value) {
    throw new Error('No session')
  }

  client.setSession(session.value)

  return {
    get account() {
      return new Account(client)
    },
    get databases() {
      return new Databases(client)
    },
    get storage() {
      return new Storage(client)
    },
    get messaging() {
      return new Messaging(client)
    },
  }
}

export { createAdminClient, createSessionClient }
