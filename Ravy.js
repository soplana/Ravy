Ravy = {
  array_methods    : [],
  hash_methods     : [],
  string_methods   : [],
  number_methods   : [],
  function_methods : [],
  
  get_class : function(object){
    var class_name = Object.prototype.toString.call(object).replace(/\[|\]/g, "").split(" ")[1]; 
    if(class_name.match(/Object|global/)) class_name = "Hash"; 
    return class_name;
  },

  cast : function(object){
    switch( object.class_name() ){
      case "Number":
        object = parseInt( object ); break;
      case "String":
        object = object.toString();  break;
    };
    return object;
  },
  
  object_check : function(target, type){
    if(!target) throw new Error("no object error");
    type = type.to_a();
    var ok = false;
    for(var i=0; i<type.length; i++) if(type[i] == target.class_name()){ ok = true; break };
    if(!ok) throw new Error("no method error");
    return true;
  },

  count : function(object, class_name, func){
    var find = 0;
    object.each(function(){
      argument = (class_name == "Array") ? arguments[0] : [arguments[0],arguments[1]];
      if(class_name == "Array"){
        if( func(argument) ) find += 1;
      }else{
        if( func(argument[0], argument[1]) ) find += 1;
      };
    });
    return find;
  }
};

Hash = function Hash(object){
  object = object || {};
  var keys = [];
  for(var proto_keys in Object.getPrototypeOf(object)) keys.push( proto_keys );
  for(var elm in object) if( !keys.include(elm) ) this[elm] = object[elm];
};



/******************* Ravy methods ************************/
Ravy.methods = {};


/*
 * times
 * addClass : Number
 * argument : Function
 * return   : -
 */
Ravy.methods.times = function times(func){
  Ravy.object_check(func, "Function");
  var num = parseInt(this);
  for(var i=0; i<num; i++) func(i);
};


/*
 * next 
 * addClass : Number
 * argument : - 
 * return   : -
 */
Ravy.methods.next = function next(){
  var num = 1;
  if(arguments[0]){
    Ravy.object_check(arguments[0], "Number");
    num = parseInt(arguments[0]);
  };
  return parseInt(this) + num;
};


/*
 * prev
 * addClass : Number
 * argument : - 
 * return   : -
 */
Ravy.methods.prev = function prev(){
  var num = 1;
  if(arguments[0]){
    Ravy.object_check(arguments[0], "Number");
    num = parseInt(arguments[0]);
  };
  return parseInt(this) - num;
};


/*
 * each
 * addClass : Array, Hash
 * argument : Function
 * return   : -
 */
Ravy.methods.each_array = function each_array(func){
  Ravy.object_check(func, "Function");
  for(var i=0; i<this.length; i++) func(this[i]);
};

Ravy.methods.each_object = function each_object(func){
  Ravy.object_check(func, "Function");
  var tmp_this = this;
  var keys = [];
  for(var proto_keys in Object.getPrototypeOf(tmp_this)) keys.push( proto_keys );
  for(var elm in this) if( !keys.include(elm) ) func(elm, this[elm]);
};


/*
 * each_with_index
 * addClass : Array, Hash
 * argument : Function
 * return   : -
 */
Ravy.methods.each_with_index_array = function each_with_index_array(func){
  Ravy.object_check(func, "Function");
  for(var i=0; i<this.length; i++) func(this[i], i);
};

Ravy.methods.each_with_index_object = function each_with_index_object(func){
  Ravy.object_check(func, "Function");
 
  var index = 0;
  this.each( function(key, value){
    func([key, value], index);
    index++;
  });
};
 

/*
 * each_slice
 * addClass : Array, Hash
 * argument : Number, Function
 * return   : -
 */
Ravy.methods.each_slice = function each_slice(num, func){
  Ravy.object_check(num,  "Number");

  var tmp_this = (this.class_name() == "Array") ? this.clone() : this.to_a();
  var slices = [];
  function add(list){ slices.push(list); if(func) func(list) };

  while(true){
    if( tmp_this.length < num ){ if(tmp_this.size()!=0) add(tmp_this); break };
    var tmp = [];
    num.times(function(index){tmp.push( tmp_this.shift() )});
    add(tmp);
  };
  return slices;
};


/*
 * merge
 * addClass : Hash
 * argument : Hash, Object
 * return   : Hash 
 */
Ravy.methods.merge_func = function merge_func(this_obj, object, self){
  if( (this_obj.constructor != object.constructor) &&
      (Ravy.get_class(object) != "Hash") ) 
    throw new Error("no object error");
  if(Ravy.get_class(object) == "Hash") object = new Hash(object);

  var tmp_this = (self) ? this_obj : this_obj.clone();
  object.each( function(key, value){
    tmp_this[key] = value;
  });
  return tmp_this;
};

Ravy.methods.merge = function merge(object){ return Ravy.methods.merge_func(this, object, false) };
Ravy.methods.__merge__ = function __merge__(object){ return Ravy.methods.merge_func(this, object, true) };


/*
 * to_a
 * addClass : Array, Hash, String
 * argument : -
 * return   : Array
 */
Ravy.methods.to_a_array = function to_a_array(){return this};
Ravy.methods.to_a_object = function to_a_object(){
  return this.inject([], function(obj, rec){ obj.push([rec[0], rec[1]]) });
};
Ravy.methods.to_a_string = function to_a_string(){return [this.toString()]};


/*
 * inject
 * addClass : Array, Hash
 * argument : Hash, Function
 * return   :  
 */
Ravy.methods.inject = function inject(object, func){
  Ravy.object_check(func, "Function");
 
  var class_name = this.class_name();
  var new_object = (class_name == "Array") ? [] : new Hash({});
  this.each(function(){
    argument = (class_name == "Array") ? arguments[0] : [arguments[0],arguments[1]];
    if( ["Array","Hash"].include(Ravy.get_class(object)) ){
      func(object, argument);
    }else{
      object = func(object, argument);
    };
  });
  return object;
};


/*
 * select 
 * addClass : Array, Hash
 * argument : Function
 * return   : Array, Hash
 */
Ravy.methods.select = function select(func){
  Ravy.object_check(func, "Function");
  if(this.class_name() == "Array"){
    return this.inject([], function(obj, rec){ if(func(rec)) obj.push(rec) });
  }else{
    return this.inject({}, function(obj, rec){ if(func(rec)) obj[rec[0]] = rec[1] });
  };
};


/*
 * keys 
 * addClass : Hash
 * argument : - 
 * return   : Array
 */
Ravy.methods.keys = function keys(){
  return this.correct(function(key, value){ return key });
};


/*
 * values 
 * addClass : Hash
 * argument : - 
 * return   : Array
 */
Ravy.methods.values = function values(){
  return this.correct(function(key, value){ return value });
};


/*
 * include 
 * addClass : Array, Hash, String
 * argument : Function
 * return   : bool 
 */
Ravy.methods.include = function include(target){
  var find = false;
  this.each(function(key){ if(target == key){find = true; return } });
  return find;
};

Ravy.methods.include_string = function include_string(str){
  var find = false;
  var class_name = Ravy.get_class(str);
  if( class_name == "String" ){
    find = new RegExp(str).test(this);
  } else if( class_name == "RegExp") {
    find = str.test(this);
  }else{
    throw new Error("argument error");
  };
  return find;
};


/*
 * size
 * addClass : Array, Hash
 * argument : -
 * return   : Number
 */
Ravy.methods.size = function size(){
  return this.inject(0, function(num){ return num += 1 });
};


/*
 * correct 
 * addClass : Array, Hash
 * argument : Function
 * return   : Array
 */
Ravy.methods.correct = function correct(func){
  Ravy.object_check(func, "Function");
  
  var class_name = this.class_name();
  return this.inject([], function(obj, rec){
    if(class_name == "Array"){
      obj.push( func(rec) );
    }else{
      obj.push( func(rec[0], rec[1]) );
    };
  });
};


/*
 * one 
 * addClass : Array, Hash
 * argument : Function
 * return   : bool
 */
Ravy.methods.one = function one(func){
  Ravy.object_check(func, "Function");
  var class_name = this.class_name();
  return (Ravy.count(this, class_name, func) == 1) ? true : false;
};


/*
 * all 
 * addClass : Array, Hash
 * argument : Function
 * return   : bool
 */
Ravy.methods.all = function all(func){
  Ravy.object_check(func, "Function");
  var class_name = this.class_name();
  return (Ravy.count(this, class_name, func) == this.size()) ? true : false;
};


/*
 * uniq 
 * addClass : Array
 * argument : - 
 * return   : -
 */
Ravy.methods.uniq = function uniq(func){
  return this.inject([], function(obj, rec){ if(!obj.include(rec)) obj.push(rec) });
};


/*
 * gsub 
 * addClass : String 
 * argument : RegExp, String
 * return   : String
 */
Ravy.methods.gsub = function gsub(reg, str){
  if(!str) str = "";
  reg = Ravy.get_class(reg)=="RegExp" ? reg.source : reg;
  return this.replace(new RegExp(reg, "g"), str);
};


/*
 * scan
 * addClass : String 
 * argument : RegExp
 * return   : Array 
 */
Ravy.methods.scan = function scan(reg){ return this.match(new RegExp(reg, "g")) || [] };


/*
 * reverse 
 * addClass : String 
 * argument : -
 * return   : String
 */
Ravy.methods.reverse = function reverse(){ return Array.prototype.slice.call(this).reverse().join("") };


/*
 * chomp 
 * addClass : String 
 * argument : -
 * return   : String
 */
Ravy.methods.chomp = function chomp(){ return this.gsub(/\r\n|\n/,"") };


/*
 * to_obj 
 * addClass : Hash
 * argument : - 
 * return   : Object
 */
Ravy.methods.to_obj = function to_obj(){ return this.inject({}, function(obj, rec){ obj[rec[0]] = rec[1] }) };


/*
 * clone 
 * addClass : Array, Hash
 * argument : - 
 * return   : Array, Hash
 */
Ravy.methods.clone_hash = function clone_hash(){
  return this.inject(new Hash({}), function(obj, rec){obj[rec[0]] = rec[1]});
};
Ravy.methods.clone_array = function clone_array(){return this.concat()};


/*
 * add 
 * addClass : Array, Hash
 * argument : 
 * return   : Array, Hash
 */
Ravy.methods.add = function add(){
  var args = arguments;
  if(this.class_name()=="Array"){
    var tmp_this = this;
    if(args.length == 1){
      args[0].to_a().each(function(rec){tmp_this.push(rec)});
    } else {
      args.length.times(function(i){tmp_this.push(args[i])});
    };
  }else if(this.class_name()=="Hash"){
    if (args.length < 2){
      var tmp_this = this;
      if( ["Hash","Object"].include(Ravy.get_class(args[0])) ){
        tmp_this.__merge__( args[0] );
      } else {
        args[0].to_a().flat().each_slice(2, function(rec){
          tmp_this[rec[0]]= (rec[1]) ? rec[1] : null;
        });
      };
    } else {
      this[args[0]]=args[1];
    };
  };
  return this;
};


/*
 * flat
 * addClass : Array
 * argument : -
 * return   : Array
 */
Ravy.methods.flat_func = function flat_func(array, self){
  Ravy.object_check(array, "Array");
  var flat_list = [];
  function _flat(record){
    if(Ravy.get_class(record) == "Array"){
      record.each(function(rec){ _flat(rec) }); 
    }else{
      flat_list.push( record );
    };
  };
  _flat( array );
  return (self) ? array.clear().add(flat_list) : flat_list;
};
Ravy.methods.flat = function flat(){ return Ravy.methods.flat_func(this.clone(), false) };
Ravy.methods.__flat__ = function __flat__(){ return Ravy.methods.flat_func(this, true) };


/*
 * clear 
 * addClass : Array, Hash
 * argument : -
 * return   : this
 */
Ravy.methods.clear_array = function clear_array(){
  for(var i=0; i<this.length; i++) delete this[i];
  return this;
};

Ravy.methods.clear_hash = function clear_hash(){
  var tmp_this = this;
  var keys = [];
  for(var proto_keys in Object.getPrototypeOf(tmp_this)) keys.push( proto_keys );
  for(var elm in this) delete this[elm];
  return this;
};


/*
 * each_char 
 * addClass : String 
 * argument : -
 * return   : Array 
 */
Ravy.methods.each_char = function each_char(func){
  Array.prototype.slice.call(this).each_with_index(function(str, index){
    func( str, index ); 
  });
};


/*
 * class
 * addClass : Hash
 * argument : -
 * return   : String 
 */
Ravy.methods.class_name = function class_name(){
  return Object.prototype.toString.call(this).replace(/\[|\]/g, "").split(" ")[1]; 
};

Ravy.methods.get_class = function get_class(object){
  var class_name = Object.prototype.toString.call(object).replace(/\[|\]/g, "").split(" ")[1]; 
  if(class_name.match(/Object|global/)) class_name = "Hash"; 
  return class_name;
};

Ravy.methods.get_class_hash = function get_class_hash(object){
  return "Hash";
};


require_ravy = function(){
  Function.prototype.class_name   = Ravy.methods.class_name;
  Number.prototype.__proto__ = {
    times      : Ravy.methods.times,
    next       : Ravy.methods.next,
    prev       : Ravy.methods.prev,
    class_name : Ravy.methods.class_name
  };

  Array.prototype.__proto__ = {
    each            : Ravy.methods.each_array,
    each_with_index : Ravy.methods.each_with_index_array,
    to_a            : Ravy.methods.to_a_array,
    uniq            : Ravy.methods.uniq,
    include         : Ravy.methods.include,
    each_slice      : Ravy.methods.each_slice,
    inject          : Ravy.methods.inject,
    select          : Ravy.methods.select,
    size            : Ravy.methods.size,
    correct         : Ravy.methods.correct,
    one             : Ravy.methods.one,
    all             : Ravy.methods.all,
    clone           : Ravy.methods.clone_array,
    add             : Ravy.methods.add,
    flat            : Ravy.methods.flat,
    __flat__        : Ravy.methods.__flat__,
    clear           : Ravy.methods.clear_array,
    class_name      : Ravy.methods.class_name
  };

  Hash.prototype.__proto__ = {
    to_a            : Ravy.methods.to_a_object,
    each_with_index : Ravy.methods.each_with_index_object,
    each            : Ravy.methods.each_object,
    each_slice      : Ravy.methods.each_slice,
    merge           : Ravy.methods.merge,
    __merge__       : Ravy.methods.__merge__,
    inject          : Ravy.methods.inject,
    select          : Ravy.methods.select,
    keys            : Ravy.methods.keys,
    values          : Ravy.methods.values,
    include         : Ravy.methods.include,
    size            : Ravy.methods.size,
    correct         : Ravy.methods.correct,
    one             : Ravy.methods.one,
    all             : Ravy.methods.all,
    to_obj          : Ravy.methods.to_obj,
    add             : Ravy.methods.add,
    clone           : Ravy.methods.clone_hash,
    clear           : Ravy.methods.clear_hash,
    class_name      : Ravy.methods.get_class_hash
  };

  String.prototype.__proto__ = {
    to_a       : Ravy.methods.to_a_string,
    gsub       : Ravy.methods.gsub,
    include    : Ravy.methods.include_string,
    scan       : Ravy.methods.scan,
    reverse    : Ravy.methods.reverse,
    chomp      : Ravy.methods.chomp,
    each_char  : Ravy.methods.each_char,
    class_name : Ravy.methods.class_name
  };
  
  //for(var i in new Number().__proto__) Ravy.number_methods.push(i);
  //for(var i in new Array().__proto__ ) Ravy.array_methods.push(i);
  //for(var i in new Hash().__proto__  ) Ravy.hash_methods.push(i);
  //for(var i in new String().__proto__) Ravy.string_methods.push(i);
};

//delete_rubyjs = function(){
//  Ravy.number_methods.each(function(rec){ delete Number.prototype[rec] });
//  Ravy.array_methods.each(function(rec){  delete Array.prototype[rec]  });
//  Ravy.hash_methods.each(function(rec){   delete Hash.prototype[rec]   });
//  Ravy.string_methods.each(function(rec){ delete String.prototype[rec] });
//  delete Function.prototype.class_name;
//};
