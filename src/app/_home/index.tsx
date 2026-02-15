import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Content } from "./_content";
import { Stock } from "./_stock";

export default function Home_() {
	return (
		<div className="min-h-screen flex justify-center items-center bg-muted p-4">
			<div className="w-full max-w-xs">
				<Carousel>
					<CarouselContent >
						<CarouselItem>
							<Content />
						</CarouselItem>
						<CarouselItem>
							<Stock />
						</CarouselItem>
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>
		</div>
	)
}   