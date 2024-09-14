declare type Gender = 'Male' | 'Female' | 'Other'
declare type Status = 'pending' | 'scheduled' | 'cancelled'

declare interface CreateUserParams {
  name: string
  email: string
  phone: string
}
