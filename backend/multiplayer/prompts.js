const subSubjectPrompt = (subject) => {
  return `I will give you a subject, which I am using in an AI powered educational app. 
    
    You should take this subject and return me a Javascript array of 15 other sub-subjects, related to the field that 
    could help users learn more about it.
    
    The subject is: ${subject}
    
    Only return me the array, with no other text besides.`;
};

const quizPrompt = (context) => {
  return `Vreau sa imi creezi un quiz format din 1 intrebare.
      
    Raspunsurile trebuie sa fie cat se poate de factuale si corecte, fara ambiguitati sau neadevaruri, doar 4 optiuni.

    Returneaza-mi doar quiz-ul in formatul asta, pentru a fi direct compatibil cu Javascript:
    [{question: "", options: [""], correct: "correct answer string"}]

    Evidentiaza codul cu backticks.

    Aici ai mai mult context, oferit de utilizator: ${context}
    
    Returneaza doar array-ul in JSON, fara niciun alt cuvant.`;
};

module.exports = {
  subSubjectPrompt,
  quizPrompt,
};
