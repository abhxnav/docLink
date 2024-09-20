import { AppointmentForm, Copyright, Logo } from '@/components'
import { getPatient } from '@/lib/appwrite/patient.actions'

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId)

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[900px] flex-1 justify-between">
          <Logo full className="mb-12 h-14 w-fit" />

          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient?.$id || ''}
          />

          <Copyright />
        </div>
      </section>
    </div>
  )
}

export default NewAppointment
