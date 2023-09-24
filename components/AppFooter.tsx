import { Tab, Tabs } from '@nextui-org/react'
import { useRouter } from 'next/router'

export const AppFooter = () => {
  const { push, pathname } = useRouter()
  return (
    <Tabs
      as="footer"
      size="lg"
      aria-label="Options"
      variant="underlined"
      fullWidth
      className="sticky bottom-0 z-20 mt-unit-3"
      classNames={{
        tabList:
          'bg-white justify-center gap-unit-10 w-full relative rounded-none mx-auto border-b border-divider',
        cursor: 'w-full bg-[#22d3ee]',
        tab: 'max-w-fit px-0 h-12',
        tabContent: 'group-data-[selected=true]:text-[#06b6d4]',
      }}
      onSelectionChange={(path) => {
        const url = path.toString()
        push(url)
      }}
      defaultSelectedKey="/dashboard"
      selectedKey={pathname}
    >
      <Tab
        key="/dashboard"
        title={
          <div className="flex items-center space-x-2">
            <span>MyPlants</span>
          </div>
        }
      />
      <Tab
        key="/records"
        title={
          <div className="flex items-center space-x-2">
            <span>Record</span>
          </div>
        }
      />
      <Tab
        key="/users"
        title={
          <div className="flex items-center space-x-2">
            <span>Users</span>
          </div>
        }
      />
    </Tabs>
  )
}
