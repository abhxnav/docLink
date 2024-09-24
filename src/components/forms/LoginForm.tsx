'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Form } from '@/components/ui'
import { CustomFormField, SubmitButton } from '@/components'
import { CiLock, CiMail } from 'react-icons/ci'
import { useState } from 'react'
import { LoginFormData, LoginFormValidation } from '@/lib/validations'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/appwrite/patient.actions'
import { FormFieldType } from '@/constants'
import Link from 'next/link'

const LoginForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<LoginFormData> = async ({
    email,
    password,
  }) => {
    try {
      setIsLoading(true)
      const userData = { email, password }
      const session = await login(userData)

      if (session) {
        await login({ email, password })
        router.push(`/patients/${session.userId}/new-appointment`)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hey, Welcome!👋</h1>
          <p className="text-dark-700">Schedule your first appointment.</p>
        </section>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email"
          placeholder="johndoe@xmail.com"
          icon={<CiMail className="ml-2 h-6 w-6" />}
          iconAlt=""
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.PASSWORD}
          name="password"
          label="Password"
          placeholder="password"
          icon={<CiLock className="ml-2 h-6 w-6" />}
          iconAlt=""
        />
        <div className="flex flex-col gap-2">
          <SubmitButton isLoading={isLoading}>Login</SubmitButton>
          <p className="text-dark-700 text-center">
            Don't have an account yet?{' '}
            <Link href="/signup" className="text-pink-500 hover:underline">
              Signup now!
            </Link>
          </p>
        </div>
      </form>
    </Form>
  )
}

export default LoginForm
