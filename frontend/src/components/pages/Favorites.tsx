import React, { useEffect, useState } from 'react'

import { compact, uniq } from 'lodash'
import { destroy, get } from '../../api/requests'
import { IImageType } from '../../types/image'

import { Box, Flex } from '../elements'
import Button from '../atoms/Button'
import ContentContainer from '../atoms/ContentContainer'
import ImageCard from '../molecules/ImageCard'
import Navigation from '../molecules/Navigation'

const Favorites: React.FC = () => {
  const [images, setImages] = useState<IImageType[]>([])
  const [filters, setFilters] = useState<string[]>([])
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const onFilterClick = (filter: string) => {
    selectedFilters.includes(filter)
      ? setSelectedFilters(selectedFilters.filter((selected) => selected !== filter))
      : setSelectedFilters([...selectedFilters, filter])
  }

  const fetchImages = async () => {
    try {
      const response = await get('/favorite_images', {})

      if (response.status === 200) {
        const responseJSON: IImageType[] = await response.json()
        setImages(responseJSON)

        const allFilters = compact(uniq(responseJSON.map((image) => image.keyword)))

        setFilters(allFilters)
        setSelectedFilters(allFilters)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const destroyFavoriteImage = async (image: IImageType, index: number) => {
    try {
      const response = await destroy(`favorite_images/${image.id}`)

      if (response.status === 200) {
        const updatedImages = [...images]
        updatedImages.splice(index, 1)
        setImages(updatedImages)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  return (
    <ContentContainer flexDirection="column">
      <Navigation />
      <Flex>
        {filters.map((filter) => (
          <Box key={filter} mr={3}>
            <Button
              dark={selectedFilters.includes(filter)}
              onClick={() => onFilterClick(filter)}
              tabIndex={0}
            >
              {filter}
            </Button>
          </Box>
        ))}
      </Flex>
      <Flex flexWrap="wrap" justifyContent="space-evenly" mt={5}>
        {images
          .filter((image) => selectedFilters.includes(image.keyword ?? ''))
          .map((image: IImageType, index: number) => (
            <ImageCard
              key={image.url}
              image={{ ...image, favorite: true }}
              onToggleFavorite={() => destroyFavoriteImage(image, index)}
            />
          ))}
      </Flex>
    </ContentContainer>
  )
}

export default Favorites
