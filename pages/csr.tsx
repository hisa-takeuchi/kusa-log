import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { Layout } from '../components/Layout'
import { supabase } from '../utils/supabase'
import { Record, MyPlant } from '../types/types'

const Csr: NextPage = () => {
  const [records, setRecords] = useState<Record[]>([])
  const [myPlants, setMyPlants] = useState<MyPlant[]>([])
  useEffect(() => {
    const getRecords = async () => {
      const { data: records } = await supabase
        .from('records')
        .select('*')
        .order('record_date', { ascending: false })

      setRecords(records as Record[])
    }

    const getMyPlants = async () => {
      const { data: myPlants } = await supabase
        .from('my_plants')
        .select('*')
        .order('created_at', { ascending: false })

      setMyPlants(myPlants as MyPlant[])
    }
    getRecords()
    getMyPlants()
  }, [])

  return (
    <Layout title="CSR">
      <p className="mb-3 text-green-500">SSG + CSF</p>
      <ul className="mb-3">
        {records.map((record) => (
          <li key={record.id}>
            <p className="text-lg font-extrabold">{record.plant_id}</p>
            <p className="text-lg font-extrabold">{record.record_date}</p>
            <p className="text-lg font-extrabold">
              水やり：{record.is_water ? '◯' : '-'}
            </p>
            <p className="text-lg font-extrabold">
              殺虫：{record.is_chemical ? '◯' : '-'}
            </p>
            <p className="text-lg font-extrabold">
              肥料：{record.is_fertilizer ? '◯' : '-'}
            </p>
          </li>
        ))}
      </ul>
      <ul>
        {myPlants.map((myPlant) => (
          <li key={myPlant.id}>
            <p className="text-lg font-extrabold">{myPlant.name}</p>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default Csr
