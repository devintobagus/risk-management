"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RangeSelectionProps } from "./RangeSelectionProps";
import { useCallback, useEffect, useState } from "react";
import { StoxyxService } from "@/src/services";
import { Select as SelectPrimitive } from "radix-ui"

const RANGES = [
	{
		label: "Last 1 day",
		range: "1d"
	}, {
		label: "Last 1 month",
		range: "1mo"
	},
	{
		label: "Last 3 month",
		range: "3mo"
	},
	{
		label: "Last 1 year",
		range: "1y"
	},
	{
		label: "Last 5 year",
		range: "5y"
	}
] satisfies {
	label: string,
	range: StoxyxService.Api.V1.Stock.Chart.RangeType
}[]

export function RangeSelection({
	onChangeRange
}: RangeSelectionProps) {
	const
		[range, setRange] =
			useState<StoxyxService.Api.V1.Stock.Chart.RangeType>("1d"),

		onSelectRange: NonNullable<React.ComponentProps<typeof SelectPrimitive.Root>["onValueChange"]> =
			useCallback((value) => {
				setRange(value as never)
			}, [
				setRange
			])

	useEffect(() => {
		if (range) {
			onChangeRange(range)
		}
	}, [
		onChangeRange,
		range
	])


	return (
		<Select value={range} onValueChange={onSelectRange}>
			<SelectTrigger
				className="hidden w-40 rounded-lg sm:ml-auto sm:flex"
				aria-label="Select a time range"
			>
				<SelectValue placeholder="Last 1 day" />
			</SelectTrigger>
			<SelectContent className="rounded-xl">
				{
					RANGES.map((range_, idx) => (
						<SelectItem
							value={range_.range}
							key={`range-${idx}`}
						>
							{range_.label}
						</SelectItem>
					))
				}
			</SelectContent>
		</Select>
	)
}