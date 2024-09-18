import Image from 'next/image'
import FullLogo from '@/../public/assets/logos/Logo_1.png'
import ShortLogo from '@/../public/assets/logos/Logo_2.png'

const Logo = ({
  full = false,
  className,
}: {
  full?: boolean
  className?: string
}) => {
  return (
    <Image
      src={full ? FullLogo : ShortLogo}
      alt="logo"
      height={200}
      width={200}
      className={className}
    />
  )
}

export default Logo
