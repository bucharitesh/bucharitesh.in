import React from "react";

interface TableRowProps {
  href: string;
  title: string;
  date: string;
  subtitle?: string;
}

function SectionRow({ href, title, subtitle, date }: TableRowProps) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className="flex sm:items-center flex-col sm:flex-row gap-0.5 sm:gap-4 group"
    >
      <strong className="line-clamp-2 font-medium text-gray-1000 group-hover:text-blue-600 group-hover:underline dark:text-gray-100 dark:group-hover:text-blue-500">
        {title}
      </strong>
      <span className="hidden sm:flex flex-1 border-t border-gray-300 border shrink dark:border-gray-800" />
      {subtitle && <span className="flex-none text-tertiary">{subtitle}</span>}
      {date && (
        <span className="flex-none font-mono text-quaternary">{date}</span>
      )}
    </a>
  );
}

const Section = () => {
  return (
    <div className="grid items-start grid-cols-1 gap-6 md:grid-cols-12">
      <div className="col-span-12">
        <SectionRow
          href={"/twitter"}
          title={"Twitter"}
          subtitle={"Follow"}
          date={"2023"}
        />
        <SectionRow
          href={"/youtube"}
          title={"YouTube"}
          subtitle={"Follow"}
          date={""}
        />
        <SectionRow
          href={"/github"}
          title={"GitHub"}
          subtitle={"Follow"}
          date={""}
        />
        <SectionRow
          href={"/figma"}
          title={"Figma"}
          subtitle={"Follow"}
          date={""}
        />
      </div>
    </div>
  );
};

export default Section;
