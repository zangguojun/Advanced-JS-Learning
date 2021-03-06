/**
 * 类的多态：重写和重载
 * JAVA中的重载：函数名相同，但是传参类型、数量不同，或者返回值不同
 * JS中的重载：JS没有类似JAVA重载机制，JS中的重载指的是同一个方法，根据传递的参数不同，实现不同的业务逻辑
 * JAVA中的重写：子类重写父类的方法
 * JS的重写：与JAVA类型
 */

/**
 * 继承：子类继承父类中的属性和方法
 * JS由自己独特的处理方式
 */

/**
 * 方案一：原型继承
 *    1、并不会把父类中的方法克隆一份给子类，而是建立了子类和父类的原型链查找机制
 *    2、重定向子类的原型后，默认丢失了原本的constructor属性（以及原本在原型上设置的属性和方法）
 *    3、子类和子类的实例，可以基于原型链肆意修改父类上的属性和方法，对父类造成一些不必要的破坏
 *    4、会把父类中的私有的属性和方法作为子类公有的属性和方法（父类中不管是公有还是私有，最后都会变成子类公有的方法）
 */
function a() {
  function A() {
    this.x = 100;
  }
  A.prototype.getX = function getX() {
    console.log(this.x);
  }

  B.prototype = new A();
  function B() {
    this.y = 200;
  }
  B.prototype.getY = function getY() {
    console.log(this.y);
  }

  let b = new B()
  console.log(b.x);
  console.log(b.y);
  console.log(b.getX);
  console.log(b.getY);

  // 修改B的原型
  b.__proto__.AA = function AA() {
    console.log('AA');
  }
  // 修改A的原型
  b.__proto__.__proto__.getX = null

  console.log('---');

  console.log(b.getX);
  console.log(b.AA);
}
// a()


console.log('--------------------');


/**
 * 方案二：call继承：使用call方法让父类当作普通函数执行时的this变为子类的实例
 *    1、只能继承父类的私有属性（继承的私有属性赋值给子类实例的私有属性），而且是浅拷贝一份，而不是原型继承的链式查找
 *    2、因为只是父类当作普通的方法执行，所以原型上的公有属性和方法无法被继承
 */
function b() {
  function A() {
    this.x = 100;
  }
  A.prototype.getX = function getX() {
    console.log(this.x);
  }

  function B() {
    A.call(this)
    this.y = 200;
  }
  B.prototype.getY = function getY() {
    console.log(this.y);
  }

  let b = new B()
  console.log(b.x, b.y);
}
// b()

function c() {
  function A() {
    this.x = {
      name: {
        name: 'AAA'
      }
    }
  }
  A.prototype.getX = function getX() {
    console.log(this.x);
  }

  function B() {
    A.call(this)
    this.y = 200;
  }
  B.prototype.getY = function getY() {
    console.log(this.y);
  }

  let b = new B()
  console.log(b.x, b.y);
  b.x.name.name = 'BBB'
  let a = new A()
  console.log(a.x);
}
// c()


console.log('--------------------');


/**
 * 方案三：寄生组合继承：call继承 + 变异版的原型继承
 * call继承实现：私有到私有
 * 原型继承实现：公有到公有
 */
function d() {
  function A() {
    this.x = 100;
  }
  A.prototype.getX = function getX() {
    console.log(this.x);
  }

  function B() {
    A.call(this)
    this.y = 200;
  }

  // Object.create(OBJ) 创建一个空对象，让它的__proto__指向OBJ（把OBJ作为空对象的原型）
  B.prototype = Object.create(A.prototype)
  B.prototype.constructor = B

  B.prototype.getY = function getY() {
    console.log(this.y);
  }

  let b = new B();
  console.log(b);
}
// d()


console.log('--------------------');


/**
 * 方案四：ES6继承：class
 * ES6继承和寄生组合继承基本类似
 * super() 类似于 A.call(this)，如super(100) =>A.call(this, 100)
 */
function e() {
  class A {
    constructor() {
      this.x = 100;
    }
    // ES7 和 this.xx = 101一样
    xx = 101
    // A的静态方法
    static xxx = 102
    getX() {
      console.log(this.x);
    }
  }
  class B extends A {
    constructor() {
      super()
      this.y = 100;
    }
    getY() {
      console.log(this.y);
    }
  }
  let b = new B();
  console.log(b);
  let a = new A();
  console.log(a);
}
// e()

console.log('--------------------');


/**
 * 项目中使用继承的地方
 *    1、react创建类组件：class Demo extends React.Component{}
 *    2、自己写插件或者类库
 */
