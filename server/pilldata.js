var fs=require('fs')

function getPill() {
    let rawData=fs.readFileSync('data.json');
    let student=JSON.parse(rawData);
    return student;

}
exports.list_all_pills=function(req, res) {
    res.json(getPill());
};
exports.add_pill=function(req, res) {
    var a=getPill();
    a.push(req.body);
    fs.writeFileSync('data.json', JSON.stringify(a));
    res.json({"id": -2});
};
exports.delete_pill=function(req, res) {
    id=req.params.id;
    var a=getPill();
    i=-1;
    var arrFound=a.find(function(item, index) {
        i=index;
        return item.id==req.params.id;
    });
    if(i>- 1) {
        x=a[i].id
        a.splice(i, 1)
        fs.writeFileSync('data.json', JSON.stringify(a));
        res.json({"id": x});
    }
    else {
        res.json({"id": -1});
    }
}
exports.update_pill=function(req, res) {
    console.log('aaaaaaa')
    var a=getPill();
    i=-1;
    var arrFound=a.find(function(item, index) {
        i=index;
        return item.id==req.params.id;
    });
    console.log(i)
    a[i]=req.body;
    fs.writeFileSync('data.json', JSON.stringify(a));
    //if(arrFound.length==1) {
    //    arrFound[0]=req.body
    //    }

    res.json({"id": -3});
};
exports.find_pill=function(req, res) {
    console.log(req.params.id)
    var a=getPill()
    var arrFound=a.filter(function(item) {
        return item.id==req.params.id;
    });
    if(arrFound.length) {
        console.log('found'+arrFound.length)
        res.json(arrFound[0]);
    }
    else {
        console.log('not found')
        res.json({"id": -1});
    }
};




exports.create_a_pill=function(req, res) {
    var new_pill=new Pill(req.body);
    new_pill.save(function(err, pill) {
        if(err)
            res.send(err);
        res.json(pill);
    });
};