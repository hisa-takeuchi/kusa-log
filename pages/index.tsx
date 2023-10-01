import { useState, FormEvent } from 'react'
import {
  BadgeCheckIcon,
  LoginIcon,
  ShieldCheckIcon,
} from '@heroicons/react/solid'
import type { NextPage } from 'next'
import { useMutateAuth } from '../hooks/useMutateAuth'
import { Layout } from '../components/Layout'
import {
  Input,
  Spacer,
  Button,
  Link,
  Modal,
  ModalHeader,
  useDisclosure,
  ModalContent,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react'

const Auth: NextPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const {
    email,
    setEmail,
    password,
    setPassword,
    loginMutation,
    registerMutation,
  } = useMutateAuth()
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLogin) {
      loginMutation.mutate()
    } else {
      registerMutation.mutate()
      onOpen()
    }
  }
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <Layout title={isLogin ? 'ログイン' : '新規登録'}>
      <h2 className="font-bold">{isLogin ? 'ログイン' : '新規登録'}</h2>
      <Spacer y={5} />
      <form onSubmit={handleSubmit}>
        <Input
          variant="bordered"
          size="lg"
          type="text"
          label="メールアドレス"
          placeholder=""
          value={email}
          radius="sm"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Spacer y={5} />
        <Input
          variant="bordered"
          size="lg"
          type="password"
          label="パスワード"
          value={password}
          radius="sm"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Spacer y={10} />
        <Button
          className="w-full text-white"
          color="success"
          type="submit"
          size="lg"
          endContent={<LoginIcon className="h-4" color="white" />}
          radius="sm"
        >
          {isLogin ? 'ログインする' : '新規登録する'}
        </Button>
        <Spacer y={5} />
        <Link
          size="sm"
          underline="hover"
          className="block cursor-pointer text-center hover:text-green-500"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? '新規登録はこちら' : '既にアカウントをお持ちの方はこちら'}
        </Link>
      </form>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>確認メールを送信しました</ModalHeader>
              <ModalBody className="text-sm">
                <p>登録したメールアドレスに確認メールを送信しました。</p>
                <p>メールを確認し、登録を完了してください。</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  閉じる
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Layout>
  )
}

export default Auth
