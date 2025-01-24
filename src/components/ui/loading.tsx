import React from 'react'
import { Skeleton } from '../ui/skeleton'

const loading = () => {
  return (
    <div className='space-y-6'>
        <div className='grid gap-6'>
            <Skeleton className='h-[330px] w-full rounded-lg'/>
            <Skeleton className='h-[330px] w-full rounded-lg'/>
<div className='grid gap-6 md:grid-cols-2'>
<Skeleton className='h-[330px] w-full rounded-lg'/>
<Skeleton className='h-[330px] w-full rounded-lg'/>

</div>
        </div>
    </div>
  )
}

export default loading