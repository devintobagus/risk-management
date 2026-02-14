"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TanstackQueryProps as TanstackQueryProviderProps } from "./TanstackQueryProps";
import { useState } from "react";

export function TanstackQueryProvider({
	children
}: TanstackQueryProviderProps) {
	const
		[queryClient] =
			useState(() => new QueryClient())

	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	)
}