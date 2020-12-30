'use strict';

//? Promise : 비동기를 간편하게 처리할수있게 도와주는 Object
//* Promise is a JavaScript object for asynchronous operation.

//* State: pending -> fulfilled or rejected
//* Producer vs Consumer

//? 1. Producer
//* when new Promise is created, the executor runs automatically.
const promise = new Promise((resolve, reject) => {
	//* doing some heavy work (network, read files)
	console.log('doing something...');
	setTimeout(() => {
		resolve('ellie');
		// reject(new Error('no network'));
	}, 2000);
});

//? 2. Consumers: then, catch, finally
promise //
	.then((value) => {
		console.log(value);
	})
	.catch((error) => {
		console.log(error);
	})
	.finally(() => {
		// 항상 실행
		console.log('finally');
	});

//? 3. Promise chaining
const fetchNumber = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve(1);
	}, 1000);
});

fetchNumber
	.then((num) => num * 2)
	.then((num) => num * 3)
	.then((num) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(num - 1);
			}, 1000);
		});
	})
	.then((num) => console.log(num));

//? 4. Error Handling
const getHen = () =>
	new Promise((resolve, reject) => {
		setTimeout(() => resolve('🐓'), 1000);
	});
const getEgg = (hen) =>
	new Promise((resolve, reject) => {
		// setTimeout(() => resolve(`${hen} => 🥚`), 1000);
		setTimeout(() => reject(new Error(`error ${hen} => 🥚`)), 1000);
	});
const cook = (egg) =>
	new Promise((resolve, reject) => {
		setTimeout(() => resolve(`${egg} => 🥘`), 1000);
	});

getHen()
	.then((hen) => getEgg(hen))
	.then((egg) => cook(egg))
	.then((meal) => console.log(meal))
	.catch((error) => console.log(error));

//* 위의 코드의 생략이 가능한부분
getHen() //
	.then(getEgg)
	.then(cook)
	.then(console.log)
	.catch(console.log);

//* 개별 error 핸들링
getHen() //
	.then(getEgg)
	.catch((error) => {
		return '🐣';
	})
	.then(cook)
	.then(console.log)
	.catch(console.log);
