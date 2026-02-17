"use client"

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { SearchProps } from "./SearchProps";
import { useCallback, useEffect, useRef, useState } from "react";
import { StoxyxService } from "@/src/services";
import { useQuery } from "@tanstack/react-query";

export function Search({
	onChangeNewsData
}: SearchProps) {
	const
		[stock, setStock]
			= useState<string>(""),
		searchStockRef
			= useRef<HTMLInputElement>(null),

		{ data } =
			useQuery({
				queryKey: ["news", stock],
				queryFn({ signal }) {
					return StoxyxService.Api.V1.News.List.fn({
						query: stock
					}, {
						signal
					}).then(res => {
						return res?.data ?? null
					})
				},
				staleTime: 10 * 1000 * 60,
				retry: 3,
				enabled: !!stock
			}),
		onFetchNewsData: NonNullable<React.ComponentProps<"button">["onClick"]>
			= useCallback(() => {
				if (searchStockRef.current?.value) {
					setStock(searchStockRef.current.value.toUpperCase())
				}
			}, [
				setStock
			])

	useEffect(() => {
		if (data?.length) {
			onChangeNewsData(data, stock)
		}
	}, [
		onChangeNewsData,
		data,
		stock
	])

	return (
		<InputGroup>
			<InputGroupInput required ref={searchStockRef} placeholder="Search IDX stocks (e.g. BBCA, TLKM)" />
			<InputGroupAddon align="inline-end">
				<InputGroupButton
					className="cursor-pointer"
					variant="secondary"
					onClick={onFetchNewsData}
				>Search</InputGroupButton>
			</InputGroupAddon>
		</InputGroup>
	)
}