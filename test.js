require.paths.push("/Users/kanaya/work/vps/ravy");
require("Ravy");
require_ravy();

var hash  = new Hash({});
var array = new Array();

hash.add({hogehoge : "hogeeeeeeeee"});
hash.add(new Hash({hello : "hellohello"}));
hash.add("hoge");
hash.add(["key_1","value_1"]);
hash.add("key_2", "value_2");
hash.add(["key_3", "value_3", "key_4"]);
hash.add([["k_5","v_5"],["k_6","v_6"],["k_7","v_7"]]);
array.add("hoge");
array.add(["hoge_2" , "hoge_3"]);
array.add("hoge_4","hoge_5","hoge_6");
console.log( array );

console.log( hash );

console.log("")
console.log("flat **************")

var a = [1,2,[/3/,4,5,["hoge"]],6,[7,8,9,[{hoge : "hello", hogehoge : [1,2,3]}]]];
var b = [1,2,3,[4,5]];
console.log(b.flat());
console.log(b);
console.log(b.__flat__());
console.log(b);
//console.log(b.flat());
//
//
var hoge_a = new Hash({a : "aa", b : "bb", hoge : "hoge_a"})
var hoge_b = new Hash({c : "cc", hoge : "hoge_b"})
console.log( hoge_a.merge(hoge_b) );
console.log( hoge_a );
console.log( hoge_a.__merge__(hoge_b) );
console.log( hoge_a );


var hoge = "abcdefghijklmn";
hoge.each_char(function(str){
  console.log( str );
});


console.log("=== gsub ===");
var a = "hogehogehoge";
console.log(a.gsub("ogeh", "="))
console.log(a.gsub(/o/, "="))
