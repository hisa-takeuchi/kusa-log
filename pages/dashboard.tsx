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

const Dashboard: NextPage = () => {
  const signOut = () => {
    supabase.auth.signOut()
  }

  return (
    <Layout title="ダッシュボード">
      <LogoutIcon
        className="mb-6 h-6 cursor-pointer text-green-500"
        onClick={signOut}
      />
      <div className="grid grid-cols-2 gap-40 mx-52">
        <div>
          <div className="my-3 flex justify-center">
            <DocumentTextIcon className="h-8 w-8 text-green-500" />
          </div>
          <RecordForm />
          <RecordList />
        </div>
        <div>
          <div className="my-3 flex justify-center">
            <StatusOnlineIcon className="h-8 w-8 text-green-500" />
          </div>
          <MyPlantForm />
          <MyPantList />
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
