import { FlexProps } from 'rebass'
import React, { ReactNode } from 'react'

import { Flex } from '../elements'

interface IProps extends FlexProps {
  children: ReactNode
}

const ContentContainer: React.FC<IProps> = ({ children, ...rest }) => (
  <Flex minHeight="100vh" maxWidth="800px" py={[4, 6, 7]} px={[4, 6, 6, 0]} mx="auto" {...rest}>
    {children}
  </Flex>
)

export default ContentContainer
