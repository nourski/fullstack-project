import { styled, Theme } from '../../theme'

import { ButtonProps } from 'rebass'

interface IButtonProps extends ButtonProps {
  dark?: boolean
}

export default styled.button<IButtonProps>`
  background-color: ${(props) => (props.dark ? Theme.colors.teal : 'white')};
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 8px 12px;
  border: 1px solid;
  color: ${(props) => (props.dark ? 'white' : Theme.colors.grey)};
  border-color: ${(props) => (props.dark ? Theme.colors.teal : 'inherit')};
  outline: none;
  cursor: pointer;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`
