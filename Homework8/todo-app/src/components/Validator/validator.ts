import { createErrorDecorator, showErrorDecorator } from "../Decorator";

export class Validator {
    errors: { [key: string]: string } = {};
    @createErrorDecorator
    createError(field: string, message: string): void {
        this.errors[field] = message;
    }
    @showErrorDecorator
    showError(field: string): void {
        const errorMessage = this.errors[field];
        if (errorMessage) {
            const fieldElement = document.getElementById('error-message');
            if (fieldElement) {
                fieldElement.classList.add('error-message');
                fieldElement.innerHTML+=errorMessage+'<br>';
                        }
        }
    }

    // private showErrorMessage(fieldElement: HTMLElement, message: string): void {
    //     let errorElement = fieldElement.nextElementSibling;
    //     if (!errorElement || !errorElement.classList.contains('error-message')) {
    //         errorElement = document.createElement('div');
    //         errorElement.className = 'error-message';
    //         fieldElement.parentNode?.insertBefore(errorElement, fieldElement.nextSibling);
    //     }
    //     errorElement.textContent = message;
    // }

    clearErrors(): void {
        this.errors = {};
        const errorMessages = document.getElementById('error-message');
        errorMessages!.innerHTML = '';
        const errorFields = document.querySelectorAll('.error');
        errorFields.forEach(errorField => errorField.classList.remove('error'));
    }
}
