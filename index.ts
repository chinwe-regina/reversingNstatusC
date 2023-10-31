

// A. Let num: number = 123456. 

// 1. Reverse it to 654321

// 2. Find the Smallest Number

// 3. Find the Biggest number

function reverse(x:number){
    //Creates a new stack
    let stack = x.toString();
    let y =stack.split("")
     
    let i = 0;
    let reversedStr = "";
    //Adds all the characters to the stack.
    while (i !== y.length) {
        let Z=y.pop();
        reversedStr += `${Z}`
    }
  
    return reversedStr

}
const biggestNum = (reversedStr: number) => {
    let num = reversedStr.toString().split("").sort((a: any, b: any) => b - a);

    return parseInt(num[0]);
  };

  const smallestNum = (reversedStr: number) => {
    let num2 = reversedStr.toString().split("").sort((a: any, b: any) => a - b);

    return parseInt(num2[0]);
  };


  let Numstacks =123456

console.log((reverse(Numstacks)));

  console.log(biggestNum(num));
  console.log(smallestNum(num2));

 





