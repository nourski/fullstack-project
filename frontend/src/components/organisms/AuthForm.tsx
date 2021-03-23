import { Formik, FormikProps } from 'formik'
import * as Y from 'yup'
import React from 'react'

import { IFormValues } from '../../types/form'
import { upperEachFirst } from '../../utils/strings'

import { Box, Flex } from '../elements'
import FormField from '../molecules/FormField'
import Error from '../atoms/Error'
import Button from '../atoms/Button'

type Field = {
  name: string
  type?: string
  placeholder: string
}

interface IAuthForm {
  schema: Y.ObjectSchema<{}, object>
  fields: Field[]
  bagRef: React.MutableRefObject<FormikProps<IFormValues> | undefined>
  error?: string
  primaryActionLabel: string
  secondaryActionLabel: string
  primaryAction: () => void
  secondaryAction: () => void
}

const AuthForm: React.FC<IAuthForm> = ({
  schema,
  fields,
  bagRef,
  error,
  primaryActionLabel,
  secondaryActionLabel,
  primaryAction,
  secondaryAction,
}) => {
  return (
    <Formik
      initialValues={fields.reduce((acc, curr) => {
        acc[curr.name] = ''
        return acc
      }, {} as Record<string, string>)}
      validationSchema={schema}
      onSubmit={primaryAction}
    >
      {(formikBag) => {
        bagRef.current = formikBag

        return (
          <Flex flexDirection="column" width="100%">
            {fields.map((field) => (
              <FormField
                key={field.name}
                form={formikBag}
                name={field.name}
                placeholder={upperEachFirst(field.placeholder)}
                type={field.type ?? 'text'}
              />
            ))}

            {error && (
              <Error my={3} mx="auto">
                {error}
              </Error>
            )}
            <Flex mt={3} ml="auto">
              <Button
                dark
                type="submit"
                disabled={!(formikBag.isValid && formikBag.dirty && !formikBag.isSubmitting)}
                onClick={primaryAction}
                mr={1}
              >
                {upperEachFirst(primaryActionLabel)}
              </Button>
              <Box mr={2} />
              <Button onClick={secondaryAction}>{upperEachFirst(secondaryActionLabel)}</Button>
            </Flex>
          </Flex>
        )
      }}
    </Formik>
  )
}

export default AuthForm
