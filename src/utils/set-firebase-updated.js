const setFirebaseUpdated = (oldResponses, allResponses) => {
  const oldSet = new Set(oldResponses.map(({ id_str: idStr }) => idStr));
  const allSet = new Set(allResponses.map(({ id_str: idStr }) => idStr));
  const difference = new Set(
    [...allSet].filter((x) => !oldSet.has(x)),
  );

  console.log('^^^^ difference', difference);
  console.log('^^^^ difference.size', difference.size);
  console.log('^^^^ oldResponses', oldResponses);
  console.log('^^^^ allResponses', allResponses);

  if (difference.size) {
    return true;
  }
  return false;
};

export default setFirebaseUpdated;
