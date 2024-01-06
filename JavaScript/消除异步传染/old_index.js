async function getJson() {
  return await fetch('https://jsonplaceholder.typicode.com/todos/1').then(res => res.json());
}

async function fn1() {
  return await getJson();
}

async function fn2() {
  return await fn1();
}

async function fn3() {
  return await fn2();
}

async function main() {
  const result = await fn3();
  console.log(result);
}

main();