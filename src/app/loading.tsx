import Image from 'next/image'
import Loader from '@/../../public/assets/icons/global-loader.svg'

const Loading = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Image
        src={Loader}
        alt="loader"
        width={1000}
        height={1000}
        className="animate-spin w-[20%] h-[20%]"
      />
    </div>
  )
}

export default Loading
