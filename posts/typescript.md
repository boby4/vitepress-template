---
date: 2023-09-18
title: TypeScript 入门知识点总结
tags:
- TypeScript
description: 总结一下我使用 typeScript 开发项目时的一些知识点
---

# **TypeScript 入门知识点总结**

## **前提**

总结一下我使用 typeScript 开发项目时的一些知识点。

## Typescript 是什么

TypeScript是一种由微软开发的编程语言，它是JavaScript的一个超集，意味着所有合法的JavaScript代码也都是合法的TypeScript代码。TypeScript在JavaScript的基础上添加了一些静态类型检查和引入，使得开发更加可靠和可维护。静态类型的添加意味着变量的类型在程序中的任何时候都不能改变。

## 为什么要使用Typescript

* 类型安全：

TypeScript引入了静态类型检查，允许开发者明确指定变量、函数参数和返回值的类型。这可以在编译时捕获类型错误，避免了许多在运行时才会出现的错误。类型安全有助于提高代码质量，减少调试时间，提升软件的可靠性。

* 代码可读性和可维护性：

类型注解使代码更加清晰和自文档化。开发者可以快速理解代码中变量和函数的预期类型，这有助于团队协作和维护代码库。

* 面向对象编程支持：

TypeScript提供了面向对象编程的能力，包括类、接口、继承、泛型等。这些概念使得代码更结构化、可维护和可扩展。

* 更好的工具支持：

TypeScript在众多集成开发环境（IDE）中拥有强大的支持，尤其是在Visual Studio Code中。这些工具可以自动执行类型检查、代码格式化和错误提示，从而加速开发流程。

* 面向对象编程支持：

TypeScript提供了面向对象编程的能力，包括类、接口、继承、泛型等。这些概念使得代码更结构化、可维护和可扩展。

* 社区和生态系统：

TypeScript拥有庞大的社区和丰富的第三方库，这意味着你可以轻松地找到各种开发资源和解决方案，以及与其他开发者分享经验。

## 原始类型

原始类型又叫基本类型指的是js中内置的原始数据类型，包括string、number、boolean、null、undefined、symbol、bigint。

我们在声明变量的时候，可以为其添加:type类型注解/类型签名，如下所示：

``` TypeScript
let id: number = 1;
let name: string = '张三';
let isDone: boolean = false;
let decimal: number;
decimal = 6;
```

如果变量有默认值，一般可以不用添加类型注解，Ts会自动推断出变量的类型，如下所示：

``` TypeScript
let id = 1; // number
let name = '张三'; // string
let isDone = false; // boolean
```

我们还可以将一个变量分配多个类型，成为联合类型，如下所示：

``` TypeScript
let id: number | string = 1;
let name: string | number = '张三';
```

## 数组类型

我们可以自己定义数组包含数据的类型，如下所示：

``` TypeScript
let arr: number[] = [1, 2, 3]; // 定义一个number类型的数组
let arr3: string[] = ['a', 'b', 'c']; // 定义一个string类型的数组
let arr4: any[] = [1, 'a', true]; // 定义一个任意类型的数组
let arr4: boolean[] = [true, false, true]; // 定义一个布尔类型的数组
let arr5 = object[] = [
  { name: '111', age: 15},
  { name: '111', age: 15},
]; // 定义一个对象类型的数组
```

我们可以使用联合类型去定义包含多种类型的数组，如下所示：

``` TypeScript
let arr: (number | string)[] = [1, 'a', true]; // 定义一个包含多种类型的数组
arr[0] = '111'; // error
```

如果数组里有默认值，TypeScript 同样也会进行类型推断，如下所示：

``` TypeScript
let arr = [1, 'a', true]; // number | string | boolean
arr[0]='111'; // error
```

元组类型(Tuple),元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。

``` TypeScript
let tuple: [string, number];
tuple = ['111', 15];
tuple = [15, '111']; // error
```

## Object类型

typescript中的对象类型必须拥有所有正确的属性，并且这些属性的类型必须正确，如下所示：

``` TypeScript
let obj={
  name: string,
  age: number,
  sex: string,
};
obj = {
  name: '张三',
  age: 15,
  sex: '男',
};
obj.sex = 1; // error
obj = {
  name: '张三',
  age: 15,
}; // error:missing the isProgrammer property
```

我们通常使用 interface 来定义和检查对象的类型和属性值，如下所示：

``` TypeScript
interface Person {
  name: string;
  age: number;
  sex: string;
}
let obj: Person = {
  name: '张三',
  age: 15,
  sex: '男',
};
obj.sex = 1; // error
```

我们还可以用函数的类型注解声明一个函数属性，如下所示：

``` TypeScript
# 虽然setName、sayHello分别用的是普通函数和箭头函数声明，实际是什么样的函数类型都可以，ts不管这个
interface Person {
  setName(name: string): string;
  sayHello: (name: string) => string;
}

let obj: Person = {
  setName: function(name: string) {
    return `set${name}`;
  },
  sayHello: (name: string) => name,
};
obj.setName('张三'); // 'set张三'
obj.sayHello('张三'); // '张三'
```

## 函数类型

函数类型可以像其他类型一样作为变量的类型，如下所示：

``` TypeScript
function setName(age: number): string {
  return `今年${age}`
}
const setName = (age: number):string => `今年${age}`;
console.log(setName(15)); // '今年15'
```

我们没必要明确声明函数的类型，因为ts会根据函数的参数和返回值自动推断出函数的类型，但是如果函数体比较复杂，ts可能推断不出函数的类型，此时就需要手动声明函数的类型。
我们可以在参数后面加一个?，表示该参数是可选的，参数的类型也可以是一个联合类型，如下所示：

``` TypeScript
const setName = (age?: number | string): string => {
  return `今年${age}`
}
```

## any类型

any类型表示允许赋任意值，在ts中，any类型是所有类型的子类型，也是所有类型的超类型，如下所示：

``` TypeScript
let num: any = 123;
num = '123'; // 赋值成功
num = true; // 赋值成功
```

* 如果代码里面出现了any类型，那么代码就相当于关闭了ts的类型检查，此时就相当于普通的js代码
* 尽量少用any类型，因为any类型会关闭ts的类型检查

## DOM和类型转换

在浏览器中，我们经常需要操作DOM元素，此时我们可以使用DOM API，但是ts不会自动推断DOM API的返回值类型，如下所示：
``` TypeScript
const body = document.querySelector('body');
console.log(body.style); // body is possible null.
```

此时我们可以使用类型断言/非空断言，告诉ts，我们明确知道body.style的类型，如下所示：

``` TypeScript
const body = document.querySelector('body')!;
console.log(body.style.backgroundColor); // 非空断言，获取成功，dom类型为CSSStyleDeclaration 

const body = document.querySelector('body');
console.log((body.style as CSSStyleDeclaration).backgroundColor); // 已知dom类型的情况下使用类型断言，获取成功
```

## 类

我们可以定义一个类，并定义类中每条数据的类型，如下所示：

``` TypeScript
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  setName(): {
    return `我叫 ${this.name}， 今年 ${this.age}`
  }
}
const p = new Person('张三', 18); // 实例化对象
const p2 = new Person(18, 19); // error
console.log(p.setName()); // 调用方法 我叫张三， 今年18
```

我们可以给类的属性添加修饰符，如下所示：

``` TypeScript
class Person {
  readonly name: string; //只读属性修饰符，不可变
  private age: number; // 私有属性修饰符，只能在类内部或者子类中访问和修改
  protected sex: string; // 保护属性修饰符, 只能在类内部或者子类中访问和修改
  public birth: Date; // 公共属性修饰符，随便改
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  setName(): {
    return `我叫 ${this.name}， 今年 ${this.age}`
  }
}
const p = new Person('张三', 18); // 实例化对象
const p2 = new Person(18, 19); // error
console.log(p.setName()); // 调用方法 我叫张三， 今年18
p.name = '李四'; // error
```

我们可以通过下面的写法，属性会在构造函数中自动分配，如下所示：

``` TypeScript
class Person {
  constructor(
    readonly name: string,
    private age: number,
    protected sex: string,
    public birth: Date,
    height: number, // 省略修饰符，默认为public
  ) {}
}
```

## ts中的接口

接口是用来定义对象的类型，接口中的属性必须全部被实现，否则会报错，如下所示：
``` TypeScript
interface Person {
}
const p: Person = { // error
  name: '张三',
  age: 18,
  sex: '男',
  birth: new Date(),
}
```

你也可以使用类型别名来定义接口，如下所示：

``` TypeScript
type Person = {
  name: string,
  age: number,
  sex: string,
  birth: Date,
}
const p: Person = {
  name: '张三',
  age: 18,
  sex: '男',
  birth: new Date(),
}
```

或者直接匿名定义对象类型，如下所示：
``` TypeScript
const p: { name: string, age: number, sex: string, birth: Date } = {
}
```

他们都像类一样可以扩展，如下所示：
``` TypeScript
interface Person {
  name: string,
}
interface Person2 extends Person {// 可以自动合并类型
  age: number,
  sex: string,
  birth: Date,
}
type Person2 = Person & { // 不支持自动合并类型
  age: number,
  sex: string,
  birth: Date,
}
const p: Person2 = {
  name: '张三',
  age: 18,
  sex: '男',
  birth: new Date(),
}
```

## 类的interface

你可以使用接口来定义一个类，如下所示：

``` TypeScript
interface Person {
  name: string,
  age: number,
  sex: string,
  birth: Date,
}
class Person2 implements Person {
  name: string;
  age: number;
  sex: string;
  birth: Date;
  constructor(name: string, age: number, sex: string, birth: Date) {
    this.name = name;
    this.age = age;
    this.sex = sex;
    this.birth = birth;
  }
}
const p: Person2 = new Person2('张三', 18, '男', new Date());
```

## ts中的泛型

泛型是用来解决类型不明确的问题，泛型可以让我们创建一个可以在多种类型上工作的组件，它能够支持当前的数据类型，同时也能支持未来的数据类型，这大大提升了组件的可重用性。如下所示：

addID 函数接受一个任意对象，并返回一个新对象，其中包含传入对象的所有属性和值，以及一个 0 到 1000 之间随机的 id 属性。

``` TypeScript
const addID = (obj: object) => {
  let id = Math.floor(Math.random() * 1000);

  return { ...obj, id };
};

let person1 = addID({ name: 'John', age: 40 });

console.log(person1.id); // 271
console.log(person1.name); // ERROR: Property 'name' does not exist on type '{ id: number; }'
```

当我们尝试访问 name 属性时，TypeScript 会出错。这是因为当我们将一个对象传递给 addID 时，我们并没有指定这个对象应该有什么属性，所以 TypeScript 不知道这个对象有什么属性。因此，TypeScript 只能推断出唯一的属性返回对象的 id。

那么我们如何解决这个问题呢？我们可以使用泛型来解决这个问题，如下所示：

``` TypeScript
# <T>只是一种编写习惯，你可以随意命名，但通常使用 T 表示泛型
const addID = <T>(obj: T) => {
  let id = Math.floor(Math.random() * 1000);

  return { ...obj, id };
};

let person1 = addID({ name: 'John', age: 40 });

console.log(person1.id); // 585
console.log(person1.name); // 'John'
```

现在，当我们调用 addID 时，我们指定了 T 的类型，T就变成了我们指定的任何类型，因此 TypeScript 知道 obj 具有 name 和 age 属性。但是现在有另一个问题我们可以给addID传入任何类型了，ts会捕获任何类型且不报错，那么我们如何限制它的类型呢？

``` TypeScript
const addID = <T extends object>(obj: T) => {
  let id = Math.floor(Math.random() * 1000);

  return { ...obj, id };
};

let person1 = addID({ name: 'John', age: 40 });
let person2 = addID(1111);

console.log(person1.id); // 271
console.log(person2); // ERROR 错误被捕获
```

错误虽然被捕获但是数组也是对象我们传入数组仍然会逃避类型检查，所以我们需要使用一个更严格的类型来代替 object，这个类型就是 `Record<string, any>`，它表示一个具有字符串键和任意类型值的类型。

``` TypeScript
const addID = <T extends {name: string}>(obj: T) => {
  let id = Math.floor(Math.random() * 1000);

  return { ...obj, id };
};

let person1 = addID({ name: 'John', age: 40 });
let person2 = addID([{ name: 'John', age: 40 }]);

console.log(person1.id); // 271
console.log(person2); // ERROR 错误被捕获
```

在ts中，泛型用于描述两个值之间的对应关系，返回类型与输入类型相关

如果我们需要接收多个类型的函数，我们可以使用泛型来定义函数，这样我们就可以在函数中使用多个类型。我们使用泛型来扩展一个接口。

``` TypeScript
interface Add {
  age: number;
}

const add = <T extends Add>(a: T, b: T) => {
  return a.age + b.age;
}

const person1: Add = { age: 1 };
const person2: Add = { age: 2 };

const result = add(person1, person2);
console.log(result); // 3
```

我们也可以编写一个函数，他的参数是一个元素数组，这些元素都是 Add 类型，然后返回一个元素是 number 的数组。

``` TypeScript
interface Add {
  age: number;
}

const addArray = <T extends Add>(arr: T[]) => {
  return arr.map((item) => item.age);
}

const person1: Add = { age: 1 };
const person2: Add = { age: 2 };

const result2 = addArray([person1, person2]);
console.log(result2); // [ 1, 2 ]
```

## 泛型接口

在接口中使用泛型，我们可以使用 `<>` 来定义一个泛型接口，然后使用 `extends` 来指定泛型的类型。

``` TypeScript
interface Add<T> {
  age: T;
}

const add = <T extends Add<number>>(a: T, b: T) => {
  return a.age + b.age;
}
const person1: Add<number> = { age: 1 };
const person2: Add<number> = { age: 2 };

const result = add(person1, person2);
console.log(result); // 3
```

## 泛型枚举

枚举类型是一种特殊的对象类型，它允许我们为一些可能的值定义一个名字。

``` TypeScript
enum Color {
  Red,
  Green,
  Blue
}

const color = Color.Red;
console.log(color); // 0
```

我们可以使用泛型来扩展枚举类型，然后使用泛型来指定枚举的类型。

``` TypeScript
enum Color<T> {
  Red,
  Green,
  Blue
}
const color = Color<string>.Red;
console.log(color); // 'Red'
```

* 到这我们已经成功了解了ts中的基础知识点
<Comment />
