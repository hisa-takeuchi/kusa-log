export type Record = {
  id: string
  created_at: string
  plant_id: string | undefined
  is_water: boolean
  is_fertilizer: boolean
  is_chemical: boolean
  record_date: string
  user_id: string | undefined
}

export type MyPlant = {
  id: string
  name: string
  user_id: string | undefined
  created_at: string
  buy_at: string | null
  soil_info: string | null
  cut_date: string | null
  replanted_date: string | null
  records: Record[]
}
export type EditedRecord = Omit<Record, 'created_at' | 'user_id'>
export type EditedMyPlant = Omit<MyPlant, 'created_at' | 'user_id' | 'records'>
