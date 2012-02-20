/**************************************************************
*
* Ravy.js v0.0.1
*
* ----- Support -------------------
*   Browser : Chrome, Firefox, Safari, Opera (latest version)
*   OS      : Mac OS X 10.6.8~
*   node.js : v0.4.8~ 
*
* ----- Contact ------------------
*   Twitter : https://twitter.com/#!/soplana
*
* ----- license ------------------
*   free
*
*************************************************************/


// how to use
/*
  html :
    <script type="text/javascript" src="Ravy.js"></script>
    <script type="text/javascript">
      function onloadEvent(){
        require_ravy();
      };
    </script>

  node.js
    require.paths.push("/Users/user_name/ravy"); // Ravy.js directory path
    require("Ravy");
    require_ravy();
*/




/*=============== Methods =======================
Number.prototype.times
Number.prototype.next
Number.prototype.prev
Number.prototype.class_name

Array.prototype.each
Array.prototype.each_with_index
Array.prototype.to_a
Array.prototype.uniq
Array.prototype.include
Array.prototype.each_slice
Array.prototype.inject
Array.prototype.select
Array.prototype.size
Array.prototype.correct
Array.prototype.one
Array.prototype.all
Array.prototype.clone
Array.prototype.class_name

Hash.prototype.to_a
Hash.prototype.each_with_index
Hash.prototype.each
Hash.prototype.each_slice
Hash.prototype.merge
Hash.prototype.inject
Hash.prototype.select
Hash.prototype.keys
Hash.prototype.values
Hash.prototype.include
Hash.prototype.size
Hash.prototype.correct
Hash.prototype.one
Hash.prototype.all
Hash.prototype.to_obj
Hash.prototype.clone
Hash.prototype.class_name

String.prototype.to_a
String.prototype.gsub
String.prototype.include
String.prototype.scan
String.prototype.reverse
String.prototype.chomp
String.prototype.class_name
Function.prototype.class_name
*/


/*=============== Sample code ===================*/
require.paths.push("/Users/kanaya/node");
require("Ravy");
require_ravy();


// Number.prototype.times
console.log( "== Number.prototype.times ==" );
var num = 5;
num.times(function(index){
  console.log(index)
});
/*
> 0
> 1
> 2
> 3
> 4
*/


// Number.prototype.next
console.log( "== Number.prototype.next ==" );
var a = 10;
var b = 0;
var c = -10;
console.log( a.next(10) ) // > 20
console.log( b.next(10) ) // > 10
console.log( c.next(10) ) // > 0
console.log( a.next() )   // > 11
console.log( b.next() )   // > 1
console.log( c.next() )   // > -9

  
// Number.prototype.prev
console.log( "== Number.prototype.prev ==" );
var a = 10;
var b = 0;
var c = -10;
console.log( a.prev(10) ) // > 0
console.log( b.prev(10) ) // > -10
console.log( c.prev(10) ) // > -20
console.log( a.prev() )   // > 9
console.log( b.prev() )   // > -1
console.log( c.prev() )   // > -11


// Number.prototype.class_name
console.log( "== Number.prototype.class_name ==" );
var a = 0;
console.log( a.class_name() ) // > Number


// Array.prototype.each
console.log( "== Array.prototype.each ==" );
["aaa", "bbb","ccc"].each( function(i){
  console.log(i);
});
/*
> aaa
> bbb
> ccc
*/


// Hash.prototype.each
console.log( "== Hash.prototype.each ==" );
var object = {key_a : "value_a", key_b : "value_b", key_c : "value_c"};
var hash   = new Hash( object );
hash.each(function(k,v){
  console.log(k + " : " + v);
});
/*
> key_a : value_a 
> key_b : value_b
> key_c : value_c
*/


// Array.prototype.each_with_index
console.log( "== Array.prototype.each_with_index ==" );
["aaa", "bbb","ccc"].each_with_index( function(rec, index){
  console.log("record: " + rec + "    index: " + index);
});
/*
> record: aaa    index: 0
> record: bbb    index: 1
> record: ccc    index: 2
*/


// Hash.prototype.each_with_index
console.log( "== Hash.prototype.each_with_index ==" );
var object = {key_a : "value_a", key_b : "value_b", key_c : "value_c"};
var hash   = new Hash( object );
hash.each_with_index(function(rec, index){
  console.log("record: " + rec[0] + " " + rec[1] + "    index: " + index);
});
/*
> record: key_a value_a    index: 0
> record: key_b value_b    index: 1
> record: key_c value_c    index: 2
*/


// Array.prototype.uniq
console.log( "== Array.prototype.uniq ==" );
var a = [1,2,3,4,5,6,7];
var b = [1,2,3,4,5,6,7,1,2,1];
var c = [1,1,1];
var d = ["aa","bb","cc","a","aa","cc"];
var e = [];
console.log(a.uniq()); // > [ 1, 2, 3, 4, 5, 6, 7 ]
console.log(b.uniq()); // > [ 1, 2, 3, 4, 5, 6, 7 ]
console.log(c.uniq()); // > [ 1 ]
console.log(d.uniq()); // > [ 'aa', 'bb', 'cc', 'a' ]
console.log(e.uniq()); // > []


// Array.prototype.include
console.log( "== Array.prototype.include ==" );
var a = [1,2,3,4,5,6,7];
var b = ["aa","bb","cc","a","aa","cc"];
console.log(a.include(5));    // > true
console.log(a.include(10));   // > false
console.log(b.include("cc")); // > true
console.log(b.include("k"));  // > false


// String.prototype.include
console.log( "== String.prototype.include ==" );
var hoge = "hogehoge";
console.log(hoge.include("k"));     // > false
console.log(hoge.include("geh"));   // > true
console.log(hoge.include(/[1-9]/)); // > false
console.log(hoge.include(/a|o/));   // > true


// Array.prototype.each_slice
console.log( "== Array.prototype.each_slice ==" );
var a = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
a.each_slice(4, function( slice ){
  console.log(slice);
});
/*
> [ 1, 2, 3, 4 ]
> [ 5, 6, 7, 8 ]
> [ 9, 10, 11, 12 ]
> [ 13, 14 ]
*/
console.log( a.each_slice(4) );
/*
> [ [ 1, 2, 3, 4 ],
>   [ 5, 6, 7, 8 ],
>   [ 9, 10, 11, 12 ],
>   [ 13, 14 ] ]
*/


// Hash.prototype.each_slice
console.log( "== Hash.prototype.each_slice ==" );
var object = {
  key_a : "value_a", key_b : "value_b", key_c : "value_c",
  key_d : "value_d", key_e : "value_e", key_f : "value_f",
  key_g : "value_g", key_h : "value_h", key_i : "value_i"
};
var hash   = new Hash( object );
hash.each_slice(4, function(rec){
  console.log( rec );
});
/*
> [ [ 'key_a', 'value_a' ],
>   [ 'key_b', 'value_b' ],
>   [ 'key_c', 'value_c' ],
>   [ 'key_d', 'value_d' ] ]
> [ [ 'key_e', 'value_e' ],
>   [ 'key_f', 'value_f' ],
>   [ 'key_g', 'value_g' ],
>   [ 'key_h', 'value_h' ] ]
> [ [ 'key_i', 'value_i' ] ]
*/
console.log( hash.each_slice(4) );
/*
> [ [ [ 'key_a', 'value_a' ],
>     [ 'key_b', 'value_b' ],
>     [ 'key_c', 'value_c' ],
>     [ 'key_d', 'value_d' ] ],
>   [ [ 'key_e', 'value_e' ],
>     [ 'key_f', 'value_f' ],
>     [ 'key_g', 'value_g' ],
>     [ 'key_h', 'value_h' ] ],
>   [ [ 'key_i', 'value_i' ] ] ]
*/


// Array.prototype.inject
console.log( "== Array.prototype.inject ==" );
var a = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
console.log( a.inject([], function(list, record){ if(record%2 == 0) list.push(record * 100) }) );
// > [ 200, 400, 600, 800, 1000, 1200, 1400 ] 
console.log( a.inject("", function(str, record){ return str += (record*10).toString() }) );
// > 102030405060708090100110120130140


// Hash.prototype.inject
console.log( "== Hash.prototype.inject ==" );
var object = {
  key_a : "value_a", key_b : "value_b", key_c : "value_c",
  key_d : "value_d", key_e : "value_e", key_f : "value_f",
  key_g : "value_g", key_h : "value_h", key_i : "value_i"
};
var hash   = new Hash( object );
console.log( hash.inject({}, function(obj, record){ obj["hoge_"+record[0]]="hoge_"+record[1]}) );
/*
> { hoge_key_a: 'hoge_value_a',
>   hoge_key_b: 'hoge_value_b',
>   hoge_key_c: 'hoge_value_c',
>   hoge_key_d: 'hoge_value_d',
>   hoge_key_e: 'hoge_value_e',
>   hoge_key_f: 'hoge_value_f',
>   hoge_key_g: 'hoge_value_g',
>   hoge_key_h: 'hoge_value_h',
>   hoge_key_i: 'hoge_value_i' }
*/
console.log( hash.inject("", function(str, record){ return str += record[0]+":"+record[1]+"-"; }) );
// > key_a:value_a-key_b:value_b-key_c:value_c-key_d:value_d-key_e:value_e-key_f:value_f-key_g:value_g-key_h:value_h-key_i:value_i-


// Array.prototype.select
console.log( "== Array.prototype.select ==" );
var a = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
console.log( a.select( function(record){return record%2 == 0} ));
// > [ 2, 4, 6, 8, 10, 12, 14 ]


// Hash.prototype.select
console.log( "== Hash.prototype.select ==" );
var object = {
  key_a : "111", key_b : "value_b", key_c : "value_c",
  key_d : "value_d", key_e : "313", key_f : "value_f",
  key_g : "value_g", key_h : "value_h", key_i : "424", aa : "1234"
};
var hash   = new Hash( object );
console.log( hash.select( function(record){return record[0].include(/^key_.$/)} ));
/*
> { key_a: '111',
>   key_b: 'value_b',
>   key_c: 'value_c',
>   key_d: 'value_d',
>   key_e: '313',
>   key_f: 'value_f',
>   key_g: 'value_g',
>   key_h: 'value_h',
>   key_i: '424' }
*/
console.log( hash.select( function(record){return record[1].include(/[0-9]+/)} ));
// > { key_a: '111', key_e: '313', key_i: '424', aa: '1234' }


// Array.prototype.size
console.log( "== Array.prototype.size ==" );
var a = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
var b = [];
console.log( a.size() ); // > 14
console.log( b.size() ); // > 0


// Hash.prototype.size
console.log( "== Hash.prototype.size ==" );
var object = {
  key_a : "value_a", key_b : "value_b", key_c : "value_c",
  key_d : "value_d", key_e : "value_e", key_f : "value_f",
  key_g : "value_g", key_h : "value_h", key_i : "value_i"
};
var hash   = new Hash( object );
console.log( hash.size() ); // > 9
console.log( new Hash({}).size() ); // > 0


// Array.prototype.correct
console.log( "== Array.prototype.correct ==" );
var a = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
console.log( a.correct(function(record){return record * 10}) );
// > [ 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140 ]


// Hash.prototype.correct
console.log( "== Hash.prototype.correct ==" );
var object = {
  key_a : "value_a", key_b : "value_b", key_c : "value_c",
  key_d : "value_d", key_e : "value_e", key_f : "value_f",
  key_g : "value_g", key_h : "value_h", key_i : "value_i"
};
var hash   = new Hash( object );
console.log( hash.correct(function(key, value){return key + " : " + value}) );
/*
> [ 'key_a : value_a',
>   'key_b : value_b',
>   'key_c : value_c',
>   'key_d : value_d',
>   'key_e : value_e',
>   'key_f : value_f',
>   'key_g : value_g',
>   'key_h : value_h',
>   'key_i : value_i' ]
*/

// Array.prototype.one
console.log( "== Array.prototype.one ==" );
var a = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
console.log( a.one(function(record){ return record%7 == 0 }) ); // > false
console.log( a.one(function(record){ return record%8 == 0 }) ); // > true


// Hash.prototype.one
console.log( "== Hash.prototype.one ==" );
var object = {
  key_a : "value_a", key_b : "value_b", key_c : "value_c",
  key_d : "value_d", key_e : "value_e", key_f : "value_f",
  key_g : "value_g", key_h : "value_h", key_i : "value_i"
};
var hash   = new Hash( object );
console.log( hash.one(function(key, value){ return key.include(/^key/) })); // > false
console.log( hash.one(function(key, value){ return key.include(/a$/) }));   // > true


// Array.prototype.all
console.log( "== Array.prototype.all ==" );
var a = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
console.log( a.all(function(record){ return record.class_name()=="Number" }) );        // > true
console.log( a.all(function(record){ return record.toString().include(/^[0-9]*/) }) ); // > true
console.log( a.all(function(record){ return record.toString().include(/^[0-9]$/) }) ); // > false


// Hash.prototype.all
console.log( "== Hash.prototype.all ==" );
var object = {
  key_a : "value_a", key_b : "value_b", key_c : "value_c",
  key_d : "value_d", key_e : "value_e", key_f : "value_f",
  key_g : "value_g", key_h : "value_h", key_i : "value_i"
};
var hash   = new Hash( object );
console.log( hash.all(function(key, value){ return value.class_name()=="String" })); // > true 
console.log( hash.all(function(key, value){ return key.include(/^key/) }));          // > true
console.log( hash.all(function(key, value){ return key.include(/a$/) }));            // > false


// Hash.prototype.merge
console.log( "== Hash.prototype.merge ==" );
var hash_a = new Hash({key_a : "value_a", key_b : "value_b", key_c : "value_c", hoge : "hoge_a"});
var hash_b = new Hash({key_e : "value_e", key_d : "value_d", key_f : "value_f", hoge : "hoge_b"});
console.log( hash_a.merge(hash_b) );
/*
> { key_a: 'value_a',
>   key_b: 'value_b',
>   key_c: 'value_c',
>   hoge: 'hoge_b',
>   key_e: 'value_e',
>   key_d: 'value_d',
>   key_f: 'value_f' }
*/
console.log( hash_a.merge({hello: "hello!!!", raby: "raby!!!"}) );
/*
> { key_a: 'value_a',
>   key_b: 'value_b',
>   key_c: 'value_c',
>   hoge: 'hoge_a',
>   hello: 'hello!!!',
>   raby: 'raby!!!' }
*/


// Hash.prototype.keys
console.log( "== Hash.prototype.keys ==" );
var hash = new Hash({key_a : "value_a", key_b : "value_b", key_c : "value_c", hoge : "hoge_a"});
console.log( hash.keys() );
// > [ 'key_a', 'key_b', 'key_c', 'hoge' ]


// Hash.prototype.values
console.log( "== Hash.prototype.values ==" );
var hash = new Hash({key_a : "value_a", key_b : "value_b", key_c : "value_c", hoge : "hoge_a"});
console.log( hash.values() );
// > [ 'value_a', 'value_b', 'value_c', 'hoge_a' ]


// Hash.prototype.to_obj
console.log( "== Hash.prototype.to_obj ==" );
var hash = new Hash({key_a : "value_a", key_b : "value_b", key_c : "value_c", hoge : "hoge_a"});
console.log( hash.constructor );           // > [Function: Hash]
console.log( hash.to_obj().constructor );  // > [Function: Object] 
console.log( hash.to_obj() ); 
/*
{ key_a: 'value_a',
  key_b: 'value_b',
  key_c: 'value_c',
  hoge: 'hoge_a' }
*/
