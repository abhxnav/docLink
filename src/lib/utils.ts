import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const parseStringify = <T>(value: T): T =>
  JSON.parse(JSON.stringify(value))

export const convertFileToUrl = (file: File) => URL.createObjectURL(file)

export const formatDateTime = (dateString: Date | string) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    'en-US',
    dateTimeOptions
  )

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    'en-US',
    dateDayOptions
  )

  const formattedDate: string = new Date(dateString).toLocaleString(
    'en-US',
    dateOptions
  )

  const formattedTime: string = new Date(dateString).toLocaleString(
    'en-US',
    timeOptions
  )

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  }
}

export const isAppwriteError = (
  error: unknown
): error is { code: number; message: string } => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof error.code === 'number'
  )
}

class DateTimeRange {
  now: Date
  officeStartTime: number
  officeEndTime: number
  minDate: Date
  officeMinTime: Date
  officeMaxTime: Date

  constructor() {
    this.now = new Date()
    this.officeStartTime = 10
    this.officeEndTime = 19
    this.minDate = new Date()
    this.officeMinTime = new Date()
    this.officeMaxTime = new Date()
    this.officeMinTime.setHours(this.officeStartTime, 0, 0, 0)
    this.officeMaxTime.setHours(this.officeEndTime, 0, 0, 0)
  }

  filterTime = (time: Date) => {
    const selectedTime = time.getHours()
    return (
      selectedTime >= this.officeStartTime && selectedTime < this.officeEndTime
    )
  }

  isDisabledDate = (date: Date) => {
    const today = new Date()
    if (date.toDateString() === today.toDateString()) {
      return this.now.getHours() >= this.officeEndTime
    }
    return false
  }

  getMinTime = (selectedDate: Date | null) => {
    if (
      selectedDate &&
      selectedDate.toDateString() === this.now.toDateString()
    ) {
      return this.now.getHours() >= this.officeStartTime
        ? this.now
        : this.officeMinTime
    }
    return this.officeMinTime
  }
}

export const dateTimeRange = new DateTimeRange()
