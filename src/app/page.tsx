import { Logo } from '@/components'
import { Button } from '@/components/ui'
import Link from 'next/link'

const Home = () => {
  return (
    <div className="flex flex-col gap-10 items-center justify-center min-h-screen">
      <Logo full />
      <div className="flex gap-2">
        <Link href="/signup">
          <Button variant="outline" className="text-pink-500">
            Get Started
          </Button>
        </Link>
        <Link href="/login">
          <Button className="shad-primary-btn">Login</Button>
        </Link>
      </div>
    </div>
  )
}

export default Home
