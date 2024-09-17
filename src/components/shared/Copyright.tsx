import Link from 'next/link'

const Copyright = ({ adminBtn = false }: { adminBtn?: boolean }) => {
  return (
    <div className="text-14-regular mt-20 flex justify-between">
      <p className="justify-items-end text-dark-600 xl:text-left">
        &copy; 2024 DocLink
      </p>
      {adminBtn && (
        <Link href={'/?admin=true'} className="text-pink-400">
          Admin
        </Link>
      )}
    </div>
  )
}

export default Copyright
