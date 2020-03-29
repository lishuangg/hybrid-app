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