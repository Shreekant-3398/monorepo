import { useEffect, useState } from "react";

interface PackageInfo {
  name: string;
}

interface ThrottleData {
  package: PackageInfo;
}

export const useThrottle = (query: string): ThrottleData[] | null => {
  const [throttle, setThrottle] = useState<ThrottleData[] | null>(null);

  useEffect(() => {
    if (query) {
      fetch(`https://api.npms.io/v2/search?q=${query}`)
        .then((res) => res.json())
        .then((data: { results?: ThrottleData[] }) => {
          setTimeout(() => {
            setThrottle(data.results || []);
          }, 400);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [query]);

  return throttle;
};

