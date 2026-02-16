"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Header, HeaderRef } from "./_header"
import { useCallback, useRef } from "react"
import { Search, SearchProps } from "./_search"
import { List, ListRef } from "./_list"

export function News() {
	const
		headerRef =
			useRef<HeaderRef>(null),
		listRef =
			useRef<ListRef>(null),

		onChangeNewsData: NonNullable<SearchProps["onChangeNewsData"]> = useCallback((data, stock) => {
			headerRef.current?.setStockName(stock)
			listRef.current?.setNewsList(data)
		}, [])

	return (
		<Card className="max-w-7xl h-136.75">
			<Header
				ref={headerRef}
			/>
			<CardContent className="flex flex-col gap-3">
				<Search
					onChangeNewsData={onChangeNewsData}
				/>
				<List
					ref={listRef}
				/>
			</CardContent>
		</Card>
	)
}