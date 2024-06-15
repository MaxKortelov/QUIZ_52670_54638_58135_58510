import React from 'react';
import { CreateQuizForm } from "./CreateQuizForm";

import './CreateQuiz.scss';

export const CreateQuiz = () => {
    return (
        <div className="createQuizPage" data-testid="CreateQuizPage">
            <h2 className="createQuizLabel">Add new test</h2>
            <CreateQuizForm/>
        </div>
    );
};
