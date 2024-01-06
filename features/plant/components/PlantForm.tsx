import {
  Accordion,
  AccordionItem,
  Button,
  Image,
  Input,
  Spacer,
  Textarea,
} from '@nextui-org/react'
import useStore from '../../../store'
import { uploadStorage } from '../../../libs/storage'
import { supabase } from '../../../utils/supabase'
import { ChangeEvent, useEffect, useState } from 'react'
import { User } from '@supabase/gotrue-js'
import { ImageUploadButton } from '../../../components/organisms/ImageUploadButton'
import { ImageInput } from '../../../components/atoms/ImageInput'

export const PlantForm = () => {
  const { editedMyPlant } = useStore()
  const update = useStore((state) => state.updateEditedMyPlant)
  const handleUploadStorage = async (event: ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true)
    const fileList = event.target?.files
    console.log(fileList)
    if (!fileList || !fileList.length) return
    const { path } = await uploadStorage({
      dirName: user?.id,
      fileList,
      bucketName: 'plants_photos',
    })
    if (path) {
      const { data } = supabase.storage.from('plants_photos').getPublicUrl(path)
      setPathName(data?.publicUrl)
      if (data) {
        update({ ...editedMyPlant, photo_url: data.publicUrl })
      }
    }
    setIsUploading(false)
  }
  const [isUploading, setIsUploading] = useState(false)
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
        value={editedMyPlant.name}
        onChange={(e) => update({ ...editedMyPlant, name: e.target.value })}
      />
      <ImageUploadButton
        onChange={handleUploadStorage}
        isUploading={isUploading}
      />

      <Image
        alt=""
        className="border border-gray-300"
        src={editedMyPlant.photo_url || path}
      />

      <Input
        label="購入日"
        radius="sm"
        type="date"
        variant="bordered"
        placeholder="YYYY-MM-DD"
        value={editedMyPlant.buy_at || ''}
        onChange={(e) => update({ ...editedMyPlant, buy_at: e.target.value })}
      />
      <Textarea
        label="土の配合"
        radius="sm"
        variant="bordered"
        placeholder="赤玉・軽石"
        value={editedMyPlant.soil_info || ''}
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
            value={editedMyPlant.cut_date || ''}
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
            value={editedMyPlant.replanted_date || ''}
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
