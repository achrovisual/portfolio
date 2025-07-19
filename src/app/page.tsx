import { Metadata } from "next";
import Gallery from "../components/Gallery";
import { fetchGalleryData, GalleryItem } from "../api/gallery/route";
import { fetchGitHubActivity, DailyActivity } from "../api/github/route";

import GitFeed from "../components/GitFeed";
import ContentScroller from "../components/ContentScroller";

import { headers } from "next/headers";
import logger from "@/lib/logger";
import { v4 as uuidv4 } from "uuid";

export const metadata: Metadata = {
  title: "Home - Eugenio Pastoral",
};

export default async function Home() {
  const requestHeaders = await headers();
  const correlationId = requestHeaders.get("x-correlation-id") || uuidv4();
  const pageLogger = logger.child({ correlationId, module: "HomePage" });

  pageLogger.info("Home page rendering started.");

  let myGalleryData: GalleryItem[] = [];
  let errorFetchingGalleryData: boolean = false;

  let gitActivityData: DailyActivity[] = [];
  let errorFetchingGitActivity: boolean = false;

  try {
    myGalleryData = await fetchGalleryData(correlationId);
    pageLogger.info("Gallery data fetched successfully for Home component.");
  } catch (error: any) {
    errorFetchingGalleryData = true;
    pageLogger.error("Failed to load gallery data in Home component", {
      error: error.message,
      stack: error.stack,
    });
  }

  try {
    gitActivityData = await fetchGitHubActivity(correlationId);
    pageLogger.info(
      "GitHub activity data fetched successfully for Home component."
    );
  } catch (error: any) {
    errorFetchingGitActivity = true;
    pageLogger.error("Failed to load GitHub activity data in Home component", {
      error: error.message,
      stack: error.stack,
    });
  }

  const skillsData = [
    { title: "Amazon Web Services", icon: "simple-icons:amazon" },
    { title: "Proxmox", icon: "simple-icons:proxmox" },
    { title: "K3s", icon: "simple-icons:k3s" },
    { title: "Helm", icon: "simple-icons:helm" },
    { title: "Argo CD", icon: "simple-icons:argo" },
    { title: "Docker", icon: "simple-icons:docker" },
    { title: "Terraform", icon: "simple-icons:terraform" },
    { title: "Tailscale", icon: "simple-icons:tailscale" },
    { title: "Next.js", icon: "simple-icons:nextdotjs" },
    { title: "Tailwind CSS", icon: "simple-icons:tailwindcss" },
    { title: "Figma", icon: "simple-icons:figma" },
    { title: "Sketch", icon: "simple-icons:sketch" },
    { title: "VS Code", icon: "simple-icons:visualstudiocode" },
    { title: "Git", icon: "simple-icons:git" },
    { title: "Jira", icon: "simple-icons:jira" },
    { title: "Confluence", icon: "simple-icons:confluence" },
    { title: "Notion", icon: "simple-icons:notion" },
  ];

  const skillTags = [
    "Software Development",
    "System Architecture",
    "DevOps",
    "Cloud Computing",
    "Network Engineering",
    "Infrastructure Management",
    "UI/UX",
    "Cybersecurity",
  ];

  return (
    <div className="flex flex-grow flex-col text-neutral-900 dark:text-neutral-100 min-h-0">
      <div className="flex flex-col w-full items-center justify-center min-h-[calc(100vh-5.5rem)]">
        {errorFetchingGalleryData ? (
          <p className="text-center text-red-500 mt-8">
            Failed to load gallery images. Please try again later.
          </p>
        ) : myGalleryData.length > 0 ? (
          <Gallery galleryItemsData={myGalleryData} />
        ) : (
          <p className="text-center text-neutral-500 mt-8">
            No gallery items found.
          </p>
        )}
      </div>
      <div className="mx-auto px-4 pb-4 h-[300px] flex flex-col w-full flex-shrink-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full flex-grow overflow-hidden grid-rows-[1fr]">
          <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-4xl shadow-md flex flex-col overflow-y-auto h-full min-h-0">
            {errorFetchingGitActivity ? (
              <div className="flex items-center justify-center h-full text-red-500 dark:text-red-400">
                <p className="text-lg text-center">
                  Error loading GitHub activity. Please try again later.
                </p>
              </div>
            ) : (
              <GitFeed activityData={gitActivityData} />
            )}
          </div>
          <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-4xl shadow-md flex flex-col items-center justify-center overflow-hidden h-full min-h-0">
            <ContentScroller
              items={skillsData}
              mainTitle="Skills & Stack Mastery"
              mainSubtitle="No tech stack is a stranger – I jump in and deliver."
              tags={skillTags}
              itemAnimationDuration="90s"
              tagAnimationDuration="90s"
              itemAnimationDirection="left"
              tagAnimationDirection="right"
              pauseOnHover={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
