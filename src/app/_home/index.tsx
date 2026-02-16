import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Content } from "./_content";
import { Stock } from "./_stock";
import { News } from "./_news";

export default function Home_() {
	return (
		<div className="min-h-screen flex justify-center items-center bg-muted">
			<div className="w-full max-w-xl p-4">
				<Carousel
				>
					<CarouselContent >
						<CarouselItem>
							<Content />
						</CarouselItem>
						<CarouselItem>
							<Stock />
						</CarouselItem>
						<CarouselItem>
							<News />
						</CarouselItem>
					</CarouselContent>
					<CarouselPrevious
						className="bottom-auto! -top-12! left-1/2! -translate-x-[140%]! translate-y-0!"
					/>

					<CarouselNext
						className="bottom-auto! -top-12! left-1/2! translate-x-[40%]! translate-y-0!"
					/>

				</Carousel>
			</div>
		</div>
	)
}   