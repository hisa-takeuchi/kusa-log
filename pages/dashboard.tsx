import { NextPage } from 'next'
import { supabase } from '../utils/supabase'
import {
  LogoutIcon,
  StatusOnlineIcon,
  DocumentTextIcon,
} from '@heroicons/react/solid'
import { Layout } from '../components/Layout'
import { RecordList } from '../components/RecordList'
import { RecordForm } from '../components/RecordForm'
import { MyPlantForm } from '../components/MyPlantForm'
import { MyPantList } from '../components/MyPantList'
import { Spacer } from '@nextui-org/react'

const Dashboard: NextPage = () => {
  return (
    <Layout title="ダッシュボード">
      <h2 className="text-lg font-bold">お世話する植物</h2>
      <Spacer y={10} />
      <div className="mx-auto max-w-md px-unit-md">
        <MyPantList />
      </div>

      {/*<div>*/}
      {/*  <div className="my-3 flex justify-center">*/}
      {/*    <DocumentTextIcon className="h-8 w-8 text-green-500" />*/}
      {/*  </div>*/}
      {/*  <RecordForm />*/}
      {/*  <RecordList />*/}
      {/*</div>*/}

      {/*<MyPlantForm />*/}
    </Layout>
  )
}

export default Dashboard
