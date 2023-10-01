import { FC, ReactNode, useEffect, useState } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { useIsStandalone } from './useIsStandalone'
import { useResize } from './useResize'
import { AppLayout } from './AppLayout'
import { StoreArticle } from './StoreArticle'

type Title = {
  title: string
  children: ReactNode
}
export const Layout: FC<Title> = ({ children, title = '草ログ' }) => {
  const Wrapper = styled.div`
    line-height: 1em;

    [data-is-init] {
      opacity: 0;
      transition: opacity 0.2s ease-in-out;

      &[data-is-init='true'] {
        opacity: 1;
      }
    }
  `

  const [isInit, setIsInit] = useState(false)
  const { windowWidth, windowHeight } = useResize()
  const { isStandalone } = useIsStandalone({
    width: windowWidth,
    height: windowHeight,
  })

  useEffect(() => {
    setIsInit(true)
  }, [isStandalone])

  return (
    <Wrapper>
      <Head>
        <title>{title}</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,maximum-scale=1.0"
        />
      </Head>
      <div data-is-init={isInit}>
        {isStandalone ? (
          <AppLayout>{children}</AppLayout>
        ) : (
          <StoreArticle
            title="草ログ"
            icon="/icon-256x256.png"
            author="he's at"
            description="草ログは植物のお世話を記録するアプリです。"
            copyright="copyright"
            ogImage="/icon-512x512.png"
          />
        )}
      </div>
    </Wrapper>
  )
}
