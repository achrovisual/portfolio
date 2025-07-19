const GH_API_TOKEN = process.env.GH_API_TOKEN;
const GH_USERNAME = process.env.GH_USERNAME;

export interface DailyActivity {
  date: string;
  commitCount: number;
}

export async function fetchGitHubActivity(): Promise<DailyActivity[]> {
  console.log("--- Inside fetchGitHubActivity (GraphQL) ---");
  console.log("Value of GH_USERNAME:", GH_USERNAME);
  console.log(
    "Value of GH_API_TOKEN (first 5 chars):",
    GH_API_TOKEN ? GH_API_TOKEN.substring(0, 5) : "Not set"
  );

  if (!GH_USERNAME) {
    console.error(
      "ERROR: GH_USERNAME environment variable is missing or empty. Cannot fetch GitHub data."
    );
    return [];
  }
  if (!GH_API_TOKEN) {
    console.error(
      "ERROR: GH_API_TOKEN environment variable is missing or empty. Cannot fetch GitHub GraphQL data."
    );
    return [];
  }

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const oneYearAgo = new Date(today);
  oneYearAgo.setUTCDate(oneYearAgo.getUTCDate() - 365);

  const fromDate = oneYearAgo.toISOString();
  const toDate = today.toISOString();

  console.log("GraphQL Query Range Start (UTC):", fromDate);
  console.log("GraphQL Query Range End (UTC):", toDate);

  const query = `
    query UserContributions($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${GH_API_TOKEN}`,
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({
        query: query,
        variables: {
          username: GH_USERNAME,
          from: fromDate,
          to: toDate,
        },
      }),
      next: {
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        `GitHub GraphQL API error for user ${GH_USERNAME}: ${response.status} - ${errorBody}`
      );
      throw new Error(
        `Failed to fetch GitHub GraphQL contributions: ${
          response.statusText || "Unknown error"
        } - ${errorBody.substring(0, 500)}...`
      );
    }

    const data = await response.json();

    if (data.errors) {
      console.error("GitHub GraphQL API returned errors:", data.errors);
      throw new Error(
        `GitHub GraphQL API errors: ${JSON.stringify(data.errors)}`
      );
    }

    const dailyActivity: DailyActivity[] = [];
    const weeks =
      data.data.user.contributionsCollection.contributionCalendar.weeks;

    weeks.forEach((week: any) => {
      week.contributionDays.forEach((day: any) => {
        dailyActivity.push({
          date: day.date,
          commitCount: day.contributionCount,
        });
      });
    });

    dailyActivity.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const filledActivity: DailyActivity[] = [];
    let currentDate = new Date(oneYearAgo);
    currentDate.setUTCHours(0, 0, 0, 0);

    const activityMap = new Map<string, number>();
    dailyActivity.forEach((item) =>
      activityMap.set(item.date, item.commitCount)
    );

    while (currentDate.getTime() <= today.getTime()) {
      const dateString = currentDate.toISOString().split("T")[0];
      const commitCount = activityMap.get(dateString) || 0;
      filledActivity.push({ date: dateString, commitCount });
      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }

    console.log("Final dailyActivity length:", filledActivity.length);
    console.log("First date in dailyActivity:", filledActivity[0]?.date);
    console.log(
      "Last date in dailyActivity:",
      filledActivity[filledActivity.length - 1]?.date
    );
    console.log("--- End fetchGitHubActivity (GraphQL) Debug ---");

    return filledActivity;
  } catch (error: any) {
    console.error("Error in fetchGitHubActivity (GraphQL):", error);
    throw error;
  }
}
