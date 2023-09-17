import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { GetStaticProps } from 'next'
import { Layout } from '../components/Layout'
import { supabase } from '../utils/supabase'
import { Record, MyPlant } from '../types/types'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log('getStaticProps/ssg invoked')
  const { data: records } = await supabase
    .from('records')
    .select('*')
    .order('record_date', { ascending: false })

  const { data: my_plants } = await supabase
    .from('my_plants')
    .select('*')
    .order('created_at', { ascending: false })

  return { props: { records, my_plants } }
}

type StaticProps = {
  records: Record[]
  my_plants: MyPlant[]
}

const Ssg: NextPage<StaticProps> = ({ records, my_plants }) => {
  const router = useRouter()
  return (
    <Layout title="SSG">
      <p className="mb-3 text-green-500">SSG</p>
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
        {my_plants.map((my_plant) => (
          <li key={my_plant.id}>
            <p className="text-lg font-extrabold">{my_plant.name}</p>
          </li>
        ))}
      </ul>
      <Link href="/ssr" prefetch={false}>
        <a className="my-3 text-xs">Link to ssr</a>
      </Link>
      <button className="mb-3 text-xs" onClick={() => router.push('/ssr')}>
        Route to ssr
      </button>
    </Layout>
  )
}
export default Ssg
