exports.makeID = () => {
  return (
    "YEET" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};
