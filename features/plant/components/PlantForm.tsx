import {
  Accordion,
  AccordionItem,
  Button,
  Image,
  Input,
  Spacer,
  Textarea,
} from '@nextui-org/react'
import { CameraAlt } from '@mui/icons-material'
import useStore from '../../../store'
import { uploadStorage } from '../../../libs/storage'
import { supabase } from '../../../utils/supabase'
import { useEffect, useState } from 'react'
import { User } from '@supabase/gotrue-js'

export const PlantForm = () => {
  const { editedMyPlant } = useStore()
  const update = useStore((state) => state.updateEditedMyPlant)
  const handleUploadStorage = async (folder: FileList | null) => {
    setIsUploading(true)
    if (!folder || !folder.length) return
    const { path } = await uploadStorage({
      dirName: user?.id,
      folder,
      bucketName: 'plants_photos',
    })
    console.log(path)
    if (path) {
      const { data } = supabase.storage.from('plants_photos').getPublicUrl(path)
      setPathName(data?.publicUrl)
      if (data) {
        update({ ...editedMyPlant, photo_url: data.publicUrl })
      }
    }
    setIsUploading(false)
  }

  const [path, setPathName] = useState<string | undefined>()
  const [isUploading, setIsUploading] = useState(false)
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
  useEffect(() => {
    getCurrentUser()
  }, [])

  return (
    <>
      <Input
        isRequired
        label="名前"
        radius="sm"
        placeholder="モンステラ"
        variant="bordered"
        onChange={(e) => update({ ...editedMyPlant, name: e.target.value })}
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
        onChange={(e) => update({ ...editedMyPlant, buy_at: e.target.value })}
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
    </>
  )
}
