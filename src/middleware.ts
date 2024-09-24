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
      const patient = await getPatient(user?.targets[0]?.userId!)

      if (
        isPublicPath ||
        path.includes('/register') ||
        path.includes('/new-appointment')
      ) {
        if (patient) {
          if (
            path !== `/patients/${user?.targets[0]?.userId}/new-appointment`
          ) {
            return NextResponse.redirect(
              new URL(
                `/patients/${user?.targets[0]?.userId}/new-appointment`,
                req.nextUrl
              )
            )
          }
        } else {
          if (path !== `/patients/${user?.targets[0]?.userId}/register`) {
            return NextResponse.redirect(
              new URL(
                `/patients/${user?.targets[0]?.userId}/register`,
                req.nextUrl
              )
            )
          }
        }
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
