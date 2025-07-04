const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME;

export async function fetchGitHubActivity(): Promise<DailyActivity[]> {
  console.log("--- Inside fetchGitHubActivity ---");
  console.log("Value of GITHUB_USERNAME:", GITHUB_USERNAME);
  console.log(
    "Value of GITHUB_TOKEN (first 5 chars):",
    GITHUB_TOKEN ? GITHUB_TOKEN.substring(0, 5) : "Not set"
  );

  if (!GITHUB_USERNAME) {
    console.error(
      "ERROR: NEXT_PUBLIC_GITHUB_USERNAME environment variable is missing or empty. Cannot fetch GitHub data."
    );
    return [];
  }

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  // Calculate the date 30 days ago from today (UTC start of day)
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setUTCDate(thirtyDaysAgo.getUTCDate() - 30); // Subtract 30 days

  console.log("Range Start (30 days ago UTC):", thirtyDaysAgo.toISOString()); // Updated log
  console.log("Range End (Today UTC start):", today.toISOString());

  try {
    const events: GitHubEvent[] = [];
    let page = 1;
    let hasMore = true;
    const perPage = 100;

    // For 30 days, 5 pages (500 events)
    while (hasMore && page <= 5) {
      console.log(
        `Attempting to fetch page ${page} for user ${GITHUB_USERNAME}...`
      );
      const response = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=${perPage}&page=${page}`,
        {
          headers: {
            Authorization: GITHUB_TOKEN ? `token ${GITHUB_TOKEN}` : "",
            "X-GitHub-Api-Version": "2022-11-28",
          },
          next: {
            revalidate: 3600, // 1 hour cache
          },
        }
      );

      console.log(
        `Response for page ${page}: Status ${response.status} ${response.statusText}`
      );

      if (!response.ok) {
        const errorBody = await response.text();
        console.error(
          `GitHub API error for user ${GITHUB_USERNAME}: ${response.status} - ${errorBody}`
        );
        throw new Error(
          `Failed to fetch GitHub events: ${
            response.statusText || "Unknown error"
          } - ${errorBody.substring(0, 100)}...`
        );
      }

      const pageEvents: GitHubEvent[] = await response.json();
      console.log(`Fetched ${pageEvents.length} events from page ${page}.`);
      events.push(...pageEvents);
      console.log(`Total events accumulated so far: ${events.length}`);

      if (
        pageEvents.length < perPage ||
        pageEvents.every((event) => new Date(event.created_at) < thirtyDaysAgo) // Use thirtyDaysAgo here
      ) {
        hasMore = false;
        console.log(
          `Stopping fetch: ${
            pageEvents.length < perPage
              ? "Less than perPage events received."
              : "All events on page are older than 30 days."
          }`
        );
      }
      page++;
    }

    console.log(
      `Finished fetching. Total events collected before processing: ${events.length}`
    );

    const activityMap: { [date: string]: number } = {};

    events.forEach((event) => {
      const eventDate = new Date(event.created_at);
      const dateString = eventDate.toISOString().split("T")[0];

      if (eventDate >= thirtyDaysAgo && eventDate <= today) {
        console.log(
          `  Processing active event: Type='${event.type}' Date='${dateString}'`
        );

        if (event.type === "PushEvent" && event.payload.commits) {
          activityMap[dateString] =
            (activityMap[dateString] || 0) + event.payload.commits.length;
          console.log(
            `    -> PushEvent: Added ${event.payload.commits.length} commits. Current count for ${dateString}: ${activityMap[dateString]}`
          );
        } else if (event.type === "PullRequestEvent") {
          const prAction = event.payload.action;
          let prActivityPoints = 0;

          switch (prAction) {
            case "opened":
            case "reopened":
            case "synchronize":
              prActivityPoints = 1;
              break;
            case "closed":
              if (event.payload.pull_request?.merged) {
                prActivityPoints = 1;
              }
              break;
          }

          if (prActivityPoints > 0) {
            activityMap[dateString] =
              (activityMap[dateString] || 0) + prActivityPoints;
            console.log(
              `    -> PullRequestEvent: Action='${prAction}', Merged=${event.payload.pull_request?.merged}. Added ${prActivityPoints} point(s). Current count for ${dateString}: ${activityMap[dateString]}`
            );
          } else {
            console.log(
              `    -> PullRequestEvent: Action='${prAction}', Merged=${event.payload.pull_request?.merged}. No activity points added.`
            );
          }
        }
      } else {
        console.log(
          `  Skipping old/future event: Type='${event.type}' Date='${dateString}' (Outside 30-day range)`
        );
      }
    });

    console.log(
      "Aggregated activityMap before generating dailyActivity:",
      activityMap
    );

    const dailyActivity: DailyActivity[] = [];
    let currentDate = new Date(thirtyDaysAgo); // Start from 30 days ago
    currentDate.setUTCHours(0, 0, 0, 0);

    while (currentDate.getTime() <= today.getTime()) {
      const dateString = currentDate.toISOString().split("T")[0];
      const commitCount = activityMap[dateString] || 0;
      dailyActivity.push({ date: dateString, commitCount });
      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }

    dailyActivity.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    console.log("Final dailyActivity length:", dailyActivity.length);
    console.log(
      "Last date in dailyActivity:",
      dailyActivity[dailyActivity.length - 1]?.date
    );
    console.log("--- End fetchGitHubActivity Debug ---");

    return dailyActivity;
  } catch (error: any) {
    console.error("Error in fetchGitHubActivity:", error);
    throw error;
  }
}
