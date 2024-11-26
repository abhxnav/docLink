import { ReactNode, Suspense } from 'react'
import { Navbar } from '@/components'
import { getPatient } from '@/lib/appwrite/patient.actions'
import Loading from '@/app/loading'

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
    <Suspense fallback={<Loading />}>
      <Navbar patient={patient} />
      <main>{children}</main>
    </Suspense>
  )
}

export default PatientLayout
