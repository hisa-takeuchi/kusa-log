import Link from 'next/link'
import { useRouter } from 'next/router'
import { GetStaticProps, NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { Layout } from '../components/Layout'
import { supabase } from '../utils/supabase'
import { Record, MyPlant } from '../types/types'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  console.log('getServerSideProps/ssr invoked')
  const { data: records } = await supabase
    .from('records')
    .select('*')
    .order('record_date', { ascending: false })

  const { data: myPlants } = await supabase
    .from('my_plants')
    .select('*')
    .order('created_at', { ascending: false })

  return { props: { records, myPlants } }
}

type StaticProps = {
  records: Record[]
  myPlants: MyPlant[]
}

const Ssr: NextPage<StaticProps> = ({ records, myPlants }) => {
  const router = useRouter()
  return (
    <Layout title="SSR">
      <p className="mb-3 text-green-500">SSR</p>
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
      <Link href="/ssg" prefetch={false}>
        <a className="my-3 text-xs">Link to ssg</a>
      </Link>
      <Link href="/isr" prefetch={false}>
        <a className="my-3 text-xs">Link to isr</a>
      </Link>
      <button className="mb-3 text-xs" onClick={() => router.push('/ssg')}>
        Route to ssg
      </button>
      <button className="mb-3 text-xs" onClick={() => router.push('/isr')}>
        Route to isr
      </button>
    </Layout>
  )
}

export default Ssr
