import Contract = require('./ComponentInterface');

/**
 * Implementing the composite pattern to recursivly render components.
 */
export class CompositeComponent implements Contract.ComponentInterface {

  /**
   * List of components that implement the ComponentInterface.
   *
   * @type Contract.ComponentInterface[]
   */
  private components: Contract.ComponentInterface[] = []

  /**
   * Renders the ui component(s)
   *
   * @return string
   */
  render():string {
    return ''
  }

  /**
   * Attach leaf component, this has an fluent method chaining interface.
   *
   * @param  Contract.ComponentInterface leaf component to attach.
   *
   * @throws RangeError
   *
   * @return CompositeComponent
   */
  attachComponent(
    component: Contract.ComponentInterface
  ): CompositeComponent {

    if (this.components.indexOf(component) > -1) {
        throw RangeError(
          'The component u are trying to add already exists: ' +
           typeof(component)
        )
    }

    this.components.push(component)
    
    return this;
  }
}
