'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Form } from '@/components/ui'
import { CustomFormField, SubmitButton } from '@/components'
import { CiLock, CiMail, CiUser } from 'react-icons/ci'
import { useState } from 'react'
import { UserFormData, UserFormValidation } from '@/lib/validations'
import { useRouter } from 'next/navigation'
import { createUser, login } from '@/lib/appwrite/patient.actions'
import { FormFieldType } from '@/constants'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'

const PatientForm = () => {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<UserFormData>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<UserFormData> = async ({
    name,
    email,
    password,
  }) => {
    try {
      setIsLoading(true)
      const userData = { name, email, password }
      const user = await createUser(userData)

      if (user) {
        await login({ email, password })
        router.push(`/patients/${user.$id}/register`)
      }
    } catch (error) {
      console.error(error)
      toast({
        title: 'User already exists.',
        description: 'Please login or use another email to register.',
        variant: 'destructive',
      })
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
          name="name"
          label="Full name"
          placeholder="John Doe"
          icon={<CiUser className="ml-2 h-6 w-6" />}
          iconAlt=""
        />
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
          <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
          <p className="text-dark-700 text-center">
            Already have an account?{' '}
            <Link href="/login" className="text-pink-500 hover:underline">
              Login!
            </Link>
          </p>
        </div>
      </form>
    </Form>
  )
}

export default PatientForm
