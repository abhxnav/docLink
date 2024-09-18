import Image from 'next/image'
import Link from 'next/link'
import SuccessGIF from '@/../public/assets/gifs/success.gif'
import { getAppointment } from '@/lib/appwrite/appointment.actions'
import { Doctors } from '@/constants'
import { CiCalendar } from 'react-icons/ci'
import { formatDateTime } from '@/lib/utils'
import { Button } from '@/components/ui'
import { Copyright, Logo } from '@/components'

const AppointmentSuccess = async ({
  params: { userId },
  searchParams,
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || ''
  const appointment = await getAppointment(appointmentId)
  const doctor = Doctors.find((doc) => doc.name == appointment.primaryPhysician)

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Logo full className="h-10 w-fit" />
        </Link>

        <section className="flex flex-col items-center">
          <Image src={SuccessGIF} height={250} width={250} alt="success" />
          <h2 className="header mb-4 max-w-[600px] text-center">
            Your <span className="text-pink-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>
            We'll send you a confirmation{' '}
            <span className="text-pink-500">sms</span> and{' '}
            <span className="text-pink-500">email</span> shortly.
          </p>
        </section>

        <section className="request-details">
          <p>Requested appointment details:</p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image!}
              alt={doctor?.name!}
              width={100}
              height={100}
              className="h-10 w-fit"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <CiCalendar className="h-8 w-fit" />
            <p>{formatDateTime(appointment?.schedule).dateTime}</p>
          </div>
        </section>

        <Button className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>

        <Copyright />
      </div>
    </div>
  )
}

export default AppointmentSuccess
