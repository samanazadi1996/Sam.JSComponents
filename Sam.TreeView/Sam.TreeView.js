HTMLElement.prototype.LoadTreeView = function (data, options = null) {
    var spnList=[]
    var idFieldName = options?.IdFieldName ?? 'id'
    var textFieldName = options?.TextFieldName ?? 'text'
    var parentIdFieldName = options?.ParentIdFieldName ?? 'parentId'
    var body = this
    body.innerHTML = ''

    const GetByparentId = (jsonObject, parentId) => {
        return jsonObject.filter(
            function (jsonObject) {
                return (jsonObject[parentIdFieldName] == parentId);
            }
        );
    }
    const GenerateTreeView = (parentId) => {
        var ul = document.createElement('ul')
        GetByparentId(data, parentId).forEach(element => {
            var childs = GenerateTreeView(element[idFieldName])
            var li = document.createElement('li')
            var spn = document.createElement('span')

            if (childs.childElementCount > 0) {
                var btn = document.createElement('button')
                btn.innerText = '-'
                btn.style.width = "23px"
                btn.onclick = function () {
                    if (this.innerText == '+') {
                        childs.style.display = null
                        this.innerText = '-'
                    } else {
                        childs.style.display = 'none'
                        this.innerText = '+'
                    }
                }
                li.appendChild(btn)
            } else {
                spn.style.marginLeft = '23px'
                spn.style.marginRight = '23px'
            }
            spn.innerText = element[textFieldName]
            spn.style.paddingRight = '5px'
            spn.style.paddingLeft = '5px'
            spn.setAttribute('TreeViewId', element[idFieldName])

            if (element[parentIdFieldName] != null)
                spn.setAttribute('TreeViewParentId', element[parentIdFieldName])

            li.style.cursor = 'pointer'
            li.style.listStyleType = 'none'
            spn.onclick = function () {
                spnList.forEach(element => {
                    element.style.color = null
                    element.removeAttribute('IsSelected')
                });

                if (body.attributes['Selected']?.value == spn.attributes['TreeViewId'].value) {
                    body.removeAttribute('Selected')
                    this.removeAttribute('IsSelected')
                    this.style.color = null
                } else {
                    this.style.color = 'blue'
                    this.setAttribute('IsSelected', spn.attributes['TreeViewId'].value)
                    body.setAttribute('Selected', spn.attributes['TreeViewId'].value)
                }
            }
            spnList.push(spn)
            li.appendChild(spn)
            li.appendChild(childs)
            ul.style.border = '1px dotted'
            ul.style.margin = '2px'
            ul.appendChild(li)
        });
        return ul;
    }
    this.appendChild(GenerateTreeView(null))
}
