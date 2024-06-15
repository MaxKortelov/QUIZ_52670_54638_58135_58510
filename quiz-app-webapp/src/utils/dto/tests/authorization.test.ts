import {LoginModel, LoginRequest, makeLoginRequest} from "../authorization";

describe('makeLoginRequest', () => {
    it('should convert LoginModel to LoginRequest correctly with username', () => {
        const model: LoginModel = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123',
        };

        const expectedRequest: LoginRequest = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123',
        };

        const result = makeLoginRequest(model);
        expect(result).toEqual(expectedRequest);
    });

    it('should convert LoginModel to LoginRequest correctly without username', () => {
        const model: LoginModel = {
            email: 'test@example.com',
            password: 'password123',
        };

        const expectedRequest: LoginRequest = {
            email: 'test@example.com',
            password: 'password123',
        };

        const result = makeLoginRequest(model);
        expect(result).toEqual(expectedRequest);
    });
});
