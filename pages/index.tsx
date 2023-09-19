import { useState, FormEvent } from 'react'
import { BadgeCheckIcon, ShieldCheckIcon } from '@heroicons/react/solid'
import type { NextPage } from 'next'
import { useMutateAuth } from '../hooks/useMutateAuth'
import { Layout } from '../components/Layout'

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
    }
  }
  return (
    <Layout title={isLogin ? 'ログイン' : '新規登録'}>
      <ShieldCheckIcon className="mb-6 h-12 w-12 text-green-500" />
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            required
            className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-lime-500 focus:outline-none"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            required
            className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-lime-500 focus:outline-none"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="group relative flex w-full justify-center rounded-md bg-lime-600 py-2 px-4 text-sm font-medium text-white hover:bg-lime-700"
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <BadgeCheckIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          {isLogin ? 'ログインする' : '新規登録する'}
        </button>
        <div className="my-6 flex items-center justify-center text-sm">
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="cursor-pointer font-medium hover:text-lime-500"
          >
            {isLogin
              ? '新規登録はこちら'
              : '既にアカウントをお持ちの方はこちら'}
          </span>
        </div>
      </form>
    </Layout>
  )
}

export default Auth
