"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useCallback, useRef } from "react"
import { Header, HeaderRef } from "./_header"
import { Search, SearchProps } from "./_search"
import { Graph, GraphRef } from "./_graph"

export function Stock() {
	const
		headerRef =
			useRef<HeaderRef>(null),
		graphRef =
			useRef<GraphRef>(null),

		onChangeStockData: NonNullable<SearchProps["onChangeStockData"]> = useCallback((data, stock) => {
			headerRef.current?.setStockName(stock)
			graphRef.current?.setData(data)
		}, [])

	return (
		<Card className="max-w-7xl h-136.75">
			<CardHeader className="w-full">
				<Header
					ref={headerRef}
				/>
			</CardHeader>
			<CardContent>
				<Search
					onChangeStockData={onChangeStockData}
				/>
				<Graph
					ref={graphRef}
				/>

			</CardContent>
		</Card>
	)
}