"use client";

import { useState, useRef, useEffect, SetStateAction } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
	Heart,
	ListMusic,
	Maximize2,
	Mic,
	Repeat,
	Shuffle,
	SkipBack,
	SkipForward,
	Volume2,
	VolumeX,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function MusicPlayer() {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState<number>(217); // Ensure it's always a number
	const [volume, setVolume] = useState(70);
	const [isMuted, setIsMuted] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const [showLyrics, setShowLyrics] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);

	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const animationRef = useRef<number | null>(null);

	// Simulate audio waveform visualization
	useEffect(() => {
		if (!canvasRef.current) return;

		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const barWidth = 2;
		const barGap = 1;
		const barCount = Math.floor(canvas.width / (barWidth + barGap));

		const renderFrame = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			if (isPlaying) {
				for (let i = 0; i < barCount; i++) {
					const multiplier =
						1 - Math.abs((i - barCount / 2) / (barCount / 2)) * 0.8;
					const height =
						Math.random() * canvas.height * 0.8 * multiplier +
						canvas.height * 0.2;

					const x = i * (barWidth + barGap);
					const y = canvas.height - height;

					ctx.fillStyle = `hsl(var(--primary) / ${
						0.3 + (height / canvas.height) * 0.7
					})`;
					ctx.fillRect(x, y, barWidth, height);
				}
			} else {
				for (let i = 0; i < barCount; i++) {
					const multiplier =
						1 - Math.abs((i - barCount / 2) / (barCount / 2)) * 0.8;
					const height =
						canvas.height * 0.2 +
						Math.sin(i * 0.2) * canvas.height * 0.1 * multiplier;

					const x = i * (barWidth + barGap);
					const y = canvas.height - height;

					ctx.fillStyle = `hsl(var(--primary) / 0.5)`;
					ctx.fillRect(x, y, barWidth, height);
				}
			}

			animationRef.current = requestAnimationFrame(renderFrame);
		};
		renderFrame();

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [isPlaying]);

	// Simulate progress when playing
	useEffect(() => {
		let interval: string | number | NodeJS.Timeout | undefined;
		if (isPlaying) {
			interval = setInterval(() => {
				setCurrentTime((prev) => {
					if (prev >= duration) {
						setIsPlaying(false);
						return 0;
					}
					return prev + 1;
				});
			}, 1000);
		}

		return () => clearInterval(interval);
	}, [isPlaying, duration]);

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, "0")}`;
	};

	const handlePlayPause = () => {
		setIsPlaying(!isPlaying);
	};

	const handleVolumeChange = (value: number[]) => {
		setVolume(value[0]);
		if (value[0] === 0) {
			setIsMuted(true);
		} else {
			setIsMuted(false);
		}
	};

	const handleProgressChange = (value: SetStateAction<number>[]) => {
		setCurrentTime(value[0]);
	};

	const toggleMute = () => {
		setIsMuted(!isMuted);
	};

	const toggleLike = () => {
		setIsLiked(!isLiked);
	};

	const toggleLyrics = () => {
		setShowLyrics(!showLyrics);
	};

	const toggleFullscreen = () => {
		setIsFullscreen(!isFullscreen);
	};

	return (
		<div
			className={cn(
				"border-t bg-card text-card-foreground backdrop-blur-lg supports-[backdrop-filter]:bg-card/80 transition-all",
				isFullscreen ? "fixed inset-0 z-50 border-0" : "relative"
			)}
		>
			{isFullscreen && (
				<div className="absolute inset-0 bg-gradient-to-b from-background/10 to-background z-0" />
			)}

			<div
				className={cn(
					"relative z-10 grid grid-cols-3 items-center gap-4 p-4",
					isFullscreen &&
						"h-full max-w-6xl mx-auto grid-cols-1 grid-rows-[auto_1fr_auto] p-8"
				)}
			>
				{/* Now Playing - Left Section */}
				<div className="flex items-center gap-4">
					<div
						className={cn(
							"relative overflow-hidden rounded",
							isFullscreen
								? "w-full max-w-md mx-auto aspect-square"
								: "w-14 h-14"
						)}
					>
						<Image
							src="/musix-pro2.jpg"
							alt="Album cover"
							width={isFullscreen ? 400 : 56}
							height={isFullscreen ? 400 : 56}
							className="object-cover w-full h-full"
						/>
					</div>
					<div
						className={cn(
							"flex flex-col",
							isFullscreen && "text-center w-full mt-6"
						)}
					>
						<span
							className={cn(
								"font-medium line-clamp-1",
								isFullscreen && "text-2xl"
							)}
						>
							Blinding Lights
						</span>
						<span
							className={cn(
								"text-sm text-muted-foreground line-clamp-1",
								isFullscreen && "text-base"
							)}
						>
							The Weeknd
						</span>
					</div>
					<Button
						variant="ghost"
						size="icon"
						className={cn(
							"text-muted-foreground hover:text-primary",
							isLiked && "text-primary",
							isFullscreen && "absolute top-8 right-8"
						)}
						onClick={toggleLike}
					>
						<Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
						<span className="sr-only">Like</span>
					</Button>
				</div>

				{/* Player Controls - Middle Section */}
				<div
					className={cn(
						"flex flex-col items-center gap-2",
						isFullscreen && "mt-8 order-last"
					)}
				>
					{isFullscreen && (
						<div className="w-full max-w-2xl mx-auto mb-8">
							<canvas
								ref={canvasRef}
								width="800"
								height="200"
								className="w-full h-[200px]"
							/>
						</div>
					)}

					<div className="flex items-center gap-4">
						<Button
							variant="ghost"
							size="icon"
							className="text-muted-foreground hover:text-foreground"
						>
							<Shuffle className="h-4 w-4" />
							<span className="sr-only">Shuffle</span>
						</Button>
						<Button
							variant="ghost"
							size="icon"
							className="text-muted-foreground hover:text-foreground"
						>
							<SkipBack className="h-4 w-4" />
							<span className="sr-only">Previous</span>
						</Button>
						<Button
							variant="secondary"
							size="icon"
							className={cn(
								"rounded-full h-10 w-10",
								isFullscreen && "h-14 w-14"
							)}
							onClick={handlePlayPause}
						>
							{isPlaying ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="h-5 w-5"
								>
									<rect x="6" y="4" width="4" height="16" />
									<rect x="14" y="4" width="4" height="16" />
								</svg>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="h-5 w-5"
								>
									<path d="M8 5.14v14l11-7-11-7z" />
								</svg>
							)}
							<span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
						</Button>
						<Button
							variant="ghost"
							size="icon"
							className="text-muted-foreground hover:text-foreground"
						>
							<SkipForward className="h-4 w-4" />
							<span className="sr-only">Next</span>
						</Button>
						<Button
							variant="ghost"
							size="icon"
							className="text-muted-foreground hover:text-foreground"
						>
							<Repeat className="h-4 w-4" />
							<span className="sr-only">Repeat</span>
						</Button>
					</div>

					<div
						className={cn(
							"w-full flex items-center gap-2",
							isFullscreen && "max-w-2xl mx-auto"
						)}
					>
						<div className="text-xs text-muted-foreground w-9 text-right">
							{formatTime(currentTime)}
						</div>
						<Slider
							value={[currentTime]}
							max={duration}
							step={1}
							onValueChange={handleProgressChange}
							className="flex-1"
						/>
						<div className="text-xs text-muted-foreground w-9">
							{formatTime(duration)}
						</div>
					</div>
				</div>

				{/* Additional Controls - Right Section */}
				<div
					className={cn(
						"flex items-center justify-end gap-2",
						isFullscreen && "absolute top-8 left-8 right-8 justify-between"
					)}
				>
					<Button
						variant="ghost"
						size="icon"
						onClick={toggleLyrics}
						className={cn(
							"text-muted-foreground hover:text-foreground",
							showLyrics && "text-primary"
						)}
					>
						<Mic className="h-4 w-4" />
						<span className="sr-only">Lyrics</span>
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="text-muted-foreground hover:text-foreground"
					>
						<ListMusic className="h-4 w-4" />
						<span className="sr-only">Queue</span>
					</Button>
					<div className="hidden md:flex items-center gap-2">
						<Button
							variant="ghost"
							size="icon"
							onClick={toggleMute}
							className="text-muted-foreground hover:text-foreground"
						>
							{isMuted || volume === 0 ? (
								<VolumeX className="h-4 w-4" />
							) : (
								<Volume2 className="h-4 w-4" />
							)}
							<span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
						</Button>
						<Slider
							value={[isMuted ? 0 : volume]}
							max={100}
							step={1}
							onValueChange={handleVolumeChange}
							className="w-24"
						/>
					</div>
					<Button
						variant="ghost"
						size="icon"
						onClick={toggleFullscreen}
						className="text-muted-foreground hover:text-foreground"
					>
						<Maximize2 className="h-4 w-4" />
						<span className="sr-only">Fullscreen</span>
					</Button>
				</div>

				{/* Lyrics Section (only in fullscreen) */}
				{isFullscreen && showLyrics && (
					<div className="max-w-lg mx-auto text-center mt-8 space-y-4 overflow-auto max-h-[40vh]">
						<h3 className="text-xl font-semibold mb-4">Lyrics</h3>
						<p className="text-muted-foreground">I've been tryna call</p>
						<p className="text-muted-foreground">
							I've been on my own for long enough
						</p>
						<p className="text-muted-foreground">
							Maybe you can show me how to love, maybe
						</p>
						<p className="text-primary font-medium text-lg">
							I'm going through withdrawals
						</p>
						<p className="text-muted-foreground">
							You don't even have to do too much
						</p>
						<p className="text-muted-foreground">
							You can turn me on with just a touch, baby
						</p>
						<p className="text-muted-foreground">
							I look around and Sin City's cold and empty (oh)
						</p>
						<p className="text-muted-foreground">
							No one's around to judge me (oh)
						</p>
						<p className="text-muted-foreground">
							I can't see clearly when you're gone
						</p>
					</div>
				)}
			</div>

			{/* Mini player for mobile */}
			<div className="md:hidden px-4 pb-4">
				<div className="flex items-center gap-2">
					<Button
						variant="ghost"
						size="icon"
						onClick={toggleMute}
						className="text-muted-foreground hover:text-foreground"
					>
						{isMuted || volume === 0 ? (
							<VolumeX className="h-4 w-4" />
						) : (
							<Volume2 className="h-4 w-4" />
						)}
					</Button>
					<Slider
						value={[isMuted ? 0 : volume]}
						max={100}
						step={1}
						onValueChange={handleVolumeChange}
						className="flex-1"
					/>
				</div>
			</div>
		</div>
	);
}
