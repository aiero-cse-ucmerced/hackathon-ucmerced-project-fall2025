import React from 'react';

interface RecommendationCardProps {
  title: string;
  tags: { text: string; color: string; icon?: React.ReactNode }[];
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ title, tags }) => {
  return (
    <div className="relative flex-shrink-0 w-64 bg-gray-100 rounded-lg p-4 shadow-md">
      <div className="flex space-x-2 mb-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`${tag.color} text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center`}
          >
            {tag.icon && <span className="h-3 w-3 mr-1">{tag.icon}</span>}
            {tag.text}
          </span>
        ))}
      </div>
      <p className="text-lg font-medium">{title}</p>
      <button className="absolute bottom-1 right-1 text-gray-600 p-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default RecommendationCard;