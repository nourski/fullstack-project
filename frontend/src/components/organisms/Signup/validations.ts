import * as Y from 'yup'

export const schema = Y.object().shape({
  username: Y.string().required('Username is required.'),
  password: Y.string().required('Password is required.'),
  passwordConfirmation: Y.string().required('Password confirmation is required.'),
})

export default {
  schema,
}
