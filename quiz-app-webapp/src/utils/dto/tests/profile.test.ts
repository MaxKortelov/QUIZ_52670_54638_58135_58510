import {ProfileModel, ProfileResponse, profileResponseToModel} from "../profile";

describe('profileResponseToModel', () => {
    it('should convert ProfileResponse to ProfileModel correctly', () => {
        const response: ProfileResponse = {
            uuid: '12345',
            email: 'test@example.com',
            username: 'testuser',
            dateCreated: '2023-01-01T00:00:00Z',
            dateUpdated: '2023-06-01T00:00:00Z',
            quizAmountTaken: 5,
            fastestTestTime: '2:30',
            correctAnswers: 20,
        };

        const expectedModel: ProfileModel = {
            uuid: '12345',
            email: 'test@example.com',
            username: 'testuser',
            dateCreated: new Date('2023-01-01T00:00:00Z'),
            dateUpdated: new Date('2023-06-01T00:00:00Z'),
            quizAmountTaken: 5,
            fastestTestTime: '2:30',
            correctAnswers: 20,
        };

        const result = profileResponseToModel(response);
        expect(result).toEqual(expectedModel);
    });
});
