export interface INormalisedError {
    message?: string,
    detail?: string
}

export const getNormalisedError = (error: string | Error): INormalisedError => {
    let normalisedError:INormalisedError = {};
    if (typeof (error) === 'string') {
        normalisedError = { message: error };
    } else {
        normalisedError = {
            message: error.message,
            detail: JSON.stringify(error)
        };
    }
    return normalisedError;
}