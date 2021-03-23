import React, { useEffect, useRef, useState } from 'react'

import { destroy, get, post } from '../../api/requests'
import { IImageType } from '../../types/image'

import { Box, Flex } from '../elements'
import ContentContainer from '../atoms/ContentContainer'
import ImageCard from '../molecules/ImageCard'
import SearchBar from '../molecules/SearchBar'
import Navigation from '../molecules/Navigation'

const Browse: React.FC = () => {
  const [page, setPage] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [images, setImages] = useState<IImageType[]>([])
  const loader = useRef(null)

  const fetchImages = async (searchTermChanged?: boolean) => {
    try {
      const response = await get('/images', { q: searchTerm, page: String(page) })

      if (response.status === 200) {
        const responseJSON = await response.json()
        // replace results if search term changed, append results if page number changed.
        setImages(searchTermChanged ? responseJSON : [...images, ...responseJSON])
      }
    } catch (e) {
      console.log(e)
    }
  }

  const createFavoriteImage = async (image: IImageType, index: number) => {
    try {
      const response = await post('favorite_images', { ...image, keyword: searchTerm })

      if (response.status === 200) {
        const responseJSON = await response.json()
        const updatedImages = [...images]
        updatedImages[index] = { ...responseJSON, favorite: true }
        setImages(updatedImages)
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
        updatedImages[index] = { ...image, id: '', favorite: false }
        setImages(updatedImages)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchImages(true)
  }, [searchTerm])

  useEffect(() => {
    fetchImages()
  }, [page])

  useEffect(() => {
    // Handles infinite scroll (fetch more when scroll to bottom of results).
    const observer = new IntersectionObserver(
      (entities: IntersectionObserverEntry[]) => {
        const target = entities[0]
        if (target.isIntersecting) {
          setPage((page) => page + 1)
        }
      },
      {
        root: null,
        rootMargin: '20px',
        threshold: 1,
      },
    )
    if (loader.current) {
      observer.observe(loader.current!)
    }
  }, [])

  return (
    <ContentContainer flexDirection="column">
      <Navigation />
      <SearchBar onChange={setSearchTerm} />
      <Flex flexWrap="wrap" justifyContent="space-evenly" mt={5}>
        {images.map((image: IImageType, index: number) => (
          <ImageCard
            key={image.url}
            image={image}
            onToggleFavorite={
              image.favorite && image.id
                ? () => destroyFavoriteImage(image, index)
                : () => createFavoriteImage(image, index)
            }
          />
        ))}
      </Flex>
      <Box ref={loader} />
    </ContentContainer>
  )
}

export default Browse
