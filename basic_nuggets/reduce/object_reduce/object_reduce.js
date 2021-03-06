// Reduce - Objects

// cart example

const cart = [
	{
		title: 'Samsung Galaxy S7',
		price: 599.99,
		amount: 1,
	},
	{
		title: 'google pixel',
		price: 499.99,
		amount: 2,
	},
	{
		title: 'Xiaomi Redmi Note 2',
		price: 699.99,
		amount: 4,
	},
	{
		title: 'Xiaomi Redmi Note 5',
		price: 399.99,
		amount: 3,
	},
];

let { totalItems, cartTotal } = cart.reduce(
	(total, cartItem) => {
		const { amount, price } = cartItem;
		// count items
		total.totalItems += amount;
		// add price
		total.cartTotal += amount * price;
		return total;
	},
	{
		totalItems: 0,
		cartTotal: 0,
	}
);
cartTotal = cartTotal.toFixed(2); // .toFixed() : 고정소수점 표기법 반환 : 소수점자리 반올림
console.log(totalItems, cartTotal); // 10 5599.90

// github repos example

const url = 'https://api.github.com/users/john-smilga/repos?per_page=100';

const fetchRepos = async () => {
	const response = await fetch(url);
	const data = await response.json();
	const newData = data.reduce((total, repo) => {
		const { language } = repo;

		// if (language) {
		// 	if (total[language]) {
		// 		total[language] = total[language] + 1;
		// 	} else {
		// 		total[language] = 1;
		// 	}
		// }

		if (language) {
			total[language] = total[language] + 1 || 1;
		}

		return total;
	}, {});
	console.log(newData);
};

fetchRepos();
