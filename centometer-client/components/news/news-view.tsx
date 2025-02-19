import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import NewsReel from "./news-reel";

export default function NewsView() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={33}>
        <div className="w-full pr-4">
          <h2 className="text-xl font-semibold ml-3 mb-2">Pinned</h2>
          <NewsReel/>
        </div>
      </ResizablePanel >
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={34}>
        <div className="w-full px-3 ">
          <h2 className="text-xl font-semibold ml-3 mb-2">Business</h2>
          <NewsReel/>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={33}>
        <div className="w-full px-3">
          <h2 className="text-xl font-semibold ml-3 mb-2">World</h2>
          <NewsReel/>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
