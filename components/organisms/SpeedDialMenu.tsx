import { FC, ReactNode } from 'react'
import {
  Box,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Typography,
} from '@mui/material'
import { PiPottedPlantFill } from 'react-icons/pi'
import { MdOutlineClose } from 'react-icons/md'

export type ActionType = {
  icon: ReactNode
  name: string
  func: () => void
}
interface Props {
  actions: ActionType[]
  open: boolean
  onOpen: () => void
  onClose: () => void
}

export const SpeedDialMenu: FC<Props> = ({
  actions,
  open,
  onOpen,
  onClose,
}) => {
  return (
    <SpeedDial
      ariaLabel="Plant SpeedDial"
      sx={{
        position: 'absolute',
        bottom: 16,
        right: 16,
      }}
      FabProps={{
        color: 'success',
      }}
      icon={
        <SpeedDialIcon
          classes={{
            root: '!h-fit',
          }}
          icon={
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <PiPottedPlantFill size="1.2rem" />
              <Typography fontSize={9}>記録</Typography>
            </Box>
          }
          openIcon={
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                left: '2%',
              }}
            >
              <MdOutlineClose size="1.5rem" />
              <Typography fontSize={9}>閉じる</Typography>
            </Box>
          }
        />
      }
      onClose={onClose}
      onOpen={onOpen}
      open={open}
    >
      {actions.map(({ name, icon, func }) => (
        <SpeedDialAction
          key={name}
          icon={icon}
          tooltipTitle={name}
          tooltipOpen
          TooltipClasses={{
            tooltip: 'text-xl',
          }}
          onClick={func}
          classes={{
            staticTooltipLabel:
              '!text-lg !font-medium !text-white !bg-transparent !shadow-none',
          }}
        />
      ))}
    </SpeedDial>
  )
}
