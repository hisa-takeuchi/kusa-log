import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
} from '@nextui-org/react'
import { supabase } from '../utils/supabase'
import { LogoutIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import { User } from '@supabase/gotrue-js'

export const AppHeader = () => {
  const [user, setUser] = useState<User>()
  const signOut = () => {
    supabase.auth.signOut()
  }
  const getCurrentUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    const user = session?.user
    if (user) {
      setUser(user)
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  return (
    <Navbar>
      <NavbarBrand>
        {/*ロゴ*/}
        <p className="font-bold">草ログ</p>
      </NavbarBrand>
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              name="Jason Hughes"
              size="sm"
              src="/images/default_avatar.jpeg"
            />
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Profile Actions"
            variant="flat"
            disabledKeys={['general', 'settings', 'help']}
            onAction={(key) => {
              key === 'logout' && signOut()
            }}
          >
            <DropdownItem
              key="profile"
              className="h-14 gap-2"
              textValue="ログインユーザー名"
            >
              <p className="font-semibold">{user?.email}</p>
              <p className="font-semibold">でログイン中</p>
            </DropdownItem>
            <DropdownItem key="general" textValue="一般">
              一般
            </DropdownItem>
            <DropdownItem key="settings" textValue="ユーザー設定">
              ユーザー設定
            </DropdownItem>
            <DropdownItem key="help" textValue="ヘルプ">
              ヘルプ
            </DropdownItem>
            <DropdownItem
              startContent={<LogoutIcon className="h-4" />}
              key="logout"
              color="danger"
              className="text-danger"
              textValue="ログアウト"
            >
              ログアウト
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  )
}
