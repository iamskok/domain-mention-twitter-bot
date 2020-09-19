import fs from 'fs';
import path from 'path';

const footprint = (remainingRequests) => {
  const fileName = `${path.resolve()}/footprint.json`;

  fs.writeFileSync(fileName, JSON.stringify({
    'search/tweets': {
      time: Date.now(),
      remainingRequests,
    },
  }));
};

export default footprint;
