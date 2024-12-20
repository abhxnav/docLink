'use client'

import React, { useState } from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  Textarea,
  Checkbox,
} from '@/components/ui'
import { Control } from 'react-hook-form'
import { FormFieldType } from '@/constants'
import 'react-phone-number-input/style.css'
import PhoneInput, { type Value } from 'react-phone-number-input'
import { CiCalendar } from 'react-icons/ci'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { dateTimeRange } from '@/lib/utils'
import { VscEye, VscEyeClosed } from 'react-icons/vsc'

interface CustomProps {
  control: Control<any>
  fieldType: FormFieldType
  name: string
  label?: string
  placeholder?: string
  icon?: React.ReactNode
  iconAlt?: string
  disabled?: boolean
  readOnly?: boolean
  dateFormat?: string
  showTimeSelect?: boolean
  minDate?: Date
  maxDate?: Date
  minTime?: Date
  maxTime?: Date
  filterTime?: (time: Date) => boolean
  filterDate?: (date: Date) => boolean
  showYearDropdown?: boolean
  children?: React.ReactNode
  renderSkeleton?: (field: any) => React.ReactNode
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const {
    fieldType,
    icon,
    iconAlt,
    placeholder,
    showTimeSelect,
    dateFormat,
    renderSkeleton,
    minDate,
    maxDate,
    minTime,
    maxTime,
    filterTime,
    filterDate,
    showYearDropdown,
  } = props

  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {icon ? (
            <div className="flex items-center justify-center">{icon}</div>
          ) : (
            <p>{iconAlt}</p>
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
              readOnly={props.readOnly}
            />
          </FormControl>
        </div>
      )

    case FormFieldType.PASSWORD:
      return (
        <div className="flex items-center rounded-md border border-dark-500 bg-dark-400">
          {icon ? (
            <div className="flex items-center justify-center">{icon}</div>
          ) : (
            <p>{iconAlt}</p>
          )}
          <FormControl className="flex-grow">
            <Input
              placeholder={placeholder}
              {...field}
              type={showPassword ? 'text' : 'password'}
              className="shad-input border-0"
            />
          </FormControl>
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="p-2 focus:outline-none"
          >
            {showPassword ? (
              <span role="img" aria-label="Hide Password">
                <VscEye className="size-5 mr-2" />
              </span>
            ) : (
              <span role="img" aria-label="Show Password">
                <VscEyeClosed className="size-5 mr-2" />
              </span>
            )}
          </button>
        </div>
      )

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            className="shad-textArea"
            disabled={props.disabled}
          />
        </FormControl>
      )

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="GB"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as Value | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      )

    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <div className="flex items-center justify-center">
            <CiCalendar className="h-6 w-6 ml-2" />
          </div>
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFormat ?? 'dd/MM/yyyy'}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel="Time:"
              wrapperClassName="date-picker"
              isClearable
              showMonthDropdown
              useShortMonthInDropdown
              minDate={minDate}
              maxDate={maxDate}
              minTime={minTime && dateTimeRange.getMinTime(field.value)}
              maxTime={maxTime}
              filterTime={filterTime}
              filterDate={filterDate}
              showYearDropdown={showYearDropdown}
            />
          </FormControl>
        </div>
      )

    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      )

    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </label>
          </div>
        </FormControl>
      )

    default:
      break
  }
}

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props

  return (
    <FormField
      control={control}
      name={name}
      disabled={props.disabled}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  )
}

export default CustomFormField
