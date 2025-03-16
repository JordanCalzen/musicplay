"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Play, Plus } from "lucide-react";
import { placeholders } from "@/lib/image-placeholder";
// import { placeholders } from "@/lib/placeholder-image";

export function HomePage() {
	const [activeTab, setActiveTab] = useState("for-you");

	const featuredPlaylists = [
		{
			id: 1,
			title: "Today's Top Hits",
			description: "The hottest tracks right now",
			coverUrl: placeholders.playlistCover({
				text: "Top Hits",
				width: 200,
				height: 200,
			}),
			color: "from-rose-500 to-indigo-700",
		},
		{
			id: 2,
			title: "Discover Weekly",
			description: "Your weekly mixtape of fresh music",
			coverUrl: placeholders.playlistCover({
				text: "Discover",
				width: 200,
				height: 200,
			}),
			color: "from-emerald-500 to-cyan-600",
		},
		{
			id: 3,
			title: "Chill Vibes",
			description: "Relax and unwind with these smooth tracks",
			coverUrl: placeholders.playlistCover({
				text: "Chill",
				width: 200,
				height: 200,
			}),
			color: "from-amber-400 to-orange-600",
		},
		{
			id: 4,
			title: "Workout Motivation",
			description: "Energy-boosting tracks for your workout",
			coverUrl: placeholders.playlistCover({
				text: "Workout",
				width: 200,
				height: 200,
			}),
			color: "from-red-600 to-purple-600",
		},
	];

	const recentlyPlayed = [
		{
			id: 1,
			title: "Blinding Lights",
			artist: "The Weeknd",
			coverUrl: placeholders.albumCover({
				text: "Blinding Lights",
				width: 150,
				height: 150,
			}),
		},
		{
			id: 2,
			title: "As It Was",
			artist: "Harry Styles",
			coverUrl: placeholders.albumCover({
				text: "As It Was",
				width: 150,
				height: 150,
			}),
		},
		{
			id: 3,
			title: "Heat Waves",
			artist: "Glass Animals",
			coverUrl: placeholders.albumCover({
				text: "Heat Waves",
				width: 150,
				height: 150,
			}),
		},
		{
			id: 4,
			title: "Stay",
			artist: "The Kid LAROI, Justin Bieber",
			coverUrl: placeholders.albumCover({
				text: "Stay",
				width: 150,
				height: 150,
			}),
		},
		{
			id: 5,
			title: "Easy On Me",
			artist: "Adele",
			coverUrl: placeholders.albumCover({
				text: "Easy On Me",
				width: 150,
				height: 150,
			}),
		},
		{
			id: 6,
			title: "Bad Habits",
			artist: "Ed Sheeran",
			coverUrl: placeholders.albumCover({
				text: "Bad Habits",
				width: 150,
				height: 150,
			}),
		},
	];

	const newReleases = [
		{
			id: 1,
			title: "Midnights",
			artist: "Taylor Swift",
			coverUrl: placeholders.albumCover({
				text: "Midnights",
				width: 150,
				height: 150,
			}),
		},
		{
			id: 2,
			title: "Un Verano Sin Ti",
			artist: "Bad Bunny",
			coverUrl: placeholders.albumCover({
				text: "Un Verano Sin Ti",
				width: 150,
				height: 150,
			}),
		},
		{
			id: 3,
			title: "Harry's House",
			artist: "Harry Styles",
			coverUrl: placeholders.albumCover({
				text: "Harry's House",
				width: 150,
				height: 150,
			}),
		},
		{
			id: 4,
			title: "Renaissance",
			artist: "Beyoncé",
			coverUrl: placeholders.albumCover({
				text: "Renaissance",
				width: 150,
				height: 150,
			}),
		},
		{
			id: 5,
			title: "Mr. Morale & The Big Steppers",
			artist: "Kendrick Lamar",
			coverUrl: placeholders.albumCover({
				text: "Mr. Morale",
				width: 150,
				height: 150,
			}),
		},
		{
			id: 6,
			title: "Honestly, Nevermind",
			artist: "Drake",
			coverUrl: placeholders.albumCover({
				text: "Honestly, Nevermind",
				width: 150,
				height: 150,
			}),
		},
	];

	return (
		<div className="p-6 space-y-8">
			<section className="space-y-4">
				<h2 className="text-3xl font-bold tracking-tight">Good afternoon</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{featuredPlaylists.map((playlist) => (
						<Link href={`/playlist/${playlist.id}`} key={playlist.id}>
							<Card className="overflow-hidden transition-all hover:scale-[1.02] hover:shadow-lg">
								<CardContent className="p-0">
									<div
										className={`bg-gradient-to-br ${playlist.color} aspect-[2/1] relative`}
									>
										<div className="absolute inset-0 flex items-center p-4">
											<div className="w-16 h-16 mr-4 overflow-hidden rounded-md shrink-0">
												<Image
													src={playlist.coverUrl || "/placeholder.svg"}
													alt={playlist.title}
													width={64}
													height={64}
													className="object-cover w-full h-full"
												/>
											</div>
											<div className="flex-1">
												<h3 className="text-lg font-semibold text-white line-clamp-1">
													{playlist.title}
												</h3>
												<p className="text-sm text-white/80 line-clamp-1">
													{playlist.description}
												</p>
											</div>
											<Button
												size="icon"
												variant="secondary"
												className="ml-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
											>
												<Play className="h-4 w-4 fill-current" />
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			</section>

			<section>
				<Tabs
					defaultValue={activeTab}
					onValueChange={setActiveTab}
					className="w-full"
				>
					<div className="flex items-center justify-between mb-4">
						<TabsList>
							<TabsTrigger value="for-you">For You</TabsTrigger>
							<TabsTrigger value="trending">Trending</TabsTrigger>
							<TabsTrigger value="new-releases">New Releases</TabsTrigger>
						</TabsList>
					</div>
					<TabsContent value="for-you" className="space-y-6">
						<div>
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-2xl font-semibold">Recently Played</h3>
								<Button variant="link">See all</Button>
							</div>
							<ScrollArea>
								<div className="flex space-x-4 pb-4">
									{recentlyPlayed.map((item) => (
										<AlbumCard
											key={item.id}
											title={item.title}
											artist={item.artist}
											coverUrl={item.coverUrl}
										/>
									))}
								</div>
								<ScrollBar orientation="horizontal" />
							</ScrollArea>
						</div>
						<div>
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-2xl font-semibold">Made For You</h3>
								<Button variant="link">See all</Button>
							</div>
							<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
								{recentlyPlayed.slice(0, 6).map((item) => (
									<AlbumCard
										key={item.id}
										title={item.title}
										artist={item.artist}
										coverUrl={item.coverUrl}
									/>
								))}
							</div>
						</div>
					</TabsContent>
					<TabsContent value="trending" className="space-y-6">
						<div>
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-2xl font-semibold">Trending Now</h3>
								<Button variant="link">See all</Button>
							</div>
							<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
								{recentlyPlayed
									.slice(0, 6)
									.reverse()
									.map((item) => (
										<AlbumCard
											key={item.id}
											title={item.title}
											artist={item.artist}
											coverUrl={item.coverUrl}
										/>
									))}
							</div>
						</div>
					</TabsContent>
					<TabsContent value="new-releases" className="space-y-6">
						<div>
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-2xl font-semibold">New Albums & Singles</h3>
								<Button variant="link">See all</Button>
							</div>
							<ScrollArea>
								<div className="flex space-x-4 pb-4">
									{newReleases.map((item) => (
										<AlbumCard
											key={item.id}
											title={item.title}
											artist={item.artist}
											coverUrl={item.coverUrl}
										/>
									))}
								</div>
								<ScrollBar orientation="horizontal" />
							</ScrollArea>
						</div>
					</TabsContent>
				</Tabs>
			</section>

			<section>
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-2xl font-semibold">Based on your listening</h3>
					<Button variant="link">See all</Button>
				</div>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
					{newReleases.slice(0, 6).map((item) => (
						<AlbumCard
							key={item.id}
							title={item.title}
							artist={item.artist}
							coverUrl={item.coverUrl}
						/>
					))}
				</div>
			</section>
		</div>
	);
}

interface AlbumCardProps {
	title: string;
	artist: string;
	coverUrl?: string; // Optional in case it's undefined
}

function AlbumCard({ title, artist, coverUrl }: AlbumCardProps) {
	return (
		<div className="w-[150px] space-y-3 group relative">
			<div className="relative aspect-square overflow-hidden rounded-md">
				<Image
					src={coverUrl || "/placeholder.svg"}
					alt={title}
					width={150}
					height={150}
					className="object-cover transition-all group-hover:scale-105 group-hover:brightness-75"
				/>
				<div className="absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity">
					<Button
						size="icon"
						variant="secondary"
						className="rounded-full shadow-lg"
					>
						<Play className="h-4 w-4 fill-current" />
					</Button>
				</div>
				<Button
					size="icon"
					variant="ghost"
					className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
				>
					<Plus className="h-4 w-4" />
				</Button>
			</div>
			<div className="space-y-1 text-sm">
				<h4 className="font-medium leading-none line-clamp-1">{title}</h4>
				<p className="text-xs text-muted-foreground line-clamp-1">{artist}</p>
			</div>
		</div>
	);
}
