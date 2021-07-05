import React from "react";
import Link from "next/link";
import Image from 'next/image'
import TwitterLogo from "../../assets/images/social_icons_squares/twitter.svg";
import TwitchLogo from "../../assets/images/social_icons_squares/twitch.svg";
import YoutubeLogo from "../../assets/images/social_icons_squares/youtube.svg";
import FacebookGamingLogo from "../../assets/images/social_icons_squares/fb.svg";
import Twitch404Logo from "../../public/images/404_preview-twitch.jpg";
import GaimzLogo from "../../public/images/icon-48x48.png";

import { formatDistanceToNow } from "date-fns";
import { MediaElement, MediaType, SocialFeedPlatforms } from "../../common/types";

import TweetEmbed from "react-tweet-embed";
import useInView from "react-cool-inview";

export interface IFeedPostProps {
  title: string;
  avatarUrl: string;
  userName: string;
  createdAt: string;
  description: string;
  socialFeedType: SocialFeedPlatforms;
  media: null | Array<MediaElement>;
}

const FeedPost = ({ title, avatarUrl, userName, createdAt, description, socialFeedType, media }: IFeedPostProps): JSX.Element => {
  const inViewHook = useInView({
    rootMargin: "500px",
  });
  const inView = inViewHook.inView;
  const divRef: any = inViewHook.observe;

  const renderSocialImage = (social: string) => {
    switch (social) {
      case SocialFeedPlatforms.twitter:
        return <TwitterLogo />;
      case SocialFeedPlatforms.twitch:
        return <TwitchLogo />;
      case SocialFeedPlatforms.facebook:
        return <FacebookGamingLogo />;
      case SocialFeedPlatforms.youtube:
        return <YoutubeLogo />;
      case SocialFeedPlatforms.gaimz:
      default:
        return <Image src={GaimzLogo} />;
    }
  };

  // We can use this avatar for social media platforms when necessary (like for Twitter)
  const socialMediaAvatar = media?.find(m => m.type === MediaType.Avatar)?.mediaUrl;
  const videoUrl = media?.find(m => m.type === MediaType.Video)?.mediaUrl || "";
  const tweetId = media?.find(m => m.type === MediaType.TweetId)?.mediaUrl || "";
  const eventId = media?.find(m => m.type === MediaType.EventId)?.mediaUrl || "";
  const donationId = media?.find(m => m.type === MediaType.DonationId)?.mediaUrl || "";
  const buddySessionId = media?.find(m => m.type === MediaType.BuddySessionId)?.mediaUrl || "";

  let imageUrl = "";
  if (!videoUrl) {
    imageUrl = media?.find(m => m.type === MediaType.Image)?.mediaUrl || "";
  }

  const renderContent = (inView: boolean) => {
    switch (socialFeedType) {
      case SocialFeedPlatforms.twitter:
        if (!tweetId) {
          return <p className="feed-post__body__content">{description}</p>;
        }

        if (!inView) {
          return <Image src={Twitch404Logo} className="feed-post__body__media" />;
        }

        return <TweetEmbed className="feed-post__body__tweet" id={tweetId} />;
      case SocialFeedPlatforms.gaimz:
        if (eventId) {
          return (
              <>
                <Link href={`https://beta.gaimz.com/${userName}/event/${title}/${eventId}`}>{title}</Link>
                <p className="feed-post__body__content">{description}</p>
              </>
          );
        } else if (donationId) {
          return (
              <>
                <Link href={`https://beta.gaimz.com//${userName}/donation`}>{title}</Link>
                <p className="feed-post__body__content">{description}</p>
              </>
          );
        } else if (buddySessionId) {
          return (
              <>
                <Link href={`https://beta.gaimz.com/${userName}/sessions/${buddySessionId}`}>{title}</Link>
                <p className="feed-post__body__content">{description}</p>
              </>
          );
        } else {
          return <p className="feed-post__body__content">{description}</p>;
        }
      default:
        return <p className="feed-post__body__content">{description}</p>;
    }
  };

  const renderMedia = (inView: boolean) => {
    switch (socialFeedType) {
      case SocialFeedPlatforms.twitch:
        if (!inView) {
          return <Image src={Twitch404Logo} className="feed-post__body__media" />;
        }

        if (videoUrl) {
          const lastpart = videoUrl.split("/").pop();
          if (videoUrl.indexOf("videos") >= 0) {
            return (
                <iframe
                    className="feed-post__body__media"
                    src={`https://player.twitch.tv/?video=${lastpart}&parent=${window.location.hostname}&autoplay=false`}
                    height="400"
                    width="700"
                    allowFullScreen
                />
            );
          } else {
            return (
                <iframe
                    className="feed-post__body__media"
                    src={`https://player.twitch.tv/?channel=${lastpart}&parent=${window.location.hostname}&autoplay=false`}
                    height="400"
                    width="700"
                    allowFullScreen
                />
            );
          }
        } else if (imageUrl) {
          return <img src={imageUrl.replace("{width}", "700").replace("{height}", "400")} alt="" className="feed-post__body__media" />;
        }
        break;

      default:
        if (imageUrl) {
          return <img src={imageUrl.replace("{width}", "700").replace("{height}", "400")} alt="" className="feed-post__body__media" />;
        }
        break;
    }
  };

  return (
      <div className="feed-post" ref={divRef}>
        <div>
          <div className="feed-post__header">
            <img className="feed-post__header__image" src={socialMediaAvatar ?? avatarUrl} alt="" />
            <div className="feed-post__header__info">
              <div className="feed-post__header__description">
                <Link href={`https://beta.gaimz.com//${userName}`}>
                  <h5 className="feed-post__header__name">{userName}</h5>
                </Link>
                <p className="feed-post__header__time">{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>
              </div>
              <div className="feed-post__header__social">{renderSocialImage(socialFeedType)}</div>
            </div>
          </div>
          <div className="feed-post__body">
            {renderContent(inView)}
            {renderMedia(inView)}
          </div>
        </div>
      </div>
  );
};

export default FeedPost;
