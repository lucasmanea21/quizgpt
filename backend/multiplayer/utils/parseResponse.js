const parseResponse = (response) => {
  const jsonString = response.replace("```json", "```");

  const code = jsonString.split("```")[1];

  if (code === undefined) {
    return "Quiz generation failed";
  }

  const codeToJS = eval(code);

  return codeToJS;
};

const validateQuestionStructure = (question) => {
  if (typeof question !== "object" || Array.isArray(question)) {
    return false;
  }

  const { correct, options, question: questionText } = question;

  if (
    typeof correct !== "string" ||
    typeof questionText !== "string" ||
    !Array.isArray(options)
  ) {
    return false;
  }

  if (options.length === 0) {
    return false;
  }

  for (let option of options) {
    if (typeof option !== "string") {
      return false;
    }
  }

  return true;
};

module.exports = {
  parseResponse,
  validateQuestionStructure,
};
