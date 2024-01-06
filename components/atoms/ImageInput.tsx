import { Input, InputProps } from '@nextui-org/react'

export const ImageInput = (props: InputProps) => {
  return (
    <Input
      className="hidden"
      id="file-upload"
      name="photo_url"
      type="file"
      accept="image/png, image/jpeg"
      onChange={props.onChange}
    />
  )
}
