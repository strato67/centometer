import PinnedCard from "@/components/home/pinned-card";
import NewsCard from "@/components/home/news-card";

export default function Page() {
  return (
    <>
      <div className="px-4 mt-4 w-full">
        <h1 className="text-3xl font-semibold ">Home</h1>
        <div className="grid justify-center grid-rows-3 md:grid-rows-2 grid-flow-row md:grid-cols-2 w-full gap-4 md:gap-y-0 mt-4">
          <div className="md:col-span-2">
            <PinnedCard />
          </div>
          <NewsCard
            title="Pinned News"
            description="The latest news on your pinned stocks"
          />
          <NewsCard title="Top News" description="Trending finance news" />
        </div>
      </div>
    </>
  );
}
