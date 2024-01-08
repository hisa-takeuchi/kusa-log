import { FC, ReactNode, useEffect, useState } from 'react'
import Head from 'next/head'
import { AppHeader } from './AppHeader'
import { supabase } from '../utils/supabase'
import { AppFooter } from './AppFooter'
import { Alert } from '@mui/material'
import { useOnlineStatus } from '../hooks/useOnlineStatus'

type Title = {
  title: string
  children: ReactNode
}
export const Layout: FC<Title> = ({ children, title = '草ログ' }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const isOnlineStatus = useOnlineStatus()
  const checkLoggedInUser = async () => {
    // ログインのセッションを取得する処理
    const {
      data: { session },
    } = await supabase.auth.getSession()
    const user = session?.user
    setIsLoggedIn(!!user)
  }
  useEffect(() => {
    checkLoggedInUser()
  }, [])

  return (
    <>
      {!isOnlineStatus && (
        <Alert
          variant="filled"
          severity="error"
          className="sticky inset-y-0 z-[9999]"
        >
          ネットワークに接続していません。
        </Alert>
      )}
      <div className="flex min-h-screen flex-col items-center text-gray-800">
        <Head>
          <title>{title}</title>
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1.0,maximum-scale=1.0"
          />
        </Head>
        {isLoggedIn && <AppHeader />}
        <main className="flex w-screen flex-1 flex-col items-center justify-center">
          {children}
        </main>
        {isLoggedIn && <AppFooter />}
      </div>
    </>
  )
}
