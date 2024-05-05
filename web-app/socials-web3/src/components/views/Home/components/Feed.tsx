"use client";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toaster/useToast";
import { PostsAPI } from "@/services/apis";
import { SocialService } from "@/services/mainServices";
import { getAddressSocial } from "@/services/mainServices/common/utils";
import { useUserStore } from "@/stores/useUserStore";
import { getChainData, getChainFromChainId } from "@/utils";
import { useWallet } from "@coin98-com/wallet-adapter-react";
import dayjs from "dayjs";
import { compact, get } from "lodash";
import { useEffect, useState } from "react";
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime)

export const Feed = ({ communitySlug = "" }: { communitySlug?: string }) => {
  const { userInfo } = useUserStore();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // if (communitySlug) {
    fetchPosts([communitySlug]);
    // }
  }, [userInfo]);

  const fetchPosts = async (community = []) => {
    // if (!userInfo) return;
    const { posts, error } = await PostsAPI.fetchNewFeed({
      username: userInfo?.username,
      community: compact([...community])
    });
    console.log({ feed: posts });

    if (posts.length) {
      setPosts(posts);
    }
  };

  const refresh = async () => {
    await fetchPosts([communitySlug]);
  };

  return (
    <div className="flex gap-6 flex-col mt-8">
      {posts.map((p, index) => {
        return (
          <PostItem
            p={p}
            index={index}
            refresh={refresh}
            communitySlug={communitySlug}
          />
        );
      })}
    </div>
  );
};

const PostItem = ({ p, index, refresh, communitySlug }: any) => {
  const walletConnector = useWallet();
  const [loading, setLoading] = useState(false);
  const [loadingProtect, setLoadingProtect] = useState(false);
  const { userInfo } = useUserStore();
  const { toastNe } = useToast();

  const { signMessage } = useWallet();

  const boostViewer = async (uuid: string, id: string) => {
    console.log("uuid: ", uuid);
    setLoading(true);
    try {
      // Await onchain
      const chainId = walletConnector.selectedChainId;
      const activeChain = getChainFromChainId(chainId as string);
      const mainService = new SocialService(activeChain);

      const chainData = getChainData(activeChain);
      const numChainId = get(chainData, "numChainId");
      const contractAddress = getAddressSocial(numChainId) as string;

      const boostView = await mainService.boostView({
        community: communitySlug,
        communityAddress: contractAddress,
        postId: id,
        connector: walletConnector
      });

      if (boostView.isErr) {
        setLoading(false);
        return toastNe({ type: "error", description: "Internal error" });
      }

      // --- update Premium post
      const { post, error } = await PostsAPI.markPremiumPost(uuid);
      toastNe({ type: "success", description: "Boost premium success" });

      refresh();
    } catch (error) {
      toastNe({ type: "error", description: error || "Internal error" });
    } finally {
      setLoading(false);
    }
  };

  const protectPost = async (uuid: string, id: string) => {
    setLoadingProtect(true);
    try {
      // Await onchain
      const chainId = walletConnector.selectedChainId;
      const activeChain = getChainFromChainId(chainId as string);
      const mainService = new SocialService(activeChain);

      const chainData = getChainData(activeChain);
      const numChainId = get(chainData, "numChainId");
      const contractAddress = getAddressSocial(numChainId) as string;

      const boostView = await mainService.protectPost({
        community: communitySlug,
        communityAddress: contractAddress,
        postId: id,
        connector: walletConnector
      });

      if (boostView.isErr) {
        setLoadingProtect(false);
        return toastNe({ type: "error", description: "Internal error" });
      }

      // --- update Premium post
      const { post, error } = await PostsAPI.markProtectPost(uuid);
      toastNe({ type: "success", description: "Protect post success" });

      refresh();
    } catch (error) {
      toastNe({ type: "error", description: error || "Internal error" });
    } finally {
      setLoadingProtect(false);
    }
  };

  return (
    <div className="flex gap-3 flex-col px-2 py-4 relative">
      <div className="flex justify-start items-center">
        <img
          className="rounded w-12 h-12 mr-4"
          alt={p.author}
          srcSet={`https://picsum.photos/80/80?random=${index}`}
        />
        <div>
          <span className="text-[#F28E28] cursor-pointer text-bold">
            {p.author}
          </span>
        </div>
        <div>
          <span className="text-text-secondary cursor-pointer text-xs ml-2">
            {dayjs()?.to(p.created_at)}
          </span>
        </div>
      </div>
      <div className="absolute top-2 right-2 flex gap-2 bg-background-surface">
        {p.community && (
          <div className="border-[#2BBFE2] text-[#2BBFE2] border px-1 rounded">
            <span className="text-[#2BBFE2]">{p.community}</span>
          </div>
        )}
        {p.premium && (
          <div className="border-[#F28E28] text-[#F28E28] border px-1 rounded">
            {<span className="text-orange">Premium</span>}
          </div>
        )}
        {p.protected && (
          <div className="border-[#006400] text-[#006400] border px-1 rounded">
            {<span className="text-[#006400]">Protected</span>}
          </div>
        )}
      </div>
      {/* <div className="text-bold text-lg">{p.title}</div> */}
      <div className="">{p.content}</div>
      <div className="w-full h-80">
        <img
          className="w-full h-full object-cover rounded-lg"
          alt={p.author}
          src={`https://picsum.photos/800/360?random=${index}`}
        />
      </div>
      <div className="flex justify-between">
        <div className="">
          <svg
            width="213"
            height="40"
            viewBox="0 0 213 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.62 28.8101C12.28 28.9301 11.72 28.9301 11.38 28.8101C8.48 27.8201 2 23.6901 2 16.6901C2 13.6001 4.49 11.1001 7.56 11.1001C9.38 11.1001 10.99 11.9801 12 13.3401C13.01 11.9801 14.63 11.1001 16.44 11.1001C19.51 11.1001 22 13.6001 22 16.6901C22 23.6901 15.52 27.8201 12.62 28.8101Z"
              stroke="#1B1B1B"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M36.224 15.06H37.712V26.5H36.064V16.82L33.344 18.964V17.252L36.224 15.06ZM48.0838 26.5H40.6918V25.172L44.5798 21.316C45.0491 20.8467 45.4171 20.436 45.6838 20.084C45.9611 19.7213 46.1584 19.3853 46.2758 19.076C46.3931 18.756 46.4518 18.4253 46.4518 18.084C46.4518 17.508 46.2758 17.0493 45.9238 16.708C45.5718 16.3667 45.0918 16.196 44.4838 16.196C43.8971 16.196 43.3744 16.3453 42.9158 16.644C42.4678 16.9427 42.0518 17.412 41.6678 18.052L40.5798 17.012C41.5611 15.54 42.8678 14.804 44.4998 14.804C45.2144 14.804 45.8331 14.9373 46.3558 15.204C46.8891 15.4707 47.3051 15.844 47.6038 16.324C47.9024 16.804 48.0518 17.3693 48.0518 18.02C48.0518 18.5107 47.9718 18.9693 47.8118 19.396C47.6518 19.8227 47.3744 20.2813 46.9798 20.772C46.5958 21.2627 46.0571 21.8493 45.3638 22.532L42.7718 25.14H48.0838V26.5Z"
              fill="#1B1B1B"
            />
            <path
              d="M106 26.4302H102L97.55 29.3902C96.89 29.8302 96 29.3602 96 28.5602V26.4302C93 26.4302 91 24.4302 91 21.4302V15.4302C91 12.4302 93 10.4302 96 10.4302H106C109 10.4302 111 12.4302 111 15.4302V21.4302C111 24.4302 109 26.4302 106 26.4302Z"
              stroke="#1B1B1B"
              strokeWidth="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M125.928 26.756C125.139 26.756 124.435 26.612 123.816 26.324C123.208 26.036 122.728 25.636 122.376 25.124C122.024 24.612 121.848 24.0253 121.848 23.364C121.848 22.7027 122.04 22.116 122.424 21.604C122.819 21.092 123.347 20.7027 124.008 20.436C123.475 20.1907 123.048 19.8547 122.728 19.428C122.419 18.9907 122.264 18.5 122.264 17.956C122.264 17.3373 122.419 16.7933 122.728 16.324C123.048 15.8547 123.485 15.4867 124.04 15.22C124.595 14.9427 125.224 14.804 125.928 14.804C126.643 14.804 127.272 14.9427 127.816 15.22C128.371 15.4867 128.803 15.8547 129.112 16.324C129.432 16.7933 129.592 17.3373 129.592 17.956C129.592 18.5 129.432 18.9907 129.112 19.428C128.803 19.8547 128.381 20.1907 127.848 20.436C128.509 20.692 129.032 21.0813 129.416 21.604C129.811 22.116 130.008 22.7027 130.008 23.364C130.008 24.0253 129.832 24.612 129.48 25.124C129.139 25.636 128.659 26.036 128.04 26.324C127.432 26.612 126.728 26.756 125.928 26.756ZM125.928 19.892C126.504 19.892 126.989 19.716 127.384 19.364C127.779 19.012 127.976 18.5747 127.976 18.052C127.976 17.508 127.779 17.0547 127.384 16.692C126.989 16.3293 126.504 16.148 125.928 16.148C125.352 16.148 124.867 16.3293 124.472 16.692C124.088 17.0547 123.896 17.508 123.896 18.052C123.896 18.5747 124.093 19.012 124.488 19.364C124.883 19.716 125.363 19.892 125.928 19.892ZM125.928 25.396C126.387 25.396 126.797 25.3053 127.16 25.124C127.523 24.9427 127.811 24.6973 128.024 24.388C128.237 24.068 128.344 23.7107 128.344 23.316C128.344 22.9107 128.237 22.5533 128.024 22.244C127.811 21.9347 127.523 21.6893 127.16 21.508C126.797 21.3267 126.387 21.236 125.928 21.236C125.469 21.236 125.059 21.3267 124.696 21.508C124.333 21.6893 124.045 21.9347 123.832 22.244C123.619 22.5533 123.512 22.9107 123.512 23.316C123.512 23.7107 123.619 24.068 123.832 24.388C124.045 24.6973 124.333 24.9427 124.696 25.124C125.069 25.3053 125.48 25.396 125.928 25.396Z"
              fill="#1B1B1B"
            />
            <path
              d="M180.5 21.7502C180.5 22.7202 181.25 23.5002 182.17 23.5002H184.05C184.85 23.5002 185.5 22.8202 185.5 21.9702C185.5 21.0602 185.1 20.7302 184.51 20.5202L181.5 19.4702C180.91 19.2602 180.51 18.9402 180.51 18.0202C180.51 17.1802 181.16 16.4902 181.96 16.4902H183.84C184.76 16.4902 185.51 17.2702 185.51 18.2402"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M183 15.5V24.5"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M193 20C193 25.52 188.52 30 183 30C177.48 30 173 25.52 173 20C173 14.48 177.48 10 183 10"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M188 11V15H192"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M193 10L188 15"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M207.928 26.756C207.139 26.756 206.435 26.612 205.816 26.324C205.208 26.036 204.728 25.636 204.376 25.124C204.024 24.612 203.848 24.0253 203.848 23.364C203.848 22.7027 204.04 22.116 204.424 21.604C204.819 21.092 205.347 20.7027 206.008 20.436C205.475 20.1907 205.048 19.8547 204.728 19.428C204.419 18.9907 204.264 18.5 204.264 17.956C204.264 17.3373 204.419 16.7933 204.728 16.324C205.048 15.8547 205.485 15.4867 206.04 15.22C206.595 14.9427 207.224 14.804 207.928 14.804C208.643 14.804 209.272 14.9427 209.816 15.22C210.371 15.4867 210.803 15.8547 211.112 16.324C211.432 16.7933 211.592 17.3373 211.592 17.956C211.592 18.5 211.432 18.9907 211.112 19.428C210.803 19.8547 210.381 20.1907 209.848 20.436C210.509 20.692 211.032 21.0813 211.416 21.604C211.811 22.116 212.008 22.7027 212.008 23.364C212.008 24.0253 211.832 24.612 211.48 25.124C211.139 25.636 210.659 26.036 210.04 26.324C209.432 26.612 208.728 26.756 207.928 26.756ZM207.928 19.892C208.504 19.892 208.989 19.716 209.384 19.364C209.779 19.012 209.976 18.5747 209.976 18.052C209.976 17.508 209.779 17.0547 209.384 16.692C208.989 16.3293 208.504 16.148 207.928 16.148C207.352 16.148 206.867 16.3293 206.472 16.692C206.088 17.0547 205.896 17.508 205.896 18.052C205.896 18.5747 206.093 19.012 206.488 19.364C206.883 19.716 207.363 19.892 207.928 19.892ZM207.928 25.396C208.387 25.396 208.797 25.3053 209.16 25.124C209.523 24.9427 209.811 24.6973 210.024 24.388C210.237 24.068 210.344 23.7107 210.344 23.316C210.344 22.9107 210.237 22.5533 210.024 22.244C209.811 21.9347 209.523 21.6893 209.16 21.508C208.797 21.3267 208.387 21.236 207.928 21.236C207.469 21.236 207.059 21.3267 206.696 21.508C206.333 21.6893 206.045 21.9347 205.832 22.244C205.619 22.5533 205.512 22.9107 205.512 23.316C205.512 23.7107 205.619 24.068 205.832 24.388C206.045 24.6973 206.333 24.9427 206.696 25.124C207.069 25.3053 207.48 25.396 207.928 25.396Z"
              fill="#1B1B1B"
            />
          </svg>
        </div>
        <div className="flex gap-2">
          {userInfo?.username && !p.premium && (
            <Button
              onClick={() => boostViewer(p.uuid, p.id)}
              isLoading={loading}
            >
              Boost View $100 VIBE
            </Button>
          )}
          {userInfo?.username && !p.protected && (
            <Button
              className="bg-emerald-600"
              onClick={() => protectPost(p.uuid, p.id)}
              isLoading={loadingProtect}
            >
              Protect $10 VIBE
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
