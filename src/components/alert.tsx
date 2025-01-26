import { AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardHeader, CardContent } from '@/components/ui/card'

const alertTypes = {
  info: {
    icon: Info,
    styles: 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950',
    textColor: 'text-blue-800 dark:text-blue-200',
    iconColor: 'text-blue-500',
    header: 'Info',
  },
  warning: {
    icon: AlertTriangle,
    styles: 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950',
    textColor: 'text-yellow-800 dark:text-yellow-200',
    iconColor: 'text-yellow-500',
    header: 'Warning',
  },
  alert: {
    icon: AlertCircle,
    styles: 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950',
    textColor: 'text-red-800 dark:text-red-200',
    iconColor: 'text-red-500',
    header: 'Alert',
  },
} as const

type AlertType = keyof typeof alertTypes

export default function Alert({
  children,
  type,
  className,
}: {
  children: React.ReactNode
  type: AlertType
  className?: string
}) {
  const { styles, textColor, iconColor, header, icon: Icon } = alertTypes[type]

  return (
    <Card className={cn(styles, 'border', className)}>
      <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
        <Icon className={cn('h-6 w-6 items-center', iconColor)} />
        <p className={cn('text-base font-medium', textColor)}>{header}</p>
      </CardHeader>
      <CardContent className={cn('text-sm', textColor)}>{children}</CardContent>
    </Card>
  )
}
