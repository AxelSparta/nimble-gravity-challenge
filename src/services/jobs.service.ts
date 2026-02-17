import { BASE_URL } from "../constants";

export async function getCandidateData (email: string) {
	try {
		const response = await fetch(`${BASE_URL}/api/candidate/get-by-email?email=${email}`)
		if (!response.ok) {
			throw new Error("Network response was not ok")
		}
		return response.json()
	} catch (error: unknown) {
		if (error instanceof Error) {
			throw error
		}
		throw new Error("An unknown error occurred")
	}
}

export async function getJobsList() {
	try {
		const response = await fetch(`${BASE_URL}/api/jobs/get-list`)
		if (!response.ok) {
			throw new Error("Network response was not ok")
		}
		return response.json()
	} catch (error: unknown) {
		if (error instanceof Error) {
			throw error
		}
		throw new Error("An unknown error occurred")
	}
}

export async function applyToJob(uuid: string, jobId: string, candidateId: string, repoUrl: string, applicationId: string) {
	try {
		const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
			method: 'POST',
			body: JSON.stringify({ uuid, jobId, candidateId, repoUrl, applicationId }),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		if (!response.ok) {
			throw new Error("Network response was not ok")
		}
		return response.json()
	} catch (error: unknown) {
		if (error instanceof Error) {
			throw error
		}
		throw new Error("An unknown error occurred")
	}
}