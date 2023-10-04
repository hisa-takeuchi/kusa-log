import { useState, FormEvent, useMemo } from 'react'
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
import { EyeFilledIcon, EyeSlashFilledIcon } from '@nextui-org/shared-icons'
import {
  Avatar,
  Box,
  createTheme,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material'
import { LockOutlined } from '@mui/icons-material'

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
  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)
  const isInvalid = useMemo(() => {
    if (email === '' || password === '') return true

    return !validateEmail(email)
  }, [email, password])
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible)
  return (
    <Layout title={isLogin ? 'ログイン' : '新規登録'}>
      <ThemeProvider theme={createTheme()}>
        <Grid container sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random?plants)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light'
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'primary' }}>
                <LockOutlined />
              </Avatar>
              <Typography fontFamily="Noto Sans JP" component="h1" variant="h5">
                {isLogin ? 'ログイン' : '新規登録'}
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1, width: '100%' }}
              >
                <Input
                  isRequired
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
                  isRequired
                  variant="bordered"
                  size="lg"
                  type={isPasswordVisible ? 'text' : 'password'}
                  label="パスワード"
                  value={password}
                  radius="sm"
                  onChange={(e) => setPassword(e.target.value)}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isPasswordVisible ? (
                        <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
                      ) : (
                        <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
                      )}
                    </button>
                  }
                />
                <Spacer y={10} />
                <Button
                  className="w-full text-white"
                  color="success"
                  type="submit"
                  size="lg"
                  endContent={<LoginIcon className="h-4" color="white" />}
                  radius="sm"
                  isDisabled={isInvalid}
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
                  {isLogin
                    ? '新規登録はこちら'
                    : '既にアカウントをお持ちの方はこちら'}
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
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
      </ThemeProvider>
    </Layout>
  )
}

export default Auth
