import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface ElementProps {
  title: string
  description: string
}

export function AlertDestructive({ title, description }: ElementProps) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
      <strong className="font-bold">{title}</strong>
      <span className="block sm:inline">{description}</span>
    </div>
  )
}