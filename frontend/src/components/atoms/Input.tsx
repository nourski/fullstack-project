import { Theme, styled } from '../../theme'

interface InputProps {
  error?: boolean
}

export default styled.input<InputProps>`
  border: none;
  border-bottom: 1px solid ${(props) => (props.error ? Theme.colors.pink : Theme.colors.grey)};
  outline: none;
  font-family: ${Theme.fonts.primary};
  padding: 10px;
  &:focus {
    border-color: ${Theme.colors.teal};
  }
`
