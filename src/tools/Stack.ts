class Stack {
  private readonly elements: string[]

  constructor() {
    this.elements = []
  }
  add(el: string) {
    this.elements.push(el)
  }
  remove() {
    return this.elements.pop()
  }
  size() {
    return this.elements.length
  }
}

export default Stack