import Image from 'next/image'
import Logo from '@/../public/assets/logos/Logo_1.png'
import Link from 'next/link'
import { RegisterForm } from '@/components'
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

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              &copy; 2024 DocLink
            </p>
            <Link href={'/?admin=true'} className="text-pink-400">
              Admin
            </Link>
          </div>
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
