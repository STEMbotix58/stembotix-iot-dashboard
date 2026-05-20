type TopicSegments = (string | number)[];

const topicBuilder = (...segments: TopicSegments): string => {
  return segments.filter(Boolean).map(String).join("/");
};

export default topicBuilder;
