import { useState } from 'react'
import {
  Accordion,
  AccordionItem,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import { SunIcon } from '@heroicons/react/solid'
import { FormatDate } from '../../utils/formatDate'
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material'
import {
  blue,
  green,
  yellow,
  grey,
  lightBlue,
  red,
  orange,
} from '@mui/material/colors'
import {
  AcUnit,
  Air,
  Cloud,
  DeviceThermostat,
  Lightbulb,
  LocalPharmacy,
  Note,
  Science,
  Thunderstorm,
  WaterDrop,
  WbSunny,
} from '@mui/icons-material'
import { customIcons } from '../RecordForm'

interface PlantsDataProps {
  is_water: boolean
  is_fertilizer: boolean
  is_chemical: boolean
  memo: string | null
  name: string
  condition: string | null
  wind_power: string
  light_power: string
  weather: string
  temp: string
}
export interface DateRecordProps {
  plants_data: Array<PlantsDataProps>
  record_date: string
  user_id: string
}

export const CalendarEventButton = (props: DateRecordProps) => {
  const { plants_data, record_date } = props
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const d = new Date(record_date)

  const date = FormatDate(d)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const customWeatherIcons: {
    [index: string]: {
      icon: React.ReactElement
      label: string
      color: string
    }
  } = {
    1: {
      icon: <WbSunny />,
      label: '晴れ',
      color: orange[500],
    },
    2: {
      icon: <Thunderstorm />,
      label: '雨',
      color: blue[800],
    },
    3: {
      icon: <Cloud />,
      label: 'くもり',
      color: grey[600],
    },
    4: {
      icon: <AcUnit />,
      label: '雪',
      color: lightBlue[100],
    },
  }

  return (
    <>
      <Button className="bg-transparent" onPress={onOpen} isIconOnly>
        <SunIcon className="h-5 text-red-500" />
      </Button>
      <Modal
        size="full"
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        className="max-h-full"
      >
        <ModalContent>
          <ModalHeader>{date}</ModalHeader>
          <ModalBody>
            <Accordion>
              {plants_data.map((plant, index) => (
                <AccordionItem title={plant.name} key={index}>
                  <List
                    sx={{
                      width: '100%',
                      maxWidth: 360,
                      bgcolor: 'background.paper',
                    }}
                  >
                    {plant.condition && (
                      <ListItem>
                        <ListItemAvatar>
                          {customIcons[plant.condition].icon}
                        </ListItemAvatar>
                        <ListItemText
                          primary={customIcons[plant.condition].label}
                        />
                      </ListItem>
                    )}
                    {plant.is_water && (
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: blue[500] }}>
                            <WaterDrop />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="水やり" />
                      </ListItem>
                    )}
                    {plant.is_chemical && (
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: yellow[700] }}>
                            <Science />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="肥料" />
                      </ListItem>
                    )}
                    {plant.is_fertilizer && (
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: green[500] }}>
                            <LocalPharmacy />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          className="text-xs"
                          primary="殺虫・殺菌"
                        />
                      </ListItem>
                    )}
                    {JSON.parse(plant.weather).length === 1 && (
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              bgcolor:
                                customWeatherIcons[JSON.parse(plant.weather)]
                                  .color,
                            }}
                          >
                            {customWeatherIcons[JSON.parse(plant.weather)].icon}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            customWeatherIcons[JSON.parse(plant.weather)].label
                          }
                        />
                      </ListItem>
                    )}
                    {JSON.parse(plant.wind_power).length > 0 && (
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: lightBlue[500] }}>
                            <Air />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={JSON.parse(plant.wind_power)} />
                      </ListItem>
                    )}
                    {plant.light_power && (
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: yellow[600] }}>
                            <Lightbulb />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={plant.light_power} />
                      </ListItem>
                    )}
                    {plant.temp && (
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: grey[600] }}>
                            <DeviceThermostat />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={plant.temp} />
                      </ListItem>
                    )}
                    {plant.memo && (
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: grey[500] }}>
                            <Note />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={plant.memo} />
                      </ListItem>
                    )}
                  </List>
                </AccordionItem>
              ))}
            </Accordion>
          </ModalBody>
          <ModalFooter>
            <Button
              radius="sm"
              color="danger"
              variant="light"
              onPress={onClose}
            >
              閉じる
            </Button>
            {/*<Button radius="sm" color="primary" onPress={onClose}>*/}
            {/*  Action*/}
            {/*</Button>*/}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
