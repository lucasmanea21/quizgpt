const parseResponse = (response) => {
  const jsonString = response.replace("```json", "```");

  const code = jsonString.split("```")[1];

  if (code === undefined) {
    return "Quiz generation failed";
  }

  const codeToJS = eval(code);

  return codeToJS;
};

module.exports = {
  parseResponse,
};
