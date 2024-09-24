'use server'

import { ID, Query } from 'node-appwrite'
import { InputFile } from 'node-appwrite/file'
import {
  appwriteEnv,
  createAdminClient,
  createSessionClient,
} from '@/lib/appwrite/appwrite.config'
import { isAppwriteError, parseStringify } from '@/lib/utils'
import bcryptjs from 'bcryptjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const createUser = async (user: CreateUserParams) => {
  const { users, account } = await createAdminClient()
  const { name, email, password } = user

  try {
    const newUser = await account.create(ID.unique(), email, password, name)
    return parseStringify(newUser)
  } catch (error: any) {
    console.error(error)
  }
}

export const login = async (user: any) => {
  const { email, password } = user
  const { account } = await createAdminClient()

  try {
    const session = await account.createEmailPasswordSession(email, password)
    cookies().set('session', session.secret, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      expires: new Date(session.expire),
      path: '/',
    })
    return parseStringify(session)
  } catch (error) {
    console.error(error)
  }
}

export const signOut = async () => {
  const { account } = await createSessionClient()

  cookies().delete('session')
  await account.deleteSession('current')

  redirect('/login')
}

export const getLoggedInUser = async () => {
  try {
    const { account } = await createSessionClient()
    return await account.get()
  } catch (error) {
    return null
  }
}

export const getUser = async (userId: string) => {
  const { users } = await createAdminClient()

  try {
    const user = await users.get(userId)
    return parseStringify(user)
  } catch (error) {
    console.error(error)
  }
}

export const getPatient = async (userId: string) => {
  let client
  const user = await getLoggedInUser()

  if (user) {
    client = await createSessionClient()
  } else {
    client = await createAdminClient()
  }

  try {
    const patients = await client.databases.listDocuments(
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
  const { storage, databases } = await createAdminClient()

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
