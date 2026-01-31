"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormProps } from "./_form"
import { useCallback, useRef } from "react"
import { Footer, FooterRef } from "./_footer"

export function Content() {
	const
		footerRef
			= useRef<FooterRef>(null),

		onAfterSubmit: NonNullable<FormProps["onAfterSubmit"]> =
			useCallback((size) => {
				footerRef.current?.setSize(size)
			}, [])

	return (
		<div
			className="min-h-screen flex items-center justify-center"
		>
			<Card className="max-w-7xl">
				<CardHeader className="w-full justify-center">
					<CardTitle>Risk Management</CardTitle>
					<CardDescription>The tool helps you plan and execute smarter trades with proper risk control.</CardDescription>
				</CardHeader>
				<CardContent>
					<Form
						onAfterSubmit={onAfterSubmit}
					/>
				</CardContent>
				<CardFooter>
					<Footer
						ref={footerRef}
					/>
				</CardFooter>
			</Card>
		</div>
	)
}