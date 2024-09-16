import * as sdk from 'node-appwrite'

const client = new sdk.Client()

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

client
  .setEndpoint(appwriteEnv.ENDPOINT!)
  .setProject(appwriteEnv.PROJECT_ID!)
  .setKey(appwriteEnv.API_KEY!)

export const databases = new sdk.Databases(client)
export const storage = new sdk.Storage(client)
export const messaging = new sdk.Messaging(client)
export const users = new sdk.Users(client)
