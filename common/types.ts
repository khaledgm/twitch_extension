export enum SocialFeedPlatforms {
    youtube = "YouTube",
    facebook = "Facebook",
    twitch = "Twitch",
    twitter = "Twitter",
    gaimz = "Gaimz",
}

export enum MediaType {
    Image = "Image",
    Avatar = "Avatar",
    Video = "Video",
    Stream = "Stream",
    Other = "Other",
    TweetId = "TweetId",
    EventId = "EventId",
    DonationId = "DonationId",
    BuddySessionId = "BuddySessionId",
}

export interface MediaElement {
    type: MediaType;
    mediaUrl: string;
}

export interface IFeedType {
    id: string;
    createdAt: string;
    title: string;
    userName: string | null;
    userId: string;
    avatarUrl: string | null;
    socialFeedType: SocialFeedPlatforms;
    description: string;
    media: null | Array<MediaElement>;
}
type SocialsType = { Instagram: string; Youtube: string; Twitter: string; };

export interface UserProfile {
    user_id: string;
    short_description: string | null;
    user_name: string;
    user_avatar?: string;
    long_description: string | null;
    created: string | null;
    last_modified: string | null;
    available_hours: string | null;
    location: string | null;
    languages: string | null;
    servers: string | null;
    socials: SocialsType;
    panels: any[] | null;
    user_avatar_url: string;
    live_stream_account_name: string;
    feed: IFeedType[];
}
