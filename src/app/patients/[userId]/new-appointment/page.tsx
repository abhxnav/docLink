import { AppointmentForm, Copyright } from '@/components'
import { getPatient } from '@/lib/appwrite/patient.actions'

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId)

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[800px] flex-1 justify-between">
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
