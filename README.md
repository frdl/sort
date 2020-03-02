# sort
Duckytype/magic `sort` functions used by the frdl.js library.

## Cases:
````javascript
require.main.frdl.sort([1,'2', {foo:'bar'},0])
/*
0: 0
1: 1
2: "2"
3: {foo: "bar"}
*/

require.main.frdl.sort( {foo:'blondy', alpha : 'bar'})
/*
{alpha: "bar", foo: "blondy"}
alpha: "bar"
foo: "blondy"
*/

require.main.frdl.sort(['1', 1,'2', {foo:'bar'},0, {foo:'blondy', alpha : 'bar'}, 0, null], '-r')
/*
0: "1"
1: 1
2: "2"
3: {foo: "bar"}
4: 0
5: {alpha: "bar", foo: "blondy"}
6: 0
7: null
*/


require.main.frdl.sort(['1', 1,'2', {foo:'bar'},0, {foo:'blondy', alpha : 'bar'}, 0, null])
/*
0: 0
1: 0
2: "1"
3: 1
4: "2"
5: {foo: "bar"}
6: {foo: "blondy", alpha: "bar"}
7: null
*/


require.main.frdl.sort( {foo:'blondy', alpha : 'bar'}, true)
/*
0: Array(2)
0: "foo"
1: "blondy"
length: 2
__proto__: Array(0)
1: Array(2)
0: "alpha"
1: "bar"
length: 2
*/


require.main.frdl.sort( {foo:'blondy', alpha : 'bar'}, false)
/*
{foo: "blondy", alpha: "bar"}
foo: "blondy"
alpha: "bar"
*/

require.main.frdl.sort( {foo:'blondy', alpha : 'bar', blondy : 'aar', balpha : 'car', cblondy : 'bar'})
/*
alpha: "bar"
balpha: "car"
blondy: "aar"
cblondy: "bar"
foo: "blondy"
*/

require.main.frdl.sort( {foo:'blondy', alpha : 'bar', blondy : 'aar', balpha : 'car', cblondy : 'bar'}, ['balpha', 'cblondy', 'foo'])
require.main.frdl.sort( {foo:'blondy', alpha : 'bar', blondy : 'aar', balpha : 'car', cblondy : 'bar'}, ['balpha', 'cblondy', 'foo'], true)
/*
balpha: "car"
cblondy: "bar"
foo: "blondy"
alpha: "bar"
blondy: "aar"
*/


require.main.frdl.sort( {foo:'blondy', alpha : 'bar', blondy : 'aar', balpha : 'car', cblondy : 'bar'}, ['balpha', 'cblondy', 'foo'], false)
/*
blondy: "aar"
alpha: "bar"
cblondy: "bar"
foo: "blondy"
balpha: "car"
*/


require.main.frdl.sort( [{foo:'blondy', alpha : 'bar'},{foo:'alpha', alpha : 'blondy'}], 'foo')
/*
0:
foo: "alpha"
alpha: "blondy"
__proto__: Object
1:
foo: "blondy"
alpha: "bar"
__proto__: Object
*/


require.main.frdl.sort( [{foo:'blondy', alpha : 'bar'},{foo:'alpha', alpha : 'blondy'}], 'foo', ['bar', 'foo'])
require.main.frdl.sort( [{foo:'blondy', alpha : 'bar'},{foo:'alpha', alpha : 'blondy'}], 'foo', ['bar', 'foo'], true)
/*
0:
foo: "alpha"
alpha: "blondy"
__proto__: Object
1:
foo: "blondy"
alpha: "bar"
__proto__: Object
length: 2
*/


require.main.frdl.sort( [{foo:'blondy', alpha : 'bar'},{foo:'alpha', alpha : 'blondy'}], 'foo', ['bar', 'foo'], false)
/*
0:
foo: "blondy"
alpha: "bar"
__proto__: Object
1:
foo: "alpha"
alpha: "blondy"
__proto__: Object
length: 2
__proto__: Array(0)
*/
````

