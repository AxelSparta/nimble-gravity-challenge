import { useEffect, useState } from 'react'
import { getJobsList } from '../services/jobs.service'
import type { Job } from '../types'
import { JobCard } from './JobCard'
import { Loading } from './Loading'

export function JobList() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  useEffect(() => {
    getJobsList()
      .then((jobs) => {
        setJobs(jobs)
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          setError(error)
        } else {
          setError(new Error('An unknown error occurred'))
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  return (
    <main className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] px-4 py-10">
      {loading && <Loading />}
      {error && <p className="text-red-500 text-center">Error: {error.message}</p>}
      {jobs.map((job: Job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </main>
  )
}
