export type BlogSection = {
  heading?: string;
  paragraphs: string[];
  quote?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  language: "pt-PT" | "en-GB";
  keywords: string[];
  image: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  source?: { name: string; url: string; linkedInUrl?: string };
  references?: { name: string; url: string }[];
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "from-chaos-to-version-control-how-pbip-and-git-are-revolutionizing-power-bi-development",
    title:
      "From Chaos to Version Control: How PBIP and Git Are Revolutionizing Power BI Development",
    excerpt:
      "PBIP turns Power BI projects from opaque binary files into structured text, enabling Git history, parallel development, pull requests and controlled conflict resolution.",
    category: "Power BI & Engineering",
    publishedAt: "2026-08-01T09:00:00+01:00",
    readingTime: "4 min read",
    language: "en-GB",
    keywords: [
      "Power BI",
      "PBIP",
      "Git",
      "Microsoft Fabric",
      "business intelligence",
      "version control",
      "data engineering",
      "data governance",
      "software engineering",
    ],
    image: "/blog/pbip-git-power-bi-cover.webp",
    imageAlt:
      "Version control for Power BI illustrated by chaotic PBIX files transitioning into a structured PBIP project with Git commits, branches and change history",
    imageWidth: 1672,
    imageHeight: 941,
    source: {
      name: "LinkedIn",
      url: "https://www.linkedin.com/pulse/from-chaos-version-control-how-pbip-git-power-bi-rodrigo-p%C3%B3voa-qsahe",
    },
    references: [
      {
        name: "Power BI Desktop projects (PBIP) overview — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/power-bi/developer/projects/projects-overview",
      },
      {
        name: "Git integration with Power BI Desktop projects — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/power-bi/developer/projects/projects-git",
      },
      {
        name: "Conflict resolution with Git integration in Microsoft Fabric — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/fabric/cicd/git-integration/conflict-resolution",
      },
    ],
    sections: [
      {
        paragraphs: [
          "For years, collaborating on Power BI projects carried a hidden cost. If you have ever experienced two data analysts trying to update the exact same report simultaneously, you know the drill: duplicate .pbix files cluttering Teams chats, frantic messages reading, \"I'm working on the report, don't save any changes!\", and the inevitable loss of hours of work because someone accidentally overwrote the latest version.",
          "The root cause has always been the file format itself. The classic .pbix is a closed, binary file. To a version control system, it was nothing more than a black box. If two files changed, Git had no intelligent way to compare them.",
          "The good news? That reality has radically changed with the introduction of the Power BI Project (PBIP) format and its native integration with Git and the Microsoft Fabric ecosystem.",
        ],
      },
      {
        heading: "What Changes with PBIP? From Binary to Structured Text",
        paragraphs: [
          "The major breakthrough of the PBIP format is that it splits the report and semantic model into structured folders containing human-readable text files, utilizing standards like JSON for metadata and reports, and TMDL (Tabular Model Definition Language) for tables, columns, and DAX measures.",
          "By converting your project to PBIP (.pbip), your work stops living inside a single binary blob and begins to behave just like any traditional software development project, such as Python, C#, or TypeScript.",
        ],
      },
      {
        heading: "Practical Advantages in Daily Work",
        paragraphs: [
          "Real Change History: You can track precisely who modified a specific DAX measure, updated a visual property, or added a new table, line by line, directly through the Git history.",
          "Parallel Development: Multiple developers can work on the same project in separate branches. While one engineer fine-tunes the data model, another can build new report pages.",
          "Cleaner Code Reviews: Code reviewing a Power BI report via Pull Requests is no longer a guessing game; it is now a transparent text-code analysis.",
        ],
      },
      {
        heading: "What About the Feared Merge Conflicts?",
        paragraphs: [
          "In traditional software development, merge conflicts occur when two people edit the exact same line of code concurrently. In Power BI, with PBIP, the principle is identical.",
          "If Team A modifies the Sales page and Team B updates a measure inside the semantic model folder, Git handles the merge automatically without a hitch.",
          "However, if both developers edit the exact same line of code—for instance, the same DAX formula for a measure—Git will flag a conflict. You and your team can inspect the conflict side-by-side and explicitly choose which version to keep, exactly the way software engineers have done for years.",
        ],
      },
      {
        heading: "The Modern Workflow: PBIP + Git",
        paragraphs: [
          "Transitioning to this new maturity model requires a minor cultural shift within the team, but the standard workflow is straightforward.",
          "Save as PBIP: Instead of saving as a standard .pbix, you open and save your work as a Power BI Project (.pbip).",
          "Git Synchronization: Make regular commits to your repository, whether you use GitHub, Azure DevOps, or GitLab.",
          "Pull & Push: Developers pull the latest version, build features in their respective branches, resolve any conflicts, and open a Pull Request for peer review prior to production deployment.",
        ],
      },
      {
        heading: "Conclusion: It Is Time to Leave the Past Behind",
        paragraphs: [
          "If your data team is still sharing .pbix files via email, OneDrive, or network shares, you are exposing your projects to unnecessary risks of data loss and capping your team's productivity.",
          "Adopting PBIP alongside Git is no longer a technical nice-to-have. It has become an essential skill for anyone building scalable, robust, enterprise-grade Business Intelligence solutions.",
          "How does your team handle collaboration today? Have you already made the leap to PBIP projects, or are you still tied to the classic .pbix?",
        ],
      },
    ],
  },
  {
    slug: "sem-dados-de-qualidade-nao-ha-ia-que-salve-o-negocio",
    title: "Without Quality Data, No AI Can Save the Business",
    excerpt:
      "Why data quality is no longer merely a technical concern, but a strategic priority for leaders and organizations that want to use AI with confidence.",
    category: "Data & AI",
    publishedAt: "2026-07-15T10:42:51+00:00",
    updatedAt: "2026-09-02T10:00:00+01:00",
    readingTime: "6 min read",
    language: "en-GB",
    keywords: [
      "data quality",
      "artificial intelligence",
      "data governance",
      "AI governance",
      "digital transformation",
      "small and midsize businesses",
      "GDPR",
      "EU AI Act",
    ],
    image: "/blog/blog-data-quality-ai-cover.png",
    imageAlt:
      "Fragmented data flows passing through validation layers before feeding an artificial intelligence system",
    imageWidth: 1672,
    imageHeight: 941,
    source: {
      name: "IA Hoje",
      url: "https://inteligenciaartificialhoje.pt/sem-dados-de-qualidade-nao-ha-ia-que-salve-o-negocio/",
      linkedInUrl:
        "https://www.linkedin.com/posts/inteligencia-artificial-hoje_sem-dados-de-qualidade-n%C3%A3o-h%C3%A1-ia-que-salve-activity-7483434000754266113-0uDL",
    },
    sections: [
      {
        paragraphs: [
          "Over the past several years, I have closely followed digital transformation projects across companies in different countries, including many Portuguese organizations. Regardless of company size or industry, one pattern continues to emerge, and it no longer surprises me: these projects rarely fail because of the technology itself.",
          "More often, the problem lies in something more fundamental and less visible to leadership: the quality of the information supporting the entire operation.",
          "Businesses now operate in an increasingly data-driven environment, where multiple sources coexist: CRM platforms, IoT sensors, website activity, social media interactions, mobile applications, and, increasingly, the records generated by generative AI tools.",
          "Ensuring that this information is reliable is no longer solely an IT responsibility. It has become a strategic priority for every organization.",
          "This is where artificial intelligence is playing an increasingly important role. By automating tasks, identifying inconsistencies, and continuously analyzing large volumes of information, AI can help organizations maintain data reliability throughout its lifecycle.",
        ],
      },
      {
        heading: "What Is Data Quality?",
        paragraphs: [
          "Data quality refers to the level of confidence an organization can place in its data, from the moment it is created or collected to the point when it is transformed into information ready for analysis.",
          "Data is considered high quality when it is accurate, complete, consistent, current, and appropriate for its intended purpose.",
          "Consider a common example from Business Intelligence projects. Many companies analyze sales performance by region using their customers’ ZIP or postal codes.",
          "When this field is entered manually without validation at the source, inconsistencies, duplicates, and missing values quickly appear. These issues compromise dashboards and business decisions, even in organizations that consider themselves data-driven.",
        ],
      },
      {
        heading: "Why Is Data Quality So Important?",
        paragraphs: [
          "Nearly every business decision now depends on data. From sales forecasts to predictive models, the quality of the underlying information directly affects an organization’s ability to generate value.",
          "Incorrect data leads to poor decisions, additional work, and, in regulated industries, significant compliance risks.",
          "Even the most advanced AI model cannot independently transform corrupted data into reliable information.",
          "AI can improve processes and identify inconsistencies, but it does not eliminate the need to ensure quality at the very beginning of the data pipeline.",
        ],
        quote:
          "The principle of “garbage in, garbage out” remains more relevant than ever: inaccurate data produces inaccurate results, regardless of how sophisticated the technology may be.",
      },
      {
        heading: "How Is AI Transforming Data Quality?",
        paragraphs: [
          "Artificial intelligence can automate processes throughout the data lifecycle and contribute in four key areas.",
          "In anomaly detection, AI identifies unexpected patterns across large volumes of data. It can, for example, flag an unusual drop in sales in real time without relying exclusively on manually configured rules.",
          "In duplicate detection, AI can recognize duplicate records even when there are small differences in spelling or formatting, consolidating fragmented information into a single, reliable version.",
          "In normalization and enrichment, AI standardizes information collected from different systems. It can reconcile variations such as “New York City” and “NYC,” or validate postal codes using semantic context.",
          "Through continuous monitoring, AI can also track the integrity of data flows in real time, reducing the time required to identify and correct problems.",
          "Ultimately, these capabilities lead to something even more valuable: faster, better-informed, and more reliable decisions.",
        ],
      },
      {
        heading: "Tools and Organizational Maturity",
        paragraphs: [
          "A growing number of platforms combine automation and AI to support data observability, monitoring, and validation.",
          "Some are designed for complex, distributed environments, while others offer simpler approaches that can be implemented more quickly.",
          "In practice, many organizations begin by managing data quality at the source through relatively manual processes. As their data architecture becomes more complex, they gradually adopt more advanced platforms.",
          "However, choosing the right tool is only one part of the equation. The real challenge, particularly for smaller businesses, lies elsewhere.",
        ],
      },
      {
        heading: "Data Quality, Compliance, and the Reality of Small and Midsize Businesses",
        paragraphs: [
          "Data quality is no longer merely an operational concern. It has also become a legal and regulatory requirement.",
          "Across Portugal and the European Union, regulations such as the GDPR and the EU AI Act require organizations to maintain high levels of control, traceability, and governance throughout the data lifecycle. Negligence can result in audits, substantial penalties, and reputational damage.",
          "This is where I currently see one of the greatest challenges, but also one of the greatest opportunities.",
          "Most small and midsize businesses do not have, and are unlikely to have in the near future, teams dedicated exclusively to data quality. Their information is often distributed across spreadsheets, poorly configured CRM systems, and highly manual processes.",
          "In these environments, AI is no longer a luxury reserved for large enterprises. It becomes a force for technological democratization.",
          "AI allows smaller teams to scale analytical processes, meet regulatory requirements, and compete with much larger organizations, without having to build entire departments simply to organize and maintain their data.",
          "Over the years, I have seen small and midsize businesses gain more visibility into their operations within a few months than they had achieved after years of manual reporting.",
          "This did not happen because they suddenly collected more data. It happened because they finally began to trust the data they already had, and could make strategic decisions based on that confidence.",
        ],
      },
      {
        heading: "Challenges and Conclusion",
        paragraphs: [
          "Despite its advances, artificial intelligence does not eliminate every challenge. Organizations still need strong data governance, clear accountability, and well-designed business rules.",
          "Without these foundations, even the best AI models will face serious limitations.",
          "If there is one idea to take away from this article, it is this: AI is a powerful tool, but it still requires context, oversight, and human expertise to generate meaningful business value.",
          "Organizations that successfully combine a strong data governance culture with the automation potential of artificial intelligence will be better prepared to transform information into a sustainable competitive advantage.",
          "And this is what I believe: the organizations that bring these two capabilities together will move ahead.",
        ],
      },
    ],
  },
  {
    slug: "next-challenge-data-engineering-isnt-scale-its-ai-governance",
    title: "The next challenge for Data Engineering isn't scale. It's AI Governance.",
    excerpt:
      "As AI agents become major consumers of enterprise data platforms, governance must expand beyond data access to models, tools, permissions, lineage and automated actions.",
    category: "Data Engineering & AI",
    publishedAt: "2026-07-09T11:23:54+00:00",
    updatedAt: "2026-07-09T11:24:24+00:00",
    readingTime: "2 min read",
    language: "en-GB",
    keywords: [
      "data engineering",
      "AI governance",
      "data architecture",
      "Databricks",
      "Unity Catalog",
      "AI agents",
      "data governance",
    ],
    image: "/blog/next_challenge_for_DE.webp",
    imageAlt:
      "Diagram showing the evolution from data platforms built for human users to AI-ready platforms governed for autonomous agents",
    imageWidth: 1536,
    imageHeight: 1024,
    source: {
      name: "LinkedIn",
      url: "https://www.linkedin.com/pulse/next-challenge-data-engineering-isnt-scale-its-ai-governance-p%C3%B3voa-8zi5e",
    },
    references: [
      {
        name: "Governing AI agents at scale with Unity Catalog — Databricks",
        url: "https://www.databricks.com/blog/governing-ai-agents-scale-unity-catalog",
      },
    ],
    sections: [
      {
        paragraphs: [
          "After reading Databricks' latest updates on Unity Catalog, I started wondering...",
          "For years, the most important question in a data platform was simple:",
        ],
        quote: "Who can access this table?",
      },
      {
        heading: "The question is changing",
        paragraphs: [
          "With AI agents on the rise, that question is changing fast.",
          "Now it's:",
        ],
        quote: "Which agents can use this data to make decisions or take actions?",
      },
      {
        heading: "A new phase of Data Engineering",
        paragraphs: [
          "We are entering a new phase of Data Engineering and Data Architecture: AI Governance.",
          "Until now, most organizations have designed their data architectures for users such as:",
          "• Analysts",
          "• Data Engineers",
          "• Data Scientists",
          "• Business teams",
          "But the next major consumer of your data platform probably won't be a person.",
          "It will be an AI agent.",
          "An agent capable of querying tables, combining information, calling APIs, executing workflows, opening tickets, generating reports, or even initiating business processes automatically.",
        ],
      },
      {
        heading: "New questions for AI-ready platforms",
        paragraphs: [
          "And that raises new questions:",
          "What data can this agent access?",
          "Which tools is it allowed to use?",
          "What actions is it authorized to perform?",
          "How do we audit its decisions?",
          "Who is accountable when something goes wrong?",
          "Concepts such as:",
          "• AI Governance",
          "• Agent Permissions",
          "• AI Lineage",
          "• Model Governance",
          "• Data Policies",
          "are becoming just as important as ETL, ELT, Data Quality, and Observability.",
        ],
      },
      {
        heading: "Unity Catalog as a governance layer",
        paragraphs: [
          "Recently, Databricks shared its vision for this challenge through the evolution of Unity Catalog.",
          "The platform is no longer positioning Unity Catalog simply as a data catalog, but as a central governance layer for data, models, tools, and AI agents.",
          "One of the biggest architectural shifts of the coming years may be this:",
        ],
        quote:
          "The challenge is no longer just governing data. Now we need to govern the intelligence that uses that data.",
      },
      {
        heading: "Are our architectures ready?",
        paragraphs: [
          "Are we ready to design architectures built for AI agents rather than just human users?",
          "How is your organization preparing for AI Governance?",
        ],
      },
    ],
  },
];

export const getBlogPost = (slug?: string) =>
  blogPosts.find((post) => post.slug === slug);
