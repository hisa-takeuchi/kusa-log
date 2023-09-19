import { FormEvent, FC } from 'react'
import { supabase } from '../utils/supabase'
import useStore from '../store'
import { useMutateRecord } from '../hooks/useMutateRecord'
import { MyPlant } from '../types/types'
import { useQueryMyPlants } from '../hooks/useQueryMyPlants'
import { Button } from '@nextui-org/react'

export const RecordForm: FC = () => {
  const { editedRecord } = useStore()
  const update = useStore((state) => state.updateEditedRecord)
  const { createRecordMutation, updateRecordMutation } = useMutateRecord()
  const { data: myPlants, status } = useQueryMyPlants()
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedRecord.id === '') {
      createRecordMutation.mutate({
        user_id: supabase.auth.user()?.id,
        plant_id: editedRecord.plant_id,
        is_water: editedRecord.is_water,
        is_fertilizer: editedRecord.is_fertilizer,
        is_chemical: editedRecord.is_chemical,
        record_date: editedRecord.record_date,
      })
    } else {
      updateRecordMutation.mutate({
        id: editedRecord.id,
        plant_id: editedRecord.plant_id,
        is_water: editedRecord.is_water,
        is_fertilizer: editedRecord.is_fertilizer,
        is_chemical: editedRecord.is_chemical,
        record_date: editedRecord.record_date,
      })
    }
  }
  return (
    <form onSubmit={submitHandler}>
      <div className="mb-3">
        <label htmlFor="plant_id" className="form-label">
          お世話した草
        </label>
        <select
          className="rounded border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-500 focus:border-lime-500 focus:outline-none"
          aria-label="Default select example"
          id="plant_id"
          value={editedRecord.plant_id}
          onChange={(e) => {
            update({
              ...editedRecord,
              plant_id: e.target.value,
            })
          }}
        >
          <option value="">選択する</option>
          {myPlants?.map((plant: MyPlant) => (
            <option key={plant.id} value={plant.id}>
              {plant.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="record_date" className="form-label">
          日付
        </label>
        <input
          type="date"
          id="record_date"
          className="rounded border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-500 focus:border-lime-500 focus:outline-none"
          value={editedRecord.record_date}
          onChange={(e) =>
            update({ ...editedRecord, record_date: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="is_water" className="form-label">
          水やり
        </label>
        <input
          className="rounded border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-500 focus:border-lime-500 focus:outline-none"
          id="is_water"
          type="checkbox"
          checked={editedRecord.is_water}
          onChange={(e) =>
            update({ ...editedRecord, is_water: e.target.checked })
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="is_fertilizer" className="form-label">
          肥料
        </label>
        <input
          className="rounded border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-500 focus:border-lime-500 focus:outline-none"
          id="is_fertilizer"
          type="checkbox"
          checked={editedRecord.is_fertilizer}
          onChange={(e) =>
            update({ ...editedRecord, is_fertilizer: e.target.checked })
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="is_chemical" className="form-label">
          殺虫・殺菌
        </label>
        <input
          className="rounded border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-500 focus:border-lime-500 focus:outline-none"
          id="is_chemical"
          type="checkbox"
          checked={editedRecord.is_chemical}
          onChange={(e) =>
            update({ ...editedRecord, is_chemical: e.target.checked })
          }
        />
      </div>
      <button
        type="submit"
        className="ml-2 rounded bg-lime-600 px-3 py-2 text-sm font-medium text-white hover:bg-lime-700"
      >
        {editedRecord.id ? '修正する' : '記録する'}
      </button>
    </form>
  )
}
