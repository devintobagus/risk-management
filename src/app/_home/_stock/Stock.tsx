"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useCallback, useRef, useState } from "react"
import { Header, HeaderRef } from "./_header"
import { Search, SearchProps, SearchRef } from "./_search"
import { Graph, GraphProps, GraphRef } from "./_graph"

export function Stock() {
	const
		[isGraphLoading, setIsGraphLoading] =
			useState(false),
		headerRef =
			useRef<HeaderRef>(null),
		graphRef =
			useRef<GraphRef>(null),
		searchRef =
			useRef<SearchRef>(null),

		onChangeStockData: NonNullable<SearchProps["onChangeStockData"]> = useCallback((data, stock) => {
			headerRef.current?.setStockName(stock)
			graphRef.current?.setData(data)
		}, []),

		onChangeRange: NonNullable<GraphProps["rangeSelectionProps"]["onChangeRange"]> =
			useCallback((value) => {
				searchRef.current?.onChangeStockRange(value)
			}, []),

		onSetGraphLoading: NonNullable<SearchProps["onLoadingChange"]> = useCallback((loading) => {
			setIsGraphLoading(loading)
		}, [
			setIsGraphLoading
		])

	return (
		<Card className="max-w-7xl h-136.75">
			<Header
				ref={headerRef}
			/>
			<CardContent className="flex flex-col gap-3">
				<Search
					onChangeStockData={onChangeStockData}
					onLoadingChange={onSetGraphLoading}
					ref={searchRef}
				/>
				<Graph
					ref={graphRef}
					isLoading={isGraphLoading}
					rangeSelectionProps={{
						onChangeRange
					}}
				/>
			</CardContent>
		</Card>
	)
}