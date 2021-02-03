### 一、基础类型

#### 布尔

```javascript
let bool:boolean  = true;
```

#### 数值

```javascript
let num:number = 1 ;
num = 0b1111011; // 二进制 123
num = 0o173;   // 八  进制 123
num = 0x7b;  //  十六 进制 123
```

#### 字符串

```javascript
let str:string = 'abc';
```

#### 数组

```javascript
let arr:number [] =  [1,2,3];
let arr2:Array<number> = [1,2,3];
let arr3:Array<number|string> = [1,2,3,'a','b']; // 联合类型
```

#### 元祖

```javascript
let tuuple:[string,number,boolean]= ['a',1,false]; // 注意顺序，不能多也不能少
```

#### 枚举

```javascript
enum Roles {
    SUPER_ADMIN = 0 ,
    ADMIN = 2,
    USER = 8,
}
```

#### any

```javascript
let val:any = {} ;// 可以赋值任意类型
let val2:any =  123 ;// 可以赋值任意类型
```

#### void

```javascript
const consoleText = (text:string):void=> {
    console.log(text);
}
let v:void = undefined;
```

#### null 和undefined

```javascript
let a :undefined  = undefined;
let n :null  = null;
```

#### never 

> 永远不会有返回值

```javascript
const errorFunc = (message:string):never=>{
    throw  new Error(message)
}
const infiniteFunc = ():never=>{
    while(true){
    }
}
```

#### object

```javascript
let obj = {
    name:'zhangs'
}
function getObj(obj:object):void {
    console.log(obj)
}
```

#### 类型断言

```javascript
const getLength = (target:string | number):number=>{
    if((<string>target).length || (target as string).length ===0){
        return (<string>target).length;
    }else{
        return target.toString().length;
    }
}
```

### 二、Symbols

> ```
> 用来表示独一无二值
> ```

#### 创建

```javascript
const s1 = Symbol();
const s2 = Symbol();
// console.log(s1==s2); // false
```

#### 参数(参数)

> 字符串参数 用于标识,在ts中参数只能是数字或字符串， 如果传入的是数字会将数字转为字符串

```javascript
const s3 = Symbol('zhangs');
const s4 = Symbol('zhangs');
console.log(s3===s4); // false
```

#### 运算

> 不能和其他类型值做运算

#### 类型转换

```javascript
console.log(s3.toString()) //Symbol(zhangs)
console.log(Boolean(s3)); // true
```

#### 作为属性名

```javascript
let prop = 'school'
const info = {
    name:"zhangs",
    [prop]:'beida'
}
const s5 = Symbol('name');
let info2 = {
    [s5]:'zhangs'
}
info2[s5] = 'lisi';
```

#### 遍历

> **无法获取对象Symbol属性名**

- for in 
- Object.keys
- Object.getOwnPropertyNames
- JSON.stringify

> **可以获取对象Symbol属性名**

- Object.getOwnPropertySymbols
- Reflect.ownKeys

#### Symbol.for

> 同样一个字符串创建的Symbol是不一样的;Symbol.for()会在全局范围创建一个值，同一个key创建的Symbol类型值是一样的。

```javascript
let s8 = Symbol.for('name');
let s9 =  Symbol.for('name');
console.log(s8 ==s9) // true
let key = Symbol.keyFor(s8);
console.log(key)
```

#### Symbol.keyFor

> 获取Symbol的key值

```javascript
let s8 = Symbol.for('name');
let key = Symbol.keyFor(s8);
console.log(key) // name
```

#### 内置的Symbol值

##### Symbol.hasInstance

> 方法，会被instanceof运算符调用。构造器对象用来识别一个对象是否是其实例。
>
> instanceof 判断对象是否为xx的实例

```javascript
const obj = {
    [Symbol.hasInstance](otherObj:any){
        console.log(otherObj);
    }
}
console.log({a:'a'}  instanceof <any> obj); // false
```

##### Symbol.isConcatSpreadable

> 布尔值，表示当在一个对象上调用Array.prototype.concat时，这个对象的数组元素是否可展开。

```javascript
let arr2:any  = [1,2];
// @ts-ignore
console.log([].concat(arr2,[3,4])); //  [1, 2, 3, 4]
arr2[Symbol.isConcatSpreadable] = false;
// @ts-ignore
console.log([].concat(arr2,[3,4])); // arr2 不会被扁平化 [[1,2],2,4]
```

##### Symbol.species

> 函数值，为一个构造函数。用来创建派生对象。

```javascript
class C extends Array {
    constructor(...args: number[]) {
        super(...args);
    }
    // es6中不写 打印都为true
    static get [Symbol.species](){
        return Array;
    }
    getName(){
        return '张三'
    }
}
const  cc = new C(1,2,3);
const a = cc.map(item=>item+1);
console.log(a);  // [2,3,4]
console.log(a instanceof C); // false
console.log(a instanceof Array); // true
```

##### Symbol.match

> 方法，被String.prototype.match调用。正则表达式用来匹配字符串。

```javascript
let obj3 = {
    [Symbol.match](string:string){
        console.log(string.length)
    }
}
'aabced'.match(<RegExp>obj3); // 6
```

##### Symbol.replace

> 方法，被String.prototype.replace调用。正则表达式用来替换字符串中匹配的子串。

##### Symbol.search

> 方法，被String.prototype.search调用。正则表达式返回被匹配部分在字符串中的索引。

##### Symbol.split

> 方法，被String.prototype.split调用。正则表达式来用分割字符串。

##### Symbol.iterator

> 方法，被for-of语句调用。返回对象的默认迭代器。

```javascript
const array1 = [1,2,3,4];
const iterator:any = array1[Symbol.iterator]();
console.log(iterator.next()) // {value: 1, done: false}
```

##### toPrimitive

> 方法，被ToPrimitive抽象操作调用。把对象转换为相应的原始值。

```javascript
let obj4:any = {
    [Symbol.toPrimitive](type:any){
        console.log(type) // number
    }
}
const res  = (obj4 as number) ++;
```

##### Symbol.toStringTag

> 方法，被内置方法Object.prototype.toString调用。返回创建对象时默认的字符串描述。

```javascript
let obj5 = {
    [Symbol.toStringTag]:"zhangs"
}
console.log(obj5.toString()) // [object zhangs]
```

##### Symbol.unscopables

> 对象，它自己拥有的属性会被with作用域排除在外。

### 三、接口

> 使用接口限定对象、函数结构

##### 定义接口

```javascript
interface nameInfo {
    firstName:string;
    lastName:string;
}
const getFullName = ({firstName,lastName}:nameInfo):string=>{
    return firstName + lastName
}
let fullName:string = getFullName({
    firstName:'1',
    lastName:'san'
});
console.log(fullName)
```

##### 可选属性

```javascript
interface Vegetable {
    color?:string;
    type:string;
}
const getVegetables:any = ({color,type}:Vegetable):string=>{
    return  `${color?color:''} ${type}`;
}
console.log(getVegetables({type:"tomato",}));
```

##### 只读属性

```javascript
interface Point {
    readonly x: number;
    readonly y: number;
}
```

> 创建只读数组

```javascript
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!
```

##### 定义函数结构

```javascript
interface AddFunc {
    (num1:number,num2:number):number
}
type addFunc2 = (num1:number,num2:number)=> number;

const add:AddFunc = (n1,n2)=>n1+n2;
```

##### 索引类型

```javascript
interface RoleDic {
    [id:number]:string
}
const role1:RoleDic = {
    0:'abc'
}
```

##### 接口继承

```javascript
interface Vegetables {
    color:string;
}
interface Tomato  extends Vegetables{
    radius:number
}
const tomato:Tomato = {
    radius:1,
    color:"red"
}
```

##### 混合类型

```JavaScript
interface Counter {
    ():void;
    count:number
}
const getCounter = ():Counter=>{
    const c = ()=>{c.count++}
    c.count = 0 ;
    return c ;
}
const counter :Counter = getCounter();
counter();
console.log(counter.count); //1
counter();
console.log(counter.count);//2
counter();
console.log(counter.count);//3
```

### 四、函数

##### 函数类型

> 指定 myAdd 类型参数类型和返回值类型，并赋值指定类型的函数

```javascript
let myAdd: (x: number, y: number) => number = function (
  x: number,
  y: number
): number {
  return x + y;
};
```

##### 推断类型

> 赋值语句的一边指定了类型但是另一边没有类型的话，TypeScript编译器会自动识别出类型

```javascript
let myAdd2: (baseValue: number, increment: number) => number = function (x, y) {
  return x + y;
};
```

##### 可选参数和默认参数

- 可选参数必须跟在必须参数后面

```javascript
function buildName(firstName: string, lastName?: string) {
  if (lastName) return firstName + " " + lastName;
  else return firstName;
}
let result1 = buildName("Bob"); // works correctly now
let result3 = buildName("Bob", "Adams"); // ah, just right
```

-  默认初始化值的参数；为参数提供一个默认值当用户没有传递这个参数或传递的值是`undefined`。

```javascript
function buildName(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}
let result1 = buildName("Bob");                  // works correctly now, returns "Bob Smith"
let result2 = buildName("Bob", undefined);       // still works, also returns "Bob Smith"
let result3 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result4 = buildName("Bob", "Adams");         // ah, just right
```

##### 剩余参数

- TypeScript中，可以把所有参数收集到一个变量里

```javascript
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}
let buildNameFun: (fname: string, ...rest: string[]) => string = buildName;
```

### 五、泛型

##### 泛型变量

- 定义函数指定泛型，
- 调用函数时，传入可变类型参数

```javascript
const getArray = (value:any,times:number =5):any[] => {
    return new Array(times).fill(value);
}
const getArray2 = <T>(value:T,times:number =5):T[] => {
    return new Array(times).fill(value);
}
console.log(getArray2<string>('abc',3).map(item=>item.length));

const getArray3 = <T,U>(param1:T,params2:U,times:number):Array<[T,U]> =>{
    return  new  Array(times).fill([param1,params2]);
}
getArray3<number,string>(1,'a',3).forEach(item=>{
    console.log(item[0]) ;
    console.log(item[1]);
})
```

##### 泛型类

```javascript
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

##### 泛型约束

- 约束泛型参数需含有length属性

```javascript
interface ValueWidthLength {
    length:number
}
const getArray = <T extends ValueWidthLength>(arg:T,times:number):T[]=>{
    return new Array(times).fill(arg);
}
getArray([1,2],3);
```

### 六、ES6类

##### 定义类

-  只能使用new 创建

```javascript
class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    getPostion(){
        return `${this.x},${this.y}`
    }
}
const p1 = new Point(1,2);
console.log(p1.getPostion());
console.log(p1.hasOwnProperty('x')); // true
console.log(p1.__proto__.hasOwnProperty('getPostion'));// true
```

##### 取值函数和存值函数set get

###### es5

```javascript
var info ={
    _age:18,
    set age(newValue){
        if(newValue>18){
            console.log('怎么变老了');
        }else{
            console.log('我还年轻');
        }
    },
    get age(){
        console.log('问我年龄干嘛');
        return  this._age
    }
}
console.log(info.age); // 问我年龄干嘛；18;
info.age = 13; // 我还年轻
```

###### es6

```javascript
class Info{
    constructor(age){
        this._age = age;
    }
    set age(newAge){
        console.log('new age is ' + newAge);
        this._age = newAge;
    }
    get age(){
       return this._age;
    }
}
const infos = new Info(18);
infos.age = 17;
console.log(infos.age);
```

##### class 表达式

```javascript
const Infos = class c{
    constructor(){ }
}
// const testInfo = new c(); // c is not defined
const testInfo = new Infos(); // sucess
// 也可以这么定义
const Infos2 = class {
}
```

##### 静态方法

```javascript
class Point {
    constructor(x,y){
        this.x = x; 
        this.y = y ; 
    }
    getPostion(){
        return `${this.x},${this.y}`
    }
    static getClassName(){
        return Point.name;
    }
}
const p = new Point(1,2);
console.log(p.getPostion());
console.log(Point.getClassName());

```

##### 实例属性的其他写法

```javascript
 class Point {
    z= 1;
    constructor(x,y){
        this.x = x; 
        this.y = y ; 
    }
    getPostion(){
        return `${this.x},${this.y}`
    }
    static getClassName(){
        return Point.name;
    }
}
```

##### 静态属性

> es6只有静态方法没有静态属性，可以这么写

```javascript
class Point{
    constructor(){
        this.x = 0 ; 
    }
}
Point.y = 2 ;
const p = new Point();
console.log(p.x); //  0
console.log(p.y); // undefined
console.log(Point.y); // 2
```

##### 私有方法

> es6中没有私有方法、属性；可以这么写

- 通过命名约定、意义不大

```javascript
class Point {
    func(){
    }
    _func(){
    }
}
```

- 将私有方法移除模块

```javascript
{
    const _func2 = ()=>{
        console.log('_func2 私有方法');
    };
    class Point{
        constructor(){ }
        func1(){
            _func2.call(this);
        }
    }   
    const p = new Point();
    p.func1();
    // p._func2(); // error 
}
```

- 使用Symbol

- > 如果模块中未导出Symbol值，外部是无法访问使用Symbol变量名定义的函数

```javascript
//a.js
const func1 = Symbol('func1');
export default class Point{
    static [func1](){ }
}
// b.js 
import Point from 'a.js'
const p = new Point();
console.log(p);
```

##### 私有属性

- es6中没有私有属性

```javascript
// class Point{
//     #ownProp = 12; // 提案中，暂时无法使用。
// }
```

##### new.target

- 可以断定是不是通过new 来调用的构造函数

###### es5

```javascript
function Point(){
    console.log(new.target);
}
const p = new Point(); // 返回Point构造函数
const p2 = Point(); // undefined
```

###### es6

```javascript
class Point{
    constructor(){
        console.log(new.target);
    }
}
const p = new Point(); // 打印Point构造函数
```

- 父类中判断new.target 限制只能使用子类来创建实例

- > new Child ，父类的构造函数中打印的是子类的构造函数

```javascript
class Parent {
    constructor(){
         console.log(new.target);
        if(new.target ==Parent ){
            throw new Error('不能实例化')
        }
    }
}
class Child extends Parent{
    constructor(){
        super();
    }
}
// const c  = new Parent() ; // 不能实例化
const c2 = new Child();  // 打印子类构造函数
```

##### 类继承

###### 定义类

```javascript
class Parent {
    constructor(name){
        this.name = name;
    }
    getName(){
        return this.name;
    }
    static getNames(){
        return this.name;
    }
}
class Child extends Parent{
    constructor(name,age){
        super(name);
        this.age = age; // 注意顺序、在super之后
    }
}
const c  = new Child('zhans',18);
console.log(c);
console.log(c.getName());
console.log(c instanceof Child); // true
console.log(c instanceof Parent); // true
console.log(Child.getNames()); // Child -- 继承父类的静态方法
// 获取构造函数的原型对象
console.log(Object.getPrototypeOf(Child)== Parent); // true 
```

###### super

- super作为函数
  - 表示父类的构造函数，
  - 子类必须调用,而且只能在构造函数中使用
- super作为对象
  - 普通方法中，指向父类的原型对象
  - 静态方法中，指向父类本身

```javascript
class Parent {
    constructor(){
        this.type= 'parent';
    }
    getName(){
        return this.type;
    }
}
Parent.getType() = ()=>{
    return 'is parent'
}
class Child extends Parent {
        constructor(){
            super();
            console.log('constructor: ' + super.getName());
        }
        getParentName(){
            console.log('getParentName: '+super.getName());
        }
       static  getParentType(){
            console.log('getParentTyp: '+super.getType());
        }
}
const c = new Child(); // constructor: parent
c.getParentName();    // getParentName: parent
Child.getParentType(); // getParentTyp: is parent
```

###### this指向

- 子类使用super调用，父类的原型方法；父类原型方法中的this指向的是子类的实例

```javascript
class Parent {
    constructor(){
        this.name= 'parent';
    }
    print(){
        console.log(this.name); // super调用，this指向子类的实例
    }
}
class Child extends Parent {
        constructor(){
            super();
           this.name = 'child'
        }
        childPrint(){
            super.print(); 
        }
}
const c  = new Child();
c.childPrint();  // child
```

###### ``4、prototype``和 ``__proto__``

-  ``__proto__`` 不是es标准中的属性，而是 大多数浏览器厂商在对es的实现中添加的
- 每一个 对象都有一个 ``__proto__`` 属性，它指向对应的构造函数的 prototype 属性

```javascript
var objs = new Object();
console.log(objs.__proto__===Object.prototype); // true
```

**es6中：**

- 子类的  ``__proto__``指向父类本身

- 子类的 prototype 属性的  ``__proto__``指向父类的 prototype 属性

- 实例的  ``__proto__``属性的  ``__proto__``指向父类实例的  ``__proto__``

###### 原生构造函数的继承

- Boolean
- Number
- String
- Array
- Date
- Function
- RegExp
- Error
- Object

```javascript
class CUstomArray extends Array{
    constructor(...args){
        super(...args)
    }
}
const arr = new CUstomArray(3);
console.log(arr.fill('+'));
```

### 七、TS类

- ts中的修饰符

```javascript
class Point{
   public x:number;
   public y:number;
    constructor(x:number,y:number){
        this.x = x ;
        this.y = y ;
    }
    public getPostions(){
        return  `${this.x},${this.y}`;
    }
}
const point = new Point(1,2);
console.log(point);
class Parent {
    name:string;
    constructor(name:string){
        this.name = name;
    }
}
class Child extends Parent{
    constructor(name:string){
        super(name);
    }
}
```

###### public

###### private

```javascript
class Parent {
  private age: number;
  constructor(age: number) {
    this.age = age;
  }
}
const p = new Parent(18);
// console.log(p.age); // 无法访问
class Child extends Parent{
    constructor(age:number){
        super(age);
        // console.log(super.age); // 无法访问
    }
}
```

###### protected

- 子类中通过super只能访问父类的公共方法和受保护的方法、无法拿到属性

```javascript
class Parent {
    protected age: number;
    constructor(age: number) {
      this.age = age;
    }
    protected getAge(){
        return this.age;
    }
  }
  const p = new Parent(18);
  // console.log(p.age); // 无法访问
  class Child extends Parent{
      constructor(age:number){
          super(age);
        //    console.log(super.age); // 无法访问
           console.log(super.getAge()) ; // 可以访问
      }
  }
```

- > protected修饰constructor时候 ，不能通过父类创建实例、只能通过子类创建

###### readonly

```javascript
class UserInfo {
  public readonly name: string;
  constructor(name: string) {
    this.name = name;
  }
}
const userInfo = new UserInfo("zhangs");
console.log(userInfo.name);
//   userInfo .name = 'lisi'; // 只读，不能赋值
```

###### 参数属性

- 构造函数中使用修饰符，自动定义类属性

```javascript
class A{
    constructor(public name:string){ }
}
const a1 = new A('zhangs');
console.log(a1.name); // zhangs
```

###### 静态属性

- 通过类名访问

```javascript
class Parent{
    public static age:number = 18;
    public static getAge(){
        return Parent.age;
    }
    constructor(){  }
}
const p = new Parent();
console.log(Parent.age); // 18
console.log(Parent.getAge()); // 18
```

###### 可选类属性

```javascript
class Info {
    public name:string;
    public age?:number;
    constructor(name:string,age?:number,public sex?:string){
        this.name = name;
        this.age = age;
    }
}
const info1 = new Info('zhangs');
const info3 = new Info('zhangs',18);
const info4 = new Info('zhangs',18,'main');
// age: undefined
// name: "zhangs"
// sex: undefined
console.log(info1);
// age: undefined
// name: "zhangs"
// sex: 18
console.log(info3);
// age: 18
// name: "zhangs"
// sex: man
console.log(info4);
```

###### 存取器

```javascript
class Info {
    private _infoStr :string | undefined;
    public name:string;
    public age?:number;
    constructor(name:string,age?:number,public sex?:string){
        this.name = name;
        this.age = age;
    }
    get infoStr(){
        return this._infoStr;
    }
    set infoStr(value){
        console.log(`setter:${value}`);
        this._infoStr = value;
    }
    getPriStr(){
        return this._infoStr;
    }
}

const info4 = new Info('zhangs',18,'main');
info4.infoStr = 'zhangs:14'
console.log(info4.getPriStr());
```

###### 抽象类

- 不能直接创建、通过继承类创建

```javascript
abstract class Poeple {
  constructor(public name: string) {}
  public abstract printName(): void;
}
class Man extends Poeple {
  constructor(name: string) {
    super(name);
    this.name = name;
  }
  public printName(): void {
    console.log(this.name);
  }
}
const m = new Man("zhangs");
m.printName();
```

###### 类类型接口

- 类实现接口，类创建完的实例，要符合这个接口结构

```javascript
 interface FoodInstance{
     type:string;
 }
 class FoodClass implements FoodInstance{
    public type: string
 }
```

###### 接口继承类

```javascript
 class A {
     protected name:string;
     constructor(name:string){
        this.name = name;
     }
 }
 interface I extends A{
 }
 class B extends A implements I {
     protected name: string;
 }

```

###### 泛型中使用类类型

```javascript
const create = <T>(c: new () => T) => {
  return new c();
};
class Infos {
  public age: number;
  constructor() {
    this.age = 18;
  }
}
create<Infos>(Infos);
```

### 八、枚举

> ts支持数字和字符串两种枚举

###### **数字枚举**

```javascript
enum Status{
    Uploading,
    Success,
    Failed
}
console.log(JSON.stringify(Status)); // {"0":"Uploading","1":"Success","2":"Failed","Uploading":0,"Success":1,"Failed":2}
console.log(Status.Uploading); // 0
console.log(Status.Success);  // 1
console.log(Status.Failed);   // 2

enum Status2{
    Uploading ,
    Success  = 3,
    Failed
}
console.log(Status2.Uploading); // 0
console.log(Status2.Success);  // 3
console.log(Status2.Failed);   // 4

function getIndex(){
    return 3;
}

enum Status3{
    Uploading ,
    Success  = getIndex(),
    Failed = 4 // 必须指定
}
console.log(Status3.Uploading); // 0
console.log(Status3.Success);  // 3
console.log(Status3.Failed);   // 4
```

###### 字符串枚举

```javascript
enum Message {
    Error='sory ,error',
    Success='hii ,success',
    Failed=Error
}
console.log(Message.Failed); //sory ,error
```

###### 异构枚举

```javascript
enum Result{
    Success = 'success',
    Failed  = 404,
}
console.log(JSON.stringify(Result)); //{"404":"Failed","Success":"success","Failed":404}

// 枚举成员类型、联合枚举类型
// 1.enum E { A }
// 2.enum E { A = "a" } 
// 3.enum E { A=-1 }
enum Animal {
    Dog = 1,
    Cat = 2,
}
interface Dog {
    type:Animal.Dog, // 作为类型
}
const dog : Dog = {
    type:Animal.Dog // Animal.Cat 会报错
}

```

######  **联合类型**

```javascript
enum Status  {
    Off,
    On,
}
interface Light {
    status:Status
}
const light :Light ={
    status:Status.Off // 或 Status.On 
}
```

```javascript
// // 编译后 不会编译成对象、只会编译成一个数字
// const enum Animal {
//     Dog = 1 ,
// }
```

### 九、高级类型

######  交叉类型

```javascript
const mergeFunc = <T, U>(arc1: T, arc2: U): T & U => {
  let res = {} as T & U;
  res = Object.assign(arc1, arc2);
  return res;
};
```

###### 联合类型

```javascript
function padLeft(value: string, padding: any) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}
padLeft("Hello world", 4); // returns "    Hello world"
```

###### 类型保护

```javascript
const valueList = [123, "abc"];
const getRandomVlaue = () => {
  const number = Math.random() * 10;
  if (number < 5) {
    return valueList[0];
  } else {
    return valueList[1];
  }
};
const item = getRandomVlaue();
if ((item as string).length) {
  console.log((item as string).length);
} else {
  console.log((item as number).toFixed());
}
//
function isString(value: number | string): value is string {
  return typeof value === "string";
}
if (isString(item)) {
  console.log(item.length);
} else {
  console.log(item.toFixed());
}

class CreatedByClass1 {
  public age = 18;
  constructor() {}
}
class CrateByClass2 {
  public name = "zhangs";
  constructor() {}
}
function getRandomItem() {
  return Math.random() < 0.5 ? new CreatedByClass1() : new CrateByClass2();
}
let item2 = getRandomItem();
if (item2 instanceof CreatedByClass1) {
  console.log(item2.age);
} else {
  console.log(item2.name);
}
```

###### 类型包含和类型断言

```javascript
const getLengthFunction = (value: string | null): number => {
  return (value || "").length;
};

function getSpliceStr(num: number | null): string {
  function getRes(prefix: string) {
    return prefix + num!.toFixed().toString();
  }
  num = num || 0.1;
  return getRes("zhangs-");
}
```

###### 类型别名

```javascript
type TypeString = string;
let str: TypeString;
type PositionType<T> = { x: T; y: T };
const p1: PositionType<number> = {
  x: 1,
  y: -1,
};
const p2: PositionType<string> = {
  x: "left",
  y: "right",
};
type Childs<T> = {
  current: T;
  child?: Childs<T>;
};
let ttt: Childs<string> = {
  current: "first",
  child: {
    current: "second",
    child: {
      current: "third",
    },
  },
};
```

###### this

```javascript
class Counters {
  constructor(public count: number = 0) {}
  public add(value: number) {
    this.count += value;
    return this;
  }
  public subtract(value: number) {
    this.count -= value;
    return this;
  }
}
let counter1 = new Counters(10);
console.log(counter1.add(3).subtract(2));

class PowCounter extends Counters {
  constructor(public count: number = 0) {
    super(count);
  }
  public pow(value: number) {
    this.count = this.count ** value;
    return this;
  }
}
let powCounter = new PowCounter(2);
console.log(powCounter.pow(3).add(1).subtract(3));
```

###### 索引类型

```javascript

interface InfoInterfaceAdvanced {
  name: string;
  age: number;
}
let infoProp: keyof InfoInterfaceAdvanced;
infoProp = "name";
infoProp = "age";
function getValue<T, K extends keyof T>(obj: T, names: K[]): T[K][] {
  return names.map((n) => obj[n]);
}
const infoObj = {
  name: "zhangs",
  age: 12,
};
let infoValues: (string | number)[] = getValue(infoObj, ["name", "age"]);
console.log(infoValues);
```

###### 索引访问操作符

```javascript
type NameTypes = InfoInterfaceAdvanced["name"];

function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
  return o[name];
}
interface Objs<T> {
  [key: number]: T;
}
let keys: keyof Objs<number>;
```

###### 映射类型

```javascript
interface Info1 {
  age: number;
  name: string;
  sex: string;
}
type ReadonlyType<T> = {
  readonly [P in keyof T]: T[P];
};
type ReadOnlyInfo1 = ReadonlyType<Info1>;
let info11 :ReadOnlyInfo1 = {
    age:18,
    name:'zhangs',
    sex:'main'
}
```

### 十、ES6模块

###### export

- 导出对外的接口，而不是一个具体的值
- 导出是一个声明语句
- export  当前模块中的值变化时，对应引入的模块中的值也会变化。

- export 不能出现在块级作用域里
- 一个模块只能使用一次export default

```javascript

export const name = "zhangs";
export const age = 18;
export const address = "bb";
const name = "zhangs";
const age = 18;
const address = "bb";
export { name, age, address };
export function func() {}
export class A {}
function func1() {}
class B {}
const b = "";
export { func1 as FUnction1, B as ClassB, b as StringB };
function func(params) {}
export { func as default };
```

###### import 

- 引入的值是只读的
- 如果是应用对象，可以修改对象中的值

```javascript
import { name as nameProp } from "./a";
import "./a" // 执行a.js中的代码
import * as info from './a';
import funcName from './c' // 导入默认导出
import {default as funcName} from './c';
import sex,{name,age} from './a'; // sex是默认导出
```

### 十一、模块与命名空间

###### export

```javascript
export interface FuncInterface {
  name: string;
  (arg: number): string;
}
export class ClassC {
  constructor() {}
}
class ClassD {
  constructor() {}
}
export { ClassD };
export { ClassD as ClassNameD };
// b 模块
export const name = 'zhangs';
// export * from './b';
// export {name} from '.b';
// export {name as Name} from './b'
```

###### import

```javascript
import *  as info from './b'
import {name as Name} from './b'
import './a'
export default
// 一个模块只能有一个默认导出
export default 'zhangs';
import name from './c'
```

###### 命名空间

```javascript
namespace Validation {
    const isLetterReg = /^[A-Za-Z]+$/;
    export const isNumberReg = /^[0-9]+$/;
    export const checkLatter = (text: any) => {
      return isLetterReg.test(text);
    };
}
```

```javascript
/// <reference path = './space.ts'/>
let isLetter = Validation.checkLatter('abc');
console.log(isLetter);
// tsc --outFile src/index.js src/ts-modules/space.ts
```

### 十二、装饰器

######  装饰器工厂

```javascript
function setName() {
  console.log("get set name");
  return  ()=> {
    console.log("setName");
  };
}
// 装饰器工厂
function setAge(){
    console.log('get setAge');
    return ()=>{
        console.log('setAge');
    }
}
@setName()
@setAge()
class ClassDec {
```

######  类装饰器

```javascript
// 类装饰器
let sign = null;
function setName(name: string) {
  return (target: new () => any) => {
    sign = target;
    console.log(target.name);
  };
}
@setName('zhangs')
class ClassDec {
}
// log ClassDec
// console.log(sign===ClassDec); // true
// console.log(sign===ClassDec.prototype.constructor);//true
function addName(constructor:new ()=>any){
    constructor.prototype.name = 'zhangs'
}
@addName
class CalssD{}
interface CalssD{
    name:string
}
const d =  new CalssD();
console.log(d.name);
function classDecorator<T extends { new (...args: any[]): {} }>(target: T) {
  return class extends target {
    public newProperty = "new property";
    public hello = "override";
  };
}
@classDecorator
class Gretter{
    public property = 'property';
    public hello:string;
    constructor(m:string){
        this.hello = m;
    }
}
console.log(new Gretter('world'));
//hello: "override"
//newProperty: "new property"
//property: "property"
```

###### 方法装饰器

```javascript
// 例： 可以控制方法属性的可枚举性
function enumerabel(bool:boolean){
    return function(target:any,propertyName:string,descriptor:PropertyDescriptor){
        // console.log(target,propertyName);
        // descriptor.enumerable = bool;
        return {
            value(){
                return  18
            },
            enumerabel:bool
        }
    }
}

class ClassF{
    constructor(public age:number){ }
    @enumerabel(false)
    public getAge(){
        return this.age;
    }
}

const f = new ClassF(12);
console.log(f.getAge());
```

###### 访问器装饰器

```javascript
function enumerabel(bool: boolean) {
  return function (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.enumerable = bool;
  };
}
class ClassG {
    private _name:string
    constructor(name:string){
        this._name = name;
    }
    @enumerabel(false)
    get name (){
        return this._name;
    }
    set name(name){
        this._name = name;
    }
}
const g = new ClassG('zhangs');
for(let key in g){
    console.log(key);
}
```

###### 属性装饰器

```javascript
function printPropertyName(   target: any,
    propertyName: string ) {
        console.log(propertyName);       
}
class ClassH {
    @printPropertyName
    public name:string | undefined
    constructor(){ }
}
```

###### 参数装饰器

```javascript
function required(target:any,propertName:string,index:number){
    console.log(`修饰的是${propertName}的第${index+1}个`);
}
class ClassI{
    name:string = 'zhangs';
    public age :number = 18;
    public getInfo(prefix:string,@required infoType:string):any{
        return prefix+' ' + this[infoType];
    }
}
interface ClassI   {
   [key:string]:string|number|Function
}
const classI = new ClassI();
classI.getInfo('aaa','age')
```











