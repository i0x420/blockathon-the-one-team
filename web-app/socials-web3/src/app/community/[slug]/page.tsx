import Community from "@/components/views/Community";
import { AccountProvider } from "@/contexts/AccountContext";
import { CommunityAPI } from "@/services/apis";

const Page = async ({ params }) => {
  const { community, error } = await CommunityAPI.getCommunityBySlug(
    params?.slug
  );

  return (
    <AccountProvider>
      <Community community={community[0]} />
    </AccountProvider>
  );
};

export default Page;
