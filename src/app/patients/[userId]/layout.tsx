import { ReactNode } from 'react'
import { Navbar } from '@/components'
import { getPatient } from '@/lib/appwrite/patient.actions'

const PatientLayout = async ({
  children,
  params,
}: {
  children: ReactNode
  params: { [key: string]: string }
}) => {
  const { userId } = params
  const patient = await getPatient(userId)

  return (
    <div>
      <Navbar patient={patient} />
      <main>{children}</main>
    </div>
  )
}

export default PatientLayout
