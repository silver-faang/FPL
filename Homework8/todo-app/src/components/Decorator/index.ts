export function createErrorDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(this: any, field: string, message: string) {
        originalMethod.apply(this, [field, message]);

        console.log(`Error created for ${field}: ${message}`);
        localStorage.setItem(`error_${field}`, message);

        const fetchData = () => {
            console.log(`Sending error to the server: ${field} - ${message}`);
        };
        fetchData();
    };

    return descriptor;
}
export function showErrorDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(this: any, field: string) {
        this.errors[field] = `New Error from the decorator for ${field}`;
        originalMethod.apply(this, [field]);
    };

    return descriptor;
}
