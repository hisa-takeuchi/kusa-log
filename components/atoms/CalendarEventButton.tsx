import { useState } from 'react'
import { Popover, Typography } from '@mui/material'
import { Button } from '@nextui-org/react'
import { SunIcon } from '@heroicons/react/solid'

export const CalendarEventButton = ({ title }: { title: string }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  return (
    <>
      {/*<Popover*/}
      {/*  id={id}*/}
      {/*  open={open}*/}
      {/*  anchorEl={anchorEl}*/}
      {/*  onClose={handleClose}*/}
      {/*  anchorOrigin={{*/}
      {/*    vertical: 'bottom',*/}
      {/*    horizontal: 'left',*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Typography sx={{ p: 2 }}>{title}</Typography>*/}
      {/*</Popover>*/}
      {/*<Button*/}
      {/*  className="bg-transparent"*/}
      {/*  onClick={handleClick}*/}
      {/*  aria-describedby={id}*/}
      {/*  isIconOnly*/}
      {/*>*/}
      <SunIcon className="h-6 text-red-500" />
      {/*</Button>*/}
    </>
  )
}
