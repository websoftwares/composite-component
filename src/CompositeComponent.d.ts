import Contract = require('./ComponentInterface');
export declare class CompositeComponent implements Contract.ComponentInterface {
    private components;
    render(): string;
    attachComponent(component: Contract.ComponentInterface): CompositeComponent;
    detachComponent(component: Contract.ComponentInterface): CompositeComponent;
}
