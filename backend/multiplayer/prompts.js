const subSubjectPrompt = (subject) => {
  return `I will give you a subject, which I am using in an AI powered educational app. 
    
    You should take this subject and return me a Javascript array of 15 other sub-subjects, related to the field that 
    could help users learn more about it.
    
    The subject is: ${subject}
    
    Only return me the array, with no other text besides.`;
};

const quizPrompt = (context) => {
  return `I want you to create a quiz consisting of 1 question
      
  The answers must be as factual and correct as possible, without ambiguities or falsehoods, just 4 options.

  Return to me only the quiz in this format, to be directly compatible with Javascript:
  [{question: "", options: [""], correct: "correct answer string"}]
  
  Highlight the code with backticks.
  
  Here you have more context, provided by the user: ${context}
  
  Just return the JSON array, without any other word.`;
};

module.exports = {
  subSubjectPrompt,
  quizPrompt,
};
