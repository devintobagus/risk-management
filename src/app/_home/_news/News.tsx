"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Header, HeaderRef } from "./_header"
import { useCallback, useRef, useState } from "react"
import { Search, SearchProps } from "./_search"
import { List, ListRef } from "./_list"

export function News() {
	const
		[isListLoading, setIsListLoading] =
			useState(false),
		headerRef =
			useRef<HeaderRef>(null),
		listRef =
			useRef<ListRef>(null),

		onChangeNewsData: NonNullable<SearchProps["onChangeNewsData"]> = useCallback((data, stock) => {
			headerRef.current?.setStockName(stock)
			listRef.current?.setNewsList(data)
		}, []),
		onLoadingChage: NonNullable<SearchProps["onLoadingChange"]> = useCallback((loading) => {
			setIsListLoading(loading)
		}, [
			setIsListLoading
		])

	return (
		<Card className="max-w-7xl h-136.75">
			<Header
				ref={headerRef}
			/>
			<CardContent className="flex flex-col gap-3">
				<Search
					onChangeNewsData={onChangeNewsData}
					onLoadingChange={onLoadingChage}
				/>
				<List
					ref={listRef}
					isLoading={isListLoading}
				/>
			</CardContent>
		</Card>
	)
}