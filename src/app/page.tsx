import { Metadata } from "next";
import { fetchGalleryData, GalleryItem } from "../api/gallery/route";
import { fetchGitHubActivity, DailyActivity } from "../api/github/route";
import DynamicPageContent from "../components/DynamicPageContent";

import logger from "@/lib/logger";
import { getCorrelationId } from "@/lib/correlation";

import { Note } from "../types/note";
import { ScrollerItem } from "../types/scroller";

export const metadata: Metadata = {
  title: "Home - Eugenio Pastoral",
};

/**
 * Render the Home page, composing gallery, GitHub activity, skills, and notes content.
 *
 * Renders a page component populated with fetched gallery and GitHub activity data
 * alongside predefined skills, skill tags, and notes. Fetch error flags are exposed
 * to the rendered component so the UI can display fallback states.
 *
 * @returns The JSX element for the Home page populated with dynamic and static content,
 *          including flags that indicate whether data fetching for gallery or GitHub activity failed.
 */
export default async function Home() {
  const correlationId = await getCorrelationId();
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

  const notesData: Note[] = [
    {
      id: "intro-to-devops",
      title: "An Intro to DevOps",
      date: "2024-07-25",
      summary:
        "An overview of the core philosophy, culture, and key tools in the DevOps world.",
      content: `
# DevOps: Bridging Development and Operations

![sample](/images/001.jpg)

**DevOps** is a set of practices that combines software development (Dev) and IT operations (Ops). The goal is to shorten the systems development life cycle and provide continuous delivery with high software quality.

## Key Principles

1.  **Culture**: Focus on collaboration and communication.
2.  **Automation**: Automate repetitive tasks.
3.  **Lean**: Deliver fast and small changes.

### Code Example

We often use a \`Dockerfile\` to package applications:

\`\`\`dockerfile
# Use a lightweight Node.js image
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

## Task List

- [x] Install Docker
- [ ] Write a CI/CD pipeline
- [ ] Monitor production logs

For more details, check out the [DevOps Handbook](https://www.oreilly.com/library/view/the-devops-handbook/9781491919171/).
      `,
      tags: ["DevOps", "Software Engineering", "Introduction"],
    },
    {
      id: "my-first-docker-container",
      title: "My First Docker Container",
      date: "2024-08-01",
      summary:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      tags: ["Docker", "Containerization", "DevOps"],
    },
    {
      id: "getting-started-with-nextjs",
      title: "Getting Started with Next.js",
      date: "2024-08-10",
      summary:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      content:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      tags: ["Next.js", "Web Development", "React"],
    },
    {
      id: "principles-of-sre",
      title: "The Core Principles of SRE",
      date: "2024-08-15",
      summary:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
      content:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
      tags: ["SRE", "Reliability", "Operations", "Principles"],
    },
    {
      id: "platform-engineering-for-scale",
      title: "Platform Engineering for Scalability",
      date: "2024-08-20",
      summary:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
      content:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
      tags: ["Platform Engineering", "Scalability", "Infrastructure"],
    },
    {
      id: "ci-cd-pipelines-with-github-actions",
      title: "Building CI/CD Pipelines with GitHub Actions",
      date: "2024-08-22",
      summary:
        "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.",
      content:
        "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
      tags: ["CI/CD", "GitHub Actions", "Automation", "DevOps"],
    },
    {
      id: "monitoring-and-observability",
      title: "Monitoring and Observability in Modern Systems",
      date: "2024-08-25",
      summary:
        "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
      content:
        "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      tags: ["SRE", "Observability", "Monitoring", "Systems"],
    },
    {
      id: "terraform-best-practices",
      title: "Terraform Best Practices for Infrastructure as Code",
      date: "2024-08-27",
      summary:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
      content:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
      tags: ["Terraform", "IaC", "DevOps", "Infrastructure"],
    },
  ];

  const skillsData: ScrollerItem[] = [
    // Cloud & DevOps
    { title: "Amazon Web Services", icon: "simple-icons:amazonwebservices" },
    { title: "Docker", icon: "simple-icons:docker" },
    { title: "K3s", icon: "simple-icons:k3s" },
    { title: "Helm", icon: "simple-icons:helm" },
    { title: "Argo CD", icon: "simple-icons:argo" },
    { title: "Terraform", icon: "simple-icons:terraform" },
    { title: "GitHub Actions", icon: "simple-icons:githubactions" },
    { title: "Proxmox", icon: "simple-icons:proxmox" },

    // Development & Scripting
    { title: "Next.js", icon: "simple-icons:nextdotjs" },
    { title: "Django", icon: "simple-icons:django" },
    { title: "Tailwind CSS", icon: "simple-icons:tailwindcss" },
    { title: "Bash", icon: "simple-icons:gnubash" },

    // Networking
    { title: "NGINX", icon: "simple-icons:nginx" },
    { title: "Cloudflare", icon: "simple-icons:cloudflare" },
    { title: "Tailscale", icon: "simple-icons:tailscale" },
    { title: "UniFi", icon: "simple-icons:ubiquiti" },
    { title: "MikroTik", icon: "simple-icons:mikrotik" },
    { title: "Omada", icon: "simple-icons:omadacloud" },

    // Tools & Collaboration
    { title: "Git", icon: "simple-icons:git" },
    { title: "VS Code", icon: "simple-icons:visualstudiocode" },
    { title: "Jira", icon: "simple-icons:jira" },
    { title: "Confluence", icon: "simple-icons:confluence" },
    { title: "Notion", icon: "simple-icons:notion" },
    { title: "Figma", icon: "simple-icons:figma" },
    { title: "Sketch", icon: "simple-icons:sketch" },
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
    <DynamicPageContent
      galleryItemsData={myGalleryData}
      errorFetchingGalleryData={errorFetchingGalleryData}
      gitActivityData={gitActivityData}
      errorFetchingGitActivity={errorFetchingGitActivity}
      skillsData={skillsData}
      skillTags={skillTags}
      notesData={notesData}
    />
  );
}
