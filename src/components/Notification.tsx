import { NotificationState } from '@/hooks/useNotification'

interface NotificationProps {
  notification: NotificationState
}

export function Notification({ notification }: NotificationProps) {
  if (!notification.show) return null

  return (
    <div
      className={`fixed top-20 right-5 p-4 rounded-md shadow-lg text-white z-[100] 
        ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
    >
      {notification.message}
    </div>
  )
}
