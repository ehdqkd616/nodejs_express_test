// const test = {
//     uniqueID: "UNIQUEID",
//     location: "root/main",
// };

// const ref = test

// ref.loginRequired = true;

// console.log(test);


// const test = {}
// test.fn_test = function( key, value, expire )
// {
//     const self = this;

//     return new Promise( function( resolve, reject )
//     {
//         var params = [ key, value ];

//         if ( expire )
//             params = [ ...params, "EX", expire ];

//         self._connectionObj.set( ...params, function( err, reply )
//         {
//             if ( err )
//                 reject( err );
//             else
//                 resolve( reply );
//         } );
//     } );
// }



// const test = {}
// test.fn_test = function (key, value, expire) {
//     var params = [key, value];

//     if (expire)
//         params = [...params, "EX", expire];

//     console.log(params);
// }

// test.fn_test("key", "value", "expire");

// const test = {}

// function test2(...param, callback) {
//     callback(null, param);
// }

// test.fn_test = function (key, value, expire) {
//     var params = [key, value];

//     if (expire)
//         params = [...params, "EX", expire];

//     test2(...params, function (err, reply) {
//         if (err)
//             console.log(`err : ${err}`)
//         else
//             console.log(`reply : ${reply}`)
//     });
// }


// test.fn_test("key", "value", "expire");


// const test = {}

// function test2(...param) {
//     let fn_callback = param[param.length - 1];
//     console.log(param);
//     fn_callback(null, "reply");
// }

// test.fn_test = function (key, value, expire) {
//     var params = [key, value];

//     if (expire)
//         params = [...params, "EX", expire];

//     test2(...params, function (err, reply) {
//         if (err)
//             console.log(`err : ${err}`)
//         else
//             console.log(`reply : ${reply}`)
//     });
// }


// test.fn_test("key", "value", "expire");
// test2("key", "value", "expire");


// let test = {};

// function testRun(obj) {
//     obj.one = 1;
//     obj.two = 2;
// }

// testRun(test);
// console.log(test);

// let test = "one";

// function testRun(str) {
//     str += " two";
// }
// testRun(test);
// console.log(test);

// var test = ["one"];

// function testRun(arr) {
//     test = [];

//     console.log("arr", arr);
// }

// testRun(test);
// console.log(test);

// function changeAgeImpure(person) {
//     person = Object.create(person);
// }

// var alex = {
//     name: 'Alex',
//     age: 30
// };

// changeAgeImpure(alex);

// console.log(alex); // -> {name: 'Alex', age: 25}
// // console.log(changedAlex); // -> {name: 'Alex', age: 25}