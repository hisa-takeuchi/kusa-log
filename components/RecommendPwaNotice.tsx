import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
  useDisclosure,
} from '@nextui-org/react'
import { useA2HS } from '../libs/useA2HS'
import { Grid } from '@mui/material'
import { useEffect } from 'react'

export const RecommendPwaNotice = () => {
  const [promptEvent, promptToInstall] = useA2HS()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  useEffect(() => {
    promptEvent
  }, [])
  return (
    <>
      {promptEvent && (
        <Modal
          defaultOpen={true}
          onOpenChange={onOpenChange}
          isDismissable={false}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  アプリをインストールしますか？
                </ModalHeader>
                <ModalBody className="text-base">
                  <Grid columnSpacing={{ xs: 3 }} container>
                    <Grid item xs={3}>
                      <Image
                        width="100"
                        alt="草ログアイコン"
                        src="/icon-256x256.png"
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <p className="font-bold">草ログ</p>
                      <Spacer y={3} />
                      <p className="text-sm">kusalog.com</p>
                    </Grid>
                  </Grid>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={promptToInstall}>
                    Install
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  )
}
