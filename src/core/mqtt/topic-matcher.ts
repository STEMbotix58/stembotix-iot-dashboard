const MULTI_LEVEL_WILDCARD = "#";
const SINGLE_LEVEL_WILDCARD = "+";

export const topicMatches = (filter: string, topic: string) => {
  const filterSegments = filter.split("/");
  const topicSegments = topic.split("/");

  for (let index = 0; index < filterSegments.length; index += 1) {
    const filterSegment = filterSegments[index];
    const topicSegment = topicSegments[index];

    if (filterSegment === MULTI_LEVEL_WILDCARD) {
      return index === filterSegments.length - 1;
    }

    if (topicSegment === undefined) {
      return false;
    }

    if (filterSegment === SINGLE_LEVEL_WILDCARD) {
      continue;
    }

    if (filterSegment !== topicSegment) {
      return false;
    }
  }

  return filterSegments.length === topicSegments.length;
};
