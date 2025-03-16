type PlaceholderType = "album" | "artist" | "playlist" | "user" | "generic";
type PlaceholderStyle = "gradient" | "solid" | "pattern";

interface PlaceholderOptions {
	width?: number;
	height?: number;
	text?: string;
	type?: PlaceholderType;
	style?: PlaceholderStyle;
	bgColor?: string;
	textColor?: string;
}

/**
 * Generates a placeholder image URL with customizable parameters
 *
 * @param options Configuration options for the placeholder image
 * @returns A URL string for the placeholder image
 */
export function getPlaceholderImage(options: PlaceholderOptions = {}): string {
	const {
		width = 400,
		height = 400,
		text = "",
		type = "generic",
		style = "gradient",
		bgColor = "",
		textColor = "",
	} = options;

	// Base URL for placeholder service
	const baseUrl = "/musix-pro3.jpg";

	// Build query parameters
	const params = new URLSearchParams();
	params.append("width", width.toString());
	params.append("height", height.toString());

	if (text) {
		params.append("text", text);
	}

	if (bgColor) {
		params.append("bgColor", bgColor);
	}

	if (textColor) {
		params.append("textColor", textColor);
	}

	// For external services like placehold.co or placeholder.com, you could use:
	// return `https://placehold.co/${width}x${height}/${bgColor || '1f2937'}/${textColor || 'ffffff'}?text=${encodeURIComponent(text || type)}`;

	return `${baseUrl}?${params.toString()}`;
}

/**
 * Predefined placeholder generators for common use cases
 */
export const placeholders = {
	/**
	 * Generate an album cover placeholder
	 */
	albumCover: (options: Partial<PlaceholderOptions> = {}) =>
		getPlaceholderImage({
			type: "album",
			text: options.text || "Album",
			width: options.width || 300,
			height: options.height || 300,
			...options,
		}),

	/**
	 * Generate an artist image placeholder
	 */
	artistImage: (options: Partial<PlaceholderOptions> = {}) =>
		getPlaceholderImage({
			type: "artist",
			text: options.text || "Artist",
			width: options.width || 300,
			height: options.height || 300,
			...options,
		}),

	/**
	 * Generate a playlist cover placeholder
	 */
	playlistCover: (options: Partial<PlaceholderOptions> = {}) =>
		getPlaceholderImage({
			type: "playlist",
			text: options.text || "Playlist",
			width: options.width || 300,
			height: options.height || 300,
			...options,
		}),

	/**
	 * Generate a user avatar placeholder
	 */
	userAvatar: (options: Partial<PlaceholderOptions> = {}) =>
		getPlaceholderImage({
			type: "user",
			text: options.text || "User",
			width: options.width || 100,
			height: options.height || 100,
			...options,
		}),
};
