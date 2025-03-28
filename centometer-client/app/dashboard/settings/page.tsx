import ProfileCard from "@/components/settings/profile-card";
import PreferencesCard from "@/components/settings/preferences-card";
import SecurityCard from "@/components/settings/security-card";
import DeleteAccountCard from "@/components/settings/delete-account-card";

export default function Page() {
  return (
    <>
      <div className="my-2 md:my-6 w-full">
        <h1 className="text-4xl font-bold mb-4">Settings</h1>
        <div className="flex flex-col items-center  gap-8 ">
          <ProfileCard />
          <SecurityCard/>

          <PreferencesCard />

          <DeleteAccountCard/>
        </div>
      </div>
    </>
  );
}
