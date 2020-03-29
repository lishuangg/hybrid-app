# TypeScript 知识点总结

### 接口

> 接口：描述一个对象的取值规范，不实现具体对象。
>
> 注意接口不能转换为 JavaScript。 它只是 TypeScript 的一部分。

- 属性接口

> 定义了一个接口Course，接着定义了一个变量hybird，它的类型是Course

```jsx
interface Course{
    title:string,
    intro:string,
    num?:number, // ? 代表该属性可有可无，非必须
    [propName:string]:any //表示接口可以有其他的、不确定类型名的类型
}
let hybird:Course = {
    title:'hybird',
    intro:'混合应用开发',
    num:120,
    teacher:'liu'
}
console.log(hybird);
```

> 控制台输出
>
> {"intro": "混合应用开发", "num": 120, "teacher": "liu", "title": "hybird"}

- 函数接口

> 定义了一个接口MyFunc，接着定义了一个函数变量func，它的类型是MyFunc

```jsx
interface MyFunc {
    (params1:string,params2:any):boolean
    //两个参数分别是string类型和any类型,返回值是boolean类型
}
let fun:MyFunc = function(pa1:string,pa2:any){
    if(pa1 === pa2){
        return true;
    }else{
        return false;
    }
}
console.log(fun("123","123"));
console.log(fun("123",123));
```

> 控制台输出
>
> true
>
> false

- 类接口

```jsx
interface Person{
    name:string,
    age:number,
    pwd:string
}
class User implements Person{// implements 类实现接口  
    name = 'zhangsan';
    age = 20;
    pwd = '123456'
}
console.log(new User());
```

> 控制台输出
> 
>  {"age": 20, "name": "zhangsan", "pwd": "123456"}

- 继承 （接口继承就是说接口可以通过其他接口来扩展自己）

> 类实现接口
>
> 接口继承接口
>
> 接口继承类

```jsx
interface Person{
    name:string,
    age:number,
    use():void
}
interface User extends Person{ //接口继承接口
    pwd:string
}
class State {
    state: any;
}
interface Select extends State { //接口继承类
    select():void
}
class User1 implements User,Select{ //implements 类实现接口（单接口，多接口） 
    name:string;
    age:number;
    pwd:string;
    state: any;
    constructor(name:string,age:number,pwd:string,state:any){
        this.name = name;
        this.age = age;
        this.pwd = pwd;
        this.state = state;
    }
    use(){
        console.log(this.name + "使用接口")
    }
    select(): void {
        console.log(this.name + "选择" + this.state)
    }
}
let me = new User1('张三',18,"123456","上课");
console.log(me);
me.use();
me.select();
let you = {} as User1;
you.name = "李四";
you.age = 20;
you.pwd = "987456";
you.state = "写作业";
console.log(you);
```

> 控制台输出
>
> {"age": 18, "name": "张三", "pwd": "123456", "state": "上课"}
>
> 张三使用接口
> 
> 张三选择上课
>
>{"age": 20, "name": "李四", "pwd": "987456", "state": "写作业"}

### 泛型

> 在指定定义函数、接口或类的时候，不预先指定具体的类型，而是在使用的时候在指定类型的一种特性。
>
> 用来创建可重用的组件，一个组件可以支持多种类型的数据
>
> 使用环境：
> 1.当函数、接口或类处理各种数据类型时;2.当函数、接口或类在多个位置使用该数据类型时

- 泛型函数

```jsx
function identity<T>(arg:T):T{
    return arg;
}
console.log(identity<string>("params1"))
console.log(identity<number>(100))

function getMsg(msg:any):any{
    return 'msg';
}
//泛型和any是不一样的，泛型中的T和T是一致的，any和any不是一致的
//泛型保证了返回值的类型与传入参数的类型是相同的

function getMsg<U>(msg:U):U[]{ //返回数组
    return [msg];
}
console.log(getMsg(100));
```

> 控制台输出 ：100    [100]

- 泛型接口

```jsx
interface GenericIdentityFn<T>{
    (arg:T):T; //函数参数:返回值
}
let myIdenttity: GenericIdentityFn<number> = function(arg){
    return 100;
}
console.log(myIdenttity(100));
```

> 控制台输出 ：100

- 泛型类

```jsx
class GenericNumber<T> {
    value: T;
    add(x:T,y:T):T;
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.value = 0;
myGenericNumber.add = function(x, y) { return x + y; };
console.log(myGenericNumber.value);
console.log(myGenericNumber.add(1,2));
```

> 控制台输出： 0 3

- 指定类型

```jsx
interface Props{
    name:string;
    data:{
        id:string,
        title:string
    }
}
interface State{
    title:string
}
export default class Demo extends Component<Props,State> {
    constructor(props:Props){
        super(props);//必须要有参数
        this.state = {
            title:"typescript"
        }
    }
    componentDidMount(){
        this.setState({title:"100"})
    }
    render() {
        return (
            <View>
                <Text>{this.props.name}</Text>
                <Text>{this.state.title}</Text>
            </View>
        )
    }
}
```

### 装饰器

> 装饰器是一种特殊类型的声明，它能够被附加到类声明、方法、属性或参数上。 装饰器使用@expression这种形式，expression求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入。
>
> 装饰器其实就是一个函数，在函数里面可以写一些新的逻辑，包裹后面修饰的内容，将新的逻辑传递到被修饰的内容中
>
> 高阶组件--其实就是一个函数，就是装饰器

- 普通装饰器（无参数）

```jsx
function helloWorld(target: any){
    console.log('hello world!');
}
@helloWorld
class HelloWorldClass{
    sayHello(){

    }
}
```

> 控制台输出：hello world!

- 带有参数的装饰器（装饰器工厂）

```jsx
function addData(data:string){//装饰器工厂
    return function(target:any){//这才是装饰器，target就是后面调用的类
        target.prototype.data = data;
        return class extends target{
            title:string = 'hybird'
        }
    }
}
@addData('hello')
class HomeServer{
    data:string | undefined;
    title:string | undefined;
    getData(){
        console.log(this.data,this.title)
    }
}
let home = new HomeServer();
home.getData();
```

> 控制台输出： hello hybird

- 装饰器求值

> 类中不同声明上的装饰器将按以下规定的顺序应用：
> - 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个实例成员。
> - 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个静态成员。
> - 参数装饰器应用到构造函数。
> - 类装饰器应用到类。

- 类装饰器

> 类装饰器在类声明之前被声明（紧靠着类声明）。 类装饰器应用于类构造函数，可以用来监视，修改或替换类定义。
> 
> 参数是类的构造函数
>
> 如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明

```jsx
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
@sealed
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello " + this.greeting;
    }
}
console.log(new Greeter('hybird').greet());
```

> 控制台输出： hello hybird

- 方法装饰器

> 方法装饰器声明在一个方法的声明之前（紧靠着方法声明）。 它会被应用到方法的 属性描述符上，可以用来监视，修改或者替换方法定义
>
> 方法装饰器表达式会在运行时当作函数被调用，传入下列3个参数：
> 1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
> 2. 成员的名字
> 3. 成员的属性描述符。
>
>如果方法装饰器返回一个值，它会被用作方法的属性描述符。

```jsx
function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        //target就是类原型对象
        target.name = "li";//在原型上直接添加一个属性
        console.log(propertyKey);//名字
        console.log(descriptor);//装饰器描述符
        descriptor.enumerable = value;
    };
}
function log(target:any,methodName:string,des:PropertyDescriptor){
    var oldVal = des.value;
    des.value = function(){
        console.log(methodName+'被调用');
        return oldVal.apply(this,[...arguments]);
    }
}
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    @enumerable(true)
    @log
    greet(msg:string) {
        return "Hello " + this.greeting;
    }
}
console.log(new Greeter('world').greet('greet参数'));
```

> 控制台输出：
>
> greet
>
> {"configurable": true, "enumerable": false, "value": [Function anonymous], "writable": true}
> 
> greet被调用
>
> Hello world

- 参数装饰器

> 参数装饰器声明在一个参数声明之前（紧靠着参数声明）。 参数装饰器应用于类构造函数或方法声明。
>
> 参数装饰器表达式会在运行时当作函数被调用，传入下列3个参数：
> 1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
> 2. 成员的名字。
> 3. 参数在函数参数列表中的索引。

- 属性装饰器

> 属性装饰器声明在一个属性声明之前（紧靠着属性声明）。
>
> 属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数：
>
> 1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
> 2. 成员的名字。

```jsx
function DefaultValue(value: string) {
    return function (target: any, propertyName: string) {
        target[propertyName] = value;
    }
}
class Hello {
    @DefaultValue("Hello") 
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
}
console.log(new Hello("hello world").greeting);
```

> 控制台输出： hello world

- 装饰器组合

> 当多个装饰器应用于一个声明上，它们求值方式与复合函数相似
>
> 当多个装饰器应用在一个声明上时会进行如下步骤的操作：
> 1. 由上至下依次对装饰器表达式求值。
> 2. 求值的结果会被当作函数，由下至上依次调用