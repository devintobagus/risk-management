"use client"

import { useImperativeHandle, useState } from "react"
import { HeaderProps } from "./HeaderProps"
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Header({
	ref
}: HeaderProps) {

	const
		[stockName, setStockName]
			= useState<string | null>(null)

	useImperativeHandle(ref, () => {
		return {
			setStockName(stock_) {
				setStockName(stock_)
			}
		}
	}, [
		setStockName
	])

	return (
		<CardHeader>
			<CardTitle>{stockName || "Check your news here"}</CardTitle>
			<CardDescription> News aggregated from Google News RSS. For informational purposes only — not financial advice.</CardDescription>
		</CardHeader>
	)

}