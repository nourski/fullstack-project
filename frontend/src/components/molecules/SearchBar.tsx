import React from 'react'
import { BsSearch } from 'react-icons/bs'

import { Theme, styled } from '../../theme'
import { useTheme } from '../../hooks/useTheme'

import { Flex } from '../elements'

interface ISearchBarProps {
  onChange: (value: string) => void
}

const SearchBox = styled(Flex)`
  height: 50px;
  border-radius: 8px;
  border: 1px solid ${Theme.colors.grey};
  box-shadow: 0 3px 3px rgb(134 133 133 / 70%);
`

const Input = styled.input`
  border: none;
  background: transparent;
  width: 100%;
  outline: none;
  color: black;
  ::-webkit-input-placeholder {
    color: ${Theme.colors.grey};
  }
`

const IconBox = styled(Flex)`
  border-radius: 8px 0 0 8px;
`

const SearchBar: React.FC<ISearchBarProps> = ({ onChange }) => {
  const { colors } = useTheme()

  return (
    <SearchBox alignItems="center">
      <IconBox width="80px" height="100%" justifyContent="center" alignItems="center" mr={2}>
        <BsSearch color={colors.grey} />
      </IconBox>
      <Input placeholder="Start typing..." onChange={(e) => onChange(e.target.value)} />
    </SearchBox>
  )
}

export default SearchBar
