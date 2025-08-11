import UserInfo from "./components/UserInfo";
import UserNovels from "./components/UserNovels";
import UserStories from "./components/UserStories";
import ProfileHeader from "./components/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function AuthorPage() {
  return (
    <section className="pb-4">
      <ProfileHeader />

      <UserInfo className="pt-4 mx-5" />

      <Tabs defaultValue="stories" className="w-[calc(100%-40px)] mt-6 mx-5">
        <TabsList className="w-full h-14 flex">
          <TabsTrigger value="stories" className="flex-1">
            داستانک‌ها
          </TabsTrigger>

          <TabsTrigger value="novels" className="flex-1">
            داستان‌ها
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="stories">
            <UserStories />
          </TabsContent>

          <TabsContent value="novels">
            <UserNovels />
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
}
