console.log("client")
const jayson = require('jayson')

class Client {
  constructor() {
    this.connection = jayson.client.http({
      port: 3001
    });
  }
  request(...args) {
    return this.connection.request(...args);
  }
  increase(v = 1, callback = () => {}) {
    this.request('increase', [v, this.name], callback)
  }
  decrease(v = 1, callback = () => {}) {
    this.request('decrease', [v, this.name], callback)
  }
}

class Reader extends Client {
  constructor(name) {
    super();
    this.name = name;
  }
  enterLibrary(time) {
    console.log(`${this.name} chce wejść do biblioteki`)
    this.decrease(1, (err, response) => {
      console.log(`${this.name} wchodzi do biblioteki`)
      if(err) throw err;
      setTimeout(_ => {
        console.log(`${this.name} chce wyjść z biblioteki`)
        this.increase(1, (err, response) => {
          if(err) throw err;
          console.log(`${this.name} wychodzi z biblioteki`)
        })
      }, time)
    })
  }
}

class Writer extends Client {
  constructor(name) {
    super();
    this.name = name;
  }
  enterLibrary(time) {
    console.log(`Pisarz ${this.name} chce wejść do biblioteki`)
    this.decrease(10, (err, response) => {
      console.log(`Pisarz ${this.name} wchodzi do biblioteki`)
      if(err) throw err;
      setTimeout(_ => {
        console.log(`Pisarz ${this.name} chce wyjść z biblioteki`)
        this.increase(10, (err, response) => {
          if(err) throw err;
          console.log(`Pisarz ${this.name} wychodzi z biblioteki`)
        })
      }, time)
    })
  }
}

const adam = new Reader('Adam');
const stefan = new Writer('Stefan');
const basia = new Reader('Basia');

for(let i = 0; i<10; i++) {
  setTimeout(() => {
    adam.enterLibrary(1000);
    stefan.enterLibrary(3000);
    basia.enterLibrary(2000);
  }, 1000 * i * 6)
}