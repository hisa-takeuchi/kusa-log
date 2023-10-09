import { useState } from 'react'
import { Popover, Typography } from '@mui/material'
import { Button } from '@nextui-org/react'
import { SunIcon } from '@heroicons/react/solid'
import { MyPlant } from '../../types/types'

export const CalendarEventButton = ({ plants }: { plants: string }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  const plant_names = plants.split(',')
  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {plant_names.map((plant, index) => (
          <p className="px-3 py-1" key={index}>
            {plant}
          </p>
        ))}
      </Popover>
      <Button
        className="bg-transparent"
        onClick={handleClick}
        aria-describedby={id}
        isIconOnly
      >
        <SunIcon className="h-5 text-red-500" />
      </Button>
    </>
  )
}
