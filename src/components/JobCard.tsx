import { useState } from 'react'
import { applyToJob, getCandidateData } from '../services/jobs.service'
import type { Candidate, Job } from '../types'

export function JobCard({ job }: { job: Job }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState(false)

  const handleApply = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError(null)
		if (!event.target.repoUrl.value) {
			setError('Repo URL is required')
			return
		}

		try {
			const { uuid, candidateId, applicationId }: Candidate = await getCandidateData(
				'axelnicolassparta@gmail.com',
			)
			const json = await applyToJob(uuid, job.id, candidateId, event.target.repoUrl.value, applicationId)
			console.log(json)
			setSuccess(true)
			setTimeout(() => {
				setSuccess(false)
			}, 2000)
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message)
			} else {
				setError('An unknown error occurred')
			}
		} finally {
			setLoading(false)
		}
  }

  return (
    <div className="relative border rounded-md p-4 flex flex-col justify-between min-h-52 min-w-44 shadow-lg border-gray-200">
      <h2>{job.title}</h2>
      <form onSubmit={handleApply}>
        <input
          type="url"
          placeholder="Repo URL"
					name='repoUrl'
          className="border border-gray-300 rounded-md p-2 mb-2"
					required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
				{success && <p className="text-green-500 text-sm">Postulado exitosamente</p>}
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 hover:cursor-pointer hover:scale-105 transition-all
					disabled:opacity-70 disabled:cursor-auto disabled:hover:bg-blue-500 disabled:hover:scale-100"
        >
          {loading ? 'Cargando...' : 'Postularse'}
        </button>
      </form>
    </div>
  )
}
