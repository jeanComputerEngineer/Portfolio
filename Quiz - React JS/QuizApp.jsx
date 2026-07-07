import React from "react";
import IndexQuiz from "./IndexQuiz"; // Corrija o typo no nome do arquivo
import { QuizProvider } from "./Quiz";

function QuizApp() {




    return (
        <QuizProvider>
            <IndexQuiz /> {/* Esta merda precisa ser encapsulada, se não ele não aceita */}
        </QuizProvider>
    );
}

export default QuizApp
