import { NextRequest, NextResponse } from 'next/server'
import { getLoggedInUser, getPatient } from './lib/appwrite/patient.actions'

export const middleware = async (req: NextRequest) => {
  const path = req.nextUrl.pathname
  const isPublicPath = path === '/login' || path === '/signup' || path === '/'

  const user = await getLoggedInUser()
  const patient = await getPatient(user?.targets[0]?.userId!)

  if (isPublicPath && user) {
    if (patient) {
      return NextResponse.redirect(
        new URL(`/patients/${patient?.userId}/new-appointment`, req.nextUrl)
      )
    } else {
      return NextResponse.redirect(
        new URL(`/patients/${user?.targets[0]?.userId}/register`, req.nextUrl)
      )
    }
  }

  if (!isPublicPath && !user) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/patients', '/patients/:path*', '/login', '/signup', '/'],
}
