export type ExperiencePositionIcon =
  /** Icon key used to render the position category in the UI. */
  "code" | "design" | "education" | "business" | "idea";

export type ExperiencePosition = {
  id: string;
  title: string;
  /**
   * Employment period of the position.
   * Use "MM.YYYY" or "YYYY" format. Omit `end` for current roles.
   */
  employmentPeriod: {
    /** Start date (e.g., "10.2022" or "2020"). */
    start: string;
    /** End date; leave undefined for "Present". */
    end?: string;
  };
  /** Full-time | Part-time | Contract | Internship, etc. */
  employmentType?: string;
  description?: string;
  /** UI icon to represent the role type. */
  icon?: ExperiencePositionIcon;
  skills?: string[];
  /** Whether the position is expanded by default in the UI. */
  isExpanded?: boolean;
};

export type Experience = {
  id: string;
  companyName: string;
  companyUrl: string;
  city: string;
  /** URL to the company logo (absolute URL or path under /public). */
  companyLogo?: string;
  /** Roles held at this company; keep newest first for display. */
  positions: ExperiencePosition[];
  /** Marks the company as the current employer for highlighting. */
  isCurrentEmployer?: boolean;
};

export const experiences: Experience[] = [
  {
    id: "flam",
    companyName: "Flam",
    companyUrl: "https://flamapp.com",
    city: "Bengaluru",
    companyLogo: "https://flamapp.com/logo.png",
    positions: [
      {
        id: "senior-frontend-developer",
        title: "Senior Frontend Developer",
        employmentType: "Full-time",
        employmentPeriod: {
          start: "Nov 2022",
          end: "Present",
        },
      },
      {
        id: "frontend-developer",
        title: "Frontend Developer",
        employmentType: "Full-time",
        employmentPeriod: {
          start: "May 2022",
          end: "Oct 2022",
        },
      },
      {
        id: "frontend-developer-intern",
        title: "Frontend Developer Intern",
        employmentType: "Internship",
        employmentPeriod: {
          start: "Dec 2021",
          end: "Apr 2022",
        },
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "athenasquare",
    companyName: "Athenasquare",
    companyUrl: "https://athenasquare.org",
    city: "Bhopal",
    companyLogo: "https://athenasquare.org/logo.png",
    positions: [
      {
        id: "frontend-developer",
        title: "Frontend Developer",
        employmentType: "Internship",
        employmentPeriod: {
          start: "Sep 2021",
          end: "Mar 2022",
        },
        skills: ["JavaScript", "React", "Node.js", "TypeScript", "Next.js", "User Interface Design"],
        description: "Built and managed internal design systems with scalability at the centre stage",
        icon: "code",
      },
    ],
  }
]; 