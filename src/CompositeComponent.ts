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
   * Renders component and outputs the compiled string.
   *
   * @return string
   */
  render():string {
    var output = ''
    this.components.forEach(function(component) {
      output += component.render()
    })
    return output
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
  attachComponent(component: Contract.ComponentInterface): CompositeComponent {
    if (this.components.indexOf(component) > -1) {
        throw RangeError(
          'The component u are trying to add already exists: ' +
           typeof(component)
        )
    }

    this.components.push(component)

    return this
  }

  /**
   * Detach leaf component, this has an fluent method chaining interface.
   *
   * @param  Contract.ComponentInterface leaf component to detach.
   *
   * @return CompositeComponent
   */
  detachComponent(component: Contract.ComponentInterface): CompositeComponent {
    this.components = this.components.filter(function (value) {
        return value !== component
    })

    return this
  }
}
