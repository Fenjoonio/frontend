import UserInfo from "./components/UserInfo";
import BackArrow from "@/components/BackArrow";
import UserStories from "./components/UserStories";
import UserComments from "./components/UserComments";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type AuthorPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { id } = await params;

  return (
    <section className="pb-4">
      <header
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)" }}
        className="flex items-end justify-between bg-background border-b border-border pb-3 px-2"
      >
        <BackArrow />
      </header>

      <UserInfo id={Number(id)} className="mt-4 mx-5" />

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
            <UserStories id={Number(id)} />
          </TabsContent>

          <TabsContent value="comments">
            <UserComments id={Number(id)} />
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
}
