import { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { getLatestL2EScore } from "../../../api/business";

export default function L2E({ mock = false }) {
  const [scores, setScores] = useState(null);

  useEffect(() => {
    if (mock) {
      setScores({
        Excitement: 7,
        Clarity: 8,
        Workload: 6,
        Cashflow: 9,
        Support: 7,
        Inspiration: 8,
      });
      return;
    }

    const fetchScores = async () => {
      try {
        const res = await getLatestL2EScore();
        if (res?.data?.response?.scores) {
          setScores(res.data.response.scores);
        }
      } catch (err) {
        console.warn("Failed to fetch L2E scores:", err);
      }
    };
    fetchScores();
  }, [mock]);

  if (!scores) return null; // don’t render unless valid data

  const capitaliseWords = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="bg-white rounded-xl sm:p-4 2xl:p-8 h-full">
      <h3 className="text-xl font-bold mb-8">Ladder To Exit</h3>
      <div className="flex flex-col gap-6">
        {Object.entries(scores).map(([name, value]) => (
          <div key={name} className="flex items-center gap-0">
            <span className="w-40 shrink-0 text-md font-medium text-gray-700">{capitaliseWords(name)}</span>
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full ${
                  value >= 8
                    ? "bg-green-500"
                    : value >= 6
                    ? "bg-lime-400"
                    : value >= 4
                    ? "bg-yellow-300"
                    : value >= 2
                    ? "bg-orange-400"
                    : "bg-red-500"
                }`}
                style={{ width: `${(value / 10) * 100}%` }}
              />
            </div>
            <span className="w-20 text-right text-sm font-medium">{value}/10</span>
          </div>
        ))}
      </div>
    </div>
  );
}

L2E.propTypes = {
  mock: PropTypes.bool,
};
