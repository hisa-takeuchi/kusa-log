import { useEffect, useState } from 'react'

interface IBeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

interface Config {
  onAccepted?: () => void
  onDismissed?: () => void
}
export const useA2HS = (
  config?: Config,
): [IBeforeInstallPromptEvent | null, () => void] => {
  const [promptEvent, setPromptEvent] =
    useState<IBeforeInstallPromptEvent | null>(null)
  const promptToInstall = () => {
    if (promptEvent) promptEvent.prompt()
  }
  useEffect(() => {
    const listener = (e: IBeforeInstallPromptEvent) => {
      e.preventDefault()
      setPromptEvent(e)
      e.userChoice
        .then((result) => {
          if (result.outcome === 'accepted') {
            if (config?.onAccepted) config.onAccepted()
          } else {
            if (config?.onDismissed) config.onDismissed()
          }
          return
        })
        .catch(console.error)
    }

    window.addEventListener('beforeinstallprompt', listener as any)
    return () => {
      window.removeEventListener('beforeinstallprompt', listener as any)
    }
  }, [config])
  return [promptEvent, promptToInstall]
}
