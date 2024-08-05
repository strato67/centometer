import PinnedCard from "@/components/home/pinned-card";

export default function Page() {
    return (
        <>
            <div className="px-4 mt-6 w-full">
                <h1 className="text-3xl font-semibold ">Home</h1>
                <div className="grid justify-center grid-rows-3 md:grid-rows-2 grid-flow-col md:grid-cols-2 w-full gap-6 mt-12">
                    <div className="md:col-span-2"><PinnedCard/></div>
                    <div><PinnedCard/></div>
                    <div><PinnedCard/></div>


                </div>
            </div>
        </>
    );
}
