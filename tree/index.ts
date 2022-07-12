
const map: Record<string, any> = {};
let list: any[] = [];
let tree: any[] =[];

const parseList = (list: any) => {
  const n = list.length;
  let treeList: any = []
  for (let i = 0; i < n; i ++) {
    const item: any = list[i];
    map[item.cateId] = item;
  }
  for (let j = 0; j < n; j ++) {
    const newItem = list[j];
    const itemParent = map[newItem.parentId];
    if (itemParent) {
      if (!Array.isArray(itemParent.children)) 
      itemParent.children = [];
      itemParent.children.push(newItem);
    } else {
      treeList.push(newItem);
    }
  }
  tree = [...treeList];
  return treeList;
}

const filter = (value: string) => {
  let array: any = [];
  let source = [ ...tree ];
  source.forEach((item: any) => {
    childTra(item);
    if(item.visible){
        array.push(item);
    }
  });
  function childTra(data: any){
    var children = data.children || [];
    children.forEach(function(item: any) {
      item.visible = filterNodeMethod(item, value);
      childTra(item)//递归
    });
    if (!data.visible && children.length) {//做完前面的所有递归,当该节点的visible还是false，且children数组长度不为空，就去遍历children看里面的结点的visible有没有true的如果有那么说明这个结点也是true，把他变成true。
      let visible = false;
      let pd: any = [];
      children.forEach((e: any)=>{
        if(e.visible){
          visible = true
          pd.push(e)
        }
      });
      data.children = pd;
      data.visible = visible;
    } 
  }
  return array;
}


const filterNodeMethod = (node: any, searchValue: string) => {
  return node.cateName.indexOf(searchValue) !== -1;
}

