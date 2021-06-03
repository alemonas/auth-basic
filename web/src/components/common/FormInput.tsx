import {useField} from 'formik'
import React from 'react'
import FormError from './FormError'
import Input from './Input'

interface FormInputProps {
  ariaLabel: string
  name: string
  type: string
  placeholder: string
}

function FormInput({ariaLabel, name, type, placeholder}: FormInputProps) {
  const [field, meta] = useField(name)
  return (
    <React.Fragment>
      <Input
        field={field}
        ariaLabel={ariaLabel}
        name={name}
        type={type}
        placeholder={placeholder}
      />
      {meta.touched && meta.error && <FormError text={meta.error} />}
    </React.Fragment>
  )
}

export default FormInput
