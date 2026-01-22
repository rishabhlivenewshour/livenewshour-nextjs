export {};

declare global {
	interface Window {
		// Facebook
		FB?: {
			init: (params: {
				appId?: string;
				xfbml?: boolean;
				version: string;
			}) => void;
			XFBML: {
				parse: () => void;
			};
		};
		fbAsyncInit?: () => void;

		// Instagram
		instgrm?: {
			Embeds: {
				process: () => void;
			};
		};
	}
}

export interface YoutubeThumbnail {
	url: string;
	height: number;
	width: number;
}

export interface YoutubeThumbnails {
	default: YoutubeThumbnail;
	medium: YoutubeThumbnail;
	high: YoutubeThumbnail;
}

export interface YoutubeVideo {
	id: {
		videoId: string;
	};
	snippet: {
		title: string;
		thumbnails: YoutubeThumbnails;
		publishedAt: string;
	};
}

export interface YoutubeChannel {
	snippet: {
		title: string;
		thumbnails: YoutubeThumbnails;
	};
	statistics: {
		subscriberCount: string;
	};
}
