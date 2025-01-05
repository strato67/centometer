import PinnedCard from "@/components/home/pinned-card";
import NewsCard from "@/components/home/news-card";
import Heatmap from "@/components/widgets/heatmap";

export default function Page() {
  return (
    <>
      <div className="my-2 md:my-6 w-full">
        <h1 className="text-4xl font-bold">Home</h1>
        <div className="grid justify-center grid-flow-row md:grid-cols-2 w-full gap-4 md:gap-6 mt-4">
          <div className="md:col-span-2">
            <PinnedCard />
          </div>
          <Heatmap/>
          <NewsCard
            title="Watchlist News"
            description="The latest news on your watchlist stocks"
            newsType="watchlist"
          />
          <NewsCard title="Business News" description="The latest business stories" newsType="business" />
          <NewsCard title="World News" description="Trending stories from around the world" newsType="world" />

        </div>
      </div>
    </>
  );
}
