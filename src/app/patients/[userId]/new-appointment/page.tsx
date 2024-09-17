import Image from 'next/image'
import Logo from '@/../public/assets/logos/Logo_1.png'
import { AppointmentForm, Copyright } from '@/components'
import { getPatient } from '@/lib/appwrite/patient.actions'

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId)

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[900px] flex-1 justify-between">
          <Image
            src={Logo}
            alt="logo"
            height={1000}
            width={1000}
            className="mb-12 h-14 w-fit"
          />

          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient?.$id}
          />

          <Copyright />
        </div>
      </section>
    </div>
  )
}

export default NewAppointment
