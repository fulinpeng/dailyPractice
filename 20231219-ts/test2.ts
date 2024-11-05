
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const;
// expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
type result = TupleToObject<typeof tuple>;
type A = typeof tuple[number]
type TupleToObject<T extends <any>[]> = {
    [key in typeof tuple[number]] : key
}

type Arr = ['1', '2', '3','4']
// expected '1'| '2'| '3'|'4'
type Test = TupleToUnion<Arr>
type TupleToUnion<T> = T[number]
type TupleToUnion<T> = T extends Array<infer R> ? R : any

// Implement a generic DeepReadonly<T> which make every parameter of an object - and its sub-objects recursively - readonly.
// You can assume that we are only dealing with Objects in this challenge. Arrays, Functions, Classes and so on do not need to be taken into consideration. However, you can still challenge yourself by covering as many different cases as possible.
// For example:

type X = {
    x: {
        a: 1
        b: 'hi'
    }
    y: 'hey'
}

type Expected = {
    readonly x: {
        readonly a: 1
        readonly b: 'hi'
    }
    readonly y: 'hey'
}
type Todo = DeepReadonly<X> // should be same as `Expected`
type O = Record<PropertyKey, any>
// type DeepReadonly<T extends O> = {
//     readonly [K in keyof T]: T[K] extends O ? DeepReadonly<T[K]> : T[K]
// }
type DeepReadonly<T extends O> = {
    readonly [K in keyof T]: T[K] extends never ? T[K] : DeepReadonly<T[K]>
}
const x: Expected = {
    x: {
        a: 1,
        b: 'hi',
    },
    y: 'hey'
}
x.x.a = 1; // 报错

// SimpleVu
declare function SimpleVue<
    D extends Record<string, unknown>,
    C extends Record<string, unknown>,
    M extends Record<string, unknown>,
>(options: {
    data: (this: never) => D;
    computed: {
        [k in keyof C]: (this: D, ...args: unknown[]) => C[k]
    };
    methods: {
        [k in keyof M]: (this: D & C & {
            [m in keyof M]: (...args: unknown[]) => M[m]
        }, ...args: unknown[]) => M[k]
    }
}): any

const instance = SimpleVue({
    data() {
        return {
            firstname: 'Type',
            lastname: 'Challenges',
            amount: 10,
        }
    },
    computed: {
        fullname() {
            return this.firstname + ' ' + this.lastname
        }
    },
    methods: {
        hi() {
            alert(this.fullname.toLowerCase() + this.amount)
            this.hi();
        }
    }
})