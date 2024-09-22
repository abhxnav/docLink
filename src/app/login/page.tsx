import { Copyright, PasskeyModal, Logo, LoginForm } from '@/components'

const Login = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === 'true'

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[400px]">
          <Logo full className="mb-12 h-14 w-fit" />

          <LoginForm />

          <Copyright adminBtn />
        </div>
      </section>
    </div>
  )
}

export default Login
