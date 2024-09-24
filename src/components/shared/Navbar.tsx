'use client'

import { Logo } from '@/components'
import { signOut } from '@/lib/appwrite/patient.actions'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui'
import Link from 'next/link'
import { LuUserCircle2 } from 'react-icons/lu'
import { BiLogOut, BiUser } from 'react-icons/bi'

const Navbar = ({ patient }: any) => {
  return (
    <nav className="fixed flex items-center justify-center top-7 z-50 w-full">
      <div className="flex items-center justify-between py-4 px-8 w-[95%] xl:w-[900px] bg-appointment backdrop-blur-sm shadow-lg rounded-full">
        <Link href="/">
          <Logo full className="h-10 w-fit" />
        </Link>

        <ul className="hidden md:flex space-x-6">
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex items-center gap-2 text-white hover:text-pink-400">
                  <div className="font-semibold">{patient?.name}</div>
                  <LuUserCircle2 className="w-8 h-8" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem disabled>
                  <div className="flex items-center gap-3">
                    <BiUser className="w-4 h-4" />
                    <p>Profile</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  <div className="flex items-center gap-3">
                    <BiLogOut className="w-4 h-4" />
                    <p>Logout</p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>

        <button className="md:hidden text-gray-700 hover:text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
