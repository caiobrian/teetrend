import { useState, useCallback } from 'react'

export type NotificationType = 'success' | 'error'

export interface NotificationState {
  show: boolean
  message: string
  type: NotificationType
}

export const useNotification = (duration = 3000) => {
  const [notification, setNotification] = useState<NotificationState>({
    show: false,
    message: '',
    type: 'success',
  })

  const showNotification = useCallback(
    (message: string, type: NotificationType = 'success') => {
      setNotification({ show: true, message, type })
      setTimeout(
        () => setNotification({ show: false, message: '', type }),
        duration,
      )
    },
    [duration],
  )

  return {
    notification,
    showNotification,
  }
}
