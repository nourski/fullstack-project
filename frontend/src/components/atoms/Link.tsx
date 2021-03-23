import { Link as ReactRouterLink, useLocation } from 'react-router-dom'
import React from 'react'

import { styled } from '../../theme'
import { useTheme } from '../../hooks/useTheme'

import { paths } from '../../Routes'
import { Text } from '../elements'

interface ILinkProps {
  label: string
  pathname: string
  isRoot?: boolean
}

const StyledLink = styled(ReactRouterLink)`
  text-decoration: none;
`

const Link: React.FC<ILinkProps> = ({ label, pathname, isRoot }) => {
  const { colors } = useTheme()
  const location = useLocation()

  return (
    <StyledLink to={pathname}>
      <Text
        color={
          location.pathname === pathname || (isRoot && location.pathname === paths.root)
            ? colors.teal
            : 'black'
        }
        mr={5}
      >
        {label}
      </Text>
    </StyledLink>
  )
}

export default Link
