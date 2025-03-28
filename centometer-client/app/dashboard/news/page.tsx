import MobileNewsView from "@/components/news/mobile-news-view";
import NewsHighlights from "@/components/news/news-highlights";
import NewsView from "@/components/news/news-view";

export default function Page() {
  return (
    <div className="my-2 md:my-6 w-full">
      <h1 className="text-4xl font-bold mb-6">News</h1>
      <div className="mb-6 sticky">
        <NewsHighlights />
      </div>

      <div className="lg:hidden flex items-center justify-center">
        <MobileNewsView />
      </div>

      <div className="hidden lg:flex lg:flex-col items-center justify-center ">
        <NewsView />
      </div>
    </div>
  );
}
