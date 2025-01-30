export default function fruitReducer(fruits, action) {
    switch (action.type) {
        case 'added': {
            return [
                ...fruits,
                action.fruit
            ];
        }
        case 'deleted': {
            return fruits.filter(fruit => fruit !== action.fruit);
        }
        case 'edited': {
            return [
                ...fruits.slice(0, action.indexFruit),
                action.fruit,
                ...fruits.slice(action.indexFruit + 1)
            ];
        }
        case 'sorted': {
            return action.checkValue ? [...fruits].sort() : [...fruits].sort((a, b) => b.localeCompare(a));
        }
    }
}