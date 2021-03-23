import { useHistory } from 'react-router-dom'
import React, { useContext } from 'react'

import { AuthContext } from '../../contexts/AuthContext'
import { paths } from '../../Routes'
import { styled } from '../../theme'
import { useTheme } from '../../hooks/useTheme'

import { Button, Flex } from '../elements'
import Link from '../atoms/Link'

const Logout = styled(Button)`
  border: none;
  outline: none;
  cursor: pointer;

  &:focus {
    outline: none;
    opacity: 0.5;
  }
`
const Navigation: React.FC = () => {
  const { colors, fontSizes } = useTheme()
  const { handleLogout } = useContext(AuthContext)
  const history = useHistory()

  const logout = () => {
    handleLogout()
    history.push(paths.root)
  }

  return (
    <Flex justifyContent="space-between" alignItems="center" mb={7}>
      <Flex>
        <Link pathname={paths.browse} label="Browse" isRoot />
        <Link pathname={paths.favorites} label="Favorites" />
      </Flex>

      <Logout
        onClick={logout}
        color={colors.black}
        p={0}
        fontSize={fontSizes[0]}
        backgroundColor="transparent"
      >
        Logout
      </Logout>
    </Flex>
  )
}

export default Navigation
