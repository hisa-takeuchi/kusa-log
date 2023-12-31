import {
  Accordion,
  AccordionItem,
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
  Textarea,
  useDisclosure,
} from '@nextui-org/react'
import UploadButton from '@mui/material/Button'
import { PencilIcon, PlusIcon } from '@heroicons/react/solid'
import useStore from '../store'
import { useMutateMyPlants } from '../hooks/useMutateMyPlant'
import { FormEvent, useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import { useQueryClient } from 'react-query'
import { User } from '@supabase/gotrue-js'
import { PlantForm } from '../features/plant/components/PlantForm'

export const CreateMyPlant = () => {
  const { editedMyPlant } = useStore()
  const reset = useStore((state) => state.resetEditedMyPlant)
  const { createMyPlantMutation, updateMyPlantMutation } = useMutateMyPlants()
  const queryClient = useQueryClient()
  const submitHandler = () => {
    setIsSubmitLoading(true)
    setTimeout(() => {
      if (editedMyPlant.id === '') {
        createMyPlantMutation.mutate({
          user_id: user?.id,
          name: editedMyPlant.name,
          buy_at: editedMyPlant.buy_at === '' ? null : editedMyPlant.buy_at,
          soil_info: editedMyPlant.soil_info,
          cut_date:
            editedMyPlant.cut_date === '' ? null : editedMyPlant.cut_date,
          replanted_date:
            editedMyPlant.replanted_date === ''
              ? null
              : editedMyPlant.replanted_date,
          photo_url: editedMyPlant.photo_url || null,
        })
      } else {
        updateMyPlantMutation.mutate({
          id: editedMyPlant.id,
          name: editedMyPlant.name,
          buy_at: editedMyPlant.buy_at === '' ? null : editedMyPlant.buy_at,
          soil_info: editedMyPlant.soil_info,
          cut_date:
            editedMyPlant.cut_date === '' ? null : editedMyPlant.cut_date,
          replanted_date:
            editedMyPlant.replanted_date === ''
              ? null
              : editedMyPlant.replanted_date,
          photo_url: editedMyPlant.photo_url || null,
        })
      }
      setIsSubmitLoading(false)
      onOpenChange()
      setPathName('')
    }, 1000)
  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [path, setPathName] = useState<string | undefined>()
  const [user, setUser] = useState<User>()
  const getCurrentUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    const user = session?.user
    if (user) {
      setUser(user)
    }
  }
  const onOpenModal = () => {
    reset()
    onOpen()
  }
  useEffect(() => {
    getCurrentUser()
  }, [])
  return (
    <>
      <div className="flex justify-end">
        <Button onPress={onOpenModal} isIconOnly color="primary" radius="sm">
          <PlusIcon className="h-4" />
        </Button>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                植物の登録
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
                  登録する
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
