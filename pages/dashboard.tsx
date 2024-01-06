import { NextPage } from 'next'
import { Layout } from '../components/Layout'
import { MyPantList } from '../components/MyPantList'
import { Spacer } from '@nextui-org/react'
import { CreateMyPlant } from '../components/CreateMyPlant'
import { createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme({
  typography: {
    fontFamily: 'Noto Sans JP',
  },
  palette: {
    primary: {
      main: '#2E7D32',
    },
  },
})

const Dashboard: NextPage = () => {
  return (
    <Layout title="ダッシュボード">
      <ThemeProvider theme={theme}>
        <h2 className="text-lg font-bold">お世話する植物</h2>
        <Spacer y={10} />
        <div className="mx-auto max-w-md px-unit-md">
          <CreateMyPlant />
          <Spacer y={3} />
          <MyPantList />
        </div>

        {/*<div>*/}
        {/*  <div className="my-3 flex justify-center">*/}
        {/*    <DocumentTextIcon className="h-8 w-8 text-green-500" />*/}
        {/*  </div>*/}
        {/*  <RecordForm />*/}
        {/*  <RecordList />*/}
        {/*</div>*/}
      </ThemeProvider>
    </Layout>
  )
}

export default Dashboard
