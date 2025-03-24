import BackArrow from "@/components/BackArrow";
import UserInfo from "./components/UserInfo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserStories from "./components/UserStories";
import UserComments from "./components/UserComments";

type AuthorPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { id } = await params;
  return (
    <section>
      <header
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)" }}
        className="flex items-end justify-between bg-[#2e2e2e]/40 backdrop-blur-xs sticky top-0 z-10 pb-3 px-2"
      >
        <BackArrow />
      </header>

      <div className="flex flex-col items-center">
        <UserInfo id={Number(id)} />
      </div>

      <Tabs defaultValue="stories" className="w-[calc(100%-40px)] mt-40 mx-5">
        <TabsList className="w-full h-14 flex">
          <TabsTrigger value="stories" className="flex-1">
            آخرین داستان‌ها
          </TabsTrigger>

          <TabsTrigger value="comments" className="flex-1">
            آخرین نقد‌ها
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
