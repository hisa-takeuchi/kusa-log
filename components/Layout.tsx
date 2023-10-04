import { FC, ReactNode, useEffect, useState } from 'react'
import Head from 'next/head'
import { BadgeCheckIcon } from '@heroicons/react/solid'
import { Navbar, NavbarBrand, useUser } from '@nextui-org/react'
import { AppHeader } from './AppHeader'
import { supabase } from '../utils/supabase'
import { AppFooter } from './AppFooter'
import { User } from '@supabase/gotrue-js'

type Title = {
  title: string
  children: ReactNode
}
export const Layout: FC<Title> = ({ children, title = '草ログ' }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
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
  )
}
