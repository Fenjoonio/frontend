import UserInfo from "./components/UserInfo";
import UserStories from "./components/UserStories";
import UserComments from "./components/UserComments";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function AuthorPage() {
  return (
    <section className="pb-4">
      <UserInfo className="pt-4 mx-5" />

      <Tabs defaultValue="stories" className="w-[calc(100%-40px)] mt-6 mx-5">
        <TabsList className="w-full h-14 flex">
          <TabsTrigger value="stories" className="flex-1">
            داستانک‌ها
          </TabsTrigger>

          <TabsTrigger value="novels" className="flex-1">
            داستان‌ها
          </TabsTrigger>

          <TabsTrigger value="comments" className="flex-1">
            نقد‌ها
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="stories">
            <UserStories />
          </TabsContent>

          <TabsContent value="comments">
            <UserComments />
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
}
