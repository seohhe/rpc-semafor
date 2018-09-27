console.log("semafor")
const jayson = require('jayson')

class Semafor {
  constructor() {
    this.val = 10
    this._queueMore = []

    this.server = jayson.server({
      increase: (args, callback) => this.increase(args[0], callback),
      decrease: (args, callback) => this.decrease(args[0], callback)
    })
    this.server.http().listen(3001)

    console.log(`Semafor ma wartość: ${this.val}`)
  }
  increase(value, callback) {
    this.val += value
    callback(null, this.val)

    if(this._queueMore.length > 0) {
      const cb = this._queueMore.shift()
      if(cb()) {
      }
    }
  }
  decrease(value, callback, tryagain = false) {
    if(this.val - value >= 0) {
      this.val -= value
      this.log(`Zmniejszono wartość o: ${value}. Aktualna wartość to: ${this.val}`);
      callback(null, this.val)
      return true
    } else {
        this._queueMore.push(() => {
          this.decrease(value, callback, true)
        })
    }
    return false
  }
  get val() {
    return this._semval
  }
  set val(x) {
    console.log(`semval = ${x}`)
    this._semval = x
  }
}

new Semafor();