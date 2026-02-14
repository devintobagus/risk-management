"use client"

import { useQuery } from "@tanstack/react-query";
import { SearchProps } from "./SearchProps";
import { useCallback, useEffect, useRef, useState } from "react";
import { StoxyxService } from "@/src/services";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";

export function Search({
	onChangeStockData
}: SearchProps) {
	const
		[stock, setStock] =
			useState<string>(""),
		searchStockRef
			= useRef<HTMLInputElement>(null),
		{ data } =
			useQuery({
				queryKey: ["stock", stock],
				queryFn({ signal }) {
					return StoxyxService.Api.V1.Stock.Chart.fn({
						range: "1d",
						stock: stock,
					}, {
						signal
					}).then(res => {
						return res?.data ?? null
					})
				},
				staleTime: 10 * 1000 * 60,
				enabled: !!stock
			}),
		onFetchStockData: NonNullable<React.ComponentProps<"button">["onClick"]> = useCallback(() => {
			if (searchStockRef.current?.value) {
				setStock(searchStockRef.current.value)
			}
		}, [
			setStock
		])

	useEffect(() => {
		if (data?.length) {
			onChangeStockData(data, stock)
		} else {
			onChangeStockData([], "")
		}
	}, [
		onChangeStockData,
		data,
		stock
	])

	return (
		<InputGroup>
			<InputGroupInput required ref={searchStockRef} placeholder="Type to search..." />
			<InputGroupAddon align="inline-end">
				<InputGroupButton
					className="cursor-pointer"
					variant="secondary"
					onClick={onFetchStockData}
				>Search</InputGroupButton>
			</InputGroupAddon>
		</InputGroup>
	)
}