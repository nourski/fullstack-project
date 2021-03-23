import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import React from 'react'

import { IImageType } from '../../types/image'
import { styled } from '../../theme'
import { useTheme } from '../../hooks/useTheme'
import onKeyDown from '../../utils/onKeyDown'

import { Image, Flex } from '../elements'

interface IImageCardProps {
  image: IImageType
  onToggleFavorite: () => void
}

const Container = styled(Flex)`
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  position: relative;
  &:focus {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.6);
    outline: none;
  }
`
const IconWrapper = styled(Flex)`
  position: absolute;
  bottom: 5px;
  right: 5px;
  cursor: pointer;
`

const ImageCard: React.FC<IImageCardProps> = ({ image, onToggleFavorite }) => {
  const { colors } = useTheme()
  return (
    <Container
      height={250}
      width={250}
      justifyContent="center"
      mb={1}
      pb={3}
      tabIndex={0}
      onKeyDown={(e) => onKeyDown(e, onToggleFavorite)}
    >
      <Image src={image.url} maxHeight={240} maxWidth={240} />
      <IconWrapper onClick={onToggleFavorite}>
        {image.favorite ? <AiFillHeart color={colors.pink} /> : <AiOutlineHeart />}
      </IconWrapper>
    </Container>
  )
}

export default ImageCard
