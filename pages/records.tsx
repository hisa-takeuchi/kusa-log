import { NextPage } from 'next'
import { Layout } from '../components/Layout'
import { MyPantList } from '../components/MyPantList'
import { Spacer } from '@nextui-org/react'
import { RecordList } from '../components/RecordList'

const Records: NextPage = () => {
  return (
    <Layout title="ダッシュボード">
      <h2 className="text-lg font-bold">記録</h2>
      <Spacer y={10} />
      <div className="mx-auto w-full max-w-md px-unit-md">
        <RecordList />
      </div>
    </Layout>
  )
}

export default Records
