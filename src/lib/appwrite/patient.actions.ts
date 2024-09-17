'use server'

import { ID, Query } from 'node-appwrite'
import { InputFile } from 'node-appwrite/file'
import {
  appwriteEnv,
  databases,
  storage,
  users,
} from '@/lib/appwrite/appwrite.config'
import { parseStringify } from '@/lib/utils'

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    )
    return parseStringify(newUser)
  } catch (error: any) {
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal('email', [user?.email])])
      return documents?.users[0]
    }
    console.error(error)
  }
}

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId)
    return parseStringify(user)
  } catch (error) {
    console.error(error)
  }
}

export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      appwriteEnv.DB_ID!,
      appwriteEnv.PATIENT_COLLECTION_ID!,
      [Query.equal('userId', [userId])]
    )
    return parseStringify(patients.documents[0])
  } catch (error) {
    console.error(error)
  }
}

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file

    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get('blobFile') as Blob,
        identificationDocument?.get('fileName') as string
      )

      file = await storage.createFile(
        appwriteEnv.BUCKET_ID!,
        ID.unique(),
        inputFile
      )
    }

    const newPatient = await databases.createDocument(
      appwriteEnv.DB_ID!,
      appwriteEnv.PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        ...patient,
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${appwriteEnv.ENDPOINT}/storage/buckets/${appwriteEnv.BUCKET_ID}/files/${file?.$id}/view?project=${appwriteEnv.PROJECT_ID}`,
      }
    )

    return parseStringify(newPatient)
  } catch (error) {
    console.error(error)
  }
}
