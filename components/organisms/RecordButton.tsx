import { FC } from 'react'
import { Button } from '@nextui-org/react'

interface Props {
  submitHandler: () => void
  isLoading: boolean
  isDisabled: boolean
  name: string
}

export const RecordButton: FC<Props> = ({
  submitHandler,
  isLoading,
  isDisabled,
  name,
}) => {
  return (
    <Button
      className="w-full text-white"
      color="success"
      onPress={submitHandler}
      isLoading={isLoading}
      isDisabled={isDisabled}
    >
      {name}
    </Button>
  )
}
