import { ImageInput } from '../atoms/ImageInput'
import { CameraAlt } from '@mui/icons-material'
import { ChangeEventHandler, useState } from 'react'
import { Button } from '@nextui-org/react'

interface Props {
  onChange: ChangeEventHandler<HTMLInputElement>
  isUploading: boolean
}
export const ImageUploadButton = (props: Props) => {
  const { onChange, isUploading } = props
  return (
    <Button
      radius="sm"
      color="primary"
      as="label"
      endContent={<CameraAlt />}
      isLoading={isUploading}
    >
      画像をアップロードする
      <ImageInput onChange={onChange} />
    </Button>
  )
}
