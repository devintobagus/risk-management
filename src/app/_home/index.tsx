import { Content } from "./_content";
import { Stock } from "./_stock";

export default function Home_() {
	return (
		<div
			className="min-h-screen flex items-center justify-center flex-row gap-4"
		>
			<Stock />
			<Content />
		</div>
	)
}   