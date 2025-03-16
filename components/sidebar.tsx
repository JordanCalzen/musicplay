"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
	Compass,
	Home,
	Library,
	ListMusic,
	PlusCircle,
	Radio,
	Search,
	Settings,
	User,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
	const pathname = usePathname();

	const routes = [
		{
			label: "Home",
			icon: Home,
			href: "/",
			active: pathname === "/",
		},
		{
			label: "Discover",
			icon: Compass,
			href: "/discover",
			active: pathname === "/discover",
		},
		{
			label: "Search",
			icon: Search,
			href: "/search",
			active: pathname === "/search",
		},
		{
			label: "Radio",
			icon: Radio,
			href: "/radio",
			active: pathname === "/radio",
		},
	];

	const playlists = [
		"Chill Vibes",
		"Workout Mix",
		"Study Focus",
		"Party Hits",
		"Road Trip",
		"Morning Coffee",
		"Evening Wind Down",
		"Weekend Mood",
		"Throwback Classics",
		"New Discoveries",
	];

	return (
		<div className="w-64 flex-shrink-0 hidden md:flex flex-col h-full border-r bg-card">
			<div className="p-4">
				<Link href="/" className="flex items-center gap-2 mb-6">
					<div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
						<ListMusic className="h-4 w-4 text-primary-foreground" />
					</div>
					<h1 className="text-xl font-bold">Melodify</h1>
				</Link>
				<div className="space-y-1">
					{routes.map((route) => (
						<Button
							key={route.href}
							variant={route.active ? "secondary" : "ghost"}
							className={cn(
								"w-full justify-start",
								route.active && "bg-secondary/50"
							)}
							asChild
						>
							<Link href={route.href}>
								<route.icon className="h-4 w-4 mr-3" />
								{route.label}
							</Link>
						</Button>
					))}
				</div>
			</div>
			<Separator />
			<div className="p-4">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-sm font-semibold">Your Library</h2>
					<Button variant="ghost" size="icon" className="h-7 w-7">
						<PlusCircle className="h-4 w-4" />
					</Button>
				</div>
				<div className="space-y-1 mb-4">
					<Button variant="ghost" className="w-full justify-start" asChild>
						<Link href="/library">
							<Library className="h-4 w-4 mr-3" />
							Your Library
						</Link>
					</Button>
					<Button variant="ghost" className="w-full justify-start" asChild>
						<Link href="/profile">
							<User className="h-4 w-4 mr-3" />
							Profile
						</Link>
					</Button>
					<Button variant="ghost" className="w-full justify-start" asChild>
						<Link href="/settings">
							<Settings className="h-4 w-4 mr-3" />
							Settings
						</Link>
					</Button>
				</div>
			</div>
			<Separator />
			<div className="flex-1 overflow-hidden">
				<div className="p-4">
					<h2 className="text-sm font-semibold mb-4">Your Playlists</h2>
					<ScrollArea className="h-[calc(100vh-350px)]">
						<div className="space-y-1">
							{playlists.map((playlist, i) => (
								<Button
									key={i}
									variant="ghost"
									className="w-full justify-start font-normal"
									asChild
								>
									<Link href={`/playlist/${i}`}>{playlist}</Link>
								</Button>
							))}
						</div>
					</ScrollArea>
				</div>
			</div>
		</div>
	);
}
