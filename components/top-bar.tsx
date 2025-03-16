"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Bell,
	ChevronLeft,
	ChevronRight,
	Mic,
	Search,
	Sun,
	Moon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { placeholders } from "@/lib/image-placeholder";
// import { placeholders } from "@/lib/placeholder-image"

export function TopBar() {
	const [searchValue, setSearchValue] = useState("");
	const { setTheme, theme } = useTheme();

	return (
		<div className="h-16 flex items-center justify-between px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="flex items-center gap-2 md:gap-4">
				<div className="flex items-center gap-1">
					<Button variant="ghost" size="icon" className="md:hidden">
						<ChevronLeft className="h-4 w-4" />
						<span className="sr-only">Back</span>
					</Button>
					<Button variant="ghost" size="icon">
						<ChevronLeft className="h-4 w-4" />
						<span className="sr-only">Back</span>
					</Button>
					<Button variant="ghost" size="icon">
						<ChevronRight className="h-4 w-4" />
						<span className="sr-only">Forward</span>
					</Button>
				</div>
				<div className="relative hidden md:flex items-center max-w-md w-full">
					<Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Search for songs, artists, or albums..."
						className="pl-8 bg-muted/50"
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
					/>
					<Button variant="ghost" size="icon" className="absolute right-0">
						<Mic className="h-4 w-4" />
						<span className="sr-only">Voice search</span>
					</Button>
				</div>
			</div>
			<div className="flex items-center gap-2">
				<Button
					variant="ghost"
					size="icon"
					onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
				>
					{theme === "dark" ? (
						<Sun className="h-4 w-4" />
					) : (
						<Moon className="h-4 w-4" />
					)}
					<span className="sr-only">Toggle theme</span>
				</Button>
				<Button variant="ghost" size="icon">
					<Bell className="h-4 w-4" />
					<span className="sr-only">Notifications</span>
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="relative h-8 w-8 rounded-full">
							<Avatar className="h-8 w-8">
								<AvatarImage
									src={placeholders.userAvatar({
										text: "JD",
										width: 32,
										height: 32,
									})}
									alt="@user"
								/>
								<AvatarFallback>JD</AvatarFallback>
							</Avatar>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56" align="end" forceMount>
						<DropdownMenuItem>Profile</DropdownMenuItem>
						<DropdownMenuItem>Settings</DropdownMenuItem>
						<DropdownMenuItem>Subscription</DropdownMenuItem>
						<DropdownMenuItem>Sign out</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}
