import useStore from '../../../store'
import { useMutateMyPlants } from '../../../hooks/useMutateMyPlant'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'
import { PlantForm } from './PlantForm'
import { useState } from 'react'

interface EditModalProps {
  isOpen: boolean
  onOpenChange: () => void
}

export const EditMyPlantModal = (props: EditModalProps) => {
  const { isOpen, onOpenChange } = props
  const { editedMyPlant } = useStore()
  const { updateMyPlantMutation } = useMutateMyPlants()
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [path, setPathName] = useState<string | undefined>()

  const submitHandler = () => {
    setIsSubmitLoading(true)
    setTimeout(() => {
      console.log(editedMyPlant.photo_url)
      updateMyPlantMutation.mutate({
        id: editedMyPlant.id,
        name: editedMyPlant.name,
        buy_at: editedMyPlant.buy_at === '' ? null : editedMyPlant.buy_at,
        soil_info: editedMyPlant.soil_info,
        cut_date: editedMyPlant.cut_date === '' ? null : editedMyPlant.cut_date,
        replanted_date:
          editedMyPlant.replanted_date === ''
            ? null
            : editedMyPlant.replanted_date,
        photo_url: editedMyPlant.photo_url || null,
      })
      setIsSubmitLoading(false)
      onOpenChange()
      setPathName('')
    }, 1000)
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                基本情報を編集する
              </ModalHeader>
              <ModalBody>
                <PlantForm />
              </ModalBody>
              <ModalFooter>
                <Button
                  className="text-white"
                  color="success"
                  radius="sm"
                  onPress={submitHandler}
                  isDisabled={editedMyPlant.name === ''}
                  isLoading={isSubmitLoading}
                >
                  編集する
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
