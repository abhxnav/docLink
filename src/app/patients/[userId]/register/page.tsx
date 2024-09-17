import Image from 'next/image'
import Logo from '@/../public/assets/logos/Logo_1.png'
import { Copyright, RegisterForm } from '@/components'
import { getUser } from '@/lib/appwrite/patient.actions'

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId)

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[800px]">
          <Image
            src={Logo}
            alt="logo"
            height={1000}
            width={1000}
            className="mb-12 h-14 w-fit"
          />

          <RegisterForm user={user} />

          <Copyright />
        </div>
      </section>

      {/* <Image
        src={''}
        alt="doctor"
        height={1000}
        width={1000}
        className="side-img max-w-[50%]"
      /> */}
    </div>
  )
}

export default Register
