import { supabase } from '../utils/supabase'
import { v4 as uuidv4 } from 'uuid'

type UploadStorage = {
  dirName: string
  folder: FileList
  bucketName: string
}

type UploadPathname = {
  path: string | null
}

export const uploadStorage = async ({
  dirName,
  folder,
  bucketName,
}: UploadStorage): Promise<UploadPathname> => {
  const file = folder[0] // 1ファイルアップロード
  const pathName = `${dirName}/${uuidv4()}/` // パス名の設定
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(pathName, file, {
      cacheControl: '3600',
      upsert: false,
    })
  if (error) throw error
  return {
    path: data?.Key ?? null,
  }
}

// storage の key から bucket 名を取り除く
export const removeBucketPath = (key: string, bucketName: string) => {
  return key.slice(bucketName.length + 1) // "/"の分だけ加算している
}