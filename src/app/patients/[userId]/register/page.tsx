import { Copyright, Logo, RegisterForm } from '@/components'
import { getUser } from '@/lib/appwrite/patient.actions'

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId)

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[800px]">
          <Logo full className="mb-12 h-14 w-fit" />

          <RegisterForm user={user as User} />

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
