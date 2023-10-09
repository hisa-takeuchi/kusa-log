import { useRouter } from 'next/router'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import { CalendarMonth, Home, Person } from '@mui/icons-material'
import { SyntheticEvent, useState } from 'react'

export const AppFooter = () => {
  const { push, pathname } = useRouter()

  const [value, setValue] = useState(pathname)

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue)
    push(newValue)
  }
  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 20 }}
      elevation={3}
    >
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="ホーム"
          value="/dashboard"
          icon={<Home />}
        />
        <BottomNavigationAction
          label="記録"
          value="/records"
          icon={<CalendarMonth />}
        />
        <BottomNavigationAction
          label="ユーザー"
          value="/users"
          icon={<Person />}
          disabled
        />
      </BottomNavigation>
    </Paper>
  )
}
