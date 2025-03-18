import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import dynamic from "next/dynamic";

const Chat = dynamic(() => import("@/components/Chat"), {
  ssr: false,
});

export default async function Page() {
  const accessToken = await getHumeAccessToken();

  if (!accessToken) {
    throw new Error();
  }

  // Add error handling for environment variables
  if (!process.env.HUME_API_KEY) {
    throw new Error('HUME_API_KEY is not defined');
  }

  try {
    return (
      <div className={"grow flex flex-col"}>
        <Chat accessToken={accessToken} />
      </div>
    );
  } catch (error) {
    console.error('Detailed error:', error);
    throw error;
  }
}
