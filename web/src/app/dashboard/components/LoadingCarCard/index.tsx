import { Skeleton } from '@/components/ui/skeleton'

export function LoadingCarCard() {
  return (
    <div className="desktop:ml-[180px] laptop:mt-10 laptop:ml-[180px] grid grid-cols-4 desktop:grid-cols-6 gap-4 h-full mobile:grid mobile:grid-cols-1 tablet:grid-cols-1">
      <Skeleton className="bg-zinc-800 rounded-xl min-h-[600px] max-w-[380px]" />
      <Skeleton className="bg-zinc-800 rounded-xl min-h-[600px] max-w-[380px]" />
      <Skeleton className="bg-zinc-800 rounded-xl min-h-[600px] max-w-[380px]" />
      <Skeleton className="bg-zinc-800 rounded-xl min-h-[600px] max-w-[380px]" />
    </div>
  )
}
