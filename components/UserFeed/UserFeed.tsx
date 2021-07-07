import {useEffect, useState} from "react";
import axios from "axios";
import {IFeedType, MediaType, SocialFeedPlatforms, UserProfile} from "../../common/types";
import FeedPost from "../FeedPost/FeedPost";
import data from "../../data/temp";
import DonationEmptyIcon from "../../assets/images/donation_empty.svg";

const {baseApiUrl} = process.env;
const parentURIS =  "rsoj9cflhyppzitnz6fryom1eilqsq.ext-twitch.tv";

declare const window: any;

export default function UserFeed() {

    const [isLoading, setIsLoading] = useState(false);
    const [userProfileData, setUserProfileData] = useState<UserProfile | null>(data);


    const loadUserProfile = async (username: string) => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${baseApiUrl}/api/basic/profiles/${username}`);
            //setUserProfileData(response.data);
            fetchUserFeed(response.data.user_id, []);

            if (!response) {
                throw new Error();
            }
        } catch (error) {
            if (error?.response?.status === 404) {
                // dispatch(createAlert("Oops, something went wrong!", AlertTypes.error));
            }
        } finally {
            setIsLoading(false);
        }
    };


    const fetchUserFeed = async (userId: string, socialPlatforms: Array<SocialFeedPlatforms>) => {
        try {
            setIsLoading(true);
            const response = await axios.post<{ results: IFeedType[]; nextPage: number }>(`${baseApiUrl}/api/feed/consume/byuser`, {
                socialPlatforms: socialPlatforms,
                userId: userId,
                cursor: 0,
                limit: 30,
            });
            //setUserProfileData(prev => ({...prev, feed: response.data.results}));
            console.log("**********", response.data.results);
        } catch (err) {
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        //loadUserProfile("sykkuno");
    }, []);


    return (
        <div>
            {userProfileData?.feed.map(({ title, id, createdAt, description, socialFeedType, media }) => (
                <FeedPost
                    key={id}
                    title={title}
                    avatarUrl={userProfileData.user_avatar_url}
                    userName={userProfileData.user_name}
                    createdAt={createdAt}
                    description={description}
                    socialFeedType={socialFeedType}
                    media={media}
                />
            ))}
            {!userProfileData?.feed || userProfileData?.feed.length === 0 ? (
                <div className="user-profile position-relative">
                    <div className="empty-profile">
                        <DonationEmptyIcon />
                        <p>No feed data yet</p>
                    </div>
                </div>
            ) : null }
        </div>
    );

}
