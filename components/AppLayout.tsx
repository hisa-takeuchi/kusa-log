import { AppHeader } from './AppHeader'
import { AppFooter } from './AppFooter'
import { FC, ReactNode, useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'

type AppProps = {
  children: ReactNode
}
export const AppLayout: FC<AppProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const checkLoggedInUser = async () => {
    // ログインのセッションを取得する処理
    const user = await supabase.auth.user()
    setIsLoggedIn(!!user)
  }
  useEffect(() => {
    checkLoggedInUser()
  }, [])
  return (
    <div className="flex min-h-screen flex-col items-center text-gray-800">
      {isLoggedIn && <AppHeader />}
      <main className="flex w-screen flex-1 flex-col items-center justify-center">
        {children}
      </main>
      {isLoggedIn && <AppFooter />}
    </div>
  )
}
