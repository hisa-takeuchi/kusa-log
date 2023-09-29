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
import { FormEvent, useState } from 'react'
import { supabase } from '../utils/supabase'
import { DateComponent } from '@fullcalendar/core/internal'
import { removeBucketPath, uploadStorage } from '../libs/storage'
import { Record } from '../types/types'
import { useQueryClient } from 'react-query'
import { CameraAlt } from '@mui/icons-material'

export const CreateMyPlant = () => {
  const { editedMyPlant } = useStore()
  const update = useStore((state) => state.updateEditedMyPlant)
  const { createMyPlantMutation, updateMyPlantMutation } = useMutateMyPlants()
  const queryClient = useQueryClient()

  const submitHandler = () => {
    setIsSubmitLoading(true)
    setTimeout(() => {
      if (editedMyPlant.id === '') {
        createMyPlantMutation.mutate({
          user_id: supabase.auth.user()?.id,
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

  const handleUploadStorage = async (folder: FileList | null) => {
    setIsUploading(true)
    if (!folder || !folder.length) return
    const { path } = await uploadStorage({
      dirName: 'plants',
      folder,
      bucketName: 'plants_photos',
    })
    console.log(path)
    if (path) {
      const { data } = supabase.storage
        .from('plants_photos')
        .getPublicUrl(removeBucketPath(path, 'plants_photos'))
      setPathName(data?.publicURL)
      if (data) {
        update({ ...editedMyPlant, photo_url: data.publicURL })
      }
    }
    setIsUploading(false)
  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [path, setPathName] = useState<string | undefined>()
  const [isUploading, setIsUploading] = useState(false)
  return (
    <>
      <div className="flex justify-end">
        <Button onPress={onOpen} isIconOnly color="primary" radius="sm">
          <PlusIcon className="h-4" />
        </Button>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                植物を追加する
              </ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  label="名前"
                  radius="sm"
                  placeholder="モンステラ"
                  variant="bordered"
                  onChange={(e) =>
                    update({ ...editedMyPlant, name: e.target.value })
                  }
                />
                <Button
                  radius="sm"
                  color="primary"
                  as="label"
                  endContent={<CameraAlt />}
                  isLoading={isUploading}
                >
                  画像をアップロードする
                  <Input
                    className="hidden"
                    id="file-upload"
                    name="photo_url"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={(e) => {
                      const fileList = e.target?.files
                      console.log(fileList)
                      handleUploadStorage(fileList)
                    }}
                  />
                </Button>

                <Image alt="" className="border border-gray-300" src={path} />

                <Input
                  label="購入日"
                  radius="sm"
                  type="date"
                  variant="bordered"
                  placeholder="YYYY-MM-DD"
                  onChange={(e) =>
                    update({ ...editedMyPlant, buy_at: e.target.value })
                  }
                />
                <Textarea
                  label="土の配合"
                  radius="sm"
                  variant="bordered"
                  placeholder="赤玉・軽石"
                  onChange={(e) =>
                    update({ ...editedMyPlant, soil_info: e.target.value })
                  }
                />
                <Accordion isCompact>
                  <AccordionItem title="もっと詳細に入力する">
                    <Input
                      label="剪定した日"
                      radius="sm"
                      type="date"
                      variant="bordered"
                      placeholder="YYYY-MM-DD"
                      onChange={(e) =>
                        update({ ...editedMyPlant, cut_date: e.target.value })
                      }
                    />
                    <Spacer y={3} />
                    <Input
                      label="植え替えした日"
                      radius="sm"
                      type="date"
                      variant="bordered"
                      placeholder="YYYY-MM-DD"
                      onChange={(e) =>
                        update({
                          ...editedMyPlant,
                          replanted_date: e.target.value,
                        })
                      }
                    />
                  </AccordionItem>
                </Accordion>
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
