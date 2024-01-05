export enum WindPower {
  '弱' = '1',
  '普通' = '2',
  '強い' = '3',
}

export type Record = {
  id: string
  created_at: string
  plant_id: string | undefined
  is_water: boolean
  is_fertilizer: boolean
  is_chemical: boolean
  record_date: string
  user_id: string | undefined
  light_power: string | undefined
  weather: string[] | undefined
  wind_power: WindPower[] | undefined
  memo: string | undefined
  temp: string | undefined
  condition: number | null
  photo_url: string | null
  my_plants: MyPlant
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
  photo_url: string | null
  records: Record[]
}

export type EditedRecord = Omit<Record, 'created_at' | 'user_id' | 'my_plants'>
export type EditedMyPlant = Omit<MyPlant, 'created_at' | 'user_id' | 'records'>
