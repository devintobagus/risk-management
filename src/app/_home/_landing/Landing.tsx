"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calculator, TrendingUp, Newspaper, ChevronDown, ArrowRight } from "lucide-react"
import { useRef } from "react"
import { Content } from "../_content"
import { Stock } from "../_stock"
import { News } from "../_news"

export function Landing() {
	const featuresRef = useRef<HTMLDivElement>(null)

	return (
		<div className="min-h-screen bg-zinc-950 text-white">
			<section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
				<div
					className="absolute inset-0"
					style={{
						backgroundImage:
							"linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
						backgroundSize: "60px 60px",
					}}
				/>
				<div
					className="absolute inset-0"
					style={{
						background:
							"radial-gradient(ellipse 80% 50% at 50% -10%, rgba(34,197,94,0.12), transparent)",
					}}
				/>

				<div className="relative z-10 text-center max-w-3xl">
					<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm mb-8">
						<span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
						Indonesian Stock Market (IDX)
					</div>

					<h1 className="text-7xl font-bold tracking-tight mb-4 bg-linear-to-b from-white to-zinc-400 bg-clip-text text-transparent">
						Stoxyx
					</h1>

					<p className="text-xl text-zinc-400 mb-10 max-w-lg mx-auto leading-relaxed">
						Plan and execute smarter trades with proper risk control, real-time charts, and market news.
					</p>

					<div className="flex flex-wrap gap-2 justify-center mb-10">
						{["Risk Management", "Stock Charts", "Market News"].map((label) => (
							<span
								key={label}
								className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-sm"
							>
								{label}
							</span>
						))}
					</div>

					<Button
						onClick={() =>
							featuresRef.current?.scrollIntoView({ behavior: "smooth" })
						}
						variant="outline"
						className="border-white/20 bg-white/5 hover:bg-white/10 text-white gap-2 cursor-pointer"
					>
						Explore Features <ChevronDown className="w-4 h-4" />
					</Button>
				</div>
			</section>

			<section ref={featuresRef} className="py-24 px-4 bg-zinc-900">
				<div className="max-w-5xl mx-auto">
					<div className="text-center mb-14">
						<h2 className="text-3xl font-bold mb-3">Core Features</h2>
						<p className="text-zinc-400">Everything you need to trade with confidence</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<FeatureCard
							icon={<Calculator className="w-6 h-6" />}
							title="Risk Management"
							description="Calculate your optimal position size based on account balance, risk percentage, entry price, and stop loss."
							color="text-blue-400"
							bgColor="bg-blue-500/10"
							dialogContent={<Content />}
							dialogClassName="dark sm:max-w-md p-0 overflow-hidden"
						/>
						<FeatureCard
							icon={<TrendingUp className="w-6 h-6" />}
							title="Stock Charts"
							description="Visualize price history for any IDX stock with dynamic trend coloring and multiple time ranges."
							color="text-green-400"
							bgColor="bg-green-500/10"
							dialogContent={<Stock />}
							dialogClassName="dark sm:max-w-3xl p-0 overflow-y-auto max-h-[90vh]"
						/>
						<FeatureCard
							icon={<Newspaper className="w-6 h-6" />}
							title="Market News"
							description="Stay up to date with the latest market news and search for news related to any stock."
							color="text-orange-400"
							bgColor="bg-orange-500/10"
							dialogContent={<News />}
							dialogClassName="dark sm:max-w-3xl p-0 overflow-y-auto max-h-[90vh]"
						/>
					</div>
				</div>
			</section>
		</div>
	)
}

interface FeatureCardProps {
	icon: React.ReactNode
	title: string
	description: string
	color: string
	bgColor: string
	dialogContent: React.ReactNode
	dialogClassName: string
}

function FeatureCard({
	icon,
	title,
	description,
	color,
	bgColor,
	dialogContent,
	dialogClassName,
}: FeatureCardProps) {
	return (
		<div className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-white/20 hover:bg-white/8 transition-all duration-300 flex flex-col">
			<div className={`inline-flex p-3 rounded-xl ${bgColor} ${color} mb-4 self-start`}>
				{icon}
			</div>
			<h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
			<p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">{description}</p>
			<Dialog>
				<DialogTrigger asChild>
					<Button
						variant="outline"
						className="w-full border-white/10 bg-transparent hover:bg-white/10 text-white hover:text-white group-hover:border-white/30 transition-all gap-2 cursor-pointer"
					>
						Try it <ArrowRight className="w-4 h-4" />
					</Button>
				</DialogTrigger>
				<DialogContent className={dialogClassName}>
					<DialogTitle className="sr-only">{title}</DialogTitle>
					{dialogContent}
				</DialogContent>
			</Dialog>
		</div>
	)
}
