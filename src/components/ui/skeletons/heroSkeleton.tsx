import { Skeleton } from '../skeleton'

export default function HeroSkeleton() {
  return (
    <div className="w-full max-w-2xl mx-auto mt-20 mb-24">
      <div className="bg-black rounded-lg shadow-2xl overflow-hidden min-h-[300px]">
        {/* Editor Header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/50">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 text-center">
            <Skeleton className="h-4 w-24 mx-auto" />
          </div>
        </div>
        {/* Code Content Skeleton */}
        <div className="p-6 space-y-4">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
      <div className="flex items-center mt-20 gap-4">
        <Skeleton className="h-14 w-1/2" />
        <Skeleton className="h-14 w-[250px]" />
        <Skeleton className="h-14 w-2/3" />
      </div>
      <div className="flex flex-col items-center mt-10 gap-4 p-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[172px]" />
      </div>
      <div className="flex items-center justify-center gap-4 mt-8">
        <Skeleton className="h-10 w-[176px]" />
        <Skeleton className="h-10 w-[176px]" />
        <Skeleton className="h-10 w-[176px]" />
      </div>
    </div>
  )
}
