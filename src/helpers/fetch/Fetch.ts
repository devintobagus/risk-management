async function request<T>(
	url: string,
	options: ConfigOptions = {},
): Promise<T> {
	const {
		timeout = 10_000,
		body,
		method = 'GET',
		headers,
		responseType = "json",
		signal,
		...rest
	} = options

	const controller = new AbortController()
	const signal_ = signal ?? controller.signal

	const id = setTimeout(() => controller.abort(), timeout)

	try {
		const res = await fetch(
			url,
			{
				...rest,
				method,
				headers,
				body,
				signal: signal_
			}
		)
		switch (responseType) {
			case 'text':
				return (await res.text()) as T
			case 'blob':
				return (await res.blob()) as T
			case 'arrayBuffer':
				return (await res.arrayBuffer()) as T
			case 'raw':
				return res as T
			case 'json':
			default:
				return (await res.json()) as T
		}
	} catch (err) {
		if (
			err instanceof Error
		) {
			throw new Error(err.message)
		}
		throw err
	} finally {
		clearTimeout(id)
	}

}

type ResponseType = 'json' | 'text' | 'blob' | 'arrayBuffer' | 'raw'


export interface ConfigOptions extends RequestInit {
	timeout?: number
	responseType?: ResponseType
}


export const api = {
	get: <T>(url: string, options?: ConfigOptions) =>
		request<T>(url, { ...options, method: 'GET' }),

	post: <T>(url: string, body?: BodyInit | null, options?: Omit<ConfigOptions, "body">) =>
		request<T>(url, { ...options, method: 'POST', body }),

	put: <T>(url: string, body?: BodyInit | null, options?: Omit<ConfigOptions, "body">) =>
		request<T>(url, { ...options, method: 'PUT', body }),

	patch: <T>(url: string, body?: BodyInit | null, options?: Omit<ConfigOptions, "body">) =>
		request<T>(url, { ...options, method: 'PATCH', body }),

	delete: <T>(url: string, options?: ConfigOptions) =>
		request<T>(url, { ...options, method: 'DELETE' }),
}
