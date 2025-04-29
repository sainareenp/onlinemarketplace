export default function HomeImages() {
	return (
		<div className="space-y-8">
			<section>
				<h2 className="text-2xl font-bold mb-4">Trending Products</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="rounded-md overflow-hidden">
						<img
							src="https://m.media-amazon.com/images/I/51fM0CKG+HL.jpg"
							alt="Playstation"
							className="w-full h-auto object-cover"
						/>
						<p className="text-center mt-2 font-semibold">Playstation</p>
					</div>

					<div className="rounded-md overflow-hidden">
						<img
							src="https://www.techadvisor.com/wp-content/uploads/2025/04/best-phones-2025.jpg?quality=50&strip=all"
							alt="Mobiles"
							className="w-full h-auto object-cover"
						/>
						<p className="text-center mt-2 font-semibold">Mobiles</p>
					</div>

					<div className="rounded-md overflow-hidden">
						<img
							src="https://images.thdstatic.com/productImages/67065f7b-9422-4417-aa6b-b97ae2aa8da8/svn/sand-beige-fabric-stylewell-sofas-couches-113a003snd-64_600.jpg"
							alt="Sofa and Couches"
							className="w-full h-auto object-cover"
						/>
						<p className="text-center mt-2 font-semibold">Sofa and Couches</p>
					</div>
				</div>
			</section>
		</div>
	);
}
