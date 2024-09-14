import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Loader from '@/../../public/assets/icons/loader.svg'
import type { SVGProps } from 'react'

interface CustomProps {
  isLoading?: boolean
  className?: string
  children: React.ReactNode
}

const SubmitButton = ({ isLoading, className, children }: CustomProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? 'shad-primary-btn w-full'}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src={Loader}
            alt="loader"
            width={24}
            height={24}
            className="animate-spin"
          />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  )
}

export default SubmitButton
