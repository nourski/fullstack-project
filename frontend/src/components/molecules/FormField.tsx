import { ErrorMessage, Field, FormikProps } from 'formik'
import React from 'react'

import { IFormValues } from '../../types/form'
import { styled } from '../../theme'
import onKeyDown from '../../utils/onKeyDown'

import { Box, Flex } from '../elements'
import Error from '../atoms/Error'
import Input from '../atoms/Input'

const Wrapper = styled(Flex)`
  position: relative;
`

const ErrorWrapper = styled(Box)`
  position: absolute;
  top: calc(100% + 5px);
  left: 5px;
`

interface IFormFieldProps {
  form: FormikProps<IFormValues>
  name: string
  placeholder: string
  type?: string
}

const FormField: React.FC<IFormFieldProps> = ({ form, name, placeholder, type = 'text' }) => {
  const { errors, touched, submitForm } = form
  const hasError = !!errors[name] && touched[name]
  return (
    <Wrapper mb={5} flexDirection="column" width="100%">
      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        as={Input}
        error={hasError}
        onKeyDown={(e: React.KeyboardEvent<Element>) => onKeyDown(e, submitForm)}
      />

      {hasError && (
        <ErrorWrapper>
          <ErrorMessage name={name} render={(errorMessage) => <Error>{errorMessage}</Error>} />
        </ErrorWrapper>
      )}
    </Wrapper>
  )
}

export default FormField
