"use client";

import React, { useState } from "react";
import { resumeData } from "@/lib/resume-data";
import { meta } from "@/lib/config";
import { A4_HEIGHT_MM, A4_WIDTH_MM, MM_TO_PX, Ruler } from "./ruler";


export default function ResumePage() {
  const { personal, experience, education, skills } = resumeData;
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    setScrollX(target.scrollLeft);
    setScrollY(target.scrollTop);
  };  

  return (
    <div className="fixed inset-0 bg-gray-100">
      {/* Corner square */}
      <div className="hidden z-[21] lg:block fixed top-0 left-0 w-8 h-8 bg-white border-b border-r border-gray-200" />

      {/* Rulers */}
      <Ruler orientation="horizontal" scrollPosition={scrollX} />
      <Ruler orientation="vertical" scrollPosition={scrollY} />

      {/* Content area */}
      <div
        className="fixed top-8 left-8 right-0 bottom-0 overflow-auto"
        onScroll={handleScroll}
      >
        <div className="min-h-full w-full flex flex-col items-center p-20">
          <div
            className="relative bg-white shadow-lg rounded-md overflow-hidden"
            style={{
              width: `${A4_WIDTH_MM * MM_TO_PX}px`,
              height: `${A4_HEIGHT_MM * MM_TO_PX}px`,
            }}
          >
            {/* Content with margins */}
            <div className="absolute inset-0 p-8 overflow-hidden">
              {/* Header */}
              <div>
                <h1 className="font-bold text-3xl mb-1">{meta.name}</h1>
                <h2 className="tracking-wide text-sm">
                  {personal.title} |{" "}
                  <a
                    href={`https://${meta.domain}`}
                    className="text-[#ad1d1d] hover:underline"
                  >
                    {meta.domain}
                  </a>
                </h2>
                <div className="prose prose-sm mt-4 text-[#939598]">
                  <p className="text-sm whitespace-pre-wrap">
                    {personal.intro}
                  </p>
                </div>
              </div>

              <hr className="my-4 border-gray-300" />

              {/* Main Content Grid */}
              <div className="grid grid-cols-5 gap-6">
                {/* Left Column - Experience */}
                <div className="col-span-3">
                  <h3 className="text-[#70706f] font-bold text-base mb-3">
                    Experience
                  </h3>
                  {experience.map((company, index) => (
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
                          <h5 className="text-[#70706f] text-xs mb-1">
                            {position.title} | <time>{position.duration}</time>
                          </h5>
                          <ul className="list-disc pl-4 space-y-0.5">
                            {position.points.map((point, pointIndex) => (
                              <li
                                key={pointIndex}
                                className="text-xs text-[#939598]"
                              >
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Right Column */}
                <div className="col-span-2">
                  {/* Education Section */}
                  <div className="mb-6">
                    <h3 className="text-[#70706f] font-bold text-base mb-3">
                      Education
                    </h3>
                    {education.map((edu, index) => (
                      <div key={index} className="mb-3">
                        <h4 className="font-bold text-sm">
                          <a
                            href={edu.url}
                            className="text-[#ad1d1d] hover:underline"
                          >
                            {edu.school}
                          </a>
                        </h4>
                        <p className="text-xs text-[#939598]">{edu.degree}</p>
                        <p className="text-xs text-[#939598]">
                          Graduated {edu.graduationDate}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Skills Section */}
                  <div>
                    <h3 className="text-[#70706f] font-bold text-base mb-3">
                      Skills
                    </h3>
                    <ul className="space-y-1">
                      {skills.map((skill, index) => (
                        <li key={index} className="text-sm">
                          <a
                            href={skill.url}
                            className="text-[#ad1d1d] hover:underline"
                          >
                            {skill.name}
                          </a>
                        </li>
                      ))}
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