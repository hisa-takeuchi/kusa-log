import { FC, FormEvent } from 'react'
import useStore from '../store'
import { useMutateMyPlants } from '../hooks/useMutateMyPlant'
import { supabase } from '../utils/supabase'

export const MyPlantForm: FC = () => {
  const { editedMyPlant } = useStore()
  const update = useStore((state) => state.updateEditedMyPlant)
  const { createMyPlantMutation, updateMyPlantMutation } = useMutateMyPlants()

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedMyPlant.id === '') {
      createMyPlantMutation.mutate({
        user_id: supabase.auth.user()?.id,
        name: editedMyPlant.name,
        buy_at: editedMyPlant.buy_at === '' ? null : editedMyPlant.buy_at,
        soil_info: editedMyPlant.soil_info,
        cut_date: editedMyPlant.cut_date === '' ? null : editedMyPlant.cut_date,
        replanted_date:
          editedMyPlant.replanted_date === ''
            ? null
            : editedMyPlant.replanted_date,
      })
    } else {
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
      })
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="mb-3">
        <label htmlFor="name" className="">
          名前
        </label>
        <input
          type="text"
          className="rounded border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-500 focus:border-lime-500 focus:outline-none"
          id="name"
          value={editedMyPlant.name}
          onChange={(e) => update({ ...editedMyPlant, name: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="buy_at" className="">
          購入日
        </label>
        <input
          type="date"
          className="rounded border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-500 focus:border-lime-500 focus:outline-none"
          id="buy_at"
          value={editedMyPlant.buy_at || ''}
          onChange={(e) => update({ ...editedMyPlant, buy_at: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="soil_info" className="">
          土の配合
        </label>
        <input
          type="text"
          className="rounded border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-500 focus:border-lime-500 focus:outline-none"
          id="soil_info"
          value={editedMyPlant.soil_info || ''}
          onChange={(e) =>
            update({ ...editedMyPlant, soil_info: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="cut_date" className="form-label">
          剪定日
        </label>
        <input
          type="date"
          className="rounded border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-500 focus:border-lime-500 focus:outline-none"
          id="cut_date"
          value={editedMyPlant.cut_date || ''}
          onChange={(e) =>
            update({ ...editedMyPlant, cut_date: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="replanted_date" className="form-label">
          植え替え日
        </label>
        <input
          type="date"
          className="rounded border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-500 focus:border-lime-500 focus:outline-none"
          id="replanted_date"
          value={editedMyPlant.replanted_date || ''}
          onChange={(e) =>
            update({ ...editedMyPlant, replanted_date: e.target.value })
          }
        />
      </div>
      <button
        type="submit"
        className="ml-2 rounded bg-lime-600 px-3 py-2 text-sm font-medium text-white hover:bg-lime-700"
      >
        {editedMyPlant.id === '' ? '更新する' : '新規登録する'}
      </button>
    </form>
  )
}
