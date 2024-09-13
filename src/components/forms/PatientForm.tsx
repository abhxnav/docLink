'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '@/components/ui/form'
import { CustomFormField, SubmitButton } from '@/components'
import { CiMail, CiUser } from 'react-icons/ci'
import { useState } from 'react'
import { UserFormData, UserFormValidation } from '@/lib/validations'
import { useRouter } from 'next/navigation'

export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton',
}

const PatientForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<UserFormData>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  })

  const onSubmit: SubmitHandler<UserFormData> = async ({
    name,
    email,
    phone,
  }) => {
    try {
      setIsLoading(true)
      //   const userData = { name, email, phone }
      //   const user = await createUser(userData)

      //   if (user) router.push(`/patients/${user.$id}/register`)
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
          fieldType={FormFieldType.PHONE_INPUT}
          name="phone"
          label="Phone number"
          placeholder="(555) 555-5555"
        />
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm
