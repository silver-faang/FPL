export class Validator {
    private errors: { [key: string]: HTMLElement } = {};

    @LogError
    createError(field: string, message: string): void {
        if (!this.errors[field]) {
            const errorElement = document.createElement('div');
            errorElement.className = 'validation-error';
            errorElement.textContent = message;
            this.errors[field] = errorElement;
        }
        this.saveErrorToLocalstorage(field, message);
    }

    @ShowError('New Error from the decorator')
    showError(field: string, container: HTMLElement): void {
        if (this.errors[field]) {
            container.appendChild(this.errors[field]);
            container.classList.add('has-error');
        }
    }

    private saveErrorToLocalstorage(field: string, message: string): void {
        localStorage.setItem(field, message);
    }
}

function LogError(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        console.log(`Error created for field: ${args[0]} - Message: ${args[1]}`);
        return originalMethod.apply(this, args);
    };

    return descriptor;
}

function ShowError(newMessage: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            console.log(`Showing error with new message: ${newMessage}`);
            return originalMethod.apply(this, args);
        };

        return descriptor;
    };
}

export default Validator;
