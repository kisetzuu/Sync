"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaProjectDiagram } from "react-icons/fa";
import { DocumentData } from 'firebase-admin/firestore';



interface ColleagueCardProps {
  doc: DocumentData;
}

export const ColleagueCard: React.FC<ColleagueCardProps> = ({ doc }) => {
  //const router = useRouter();
  //const segments = doc.projectUID._path.segments;
  //const projectID = segments[1]; 
  /*const handleCardClick = () => {
   router.push(`/project/${projectID}/document/${doc.UID}`);
  };*/

  return (
    <div className="flex flex-col items-center">
      {/* Card */}
      <button
        className="bg-gray-200 rounded-xl border border-gray-300 relative"
        style={{ width: '90%', paddingBottom: '67.5%' }}
        // onClick={handleCardClick}
      >
        <div className="absolute inset-0 flex items-center justify-center text-black">
          {doc.title}
        </div>
      </button>
      {/* Icon and Project Title */}
      <div className="mt-4 px-4 w-full flex items-center justify-start">
        <FaProjectDiagram className="text-gray-500 text-xl" />
        <p className="text-black pl-2">
          {doc.title}
        </p>
      </div>
    </div>
  );
};
