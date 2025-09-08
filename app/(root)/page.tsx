import { Button } from '@/components/ui/button'
import Link from 'next/dist/client/link'
import React from 'react'
import Image from 'next/image'
import InterviewCard from '@/components/InterviewCard'
import { dummyInterviews } from '@/constants/index'

const page = () => {
  return (
    <>
      <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg'>
          <h2>Get Interview-Ready with Glare AI</h2>
          <p className='text-lg'>
            Practice job interviews with our AI-powered platform and get instant feedback to improve your skills and boost your confidence.
          </p>
    
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview" className="font-bold text-user-primary ml-1">
              Go to Interview
            </Link>
          </Button>
        </div>
        <Image src="/robot.png" alt="Robot" width={400} height={400} className="max:sm-hidden" />
      </section>

      <section className='flex flex-col gap-6 mt-8'>
        <h2>Your Interviews</h2>

        <div className='interviews-section'>
          {dummyInterviews.map((interview) => (
            <InterviewCard key={interview.id} {...interview} />
          ))}
        </div>

      </section>

      <section className='flex flex-col gap-6 mt-8'>
        <h2>Take an Interview</h2>

        <div className='interviews-section'>
          <p>There are no scheduled interviews at this time.</p>
        </div>

      </section>
    </>
  )
}

export default page