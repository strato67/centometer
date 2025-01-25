import DashboardCanvas from "@/components/home/dashboard-canvas";

export default function Page() {
  return (
    <>
      <div className="my-2 md:my-6 w-full">
      <h1 className="text-4xl font-bold mb-4">Home</h1>
        <DashboardCanvas />
      </div>
    </>
  );
}
