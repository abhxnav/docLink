import { Copyright, PasskeyModal, PatientForm, Logo } from '@/components'

const Home = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === 'true'

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[800px]">
          <Logo full className="mb-12 h-14 w-fit" />

          <PatientForm />

          <Copyright adminBtn />
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

export default Home
