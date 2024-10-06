import PinnedCard from "@/components/home/pinned-card";
import NewsCard from "@/components/home/news-card";

export default function Page() {
  return (
    <>
      <div className="my-2 md:my-6 w-full">
        <h1 className="text-4xl font-semibold ">Home</h1>
        <div className="grid justify-center grid-flow-row md:grid-cols-2 w-full gap-4 md:gap-6 mt-4">
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
