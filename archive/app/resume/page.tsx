'use client';

import { USER } from '@/config/user';
// import { resumeData } from '@/lib/resume-data';
import type React from 'react';
import { useState } from 'react';
import { A4_HEIGHT_MM, A4_WIDTH_MM, MM_TO_PX, Ruler } from './ruler';

export default function ResumePage() {
  // const { experience, education, skills } = resumeData;
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    setScrollX(target.scrollLeft);
    setScrollY(target.scrollTop);
  };

  return (
    <div className="fixed inset-0 bg-neutral-100 dark:bg-neutral-500/40">
      {/* Corner square */}
      <div className="fixed top-0 left-0 z-21 hidden h-8 w-8 border-r border-b lg:block" />

      {/* Rulers */}
      <Ruler orientation="horizontal" scrollPosition={scrollX} />
      <Ruler orientation="vertical" scrollPosition={scrollY} />
      <MarginGuide />

      {/* Content area */}
      <div
        className="overflow-auto md:fixed md:top-8 md:right-0 md:bottom-0 md:left-8"
        onScroll={handleScroll}
      >
        <div className="flex w-full flex-col items-center p-4 md:min-h-full md:p-20">
          <div
            className="relative scale-50 overflow-hidden rounded-md border border-neutral-400 border-dotted bg-white shadow-lg md:scale-100"
            style={{
              width: `${A4_WIDTH_MM * MM_TO_PX}px`,
              height: `${A4_HEIGHT_MM * MM_TO_PX}px`,
            }}
            id="resume"
          >
            {/* Content with margins */}
            <div className="absolute inset-0 overflow-hidden p-8">
              {/* Header */}
              <div>
                <h1 className="mb-1 font-bold text-3xl text-black">
                  {USER.name}
                </h1>
                <h2 className="text-black text-sm tracking-wide">
                  {USER.tagline} |{' '}
                  <a
                    href={`https://${USER.domain}`}
                    className="text-[#ad1d1d] hover:underline"
                  >
                    {USER.domain}
                  </a>
                </h2>
                <div className="prose prose-sm mt-4 text-[#939598]">
                  <p className="whitespace-pre-wrap text-sm">
                    {USER.description}
                  </p>
                </div>
              </div>

              <hr className="my-4 border-gray-300" />

              {/* Main Content Grid */}
              <div className="grid grid-cols-5 gap-6">
                {/* Left Column - Experience */}
                <div className="col-span-3">
                  <h3 className="mb-3 font-bold text-[#70706f] text-base">
                    Experience
                  </h3>
                  {/* {experience.map((company, index) => (
                    <div key={index} className="mb-4">
                      {company.positions.map((position, posIndex) => (
                        <div key={posIndex} className="mb-3">
                          <h4 className="font-bold text-sm">
                            <a
                              href={company.companyUrl}
                              className="text-[#ad1d1d] hover:underline"
                            >
                              {company.company}
                            </a>
                          </h4>
                          <h5 className="mb-1 text-[#70706f] text-xs">
                            {position.title} | <time>{position.duration}</time>
                          </h5>
                          <ul className="list-disc space-y-0.5 pl-4">
                            {position.points.map((point, pointIndex) => (
                              <li
                                key={pointIndex}
                                className="text-[#939598] text-xs"
                              >
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ))} */}
                </div>

                {/* Right Column */}
                <div className="col-span-2">
                  {/* Education Section */}
                  <div className="mb-6">
                    <h3 className="mb-3 font-bold text-[#70706f] text-base">
                      Education
                    </h3>
                    {/* {education.map((edu, index) => (
                      <div key={index} className="mb-3">
                        <h4 className="font-bold text-sm">
                          <a
                            href={edu.url}
                            className="text-[#ad1d1d] hover:underline"
                          >
                            {edu.school}
                          </a>
                        </h4>
                        <p className="text-[#939598] text-xs">{edu.degree}</p>
                        <p className="text-[#939598] text-xs">
                          Graduated {edu.graduationDate}
                        </p>
                      </div>
                    ))} */}
                  </div>

                  {/* Skills Section */}
                  <div>
                    <h3 className="mb-3 font-bold text-[#70706f] text-base">
                      Skills
                    </h3>
                    <ul className="space-y-1">
                      {/* {skills.map((skill, index) => (
                        <li key={index} className="text-sm">
                          <a
                            href={skill.url}
                            className="text-[#ad1d1d] hover:underline"
                          >
                            {skill.name}
                          </a>
                        </li>
                      ))} */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const MarginGuide = () => {
  return (
    <div className="absolute inset-0 border border-neutral-400 border-dotted" />
  );
};
