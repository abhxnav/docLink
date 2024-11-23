import { NextRequest, NextResponse } from 'next/server'
import { getLoggedInUser, getPatient } from './lib/appwrite/patient.actions'

export const middleware = async (req: NextRequest) => {
  const path = req.nextUrl.pathname
  const isPublicPath = ['/login', '/signup', '/'].includes(path)

  try {
    const user = await getLoggedInUser()

    if (!user && !isPublicPath) {
      return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    if (user) {
      const userId = user?.targets[0]?.userId!
      const patient = await getPatient(userId)
      const isRegisterPath = path.includes('/register')
      const isNewAppointmentPath = path.startsWith(
        `/patients/${userId}/new-appointment`
      )

      if (!patient && !isRegisterPath) {
        return NextResponse.redirect(
          new URL(`/patients/${userId}/register`, req.nextUrl)
        )
      }

      if (
        patient &&
        isNewAppointmentPath &&
        path !== `/patients/${userId}/new-appointment`
      ) {
        return NextResponse.next()
      }
    }
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/patients/:path*', '/login', '/signup', '/'],
}

/*
path = public
1. user logged in -> okay
2. user not logged in -> redirect to login

path = register 
1. user logged in ->
    i. patient registered -> redirect to new-appointment
    ii. patient not registered -> redirect to register
2. user not logged in -> redirect to login

*/
