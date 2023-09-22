import create from 'zustand'
import { EditedRecord, EditedMyPlant } from './types/types'
import dayjs from 'dayjs'

const date = new Date()
const formattedDate = dayjs(date).format('YYYY-MM-DD')

type State = {
  editedRecord: EditedRecord
  editedMyPlant: EditedMyPlant
  updateEditedRecord: (payload: EditedRecord) => void
  updateEditedMyPlant: (payload: EditedMyPlant) => void
  resetEditedRecord: () => void
  resetEditedMyPlant: () => void
}

const useStore = create<State>((set) => ({
  editedRecord: {
    id: '',
    plant_id: '',
    is_water: false,
    is_fertilizer: false,
    is_chemical: false,
    record_date: formattedDate,
    light_power: '',
    weather: [],
    wind_power: [],
    memo: '',
    temp: '',
    condition: '',
  },
  editedMyPlant: {
    id: '',
    name: '',
    buy_at: '',
    soil_info: '',
    cut_date: '',
    replanted_date: '',
  },
  updateEditedRecord: (payload: EditedRecord) =>
    set({
      editedRecord: {
        id: payload.id,
        plant_id: payload.plant_id,
        is_water: payload.is_water,
        is_fertilizer: payload.is_fertilizer,
        is_chemical: payload.is_chemical,
        record_date: payload.record_date,
        light_power: payload.light_power,
        weather: payload.weather,
        wind_power: payload.wind_power,
        memo: payload.memo,
        temp: payload.temp,
        condition: payload.condition,
      },
    }),
  updateEditedMyPlant: (payload: EditedMyPlant) =>
    set({
      editedMyPlant: {
        id: payload.id,
        name: payload.name,
        buy_at: payload.buy_at,
        soil_info: payload.soil_info,
        cut_date: payload.cut_date,
        replanted_date: payload.replanted_date,
      },
    }),
  resetEditedRecord: () =>
    set({
      editedRecord: {
        id: '',
        plant_id: '',
        is_water: false,
        is_fertilizer: false,
        is_chemical: false,
        record_date: formattedDate,
        light_power: '',
        weather: [],
        wind_power: [],
        memo: '',
        temp: '',
        condition: '',
      },
    }),
  resetEditedMyPlant: () =>
    set({
      editedMyPlant: {
        id: '',
        name: '',
        buy_at: '',
        soil_info: '',
        cut_date: '',
        replanted_date: '',
      },
    }),
}))

export default useStore
