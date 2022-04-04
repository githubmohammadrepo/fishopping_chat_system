let data = [
    {id:1,name:"one"},
    {id:2,name:"two"},
    {id:3, name:"three"}
];



let one =JSON.parse(JSON.stringify(data));
one = one.map(d=>{
    d.select = d.id>=2 ? 'select' : '';
    return d;
});

console.log(data);
console.log(one);