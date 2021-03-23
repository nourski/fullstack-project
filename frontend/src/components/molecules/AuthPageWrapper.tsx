import { upperCase } from 'lodash'
import React, { ReactNode } from 'react'

import { useTheme } from '../../hooks/useTheme'

import { Box, Flex, Text } from '../elements'
import Card from '../atoms/Card'
import ContentContainer from '../atoms/ContentContainer'

interface IAuthPageWrapperProps {
  pageName: string
  children: ReactNode
}

const AuthPageWrapper: React.FC<IAuthPageWrapperProps> = ({ pageName, children }) => {
  const { colors, fontSizes } = useTheme()

  return (
    <ContentContainer>
      <Box mx="auto" my="auto" pb={5}>
        <Card maxWidth="600px" p={5} minWidth="350px">
          <Flex justifyContent="center" alignItems="center" flexDirection="column">
            <Text fontSize={fontSizes[4]} color={colors.teal} mb={4}>
              {upperCase(pageName)}
            </Text>
            {children}
          </Flex>
        </Card>
      </Box>
    </ContentContainer>
  )
}

export default AuthPageWrapper
