import { HomePage } from "@/components/homepage";
import { MusicPlayer } from "@/components/music-player";
import { Sidebar } from "@/components/sidebar";
import { TopBar } from "@/components/top-bar";
// import { HomePage } from "@/components/home-page"

export default function Home() {
	return (
		<div className="flex h-screen bg-background text-foreground overflow-hidden">
			<Sidebar />
			<div className="flex flex-col flex-1 overflow-hidden">
				<TopBar />
				<main className="flex-1 overflow-auto">
					<HomePage />
				</main>
				<MusicPlayer />
			</div>
		</div>
	);
}
